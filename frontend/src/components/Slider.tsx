"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";

type SliderProps = {
  children: React.ReactNode;
  autoPlayMs?: number;
  className?: string;
  itemsPerSlide?: number;
};

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function Slider({
  children,
  autoPlayMs = 5000,
  className = "",
  itemsPerSlide = 1,
}: SliderProps) {
  const [index, setIndex] = useState(0);
  const items = useMemo(() => React.Children.toArray(children).filter(Boolean), [children]);
  const safeItemsPerSlide = Math.max(1, Math.floor(itemsPerSlide));
  const slides = useMemo(
    () => (safeItemsPerSlide <= 1 ? items.map((x) => [x]) : chunk(items, safeItemsPerSlide)),
    [items, safeItemsPerSlide]
  );
  const total = slides.length;

  const go = useCallback(
    (next: number) => {
      if (total === 0) return;
      setIndex((i) => (next < 0 ? (i + total - 1) % total : (i + 1) % total));
    },
    [total]
  );

  const goTo = useCallback(
    (i: number) => {
      if (i >= 0 && i < total) setIndex(i);
    },
    [total]
  );

  useEffect(() => {
    if (total <= 1 || !autoPlayMs) return;
    const t = setInterval(() => go(1), autoPlayMs);
    return () => clearInterval(t);
  }, [total, autoPlayMs, go]);

  if (total === 0) return null;
  const activeIndex = index >= total ? 0 : index;

  return (
    <div className={`slider-wrap ${className}`}>
      <div className="slider-viewport">
        <div
          className="slider-track"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {slides.map((slideItems, slideIdx) => (
            <div key={slideIdx} className="slider-slide">
              {slideItems.map((child, childIdx) => (
                <div key={childIdx} className="slider-slide__item">
                  {child}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="slider-nav">
        <button
          type="button"
          className="slider-arrow"
          onClick={() => go(-1)}
          aria-label="Previous"
          disabled={total <= 1}
        >
          ←
        </button>
        <div className="slider-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`slider-dot ${i === activeIndex ? "slider-dot--active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
        <button
          type="button"
          className="slider-arrow"
          onClick={() => go(1)}
          aria-label="Next"
          disabled={total <= 1}
        >
          →
        </button>
      </div>
    </div>
  );
}
