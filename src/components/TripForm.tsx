"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TravelVibe } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateItinerary } from "@/lib/generateItinerary";
import { saveTrip } from "@/lib/tripStorage";
import { Trip } from "@/types";
import GeneratingTripScreen from "@/components/GeneratingTripScreen";

const VIBES: TravelVibe[] = [
  "culture",
  "food",
  "adventure",
  "relaxation",
  "nightlife",
];

function getDaysBetween(start: string, end: string): number {
  if (!start || !end) return 0;
  const diff = new Date(end).getTime() - new Date(start).getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function getDatesInRange(start: string, end: string): string[] {
  if (!start || !end) return [];
  const dates: string[] = [];
  const current = new Date(start);
  const endDate = new Date(end);
  while (current <= endDate) {
    dates.push(
      current.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    );
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

export default function TripForm() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [selectedVibes, setSelectedVibes] = useState<TravelVibe[]>([]);
  const [loading, setLoading] = useState(false);

  const days = getDaysBetween(startDate, endDate);
  const dates = getDatesInRange(startDate, endDate);

  function toggleVibe(vibe: TravelVibe) {
    setSelectedVibes((prev) =>
      prev.includes(vibe) ? prev.filter((v) => v !== vibe) : [...prev, vibe],
    );
  }

  async function handleSubmit() {
    if (!destination || !startDate || !endDate || selectedVibes.length === 0)
      return;
    setLoading(true);

    try {
      const days = await generateItinerary({
        destination,
        startDate,
        endDate,
        travelers,
        vibes: selectedVibes,
      });

      const trip: Trip = {
        id: crypto.randomUUID(),
        destination,
        startDate,
        endDate,
        travelers,
        vibes: selectedVibes,
        days,
        createdAt: new Date().toISOString(),
      };

      saveTrip(trip);
      router.push(`/trip/${trip.id}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  const isValid =
    destination && startDate && endDate && selectedVibes.length > 0 && days > 0;

  if (loading) return <GeneratingTripScreen destination={destination} />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] min-h-[calc(100vh-65px)]">
      <div className="px-14 py-12 border-r border-(--border-subtle) lg:border-r-0 lg:border-b">
        <p className="text-xs tracking-widest text-gold uppercase mb-3">
          New trip
        </p>
        <h2 className="font-serif text-5xl font-normal text-(--text-primary) leading-tight mb-2">
          Where are you
          <br />
          headed?
        </h2>
        <p className="text-sm text-(--text-secondary) font-light mb-10">
          Fill in the details and let Roam build your perfect itinerary.
        </p>

        <div className="space-y-8">
          <div>
            <label className="block text-xs tracking-widest text-(--text-tertiary) uppercase mb-3">
              Destination
            </label>
            <Input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Kyoto, Japan"
              className="bg-bg-surface border-(--border-subtle) text-(--text-primary) placeholder:text-(--text-tertiary) focus:border-gold h-12 text-base"
            />
          </div>

          <div>
            <label className="block text-xs tracking-widest text-(--text-tertiary) uppercase mb-3">
              Travel dates
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-bg-surface border-(--border-subtle) text-(--text-primary) focus:border-gold h-12"
              />
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-bg-surface border-(--border-subtle) text-(--text-primary) focus:border-gold h-12"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-widest text-(--text-tertiary) uppercase mb-3">
              Travel vibe
            </label>
            <div className="grid grid-cols-3 gap-2">
              {VIBES.map((vibe) => (
                <button
                  key={vibe}
                  onClick={() => toggleVibe(vibe)}
                  className={`py-3 px-4 rounded-lg border text-sm capitalize transition-colors ${
                    selectedVibes.includes(vibe)
                      ? "border-gold bg-(--gold-muted) text-gold"
                      : "border-(--border-subtle) bg-bg-surface text-(--text-secondary) hover:border-(--border-default)"
                  }`}
                >
                  {vibe}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-widest text-(--text-tertiary) uppercase mb-3">
              Travelers
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTravelers((t) => Math.max(1, t - 1))}
                className="w-9 h-9 rounded-full border border-(--border-default) text-(--text-primary) text-lg flex items-center justify-center hover:border-gold transition-colors"
              >
                −
              </button>
              <span className="text-2xl font-medium text-(--text-primary) min-w-8 text-center">
                {travelers}
              </span>
              <button
                onClick={() => setTravelers((t) => Math.min(10, t + 1))}
                className="w-9 h-9 rounded-full border border-(--border-default) text-(--text-primary) text-lg flex items-center justify-center hover:border-gold transition-colors"
              >
                +
              </button>
              <span className="text-sm text-(--text-tertiary)">travelers</span>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!isValid || loading}
            className="w-full h-12 bg-gold text-bg-base hover:opacity-90 transition-opacity text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading
              ? "Generating your itinerary..."
              : "Generate my itinerary →"}
          </Button>
        </div>
      </div>

      <div className="hidden lg:block bg-bg-surface px-8 py-10">
        <p className="text-xs tracking-widest text-(--text-tertiary) uppercase mb-5">
          Trip preview
        </p>

        <div className="bg-bg-raised border border-(--border-subtle) rounded-xl p-5 mb-4">
          {destination ? (
            <>
              <p className="font-serif text-3xl text-gold mb-1">
                {destination}
              </p>
              <p className="text-sm text-(--text-tertiary)">
                {startDate && endDate && days > 0
                  ? `${new Date(startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${new Date(endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · ${days} days · ${travelers} ${travelers === 1 ? "traveler" : "travelers"}`
                  : "Add your travel dates"}
              </p>
            </>
          ) : (
            <p className="text-sm text-(--text-tertiary)">
              Start filling in the form...
            </p>
          )}
        </div>

        {dates.length > 0 && (
          <>
            <p className="text-xs tracking-widest text-(--text-tertiary) uppercase mb-3">
              Days being planned
            </p>
            <div className="flex flex-col gap-2">
              {dates.map((date, i) => (
                <div
                  key={i}
                  className="bg-bg-raised border border-(--border-subtle) rounded-lg px-4 py-3 flex items-center gap-4"
                >
                  <span className="font-serif text-2xl text-gold opacity-40 min-w-8">
                    {i + 1}
                  </span>
                  <span className="text-sm text-(--text-tertiary)">{date}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {dates.length === 0 && destination && (
          <p className="text-xs text-(--text-tertiary)">
            Add travel dates to see your days
          </p>
        )}

        <div className="mt-6 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-gold opacity-50" />
          <span className="text-xs text-(--text-tertiary)">
            {isValid ? "Ready to generate" : "Waiting for your details..."}
          </span>
        </div>
      </div>
    </div>
  );
}
