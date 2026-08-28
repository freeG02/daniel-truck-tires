"use client";

import { useEffect, useState } from "react";

/**
 * Page-load choreography (see globals.css): the header/rail draw in, then the
 * navy tiles drop away, then the card rises. This component renders the navy
 * tiles and flags `intro-playing` on <html> so the frame can sit above them.
 */
export function PageLoader() {
  const [showTiles, setShowTiles] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("intro-playing");
    const tilesOff = setTimeout(() => setShowTiles(false), 1950);
    const introOff = setTimeout(() => root.classList.remove("intro-playing"), 2600);
    return () => {
      clearTimeout(tilesOff);
      clearTimeout(introOff);
      root.classList.remove("intro-playing");
    };
  }, []);

  if (!showTiles) return null;

  return (
    <div className="page-loader" aria-hidden="true">
      <div className="page-loader__panel" />
      <div className="page-loader__panel" />
      <div className="page-loader__panel" />
    </div>
  );
}
