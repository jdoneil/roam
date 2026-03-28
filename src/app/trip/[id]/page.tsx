"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Trip } from "@/types";
import { getTripById } from "@/lib/tripStorage";
import ItineraryView from "@/components/ItineraryView";

export default function TripPage() {
  const { id } = useParams();
  const router = useRouter();
  const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    const found = getTripById(id as string);
    if (!found) router.push("/");
    else setTrip(found);
  }, [id, router]);

  if (!trip)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-(--text-tertiary) text-sm">Loading trip...</p>
      </div>
    );

  return <ItineraryView trip={trip} />;
}
