import { Trip } from "@/types";
import Link from "next/link";

interface TripCardProps {
  trip: Trip;
}

const accentColors: Record<string, string> = {
  default: "#1a2535",
};

export default function Tripcard({ trip }: TripCardProps) {
  const totalActivities = trip.days.reduce(
    (acc, day) => acc + day.activities.length,
    0,
  );
  const startDate = new Date(trip.startDate).toLocaleDateString("en-us", {
    month: "short",
    day: "numeric",
  });
  const endDate = new Date(trip.endDate).toLocaleDateString("en-us", {
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/trip/${trip.id}`}>
      <div className="bg-bg-surface border border-(--border-subtle) rounded-xl overflow-hidden hover:border-(--border-default) transition-colors cursor-pointer">
        <div
          className="h-36 relative flex items-end p-4"
          style={{ background: accentColors.default }}
        >
          <span className="absolute top-2 right-3 font-serif text-6xl text-(--text-primary) opacity-5 pointer-events-none select-none">
            {trip.destination.split(",")[0]}
          </span>
          <div className="flex gap-2">
            {trip.vibes.map((vibe) => (
              <span
                key={vibe}
                className="text-xs px-3 py-1 rounded-full bg-gold-muted text-gold border border-[var(--gold-border)] capitalize"
              >
                {vibe}
              </span>
            ))}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-serif text-xl text-(--text-primary) mb-1">
            {trip.destination}
          </h3>
          <p className="text-xs text-(--text-tertiary) mb-4">
            {startDate} – {endDate} · {trip.travelers}{" "}
            {trip.travelers === 1 ? "traveler" : "travelers"}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-(--text-tertiary)">
              {trip.days.length} days · {totalActivities} activities
            </span>
            <span className="text-gold opacity-60 text-base">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
