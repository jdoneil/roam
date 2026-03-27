import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { destination, startDate, endDate, travelers, vibes } =
    await req.json();

  const prompt = `You are a travel planning expert. Generate a detailed day-by-day itinerary for the following trip:

Destination: ${destination}
Start date: ${startDate}
End date: ${endDate}
Number of travelers: ${travelers}
Travel vibes: ${vibes.join(", ")}

Return ONLY a valid JSON object with no preamble or markdown formatting. The structure must be exactly:
{
  "days": [
    {
      "day": 1,
      "date": "Monday, Mar 24",
      "activities": [
        {
          "id": "unique-string",
          "time": "9:00 AM",
          "name": "Activity name",
          "description": "2 sentence description of the activity",
          "category": "temple",
          "coordinates": [139.7967, 35.7148],
          "duration": "2 hours"
        }
      ]
    }
  ]
}

Rules:
- Generate 3-4 activities per day
- Categories must be one of: temple, food, landmark, nature, museum, shopping, entertainment
- Coordinates must be real and accurate for the destination [longitude, latitude]
- Space activities realistically throughout the day starting around 9am
- Tailor activities to the specified vibes`;

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
    const cleaned = text.replace(/```json|```/g, "").trim();
    const data = JSON.parse(cleaned);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate itinerary" },
      { status: 500 },
    );
  }
}
