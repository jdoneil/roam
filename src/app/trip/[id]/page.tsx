"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Trip } from "@/types";
import { getTripById } from "@/lib/tripStorage";
import ItineraryView from "@/components/ItineraryView";

export default function TripPage() {
  const { id } = useParams();
  const router = useRouter();
  const found = getTripById(id as string);
  const [trip] = useState<Trip | null>(found ?? null);

  useEffect(() => {
    if (!found) router.push("/");
  }, [found, router]);

  if (!trip)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-(--text-tertiary) text-sm">Loading trip...</p>
      </div>
    );

  return <ItineraryView trip={trip} />;
}
