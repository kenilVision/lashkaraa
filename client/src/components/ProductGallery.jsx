'use client';

import React, { useState, useRef , useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode } from 'swiper/modules';
import { ChevronUp, ChevronDown, Play } from 'lucide-react';
import InnerImageZoom from 'react-inner-image-zoom';
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import "inner-image-zoom/lib/styles.min.css";




const ProductGallery = ({ media }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const mainSwiperRef = useRef(null);
  const thumbsSwiperRef = useRef(null);
  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth >= 1024); // lg breakpoint
    };

    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleScrollUp = () => {
    if (thumbsSwiper) {
      thumbsSwiper.slidePrev();
    }
  };

  const handleScrollDown = () => {
    if (thumbsSwiper) {
      thumbsSwiper.slideNext();
    }
  };
  return (
    <div className="lg:flex lg:flex-row-reverse gap-4 mx-auto">
      
      <div className="w-full lg:w-[80%]">
        <Swiper
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Thumbs]}
          className="rounded-lg"
          ref={mainSwiperRef}
        >
          {media.map((item, index) => (
            <SwiperSlide key={item._id}>
              <div className="flex items-center justify-center" >
                {item.type === 'video' ? (
                  <video
                    loop
                    autoPlay
                    muted
                    playsInline
                    className="max-h-full max-w-full object-contain"
                    src={`http://localhost:5050/product/${item.url}`}
                  />
                ) : (
                   
                    <>
                    {/* Zoom effect only for screens larger than md */}
                    <div className="hidden md:block">
                      <InnerImageZoom
                        src={`http://localhost:5050/product/${item.url}`}
                        zoomSrc={`http://localhost:5050/product/${item.url}`}
                        zoomType="hover"
                        zoomPreload={true}
                        className="max-h-full max-w-full"
                        imgAttributes={{
                          alt: `Product image ${index + 1}`,
                          className: "object-contain max-h-full max-w-full"
                        }}
                        zoomScale={1.5}
                        hasSpacer={true}
                      />
                    </div>
          
                    {/* Normal image for screens smaller than md */}
                    <div className="md:hidden">
                      <img
                        src={`http://localhost:5050/product/${item.url}`}
                        alt={`Product image ${index + 1}`}
                        className="object-contain max-h-full max-w-full"
                      />
                    </div>
                  </>
                  
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnail Swiper with scroll icons */}
      <div className="hidden md:flex flex-col items-center lg:w-[20%]">
        {/* Scroll Up Arrow - now clickable */}
        <button 
          onClick={handleScrollUp}
          className="mb-2 text-gray-400 hover:text-gray-600"
          aria-label="Scroll thumbnails up"
        >
          <ChevronUp className="w-5 h-5" />
        </button>

        {/* Thumbnails */}
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={5}
          direction={isVertical ? 'vertical' : 'horizontal'}
          freeMode={true}
          modules={[Thumbs, FreeMode]}
          className=" w-[350px] lg:w-auto lg:h-[600px]"
        >
          {media.map((item, index) => (
            <SwiperSlide key={item._id}>
              <div 
                className=" overflow-hidden rounded-md border border-gray-200 cursor-pointer hover:border-gray-400 transition-colors"
                onClick={() => mainSwiperRef.current?.slideTo(index)}
              >
                {item.type === 'video' ? (
                  <div className="relative w-full h-full">
                    <video
                        loop
                      src={`http://localhost:5050/product/${item.url}`}
                      alt={`Video thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                  </div>
                ) : (
                  <img
                    src={`http://localhost:5050/product/${item.url}`}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Scroll Down Arrow - now clickable */}
        <button 
          onClick={handleScrollDown}
          className="mt-2 text-gray-400 hover:text-gray-600"
          aria-label="Scroll thumbnails down"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ProductGallery;