'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import ImageCard from './ImageCard';
import ImageModal from './ImageModal';
import useMasonryLayout from './useMasonryLayout';
import { FEED_IMAGES } from '@/constant/constant';
import Instagram from '../icons/Instagram';
import { Play } from 'lucide-react';

const SWIPE_THRESHOLD = 50; // Minimum swipe distance in pixels

export default function ImageGallery({ images }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const galleryRef = useRef(null);
  const touchStartX = useRef(null);

  // Get masonry layout columns
  const { columns, masonryColumns } = useMasonryLayout(images);

  // Find the index of an image in the flattened array
  const findImageIndex = useCallback((imageId) => {
    return images.findIndex(img => img.id === imageId);
  }, [images]);

  // Handle opening the modal
  const handleOpenModal = useCallback((imageId) => {
    const index = findImageIndex(imageId);
    if (index !== -1) {
      setSelectedImageIndex(index);
    }
  }, [findImageIndex]);

  // Handle closing the modal
  const handleCloseModal = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  // Navigate to next image
  const handleNextImage = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) =>
      prev === null || prev >= images.length - 1 ? 0 : prev + 1
    );
  }, [selectedImageIndex, images.length]);

  // Navigate to previous image
  const handlePreviousImage = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) =>
      prev === null || prev <= 0 ? images.length - 1 : prev - 1
    );
  }, [selectedImageIndex, images.length]);

  // Handle touch events for swiping on mobile
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;

    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) {
        // Swiped right - previous image
        handlePreviousImage();
      } else {
        // Swiped left - next image
        handleNextImage();
      }
    }

    touchStartX.current = null;
  }, [handleNextImage, handlePreviousImage]);

  // Reset selected image when images array changes
  useEffect(() => {
    setSelectedImageIndex(null);
  }, [images]);

  return (
    <div
      className="w-full"
      ref={galleryRef}
      aria-label="Image gallery"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      data-testid="image-gallery"
    >
      {/* Masonry grid */}
      <div
        className="flex ps-4 mb-4"
      >
        {/* <div 
        className="flex"
        style={{ '--columns': columns }}
      >
        {masonryColumns.map((column, colIndex) => (
          <div 
            key={`column-${colIndex}`} 
            className="flex flex-col flex-1"
          >
            {column.map((image) => {
              const flatIndex = findImageIndex(image.id);
              return (
                <ImageCard
                  key={image.id}
                  image={image}
                  index={flatIndex}
                  onClick={() => handleOpenModal(image.id)}
                />
              );
            })}
          </div>
        ))}
      </div> */}
        {/* Large Screen */}
        <div className='xl:grid hidden w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6'>
          {
            FEED_IMAGES?.map((item) => {
              return (
                <div key={item.id} onClick={() => handleOpenModal(item.id)} className='xl:h-[319px] lg:h-[204px] relative group cursor-pointer'>
                  <img
                    src={item?.src}
                    alt={item.caption}
                    className='w-full h-full object-cover'
                  />
                  {/* Overlay */}
                  <div className='absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-50 transition-opacity duration-300'></div>
                  <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    {
                      item?.icon === "instagram" ?
                        <Instagram size={20} color='#fff' />
                        :
                        <Play size={20} color='#fff' />
                    }
                  </div>
                </div>
              )
            })
          }
        </div>

        {/* Laptop Screen */}
        <div className='lg:grid xl:hidden hidden w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6'>
          {
            FEED_IMAGES?.slice(0, 10).map((item) => {
              return (
                <div key={item.id} onClick={() => handleOpenModal(item.id)} className='xl:h-[319px] lg:h-[204px] relative group cursor-pointer'>
                  <img
                    src={item?.src}
                    alt={item.caption}
                    className='w-full h-full object-cover'
                  />
                  {/* Overlay */}
                  <div className='absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-50 transition-opacity duration-300'></div>
                  <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    {
                      item?.icon === "instagram" ?
                        <Instagram size={20} color='#fff' />
                        :
                        <Play />
                    }
                  </div>
                </div>
              )
            })
          }
        </div>

        {/* Tablet Screen */}
        <div className='md:grid lg:hidden hidden w-full grid-cols-2 md:grid-cols-4'>
          {
            FEED_IMAGES?.slice(0, 8).map((item) => {
              return (
                <div key={item.id} onClick={() => handleOpenModal(item.id)} className='h-[192px] relative group cursor-pointer'>
                  <img
                    src={item?.src}
                    alt={item.caption}
                    className='w-full h-full object-cover'
                  />
                  {/* Overlay */}
                  <div className='absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-50 transition-opacity duration-300'></div>
                  <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    {
                      item?.icon === "instagram" ?
                        <Instagram size={20} color='#fff' />
                        :
                        <Play />
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
        {/* Mobile Screen */}
        <div className='grid md:hidden w-full grid-cols-2'>
          {
            FEED_IMAGES?.slice(0, 4).map((item) => {
              return (
                <div key={item.id} onClick={() => handleOpenModal(item.id)} className='h-[213px] relative group cursor-pointer'>
                  <img
                    src={item?.src}
                    alt={item.caption}
                    className='w-full h-full object-cover'
                  />
                  {/* Overlay */}
                  <div className='absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-50 transition-opacity duration-300'></div>
                  <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <item.icon size={20} color='#fff' /> {
                      item?.icon === "instagram" ?
                        <Instagram size={20} color='#fff' />
                        :
                        <Play size={20} color='#fff' />
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

      {/* Modal for viewing full image */}
      <ImageModal
        image={selectedImageIndex !== null ? images[selectedImageIndex] : null}
        isOpen={selectedImageIndex !== null}
        onClose={handleCloseModal}
        onNext={handleNextImage}
        onPrevious={handlePreviousImage}
      />
    </div >
  );
}