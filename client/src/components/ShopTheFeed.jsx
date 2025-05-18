import React from 'react'
import { FeedGallery } from './feed/FeedGallery';
import { FEED_IMAGES } from '@/constant/constant';
import Image from 'next/image';
import { Instagram } from 'lucide-react';
// import Feed from './common/Feed';

const ShopTheFeed = () => {
    const items = [
        {
            title: "Isshkaraa",
            designer: "The Sky Blue Multicolor Floral Embroidered Lehenga",
            description: "Captures movement through tonal embroidery and floral motifs. This piece blends softness with vivid surface detailing.",
            hashtags: ["Isshkaraa", "DesiFashion", "IndianDesigner", "EmbroideredLehenga"],
            categories: ["Designer Wear", "Exquisite Craftmanship", "Ethnic Wear", "Indian Fashion"]
        },
        {
            title: "Isshkaraa",
            designer: "The Sky Blue Multicolor Floral Embroidered Lehenga",
            description: "Captures movement through tonal embroidery and floral motifs. This piece blends softness with vivid surface detailing.",
            hashtags: ["Isshkaraa", "DesiFashion", "IndianDesigner", "EmbroideredLehenga"],
            categories: ["Designer Wear", "Exquisite Craftmanship", "Ethnic Wear", "Indian Fashion"]
        },
    ];
    return (
        <div className='bg-[#F3F0ED] overflow-hidden'>
            <h2 className='text-4xl mx-4 p-8 font-seasons'> Shop The Feed</h2>
            
        </div>
    );
};

export default ShopTheFeed;
// div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
//                 {
//                     FEED_IMAGES?.map((item) => {
//                         return (
//                             <div key={item.id} className='h-[319px] relative group cursor-pointer'>
//                                 <img
//                                     src={item?.src}
//                                     alt={item.caption}
//                                     className='w-full h-full object-cover'
//                                 />
//                                 {/* Overlay */}
//                                 <div className='absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-50 transition-opacity duration-300'></div>
//                                 <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
//                                     <item.icon size={20} color='#fff' />
//                                 </div>
//                             </div>
//                         )
//                     })
//                 }
//             </div>