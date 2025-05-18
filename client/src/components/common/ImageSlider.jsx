// components/ImageSlider.js
import { useState, useRef, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import { useRouter } from 'next/navigation';
const ImageSlider = ({ images , data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);
    const [visibleImages, setVisibleImages] = useState(2.5);
    const [isTablet, setIsTablet] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setVisibleImages(1.1);
                setIsTablet(false);
            } else if (width < 992) {
                setVisibleImages(1);
                setIsTablet(true);
            } else if (width < 1024) {
                setVisibleImages(2);
                setIsTablet(false);
            } else {
                setVisibleImages(2.5);
                setIsTablet(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const imageWidthPercentage = 100 / visibleImages;

    const nextSlide = () => {
        // Use Math.floor() instead of Math.ceil()
        const maxIndex = images.length - Math.floor(visibleImages);
        setCurrentIndex((prevIndex) =>
            prevIndex >= maxIndex ? prevIndex : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex <= 0 ? prevIndex : prevIndex - 1
        );
    };

    useEffect(() => {
        if (sliderRef.current) {
            const scrollPosition = (currentIndex * imageWidthPercentage) * sliderRef.current.offsetWidth / 100;
            sliderRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }, [currentIndex, imageWidthPercentage]);

    const generateSlug = (name) => {
        return name
          .toLowerCase()                    // Convert to lowercase
          .replace(/[^a-z0-9\s-]/g, '')     // Remove special characters
          .replace(/\s+/g, '-')             // Replace spaces with hyphens
          .replace(/-+/g, '-');             // Replace multiple hyphens with a single hyphen
      };
    return (
        <div className="relative w-full overflow-hidden">
            <SectionHeader
                prevSlide={prevSlide}
                nextSlide={nextSlide}
                title={'New Arrivals'}
            />

            <div className="relative">
                <div
                    ref={sliderRef}
                    className="flex scrollbar-hide overflow-x-auto snap-x snap-mandatory w-full ps-3"
                    style={{ scrollBehavior: 'smooth' }}
                >
                    {data.map((item, index) => (

                        <div
                            key={index}
                            className="flex-shrink-0 snap-start relative px-1 first:pl-[15px] last:pr-12"
                            // style={{ width: `${imageWidthPercentage}%` }}
                            onClick={() => router.push(`/collection/${generateSlug(item.name)}`)}
                        >
                            <div className="overflow-hidden h-full">
                                 <img
                                       src={`http://localhost:5050/categories/${item.image}`}
                                       alt={item.name}
                                    className="4xl:w-full w-[775px] h-full object-cover cursor-pointer transform transition-transform duration-500 ease-in-out hover:scale-110"
                                />
                            </div>
                            <p className="absolute top-1/2 left-1/2 font-seasons text-white md:text-3xl uppercase text-xl transform -translate-x-1/2 -translate-y-1/2">
                            {item.name}
                            </p>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;