"use client";

import React, { useEffect, useState } from 'react'
import Button from './common/Button';
import { Heart } from 'lucide-react';
import { items } from '@/constant/constant';
import SectionHeader from './common/SectionHeader';
import Thunder from './icons/Thunder';
import { useDispatch, useSelector } from 'react-redux';
import { fetchdata } from '../store/slice/readyToShipSlice';
import { useRouter } from 'next/navigation';

const ReadyToShipStyles = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('women');
    const [itemsToShow, setItemsToShow] = useState(5); // Default for laptop
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.readyToShip);
    const router = useRouter();
    useEffect(() => {
        if (!data[activeTab] || data[activeTab].length === 0) {
          dispatch(fetchdata(activeTab));

        }
      }, [activeTab, data, dispatch]);
    // Handle responsive items to show
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) { // Mobile
                setItemsToShow(2);
            } else if (window.innerWidth < 992) { // Tablet
                setItemsToShow(2);
            } else if (window.innerWidth < 1024) { // Small laptop
                setItemsToShow(3);
            } else { // Laptop and larger
                setItemsToShow(5);
            }
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // const nextSlide = () => {
    //     setCurrentIndex((prevIndex) => {
    //         if (prevIndex >= items[activeTab]?.length - itemsToShow) return 0;
    //         return prevIndex + 1;
    //     });
    // };

    // const prevSlide = () => {
    //     setCurrentIndex((prevIndex) => {
    //         if (prevIndex === 0) return items[activeTab]?.length - itemsToShow;
    //         return prevIndex - 1;
    //     });
    // };
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => {
            const maxIndex = (items[activeTab]?.length ?? 0) - itemsToShow;
            // if we're already at (or beyond) the last possible starting index, stay put
            if (prevIndex >= maxIndex) return prevIndex;
            return prevIndex + 1;
        });
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => {
            // if we're already at the first slide, stay put
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

    return (
        <div className='bg-[#F3F0ED] py-8'>
            <SectionHeader
                prevSlide={prevSlide}
                nextSlide={nextSlide}
                title={'Ready To Ship Styles'}
                otherDetails={{ women: 'Women', men: 'Men' }}
                setActiveTab={setActiveTab}
                activeTab={activeTab}
            />
            <div className="relative scrollbar-hide overflow-x-auto">
                <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{
                        width: `${items[activeTab].length * (100 / itemsToShow)}%`,
                        transform: `translateX(-${currentIndex * (100 / items[activeTab]?.length)}%)`,
                    }}
                >
                    {data[activeTab]?.map((item, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 px-1 first:pl-3 sm:px-1 cursor-pointer"
                            style={{ width: `${100 / items[activeTab]?.length}%` }}
                            onClick={() => router.push(`/product/${item.slug}`)}
                        >
                        <div className="scrollbar-hide overflow-x-auto flex flex-col group">    
                                <div className="relative scrollbar-hide overflow-x-auto">
                                    {/* <img src={item.image} alt={item.name} className="w-full h-auto" /> */}
                                    {/* Default image */}
                                    <img
                                        src={`http://localhost:5050/product/${item.media[0].url}`}
                                        alt={item.name}
                                        className="w-full h-auto duration-300 group-hover:opacity-0 transform transition-transform group-hover:scale-105"
                                    />

     
                                    <img
                                         src={`http://localhost:5050/product/${item.media[1].url}`}
                                        alt={item.name}
                                        className="w-full h-auto absolute top-0 left-0 opacity-0 duration-300 transform transition-transform group-hover:opacity-100 group-hover:scale-105"
                                    />
                                    {
                                        activeTab !== 'men' &&
                                        <span className='absolute top-0 left-0 bg-primary items-center text-[0.75rem] text-[#E2B66A] px-1 flex'>
                                            <Thunder /> Ready to ship</span>
                                    }
                                    <span className='bg-white rounded-full p-2 absolute top-2 right-2'><Heart size={16} /></span>
                                </div>

                                <div className="pt-3">
                                    <h3 className="text-xs group-hover:underline sm:text-sm md:text-[13px] font-light text-[#001D3D]">
                                        {item.name}
                                    </h3>
                                    <p className="text-xs text-[#001D3D] font-semibold mt-2">Rs. {item.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex justify-center items-center mt-5'>
                <Button 
                className='bg-primary text-secondry border-primary uppercase text-sm py-3 !rounded !px-7 hover:bg-white hover:border-secondry transition duration-300'
                onClick={() => router.push(`/collection/ready-to-ship`)}
                >Shop All</Button>
            </div>
        </div>
    );
};

export default ReadyToShipStyles;
