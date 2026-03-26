"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Animated counter that counts up from 0 to target when the ref element scrolls into view.
 */
export function useCounter(target: number, duration = 1.2) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || target <= 0) return;
    if (started.current) return;
    started.current = true;

    const start = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - (1 - progress) ** 2;
      const current = Math.round(start + (target - start) * easeOut);
      setValue(current);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return { ref, value };
}
