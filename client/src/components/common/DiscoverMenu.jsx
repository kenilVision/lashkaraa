import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const DiscoverMenu = ({ setIsHoveredDiscover }) => {
    const menus = [
        {
            name: "DISCOVER",
            path: "/"
        },
        {
            name: "NEW ARRIVALS",
            path: "/"
        },
        {
            name: "READY TO SHIP",
            path: "/"
        },
        {
            name: "BEST SELLERS",
            path: "/"
        },
        {
            name: "SALE",
            path: "/"
        },
    ]

    const images = [
        {
            image: "https://www.lashkaraa.in/cdn/shop/files/d1_346x.jpg?v=1726146399",
            name: "About Us",
            path: '/'
        },
        {
            image: "https://www.lashkaraa.in/cdn/shop/files/d2_7edae778-436f-47e8-8413-cc87b20f2122_346x.png?v=1726146401",
            name: "Lookbooks",
            path: '/pages/our-campaigns'
        },
        {
            image: "https://www.lashkaraa.in/cdn/shop/files/d2_7edae778-436f-47e8-8413-cc87b20f2122_346x.png?v=1726146401",
            name: "Celebrity Closet",
            path: '/'
        }
    ];

    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    };
    return (
        <div className="absolute top-[50px] left-0 w-screen bg-white shadow-lg z-30">
            <div className="w-full max-w-[1500px] mx-auto py-8 ps-6 pe-12">
                <div className='flex'>
                    <ul className='w-full max-w-[200px] ml-8'>
                        {
                            menus?.map((item, index) => {
                                return (
                                    <li key={index} className='pb-2'>
                                        <Link href={item.name === 'DISCOVER'
                                            ? '#'
                                            : `/collection/${generateSlug(item.name)}`} className='text-slate-700 font-bold text-[13px]'>{item?.name}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className='grid grid-cols-3 gap-2'>
                        {
                            images?.map((item, index) => (
                                <div key={index} className='relative cursor-pointer'>
                                    <Link href={item.path} onClick={() => setIsHoveredDiscover(false)}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={400}
                                            height={288}
                                        />
                                        <p className='absolute top-1/2 left-1/2 text-2xl transform uppercase -translate-x-1/2 -translate-y-1/2 text-white'>{item?.name}</p>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiscoverMenu