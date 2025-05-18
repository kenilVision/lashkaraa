import React from 'react'
import Button from './Button';
import ArrowRight from '../icons/ArrowRight';
import ArrowLeft from '../icons/ArrowLeft';

const SectionHeader = ({ prevSlide, nextSlide, title, otherDetails = null, color = "text-primary", iconColor = "#001D3D", setActiveTab = () => { }, activeTab = 'women' }) => {
    return (
        <div className='relative'>
            <div className='w-full max-w-[1500px] mx-auto flex md:justify-between justify-center items-center md:mb-[1.563rem] mb-4 lg:px-[1.875rem] px-4'>
                <div className='flex items-center md:flex-row flex-col'>
                    <h2 className={`md:text-4xl text-xl md:px-0 mb-0 font-seasons font-light text-[${iconColor === '#001D3D' ? '#001D3D' : iconColor}]`}>{title}</h2>
                    {
                        otherDetails &&
                        <div className='flex items-center ml-[2.125rem] md:pt-0 pt-5'>
                            <Button
                                onClick={() => setActiveTab('women')}
                                className={`font-futura font-bold !p-0 border-0 !pr-[0.625rem] ${activeTab === 'women' ? 'underline text-primary' : 'text-primary opacity-40'} uppercase  text-[12px]  hover:opacity-100 hover:underline`}>
                                {otherDetails?.women}
                            </Button>
                            <Button
                                onClick={() => setActiveTab('men')}
                                className={`font-futura font-bold !p-0 border-0 !px-[0.625rem] ${activeTab === 'men' ? 'underline text-primary' : 'text-primary opacity-40'} text-[12px] uppercase hover:opacity-100 hover:underline`}>{otherDetails?.men}</Button>
                        </div>
                    }
                </div>
                {/* Navigation Arrows */}
                <div className='absolute md:right-30 md:block hidden right-0'>
                    <Button className={'border-0 !px-4'} onClick={prevSlide}>
                        <ArrowLeft color={iconColor} />
                    </Button>
                    <Button className={'border-0 !px-4'} onClick={nextSlide}>
                        <ArrowRight color={iconColor} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SectionHeader;
