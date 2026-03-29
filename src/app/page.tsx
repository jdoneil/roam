"use client";

import FadeIn from "@/components/FadeIn";
import Tripcard from "@/components/TripCard";
import { getTrips } from "@/lib/tripStorage";
import { Trip } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    setTrips(getTrips());
  }, []);

  return (
    <main>
      <section className="px-10 pt-20 pb-16 max-w-2xl">
        <FadeIn>
          <p className="text-xs tracking-widest text-gold uppercase mb-4">
            AI-powered travel planning
          </p>
        </FadeIn>
        <FadeIn>
          <h1 className="font-serif text-6xl font-normal text-(--text-primary) leading-tight mb-5">
            Your next trip,
            <br />
            <em className="text-gold">perfectly planned</em>
          </h1>
        </FadeIn>
        <FadeIn>
          <p className="text-base text-(--text-secondary) font-light leading-relaxed mb-9 max-w-md">
            Describe where you want to go and how you want to feel. Roam builds
            a day-by-day itinerary tailored to you — in seconds.
          </p>
        </FadeIn>
        <FadeIn>
          <div className="flex gap-3">
            <Link
              href="/new"
              className="px-7 py-3 bg-gold text-bg-base rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Plan a trip
            </Link>
            <button className="px-7 py-3 border border-(--border-default) text-(--text-secondary) rounded-lg text-sm hover:border-(--border-default) hover:text-(--text-primary) transition-colors">
              See an example
            </button>
          </div>
        </FadeIn>
      </section>

      <div className="border-t border-(--border-subtle) mx-10" />
      <section className="grid grid-cols-1 sm:grid-cols-3 px-6 sm:px-10 py-7 border-b border-(--border-subtle)">
        {[
          { num: "2.4k", label: "Trips planned" },
          { num: "94", label: "Destinations covered" },
          { num: "4.9", label: "Avg. rating" },
        ].map((stat, i) => (
          <div
            key={i}
            className={`px-6 ${i === 0 ? "sm:pl-0" : "border-l border-(--border-subtle)"}`}
          >
            <p className="font-serif text-4xl text-gold font-bold">
              {stat.num}
            </p>
            <p className="text-sm text-(--text-tertiary) mt-1">{stat.label}</p>
          </div>
        ))}
      </section>
      <section className="px-10 py-9">
        <p className="text-xs tracking-widest text-(--text-tertiary) uppercase mb-5">
          Recent trips
        </p>
        <Link
          href="/trips"
          className="text-xs text-gold hover:opacity-80 transition-opacity"
        >
          View all →
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trips.length === 0 ? (
            <div className="col-span-3 py-16 flex flex-col items-center gap-4 border border-dashed border-(--border-subtle)] rounded-xl">
              <p className="font-serif text-3xl text-(--text-tertiary)]">
                No trips yet
              </p>
              <p className="text-sm text-(--text-tertiary)] font-light">
                Plan your first trip to see it here
              </p>
              <Link
                href="/new"
                className="mt-2 px-6 py-2.5 bg-gold text-bg-base rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Plan a trip
              </Link>
            </div>
          ) : (
            trips.map((trip, i) => (
              <FadeIn key={trip.id} delay={i * 0.1}>
                <Tripcard trip={trip} />
              </FadeIn>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
