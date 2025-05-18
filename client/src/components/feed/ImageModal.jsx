"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageNavButton } from "./ImageNavButton";
import { Instagram } from "lucide-react";

export function ImageModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) {
  const [loaded, setLoaded] = useState(false);
  const currentImage = images[currentIndex];

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    onNavigate(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    onNavigate(newIndex);
  };

  useEffect(() => {
    setLoaded(false);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
        case "Escape":
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  if (!currentImage || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="relative h-full w-full flex flex-col md:flex-row bg-black/95 overflow-hidden">
        {/* Image section */}
        <div className="relative flex-1 flex items-center justify-center min-h-[50vh] bg-white">
          <div className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              className="object-contain max-h-[80vh]"
              width={1200}
              height={800}
              onLoad={() => setLoaded(true)}
            />
          </div>
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
            </div>
          )}
        </div>

        {/* Info section */}
        <div className="w-full md:w-80 lg:w-96 p-6 flex flex-col bg-white dark:bg-gray-900 overflow-y-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-gray-900 dark:bg-gray-100 flex items-center justify-center text-white dark:text-gray-900">
              <Instagram className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">lashkaraa</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Original</p>
            </div>
          </div>

          <p className="text-sm mb-4">{currentImage.caption}</p>

          {currentImage.tags && (
            <div className="flex flex-wrap gap-2 mb-4">
              {currentImage.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs py-1 px-2 bg-gray-100 dark:bg-gray-800 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto text-xs text-gray-500 dark:text-gray-400">
            Posted on May 5
          </div>
        </div>

        {/* Navigation */}
        <ImageNavButton
          direction="left"
          onClick={handlePrevious}
          className="hidden md:flex"
        />
        <ImageNavButton
          direction="right"
          onClick={handleNext}
          className="hidden md:flex"
        />
        <ImageNavButton direction="close" onClick={onClose} />

        {/* Mobile navigation */}
        <div className="flex md:hidden justify-between w-full absolute bottom-4 left-0 px-4">
          <ImageNavButton direction="left" onClick={handlePrevious} />
          <ImageNavButton direction="right" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
}