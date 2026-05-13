import { useState } from "react";
import { motion } from "framer-motion";
import {
  useGetReservationStats,
  getGetReservationStatsQueryKey,
  useListReservations,
  getListReservationsQueryKey,
  useUpdateReservationStatus,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-zinc-100 text-zinc-600",
};

const experienceLabels: Record<string, string> = {
  romantic_dinner: "Romantic Dinner",
  villa_chef: "Villa Private Chef",
  rooftop_dinner: "Rooftop Dinner",
  family_dining: "Family Dining",
  luxury_breakfast: "Luxury Breakfast",
  birthday_event: "Birthday Event",
  moroccan_experience: "Moroccan Experience",
  cooking_class: "Cooking Class",
  desert_dining: "Desert Dining",
  event_catering: "Event Catering",
};

export default function Admin() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [page, setPage] = useState(1);

  const { data: stats, isLoading: statsLoading } = useGetReservationStats({
    query: { queryKey: getGetReservationStatsQueryKey() },
  });

  const { data: reservationsData, isLoading: reservationsLoading } = useListReservations(
    { status: statusFilter || undefined, page, limit: 10 },
    {
      query: {
        queryKey: getListReservationsQueryKey({ status: statusFilter || undefined, page, limit: 10 }),
      },
    }
  );

  const updateStatus = useUpdateReservationStatus();

  const handleStatusChange = (id: number, status: string) => {
    updateStatus.mutate(
      { id, data: { status: status as "pending" | "confirmed" | "cancelled" | "completed" } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetReservationStatsQueryKey() });
          queryClient.invalidateQueries({
            queryKey: getListReservationsQueryKey({ status: statusFilter || undefined, page, limit: 10 }),
          });
        },
      }
    );
  };

  return (
    <>
      <title>Admin Dashboard — La Table Marrakech</title>

      <div className="min-h-screen bg-zinc-50 pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-2">Internal</p>
            <h1 className="font-serif text-4xl text-foreground">Reservation Dashboard</h1>
          </motion.div>

          {/* Stats */}
          {statsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-white p-6 animate-pulse h-24" />
              ))}
            </div>
          ) : stats ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10"
            >
              {[
                { label: "Total", value: stats.total, color: "text-foreground" },
                { label: "Pending", value: stats.pending, color: "text-amber-600" },
                { label: "Confirmed", value: stats.confirmed, color: "text-green-700" },
                { label: "Completed", value: stats.completed, color: "text-zinc-500" },
                { label: "Cancelled", value: stats.cancelled, color: "text-red-600" },
              ].map((s) => (
                <div key={s.label} className="bg-white p-6 border border-border" data-testid={`stat-${s.label.toLowerCase()}`}>
                  <div className={`font-serif text-3xl ${s.color}`}>{s.value}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{s.label}</div>
                </div>
              ))}
            </motion.div>
          ) : null}

          {/* Experience Breakdown */}
          {stats && stats.byExperience.length > 0 && (
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white border border-border p-6 mb-10">
              <h2 className="font-serif text-xl mb-6">Bookings by Experience</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {stats.byExperience.map((item) => (
                  <div key={item.experienceType} className="text-center">
                    <div className="font-serif text-2xl text-primary">{item.count}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {experienceLabels[item.experienceType] ?? item.experienceType}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Reservations Table */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white border border-border">
            <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center gap-4 justify-between">
              <h2 className="font-serif text-xl">All Reservations</h2>
              <div className="flex gap-2 flex-wrap">
                {["", "pending", "confirmed", "completed", "cancelled"].map((s) => (
                  <button
                    key={s}
                    onClick={() => { setStatusFilter(s); setPage(1); }}
                    data-testid={`filter-${s || "all"}`}
                    className={`px-4 py-2 text-xs uppercase tracking-wider border transition-colors ${
                      statusFilter === s
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    {s || "All"}
                  </button>
                ))}
              </div>
            </div>

            {reservationsLoading ? (
              <div className="p-8 space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-16 bg-zinc-100 animate-pulse" />
                ))}
              </div>
            ) : reservationsData && reservationsData.reservations.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm" data-testid="reservations-table">
                  <thead>
                    <tr className="border-b border-border bg-zinc-50">
                      <th className="text-left px-6 py-4 text-xs uppercase tracking-wider font-medium">Guest</th>
                      <th className="text-left px-6 py-4 text-xs uppercase tracking-wider font-medium hidden md:table-cell">Experience</th>
                      <th className="text-left px-6 py-4 text-xs uppercase tracking-wider font-medium hidden md:table-cell">Date</th>
                      <th className="text-left px-6 py-4 text-xs uppercase tracking-wider font-medium hidden lg:table-cell">Guests</th>
                      <th className="text-left px-6 py-4 text-xs uppercase tracking-wider font-medium">Status</th>
                      <th className="text-left px-6 py-4 text-xs uppercase tracking-wider font-medium">Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservationsData.reservations.map((r) => (
                      <tr key={r.id} className="border-b border-border hover:bg-zinc-50 transition-colors" data-testid={`row-reservation-${r.id}`}>
                        <td className="px-6 py-4">
                          <div className="font-medium">{r.name}</div>
                          <div className="text-xs text-muted-foreground">{r.email}</div>
                          <div className="text-xs text-muted-foreground">{r.country}</div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell text-muted-foreground">
                          {experienceLabels[r.experienceType] ?? r.experienceType}
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell text-muted-foreground">
                          <div>{r.date}</div>
                          <div className="text-xs">{r.time}</div>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell text-muted-foreground">{r.guests}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs uppercase tracking-wider ${statusColors[r.status] ?? "bg-zinc-100"}`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            className="text-xs border border-border bg-background py-1 px-2"
                            defaultValue={r.status}
                            onChange={(e) => handleStatusChange(r.id, e.target.value)}
                            data-testid={`select-status-${r.id}`}
                            disabled={updateStatus.isPending}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="p-6 flex items-center justify-between border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Showing {reservationsData.reservations.length} of {reservationsData.total}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      data-testid="btn-prev-page"
                      className="px-4 py-2 text-xs border border-border disabled:opacity-40 hover:border-primary transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      disabled={page * 10 >= reservationsData.total}
                      data-testid="btn-next-page"
                      className="px-4 py-2 text-xs border border-border disabled:opacity-40 hover:border-primary transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-muted-foreground text-sm">
                No reservations found.
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
