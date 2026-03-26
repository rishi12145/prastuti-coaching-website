"use client";

import { forwardRef } from "react";

type StatCardProps = {
  value: number;
  label: string;
  suffix?: string;
};

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  function StatCard({ value, label, suffix = "+" }, ref) {
  return (
    <div ref={ref} className="stat-card">
      <div className="stat-card__value">
        {value}
        {suffix}
      </div>
      <p className="stat-card__label">{label}</p>
    </div>
  );
});
