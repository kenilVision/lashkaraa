import { asSeenInLogos } from '@/constant/constant';
import React from 'react'

const AsSeenIn = () => {
    return (
        <section className="w-full bg-white md:py-6 py-4">
            <h2 className="text-primary md:text-4xl text-xl font-seasons text-center">
                As Seen In
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 gap-2 pt-6'>
                {asSeenInLogos.map((logo) => (
                    <div key={logo.id} className='flex justify-center items-center cursor-pointer'>
                        <div className='2xl:w-[316px] 2xl:h-[144px] xl:w-[237px] xl:h-[108px] md:w-[167px] md:h-[76px] w-[98px] h-[44px]'>
                            <img
                                src={logo.url}
                                alt='Company Logos'
                                className='w-full h-full'
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AsSeenIn;
