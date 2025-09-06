"use client";

import React from "react";
import Spinner from "@/components/ui/spinner";
import { Card, CardContent } from "@/components/ui/card";
import { usePathname } from "next/navigation";

export default function RouteLoadingOverlay() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentPath, setCurrentPath] = React.useState(pathname);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Show loading when pathname changes
  React.useEffect(() => {
    if (currentPath !== pathname) {
      setIsLoading(true);
      setCurrentPath(pathname);
      
      // Hide loading after a short delay
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, [pathname, currentPath]);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/70 backdrop-blur-sm"
      style={{ 
        scrollBehavior: 'auto',
        pointerEvents: 'none'
      }}
    >
      <Card 
        className="shadow-sm"
        style={{ pointerEvents: 'auto' }}
      >
        <CardContent className="p-6 flex flex-col items-center gap-3">
          <Spinner size="lg" />
          <div className="text-sm text-muted-foreground">Loading…</div>
        </CardContent>
      </Card>
    </div>
  );
}