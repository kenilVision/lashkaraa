"use client";
import React from 'react'
import Button from './common/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Jhalak = () => {
    const router = useRouter();
        
    return (
        <section className="w-full flex justify-center bg-[#f3efec]">
            <div className="flex w-full md:flex-row flex-col max-w-[1500px] md:px-[3.125rem] px-[15px] py-[4rem]">
                <div className="w-full xl:max-w-[461px] lg:max-w-[300px] md:max-w-[218px] pr-[4.5rem] md:order-1 order-2 md:pt-0 pt-6">
                    <h2 className="text-[#001d3d] md:text-3xl text-xl tracking-[0] font-seasons font-medium">
                        Jhalak
                    </h2>
                    <p className="md:mt-8 mt-6 text-[#001d3db2] text-[1.125rem] tracking-[0.2px] leading-8">
                        Fom dusk till dawn, let our summer prints redefine your seasonal
                        style.
                    </p>
                    <Button 
                    className="md:mt-8 mt-7 text-secondry text-sm border-primary px-8 py-3 bg-primary !rounded"
                    onClick={() => {
                        router.push(`/collection/jhalak`);
                      }}
                      
                    >
                        SHOP NOW
                    </Button>
                </div>
                <div className="w-full max-w-[939px] md:order-2 order-1">
                    <Image
                        src={"https://www.lashkaraa.in/cdn/shop/files/1_ee5e9875-d4ca-42fe-a4fd-5a1f47b9c299_1.jpg?v=1726117172&width=1500"}
                        alt='Jhalal Image'
                        width={939}
                        height={540}
                    />
                </div>
            </div>
        </section>
    );
};

export default Jhalak;
