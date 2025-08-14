"use client";

import { useEffect } from "react";

export function TempoInit() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_TEMPO) {
      // TempoDevtools removed - add back if needed
      console.log("Tempo dev tools disabled");
    }
  }, []);

  return null;
}