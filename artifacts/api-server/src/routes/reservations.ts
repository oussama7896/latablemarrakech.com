import { Router } from "express";
import { db, reservationsTable } from "@workspace/db";
import { eq, sql, desc } from "drizzle-orm";
import { insertReservationSchema } from "@workspace/db";

const router = Router();

router.post("/reservations", async (req, res) => {
  const parse = insertReservationSchema.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Invalid input", details: parse.error.issues });
    return;
  }

  try {
    const [reservation] = await db
      .insert(reservationsTable)
      .values(parse.data)
      .returning();

    res.status(201).json(serializeReservation(reservation));
  } catch (err) {
    req.log.error({ err }, "Failed to create reservation");
    res.status(500).json({ error: "Failed to create reservation" });
  }
});

router.get("/reservations", async (req, res) => {
  const status = req.query["status"] as string | undefined;
  const page = Math.max(1, parseInt(req.query["page"] as string) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query["limit"] as string) || 20));
  const offset = (page - 1) * limit;

  try {
    const query = db
      .select()
      .from(reservationsTable)
      .orderBy(desc(reservationsTable.createdAt))
      .limit(limit)
      .offset(offset);

    const countQuery = db
      .select({ count: sql<number>`count(*)::int` })
      .from(reservationsTable);

    if (status) {
      query.where(eq(reservationsTable.status, status));
      countQuery.where(eq(reservationsTable.status, status));
    }

    const [reservations, countResult] = await Promise.all([query, countQuery]);
    const total = countResult[0]?.count ?? 0;

    res.json({
      reservations: reservations.map(serializeReservation),
      total,
      page,
      limit,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to list reservations");
    res.status(500).json({ error: "Failed to list reservations" });
  }
});

router.get("/reservations/stats", async (req, res) => {
  try {
    const [statsRows, byExperienceRows, recentRows] = await Promise.all([
      db.select({
        status: reservationsTable.status,
        count: sql<number>`count(*)::int`,
      })
        .from(reservationsTable)
        .groupBy(reservationsTable.status),
      db.select({
        experienceType: reservationsTable.experienceType,
        count: sql<number>`count(*)::int`,
      })
        .from(reservationsTable)
        .groupBy(reservationsTable.experienceType),
      db.select()
        .from(reservationsTable)
        .orderBy(desc(reservationsTable.createdAt))
        .limit(5),
    ]);

    const statusMap: Record<string, number> = {};
    let total = 0;
    for (const row of statsRows) {
      statusMap[row.status] = row.count;
      total += row.count;
    }

    res.json({
      total,
      pending: statusMap["pending"] ?? 0,
      confirmed: statusMap["confirmed"] ?? 0,
      cancelled: statusMap["cancelled"] ?? 0,
      completed: statusMap["completed"] ?? 0,
      byExperience: byExperienceRows.map((r) => ({
        experienceType: r.experienceType,
        count: r.count,
      })),
      recentReservations: recentRows.map(serializeReservation),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get reservation stats");
    res.status(500).json({ error: "Failed to get stats" });
  }
});

router.get("/reservations/:id", async (req, res) => {
  const id = parseInt(req.params["id"]);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  try {
    const [reservation] = await db
      .select()
      .from(reservationsTable)
      .where(eq(reservationsTable.id, id));

    if (!reservation) {
      res.status(404).json({ error: "Reservation not found" });
      return;
    }

    res.json(serializeReservation(reservation));
  } catch (err) {
    req.log.error({ err }, "Failed to get reservation");
    res.status(500).json({ error: "Failed to get reservation" });
  }
});

router.patch("/reservations/:id", async (req, res) => {
  const id = parseInt(req.params["id"]);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const { status, notes } = req.body as { status?: string; notes?: string };
  const validStatuses = ["pending", "confirmed", "cancelled", "completed"];
  if (!status || !validStatuses.includes(status)) {
    res.status(400).json({ error: "Invalid status" });
    return;
  }

  try {
    const [reservation] = await db
      .update(reservationsTable)
      .set({ status, notes: notes ?? null })
      .where(eq(reservationsTable.id, id))
      .returning();

    if (!reservation) {
      res.status(404).json({ error: "Reservation not found" });
      return;
    }

    res.json(serializeReservation(reservation));
  } catch (err) {
    req.log.error({ err }, "Failed to update reservation");
    res.status(500).json({ error: "Failed to update reservation" });
  }
});

function serializeReservation(r: typeof reservationsTable.$inferSelect) {
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    whatsapp: r.whatsapp,
    country: r.country,
    guests: r.guests,
    date: r.date,
    time: r.time,
    location: r.location,
    experienceType: r.experienceType,
    dietaryPreferences: r.dietaryPreferences ?? null,
    message: r.message ?? null,
    status: r.status,
    notes: r.notes ?? null,
    createdAt: r.createdAt.toISOString(),
  };
}

export default router;
