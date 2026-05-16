import { Router } from "express";
import { CreateReservationBody } from "@workspace/api-zod";
import { appendReservationToGoogleSheet, sendWhatsAppNotification } from "../lib/google-sheets";

const router = Router();

router.post("/reservations", async (req, res) => {
  const parse = CreateReservationBody.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Invalid reservation data", details: parse.error.issues });
    return;
  }

  const reservation = parse.data;
  const storedDate = reservation.date instanceof Date ? reservation.date.toISOString().split("T")[0] : reservation.date;

  try {
    const createdAt = new Date().toISOString();
    const reservationData = {
      name: reservation.name,
      email: reservation.email,
      whatsapp: reservation.whatsapp,
      country: reservation.country,
      guests: reservation.guests,
      date: storedDate,
      time: reservation.time,
      location: reservation.location,
      experienceType: reservation.experienceType,
      dietaryPreferences: reservation.dietaryPreferences ?? null,
      message: reservation.message ?? null,
      createdAt,
    };

    await appendReservationToGoogleSheet(reservationData, req.log);

    try {
      await sendWhatsAppNotification(reservationData, req.log);
    } catch (notifyErr) {
      req.log.error({ err: notifyErr }, "WhatsApp notification failed");
    }

    res.status(201).json({
      name: reservation.name,
      email: reservation.email,
      whatsapp: reservation.whatsapp,
      country: reservation.country,
      guests: reservation.guests,
      date: storedDate,
      time: reservation.time,
      location: reservation.location,
      experienceType: reservation.experienceType,
      dietaryPreferences: reservation.dietaryPreferences ?? null,
      message: reservation.message ?? null,
      status: "pending",
      createdAt,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create reservation");
    res.status(500).json({ error: "Failed to create reservation" });
  }
});

export default router;
