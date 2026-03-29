import { Activity } from "@/types";
import React from "react";

interface ActivityCardProps {
  activity: Activity;
  isActive: boolean;
  onClick: () => void;
}

const categoryColors: Record<string, string> = {
  temple: "bg-[#1a2535] text-[#6b9fd4]",
  food: "bg-[#251f14] text-[#c9a96e]",
  landmark: "bg-[#1f1f25] text-[#a09fd4]",
  nature: "bg-[#152015] text-[#6daa6d]",
  museum: "bg-[#251a1f] text-[#d46b8a]",
  shopping: "bg-[#201a25] text-[#b06dd4]",
  entertainment: "bg-[#251a1a] text-[#d47a6b]",
};

export default function ActivityCard({
  activity,
  isActive,
  onClick,
}: ActivityCardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl px-4 py-3 mb-2 cursor-pointer border transition-colors ${
        isActive
          ? "border-gold bg-(--gold-muted)"
          : "border-(--border-subtle) bg-bg-surface hover:border-(--border-default)"
      }`}
    >
      <div className="flex justify-between items-start mb-1">
        <span className="text-xs text-gold font-medium">{activity.time}</span>
        <span
          className={`text-xs px-2 py-0.5 rounded-full capitalize ${categoryColors[activity.category] ?? "bg-bg-raised text-(--text-tertiary)"}`}
        >
          {activity.category}
        </span>
      </div>
      <p className="text-sm font-medium text-(--text-primary) mb-1">
        {activity.name}
      </p>
      <p className="text-xs text-(--text-tertiary) leading-relaxed font-light">
        {activity.description}
      </p>
      <p className="text-xs text-(--text-tertiary) mt-2 opacity-60">
        ~{activity.duration}
      </p>
    </div>
  );
}
