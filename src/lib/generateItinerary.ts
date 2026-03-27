import { Trip, Day } from "@/types";

interface GenerateParams {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  vibes: string[];
}

export async function generateItinerary(
  params: GenerateParams,
): Promise<Day[]> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) throw new Error("Failed to generate itinerary");

  const data = await res.json();
  return data.days;
}
