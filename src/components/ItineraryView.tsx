"use client";

import { useState } from "react";
import { Trip, Activity, Day } from "@/types";
import ActivityCard from "./ActivityCard";
import MapView from "./MapView";

interface ItineraryViewProps {
  trip: Trip;
}

export default function ItineraryView({ trip }: ItineraryViewProps) {
  const totalActivities = trip.days.reduce(
    (acc, d) => acc + d.activities.length,
    0,
  );

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 65px)" }}>
      <div className="flex flex-col px-10 py-5">
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
          · {trip.travelers} {trip.travelers === 1 ? "traveler" : "travelers"} ·{" "}
          {totalActivities} activities
        </p>
      </div>
    </div>
  );
}
