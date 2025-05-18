"use client";

import { useState } from "react";
import { FeedImage } from "./FeedImage";
import { ImageModal } from "./ImageModal";
import { FEED_IMAGES } from "@/constant/constant";

export function FeedGallery({ images = FEED_IMAGES, className }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
  const isModalOpen = selectedImageIndex !== -1;

  const handleOpenModal = (index) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(-1);
  };

  const handleNavigate = (newIndex) => {
    setSelectedImageIndex(newIndex);
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <FeedImage
            key={image.id}
            image={image}
            onClick={() => handleOpenModal(index)}
          />
        ))}
      </div>

      {isModalOpen && (
        <ImageModal
          images={images}
          currentIndex={selectedImageIndex}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}