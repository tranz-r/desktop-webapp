"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type SpinnerSize = "sm" | "md" | "lg";

export function Spinner({ className, size = "md" }: { className?: string; size?: SpinnerSize }) {
  const sizeClasses = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-10 w-10" : "h-6 w-6";
  return <Loader2 className={cn("animate-spin text-primary", sizeClasses, className)} />;
}

export default Spinner;


