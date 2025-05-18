"use client";

import { useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';

const bannerMap = {
    contact: '/assets/contact.webp',
    'shipping-information': '/assets/page-banner-about_.webp',
    'returns-policy': '/assets/page-banner-about_.webp',
    faq: '/assets/faq.webp',
    'size-chart': '/assets/sizing.webp',
    'company-info': '/assets/about.webp',
    'privacy-policy': '/assets/page-banner-about_.webp',
    'site-disclaimer': '/assets/page-banner-about_.webp',
}

const Banner = () => {
    const segment = useSelectedLayoutSegment();
    const banner = bannerMap[segment];

    if (!banner) return null;

    return (
        <div className="flex justify-center items-center w-full cursor-pointer">
            <img src={banner} alt="banner" className="object-cover object-center w-full" />
        </div>
    )
}

export default Banner;
