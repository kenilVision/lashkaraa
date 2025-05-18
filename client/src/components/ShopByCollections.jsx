"use client";

import React, { useEffect, useState } from 'react';
import SectionHeader from './common/SectionHeader';
import { useRouter } from 'next/navigation';
import {  useSelector } from 'react-redux';

const getShopItemsFromCategories = (categories) => {
    const result = [];

    result.push({
        name: "Shop All",
        image: "https://www.lashkaraa.in/cdn/shop/files/Rectangle_12.jpg?v=1726119367&width=550", 
        isShopOverlayAll: true,
    });
    categories.forEach((category) => {
        
        if (category.subcategories && category.subcategories.length > 0) {
            let count = 0;
            for (const sub of category.subcategories) {
                if (!sub.image) continue;            
                result.push({
                    name: sub.name,
                    image: `http://localhost:5050/categories/${sub.image}`,
                    isShopOverlayAll: false,
                });
                count++;
                if (count === 7) break;             
            }
        }else {
            
            result.push({
                name: category.name,
                image: `http://localhost:5050/categories/${category.image}`,
                isShopOverlayAll: false,
            });
        }
    });

    return result;
};

const ShopByCollections = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(6); // Default for laptop
     const { categories, loading } = useSelector((state) => state.category);
    const router = useRouter();


    // Handle responsive items to show
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) { // Mobile
                setItemsToShow(2);
            } else if (window.innerWidth < 992) { // Tablet
                setItemsToShow(2);
            } else if (window.innerWidth < 1200) { // Small laptop
                setItemsToShow(6);
            }
            else if (window.innerWidth < 1500) { // Small laptop
                setItemsToShow(6);
            }
            else { // Laptop and larger
                setItemsToShow(6);
            }
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => {
            const maxIndex = (shopItems?.length ?? 0) - itemsToShow;
            
            if (prevIndex >= maxIndex) return prevIndex;
            return prevIndex + 1;
        });
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => {
            
            if (prevIndex <= 0) return 0;
            return prevIndex - 1;
        });
    };


        
    if (loading) {
        return (
          <div className="text-center">
            <div className="loader">Loading...</div> 
          </div>
        );
      }

      const shopItems = getShopItemsFromCategories(categories || []);

      const generateSlug = (name) => {
        return name
          .toLowerCase()                    
          .replace(/[^a-z0-9\s-]/g, '')     
          .replace(/\s+/g, '-')             
          .replace(/-+/g, '-');             
      };

    return (
        <div className='lg:pt-14 pt-8'>
            <SectionHeader
                prevSlide={prevSlide}
                nextSlide={nextSlide}
                    title={'Shop By Collections'}
                />
            <div className="relative overflow-hidden scrollbar-hide overflow-x-auto">
                <div
                    className="flex transition-transform duration-300 ease-in-out pr-12"
                    style={{
                        width: `${shopItems.length * (100 / itemsToShow)}%`,
                        transform: `translateX(-${currentIndex * (100 / shopItems.length)}%)`,
                    }}
                >
                    {shopItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 px-1 first:pl-3 cursor-pointer"
                            style={{ width: `${100 / shopItems.length}%` }}
                            onClick={() => {
                                const slug = item.name === 'Shop All' ? 'ready-to-ship' : generateSlug(item.name);
                                router.push(`/collection/${slug}`);
                              }}
                              
                        >
                            <div className="overflow-hidden flex flex-col">
                                <div className="relative 2xl:h-[19.5rem] 2xl:w-[19.5rem] xl:h-[14.5rem] xl:w-[14.5rem] lg:h-[10.125rem] lg:w-[10.125rem] md:h-[22.75rem] md:w-[22.75rem] h-[12.25rem] w-[12.25rem]">
                                    <img src={item.image} alt={item.name} className="w-full h-full" />
                                    {item?.isShopOverlayAll && <span className='absolute uppercase text-[13px] top-1/2 left-1/2 z-30 text-secondry  transform -translate-x-1/2 -translate-y-1/2'>{item.name}</span>}
                                </div>
                                {
                                    !item?.isShopOverlayAll &&
                                    <div className="p-2 sm:p-3">
                                        <h3 className="text-center text-[12px] uppercase font-bold text-primary hover:underline">
                                            {item.name}
                                        </h3>
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShopByCollections;
