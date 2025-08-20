"use client";

import React from "react";
import Spinner from "@/components/ui/spinner";

export default function GlobalRouteLoading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/70 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 p-6 rounded-lg border bg-background shadow-sm">
        <Spinner size="lg" />
        <div className="text-sm text-muted-foreground">Loading…</div>
      </div>
    </div>
  );
}


