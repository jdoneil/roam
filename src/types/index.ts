export type TravelVibe =
  | "culture"
  | "food"
  | "adventure"
  | "relaxation"
  | "nightlife";

export interface Activity {
  id: string;
  time: string;
  name: string;
  description: string;
  category:
    | "temple"
    | "food"
    | "landmark"
    | "nature"
    | "museum"
    | "shopping"
    | "entertainment";
  coordinates: [number, number]; // [longitude, latitude]
  duration: string;
}

export interface Day {
  day: number;
  date: string;
  activities: Activity[];
}

export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  vibes: TravelVibe[];
  days: Day[];
  createdAt: string;
}
