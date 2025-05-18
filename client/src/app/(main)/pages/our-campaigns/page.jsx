import Link from 'next/link';
import React from 'react';

const data = [
    {
        image: "https://www.lashkaraa.in/cdn/shop/files/LS_1046.webp?v=1743788734&width=550",
        name: "Raza",
        slug: 'raza'
    },
    {
        image: "https://www.lashkaraa.in/cdn/shop/files/LB0966_copy.webp?v=1743788688&width=550",
        name: "Qila",
        slug: 'qila'
    },
    {
        image: "https://www.lashkaraa.in/cdn/shop/files/LB2307.webp?v=1734853515&width=550",
        name: "Irina",
        slug: 'irina'
    },
    {
        image: "https://www.lashkaraa.in/cdn/shop/files/Velvet_October_Shoot__LB3484_copy.webp?v=1734853483&width=550",
        name: "Ilume",
        slug: 'ilume'
    },
    {
        image: "https://www.lashkaraa.in/cdn/shop/files/LB1655.webp?v=1734853462&width=550",
        name: "Noor",
        slug: 'noor'
    },
    {
        image: "https://www.lashkaraa.in/cdn/shop/files/DS1753_d4f7f75d-53f5-4a20-89f3-3289eca06d9e.webp?v=1734853433&width=550",
        name: "Khwaab",
        slug: 'khwaab'
    },
]

const OurCampaigns = () => {
    return (
        <div className='w-full max-w-[1500px] mx-auto md:px-[50px] px-8 py-9'>
            <h2 className='md:text-4xl text-xl md:text-left text-center md:mb-0 mb-3 font-seasons text-primary'>Our Campaigns</h2>

            <div className='grid lg:grid-cols-3 grid-cols-2 md:gap-2 gap-1 pt-2'>
                {
                    data?.map((item, index) => (
                        <div key={index} className='mb-14 cursor-pointer'>
                            <Link href={`/collection/${item?.slug}`}>
                                <img src={item.image} alt={item.name} />
                                <h2 className='md:text-[30px] text-[17px] font-seasons text-primary pt-1'>{item.name}</h2>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default OurCampaigns;
