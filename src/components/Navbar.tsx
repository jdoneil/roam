import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-5 border-b border-(--border-subtle)">
      <Link
        href="/"
        className="text-gold text-2xl font-serif tracking-wide font-semibold"
      >
        Roam
      </Link>
      <div className="flex items-center gap-8">
        <Link
          href="/trips"
          className="text-sm text-(--text-tertiary) hover:text-(--text-primary) transition-colors"
        >
          My trips
        </Link>
        <Link
          href="/new"
          className="text-sm px-4 py-2 bg-gold text-bg-base rounded-md font-medium hover:opacity-90 transition-opacity"
        >
          + New trip
        </Link>
      </div>
    </nav>
  );
}
