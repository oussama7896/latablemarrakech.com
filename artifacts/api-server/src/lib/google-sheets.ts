import { google } from "googleapis";
import type { Logger } from "pino";

interface ReservationInput {
  name: string;
  email: string;
  whatsapp: string;
  country: string;
  guests: number;
  date: string;
  time: string;
  location: string;
  experienceType: string;
  dietaryPreferences?: string | null;
  message?: string | null;
  createdAt?: string;
}

function getSheetsConfig() {
  return {
    spreadsheetId: process.env["GOOGLE_SHEETS_SPREADSHEET_ID"],
    sheetsRange: process.env["GOOGLE_SHEETS_RANGE"] ?? "Sheet1!A:L",
    credentialsJson: process.env["GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON"],
  };
}

function getWhatsAppConfig() {
  return {
    // Meta/WhatsApp Business API (Graph API)
    whatsappPhoneNumberId: process.env["WHATSAPP_META_PHONE_NUMBER_ID"],
    whatsappApiToken: process.env["WHATSAPP_API_TOKEN"],
    whatsappTargetNumber: process.env["WHATSAPP_TARGET_NUMBER"],
    // Twilio WhatsApp
    twilioAccountSid: process.env["TWILIO_ACCOUNT_SID"],
    twilioAuthToken: process.env["TWILIO_AUTH_TOKEN"],
    twilioFrom: process.env["TWILIO_WHATSAPP_FROM"],
    twilioTo: process.env["TWILIO_WHATSAPP_TO"],
  };
}

function createSheetsClient(spreadsheetId: string, credentialsJson: string) {
  let credentials: Record<string, unknown>;
  try {
    credentials = JSON.parse(credentialsJson);
  } catch (err) {
    throw new Error("Invalid GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON: must be valid JSON");
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

export async function appendReservationToGoogleSheet(reservation: ReservationInput, logger: Logger) {
  const { spreadsheetId, sheetsRange, credentialsJson } = getSheetsConfig();

  if (!spreadsheetId || !credentialsJson) {
    const error = new Error("Google Sheets integration is not configured");
    logger.error(
      {
        spreadsheetIdExists: Boolean(spreadsheetId),
        credentialsJsonExists: Boolean(credentialsJson),
      },
      error.message,
    );
    throw error;
  }

  const sheets = createSheetsClient(spreadsheetId, credentialsJson);
  if (!sheets) {
    throw new Error("Unable to initialize Google Sheets client");
  }

  const values = [
    reservation.name,
    reservation.email,
    reservation.whatsapp,
    reservation.country,
    String(reservation.guests),
    reservation.date,
    reservation.time,
    reservation.experienceType,
    reservation.location,
    reservation.dietaryPreferences ?? "",
    reservation.message ?? "",
    reservation.createdAt ?? new Date().toISOString(),
  ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: sheetsRange,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [values],
    },
  });

  logger.info({ spreadsheetId, range: sheetsRange }, "Appended reservation row to Google Sheets");
}

export async function sendWhatsAppNotification(reservation: ReservationInput, logger: Logger) {
  const {
    whatsappPhoneNumberId,
    whatsappApiToken,
    whatsappTargetNumber,
    twilioAccountSid,
    twilioAuthToken,
    twilioFrom,
    twilioTo,
  } = getWhatsAppConfig();

  const body = [
    `New reservation received`,
    `Name: ${reservation.name}`,
    `Email: ${reservation.email}`,
    `WhatsApp: ${reservation.whatsapp}`,
    `Country: ${reservation.country}`,
    `Guests: ${reservation.guests}`,
    `Date: ${reservation.date}`,
    `Time: ${reservation.time}`,
    `Experience: ${reservation.experienceType}`,
    `Location: ${reservation.location}`,
    `Dietary: ${reservation.dietaryPreferences ?? "None"}`,
    `Message: ${reservation.message ?? "None"}`,
  ].join("\n");
  // Prefer Twilio if configured (easier setup). Otherwise fall back to Meta Graph API.
  if (twilioAccountSid && twilioAuthToken && twilioFrom && (twilioTo || whatsappTargetNumber)) {
    const toNumber = twilioTo || whatsappTargetNumber;
    const url = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;

    const form = new URLSearchParams();
    form.append("From", `whatsapp:${twilioFrom}`);
    form.append("To", `whatsapp:${toNumber}`);
    form.append("Body", body);

    const auth = Buffer.from(`${twilioAccountSid}:${twilioAuthToken}`).toString("base64");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${auth}`,
      },
      body: form.toString(),
    });

    if (!response.ok) {
      const text = await response.text();
      const errorMessage = `Twilio WhatsApp notification failed: ${response.status} ${response.statusText} ${text}`;
      logger.error({ status: response.status, statusText: response.statusText, body: text }, errorMessage);
      throw new Error(errorMessage);
    }

    logger.info({ to: toNumber }, "Sent WhatsApp notification via Twilio");
    return;
  }

  if (!whatsappPhoneNumberId || !whatsappApiToken || !whatsappTargetNumber) {
    logger.info(
      {
        whatsappPhoneNumberIdExists: Boolean(whatsappPhoneNumberId),
        whatsappApiTokenExists: Boolean(whatsappApiToken),
        whatsappTargetNumberExists: Boolean(whatsappTargetNumber),
      },
      "WhatsApp notification is not configured",
    );
    return;
  }

  const url = `https://graph.facebook.com/v17.0/${whatsappPhoneNumberId}/messages`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${whatsappApiToken}`,
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: whatsappTargetNumber,
      type: "text",
      text: {
        preview_url: false,
        body,
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    const errorMessage = `WhatsApp notification failed: ${response.status} ${response.statusText} ${text}`;
    logger.error({ status: response.status, statusText: response.statusText, body: text }, errorMessage);
    throw new Error(errorMessage);
  }

  logger.info({ to: whatsappTargetNumber }, "Sent WhatsApp notification via Meta Graph API");
}
