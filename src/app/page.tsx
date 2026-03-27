import Tripcard from "@/components/TripCard";
import { seedTrips } from "@/lib/seedData";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="px-10 pt-20 pb-16 max-w-2xl">
        <p className="text-xs tracking-widest text-gold uppercase mb-4">
          AI-powered travel planning
        </p>
        <h1 className="font-serif text-6xl font-normal text-(--text-primary) leading-tight mb-5">
          Your next trip,
          <br />
          <em className="text-gold">perfectly planned</em>
        </h1>
        <p className="text-base text-(--text-secondary) font-light leading-relaxed mb-9 max-w-md">
          Describe where you want to go and how you want to feel. Roam builds a
          day-by-day itinerary tailored to you — in seconds.
        </p>
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
      </section>

      <div className="border-t border-(--border-subtle) mx-10" />
      <section className="grid grid-cols-3 px-10 py-7 border-b border-(--border-subtle)">
        {[
          { num: "2.4k", label: "Trips planned" },
          { num: "94", label: "Destinations covered" },
          { num: "4.9", label: "Avg. rating" },
        ].map((stat, i) => (
          <div
            key={i}
            className={`px-6 ${i === 0 ? "pl-0" : "border-l border-(--border-subtle)"}`}
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
        <div className="grid grid-cols-3 gap-4">
          {seedTrips.map((trip) => (
            <Tripcard key={trip.id} trip={trip} />
          ))}
        </div>
      </section>
    </main>
  );
}
