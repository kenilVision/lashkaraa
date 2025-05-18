"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ImageNavButton({ direction, onClick, className }) {
  const getIcon = () => {
    switch (direction) {
      case "left":
        return <ChevronLeft className="h-6 w-6" />;
      case "right":
        return <ChevronRight className="h-6 w-6" />;
      case "close":
        return <X className="h-6 w-6" />;
    }
  };

  const baseClasses = "flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-black/40";
  
  const positionClasses = {
    left: "absolute left-4 top-1/2 -translate-y-1/2",
    right: "absolute right-4 top-1/2 -translate-y-1/2",
    close: "absolute right-4 top-4"
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(baseClasses, positionClasses[direction], className)}
      aria-label={`${direction} image`}
    >
      {getIcon()}
    </button>
  );
}