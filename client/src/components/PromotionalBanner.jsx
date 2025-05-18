"use client";

import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { promoMessages } from '@/constant/constant';
import Button from './common/Button';

const PromotionalBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % promoMessages.length);
        }, 5000); // 2000ms = 2 seconds

        return () => clearInterval(interval);
    }, []);

    const navigate = (direction) => {
        setCurrentIndex((prev) =>
            (prev + direction + promoMessages.length) % promoMessages.length
        );
    };

    return (
        <div className="w-full h-8 bg-primary fixed top-0 mb-8 z-50">
            <div className="flex items-center justify-center h-full w-full max-w-[448px] mx-auto">
                <Button
                    onClick={() => navigate(-1)}
                    className="text-[#e2b66a] border-0 !px-4 hover:text-[#e2b66a] z-10 cursor-pointer"
                >
                    <ChevronLeft size={16} className='cursor-pointer' />
                </Button>

                <div className="w-full h-8 bg-primary border-b border-[#e2b66a14] flex items-center justify-center overflow-hidden relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.1 }}
                            className="absolute w-full text-center"
                        >
                            <p className="text-secondry tracking-[0.2px] font-[400] text-[13px]">
                                {promoMessages[currentIndex]}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <Button
                    onClick={() => navigate(1)}
                    className="text-[#e2b66a] !px-4 border-0 hover:text-[#e2b66a] z-10"
                >
                    <ChevronRight size={16} />
                </Button>
            </div>
        </div>
    )
}

export default PromotionalBanner;
