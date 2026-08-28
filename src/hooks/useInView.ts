"use client";

import { useEffect, useRef, useState } from "react";

/** Sets `inView` true the first time the element scrolls into view. */
export function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.2 },
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView] as const;
}
