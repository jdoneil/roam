"use client";

import { useState } from "react";
import { Trip } from "@/types";
import { getTrips } from "@/lib/tripStorage";
import TripCard from "@/components/TripCard";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";

export default function TripsPage() {
  const [trips] = useState<Trip[]>(() => getTrips());

  return (
    <main className="min-h-screen bg-bg-base px-10 py-12">
      <FadeIn>
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-widest text-gold uppercase mb-2">
              Your travels
            </p>
            <h1 className="font-serif text-5xl font-normal text-(--text-primary)">
              My trips
            </h1>
          </div>
          <Link
            href="/new"
            className="px-6 py-2.5 bg-gold text-bg-base rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            + New trip
          </Link>
        </div>
      </FadeIn>

      {trips.length === 0 ? (
        <FadeIn delay={0.1}>
          <div className="py-24 flex flex-col items-center gap-4 border border-dashed border-(--border-subtle) rounded-xl">
            <p className="font-serif text-3xl text-(--text-tertiary)">
              No trips yet
            </p>
            <p className="text-sm text-(--text-tertiary) font-light">
              Plan your first trip to see it here
            </p>
            <Link
              href="/new"
              className="mt-2 px-6 py-2.5 bg-gold text-bg-base rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Plan a trip
            </Link>
          </div>
        </FadeIn>
      ) : (
        <>
          <p className="text-sm text-(--text-tertiary) mb-6">
            {trips.length} {trips.length === 1 ? "trip" : "trips"} planned
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trips.map((trip, i) => (
              <FadeIn key={trip.id} delay={i * 0.08}>
                <TripCard trip={trip} />
              </FadeIn>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
