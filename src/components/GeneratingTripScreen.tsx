"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const steps = [
  "Researching your destination...",
  "Planning day-by-day activities...",
  "Finding the best local spots...",
  "Optimizing your route...",
  "Finalizing your itinerary...",
];

export default function GeneratingTripScreen({
  destination,
}: {
  destination: string;
}) {
  return (
    <div className="fixed inset-0 bg-bg-base flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-6 max-w-sm text-center"
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gold"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
        <div>
          <p className="font-serif text-3xl text-(--text-primary) mb-2">
            Planning your trip to
          </p>
          <p className="font-serif text-3xl text-gold italic">{destination}</p>
        </div>
        <AnimatedSteps steps={steps} />
      </motion.div>
    </div>
  );
}

function AnimatedSteps({ steps }: { steps: string[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((i) => (i + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.p
      key={current}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="text-sm text-(--text-tertiary) font-light"
    >
      {steps[current]}
    </motion.p>
  );
}
