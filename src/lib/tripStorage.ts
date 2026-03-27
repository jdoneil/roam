import { Trip } from "@/types";

const KEY = "roam_trips";

export function saveTrip(trip: Trip): void {
  const existing = getTrips();
  const updated = [trip, ...existing.filter((t) => t.id !== trip.id)];
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function getTrips(): Trip[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export function getTripById(id: string): Trip | undefined {
  return getTrips().find((t) => t.id === id);
}
