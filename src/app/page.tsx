import Navbar from "@/components/Navbar";
import Tripcard from "@/components/TripCard";
import { seedTrips } from "@/lib/seedData";

export default function Home() {
  return (
    <main>
      <Navbar />
      <h1 className="font-serif text-gold text-5xl p-10">Roam</h1>
      <p className="text-primary p-10">Design system working.</p>
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
