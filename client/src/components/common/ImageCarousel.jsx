'use client';
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

export default function ImageCarousel({ items }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'keepSnaps',
    slidesToScroll: 1
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative group">
      {/* Navigation Arrows */}
      <div className="absolute right-4 top-4 z-10 flex gap-2">
        <button
          onClick={scrollPrev}
          className={`p-2 bg-white rounded-full shadow-lg ${!prevBtnEnabled ? 'opacity-50 cursor-auto' : 'hover:bg-gray-50'}`}
          disabled={!prevBtnEnabled}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={scrollNext}
          className={`p-2 bg-white rounded-full shadow-lg ${!nextBtnEnabled ? 'opacity-50 cursor-auto' : 'hover:bg-gray-50'}`}
          disabled={!nextBtnEnabled}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Carousel Container */}
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex gap-4">
          {items.map((item, index) => (
            <div 
              className="embla__slide flex-[0_0_calc(20%-16px)] min-w-0" 
              key={index}
            >
              <div className="flex flex-col gap-4 p-2">
                {/* Image Container */}
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-md text-gray-700">{item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}