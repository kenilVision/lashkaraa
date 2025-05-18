"use client";

import { useState } from "react";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

export function FeedImage({ image, onClick, className }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={cn(
        "group relative aspect-square w-full overflow-hidden rounded-md cursor-pointer",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      
      <div 
        className={cn(
          "absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300",
          isHovering && "opacity-100"
        )}
      >
        <Instagram className="w-10 h-10 text-white" />
      </div>
    </div>
  );
}