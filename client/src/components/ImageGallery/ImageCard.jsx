'use client';

import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function ImageCard({ image, onClick, index }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const cardRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  // Calculate aspect ratio for proper sizing
  const aspectRatio = image.width / image.height;

  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative overflow-hidden transition-all duration-300',
        'cursor-pointer',
        'outline-none'
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${image.title}`}
      data-testid={`gallery-image-${index}`}
      // style={{
      //   aspectRatio: aspectRatio,
      // }}
    >
      {/* <Image
        src={image.src}
        alt={image.title}

      // fill
      // sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
      // className={cn(
      //   'object-cover transition-opacity duration-500',
      //   isLoaded ? 'opacity-100' : 'opacity-0'
      // )}
      // onLoad={() => setIsLoaded(true)}
      // priority={index < 4} // Load first 4 images with priority
      /> */}

      <div key={image?.id} className='h-[319px] relative group cursor-pointer'>
        <img
          src={image?.src}
          alt={image?.title}
          className='w-full h-full object-cover'
        />
        {/* Overlay */}
        <div className='absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-50 transition-opacity duration-300'></div>
        <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          {/* <item.icon size={20} color='#fff' /> */}
        </div>
      </div>

      {/* Hover overlay */}
      {/* <div className={cn(
        'absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent',
        'opacity-0 group-hover:opacity-100 group-focus:opacity-100',
        'transition-opacity duration-300 flex flex-col justify-end p-4'
      )}>
        <h3 className="text-white font-medium text-lg line-clamp-2">{image.title}</h3>
        <div className="flex flex-wrap gap-1 mt-1">
          {image.category.slice(0, 2).map((cat) => (
            <span 
              key={cat} 
              className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full"
            >
              {cat}
            </span>
          ))}
          {image.category.length > 2 && (
            <span className="text-xs text-white/80">+{image.category.length - 2} more</span>
          )}
        </div>
      </div> */}

      {/* Loading skeleton */}
      {/* {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      )} */}
    </div>
  );
}