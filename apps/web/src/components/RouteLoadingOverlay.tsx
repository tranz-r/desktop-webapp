"use client";

import React from "react";
import Spinner from "@/components/ui/spinner";
import { Card, CardContent } from "@/components/ui/card";
import { usePathname } from "next/navigation";

export default function RouteLoadingOverlay() {
  const pathname = usePathname();
  const [visible, setVisible] = React.useState(false);
  const fallbackTimerRef = React.useRef<number | null>(null);

  // Only show for real route transitions: intercept History API and popstate
  React.useEffect(() => {
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    const startFallback = () => {
      if (fallbackTimerRef.current) window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = window.setTimeout(() => setVisible(false), 3000);
    };

    const shouldShowFor = (url: string | URL | null | undefined): boolean => {
      if (!url) return false;
      try {
        const next = new URL(String(url), window.location.href);
        return next.origin === window.location.origin && next.pathname !== window.location.pathname;
      } catch {
        return false;
      }
    };

    history.pushState = function (this: History, ...args: any[]) {
      try {
        const url = args[2];
        if (shouldShowFor(url)) {
          setVisible(true);
          startFallback();
        }
      } catch {}
      return originalPushState.apply(this, args as any);
    } as any;

    history.replaceState = function (this: History, ...args: any[]) {
      try {
        const url = args[2];
        if (shouldShowFor(url)) {
          setVisible(true);
          startFallback();
        }
      } catch {}
      return originalReplaceState.apply(this, args as any);
    } as any;

    const onPopState = () => {
      setVisible(true);
      startFallback();
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  // Hide when pathname updates (route is ready)
  React.useEffect(() => {
    if (!visible) return;
    if (fallbackTimerRef.current) window.clearTimeout(fallbackTimerRef.current);
    setVisible(false);
  }, [pathname, visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/70 backdrop-blur-sm">
      <Card className="shadow-sm">
        <CardContent className="p-6 flex flex-col items-center gap-3">
          <Spinner size="lg" />
          <div className="text-sm text-muted-foreground">Loading…</div>
        </CardContent>
      </Card>
    </div>
  );
}


