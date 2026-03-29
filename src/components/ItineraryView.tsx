"use client";

import { useState } from "react";
import { Trip, Activity, Day } from "@/types";
import ActivityCard from "./ActivityCard";
import MapView from "./MapView";

interface ItineraryViewProps {
  trip: Trip;
}

export default function ItineraryView({ trip }: ItineraryViewProps) {
  const [activeDay, setActiveDay] = useState<Day>(trip.days[0]);
  const [activeActivity, setActiveActivity] = useState<Activity | null>(
    trip.days[0]?.activities[0] ?? null,
  );

  const totalActivities = trip.days.reduce(
    (acc, d) => acc + d.activities.length,
    0,
  );

  function handleDayChange(day: Day) {
    setActiveDay(day);
    setActiveActivity(day.activities[0] ?? null);
  }

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 65px)" }}>
      <div className="flex items-end justify-between px-7 py-5 border-b border-(--border-subtle) shrink-0">
        <div>
          <h1 className="text-gold uppercase text-xs tracking-widest">
            {trip.days.length}-day itinerary
          </h1>
          <span className="text-(--text-primary) font-serif capitalize text-5xl">
            {trip.destination}
          </span>
          <p className="text-sm text-(--text-tertiary)">
            {new Date(trip.startDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}{" "}
            –{" "}
            {new Date(trip.endDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}{" "}
            · {trip.travelers} {trip.travelers === 1 ? "traveler" : "travelers"}{" "}
            · {totalActivities} activities
          </p>
        </div>
        <div className="flex gap-2">
          {trip.vibes.map((vibe) => (
            <span
              key={vibe}
              className="text-xs px-3 py-1 rounded-full bg-(--gold-muted) text-gold border border-(--gold-border) capitalize"
            >
              {vibe}
            </span>
          ))}
        </div>
      </div>
      <div
        className="grid flex-1 overflow-hidden"
        style={{ gridTemplateColumns: "320px 1fr" }}
      >
        <div className="flex flex-col border-r border-(--border-subtle) overflow-hidden">
          <div className="flex border-b border-(--border-subtle) px-4 overflow-x-auto shrink-0">
            {trip.days.map((day, index) => (
              <div
                key={"day" + index}
                onClick={() => handleDayChange(day)}
                className={`px-4 py-3 text-xs whitespace-nowrap border-b-2 transition-colors -mb-px ${
                  activeDay.day === day.day
                    ? "text-gold border-gold"
                    : "text-(--text-tertiary) border-transparent hover:text-(--text-secondary)"
                }`}
              >
                Day {index}
              </div>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <p className="text-xs text-(--text-tertiary) tracking-widest uppercase mb-3">
              {activeDay.date}
            </p>
            {activeDay.activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                isActive={activeActivity?.id === activity.id}
                onClick={() => setActiveActivity(activity)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
