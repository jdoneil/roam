"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Activity } from "@/types";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface MapViewProps {
  activities: Activity[];
  activeActivity: Activity | null;
}

export default function MapView({ activities, activeActivity }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const firstCoords = activities[0]?.coordinates ?? [139.6917, 35.6895];

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: firstCoords,
      zoom: 12,
    });

    map.current.on("load", () => {
      activities.forEach((activity, i) => {
        const el = document.createElement("div");
        el.className = "map-pin";
        el.style.cssText = `
          width: 28px; height: 28px; border-radius: 50%;
          background: #c9a96e; color: #0c0e14;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 600; cursor: pointer;
          border: 2px solid rgba(201,169,110,0.3);
          font-family: DM Sans, sans-serif;
        `;
        el.textContent = String(i + 1);

        new mapboxgl.Marker(el)
          .setLngLat(activity.coordinates)
          .addTo(map.current!);

        markers.current.push(new mapboxgl.Marker(el));
      });

      if (activities.length > 1) {
        const coords = activities.map((a) => a.coordinates);
        const bounds = coords.reduce(
          (b, coord) => b.extend(coord),
          new mapboxgl.LngLatBounds(coords[0], coords[0]),
        );
        map.current!.fitBounds(bounds, { padding: 60 });
      }
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [activities]);

  useEffect(() => {
    if (!map.current || !activeActivity) return;
    map.current.flyTo({
      center: activeActivity.coordinates,
      zoom: 14,
      duration: 800,
    });
  }, [activeActivity]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
      {activeActivity && (
        <div className="absolute bottom-5 left-5 right-5 bg-[rgba(12,14,20,0.93)] border border-(--gold-border) rounded-xl p-4">
          <div className="flex justify-between items-start">
            <span className="text-xs px-2 py-0.5 rounded-full bg-(--gold-muted) text-gold capitalize">
              {activeActivity.category} · Stop{" "}
              {activities.indexOf(activeActivity) + 1}
            </span>
          </div>
          <h3 className="font-serif text-xl text-(--text-primary) mt-2 mb-1">
            {activeActivity.name}
          </h3>
          <p className="text-xs text-(--text-secondary) leading-relaxed font-light">
            {activeActivity.description}
          </p>
          <div className="flex gap-6 mt-3 pt-3 border-t border-(--border-subtle)">
            <span className="text-xs text-(--text-tertiary)">
              <span className="text-(--text-secondary)">
                {activeActivity.time}
              </span>{" "}
              arrival
            </span>
            <span className="text-xs text-(--text-tertiary)">
              <span className="text-(--text-secondary)">
                ~{activeActivity.duration}
              </span>{" "}
              suggested
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
