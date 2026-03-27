import { Trip } from "@/types";

export const seedTrips: Trip[] = [
  {
    id: "tokyo-2026",
    destination: "Tokyo, Japan",
    startDate: "2026-03-24",
    endDate: "2026-03-31",
    travelers: 2,
    vibes: ["culture", "food"],
    days: Array.from({ length: 7 }, (_, i) => ({
      day: i + 1,
      date: "",
      activities: Array(3).fill(null),
    })),
    createdAt: "2026-03-01",
  },
  {
    id: "paris-2026",
    destination: "Paris, France",
    startDate: "2026-04-10",
    endDate: "2026-04-15",
    travelers: 2,
    vibes: ["relaxation"],
    days: Array.from({ length: 5 }, (_, i) => ({
      day: i + 1,
      date: "",
      activities: Array(3).fill(null),
    })),
    createdAt: "2026-03-05",
  },
  {
    id: "bali-2026",
    destination: "Bali, Indonesia",
    startDate: "2026-05-02",
    endDate: "2026-05-10",
    travelers: 1,
    vibes: ["adventure", "relaxation"],
    days: Array.from({ length: 8 }, (_, i) => ({
      day: i + 1,
      date: "",
      activities: Array(3).fill(null),
    })),
    createdAt: "2026-03-10",
  },
];
