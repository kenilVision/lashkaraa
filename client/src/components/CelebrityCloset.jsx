"use client";
import React, { useEffect, useState } from 'react'
import SectionHeader from './common/SectionHeader';
import { celebrityClosets } from '@/constant/constant';
import Button from './common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchcelebCloset } from '../store/slice/celebClosetSlice';
import { useRouter } from 'next/navigation';

const CelebrityCloset = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(5);
    const router = useRouter();

    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.celebCloset);
    useEffect(() => {

        dispatch(fetchcelebCloset());

    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setItemsToShow(2);
            } else if (window.innerWidth < 992) {
                setItemsToShow(2);
            } else if (window.innerWidth < 1024) {
                setItemsToShow(3);
            } else {
                setItemsToShow(5);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => {
            const maxIndex = (celebrityClosets?.length ?? 0) - itemsToShow;
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

    return (
        <div className='bg-primary py-8 mt-8'>
            <SectionHeader
                prevSlide={prevSlide}
                nextSlide={nextSlide}
                title={"Celebrity Closet"}
                color="#e2b66a"
                iconColor="#e2b66a"
            />
            <div className="relative overflow-hidden overflow-x-auto scrollbar-hidden ps-2">
                <div
                    className="flex transition-transform duration-300 ease-in-out xl:pr-11 pl-1 lg:pr-9 pr-3"
                    style={{
                        width: `${celebrityClosets.length * (100 / itemsToShow)}%`,
                        transform: `translateX(-${currentIndex * (100 / celebrityClosets.length)}%)`,
                    }}
                >
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 px-1 cursor-pointer"
                            style={{ width: `${100 / celebrityClosets.length}%` }}
                        >
                            <div className="overflow-hidden flex flex-col">
                                <div className="relative aspect-[1/1]">
                                    <img src={`http://localhost:5050/product/${item.celebimg}`} alt={item.name} className="w-full h-auto" />
                                </div>

                                <div className="py-2">
                                    <h3 className="text-[12px] font-semibold uppercase text-secondry hover:underline">
                                        {item.name}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className='flex justify-center items-center mt-6'>
                <Button
                    className='bg-secondry text-primary border-secondry uppercase hover:border hover:border-primary !rounded !px-7 text-[13px] py-3 transition duration-300'
                    onClick={() => {
                        router.push(`/collection/celebrity-closet`);
                    }}

                >Shop All</Button>
            </div> */}
            <div className='flex justify-center items-center md:mt-9 mt-7'
                onClick={() => {
                    router.push(`/collection/celebrity-closet`);
                }}
            >
                <Button className='bg-secondry text-primary border-secondry uppercase hover:border hover:border-primary !rounded !px-7 text-[13px] py-[0.625rem] tracking-[0.8px] transition duration-300'>Shop All</Button>
            </div>
        </div>
    );
};

export default CelebrityCloset;
