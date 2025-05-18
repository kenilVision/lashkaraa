import Paragraph from '@/components/common/Paragraph';
import React from 'react'

const CompanyInfo = () => {
    return (
        <div>
            <div className='lg:px-[50px] md:px-[50px] px-[16px] py-[36px] w-full mx-auto max-w-[1500px]'>
                <div className='grid md:grid-cols-2 grid-cols-1'>
                    <div className='lg:p-20 flex flex-col justify-center md:pt-0 pt-18 items-center md:order-1 order-2'>
                        <h2 className='md:text-[52px] text-[40px] font-seasons uppercase leading-[1.2]'>Effortless Luxury. Modern Design</h2>
                        <Paragraph className="mt-8 md:mb-0 mb-12">We set up this fashion house with the aim of ensuring that women living outside India had access to modern, ethnic fashion. We draw on our artisanal heritage and deep-rooted ethnic fashion—the sharara and the gharara, the salwar and the churidaar, the kurta and the sherwani—and translate them into forward-thinking style statements. Our lighter, brighter floral prints, which are both minimal and sophisticated, or our heavily embellished kurtas and shararas - embody the spirit of the modern woman who believes in effortless chic with a gentle touch of tradition. At Lashkaraa, the marriage of heritage and contemporary style compels us to redefine ethnic wear.</Paragraph>
                    </div>
                    <div className='md:order-2 order-1'>
                        <img src="https://www.lashkaraa.in/cdn/shop/files/Laskara_10-09-230231.webp?v=1726191449&width=750" alt="Effortless Luxury. Modern Design" className='w-full h-auto' />
                    </div>
                </div>
                <div className='grid md:grid-cols-2 grid-cols-1 pt-10'>
                    <div>
                        <img src="https://www.lashkaraa.in/cdn/shop/files/Laskara_10-09-238662.webp?v=1726191464&width=750" alt="Effortless Luxury. Modern Design" className='w-full h-auto' />
                    </div>
                    <div className='lg:p-20 flex flex-col justify-center items-center md:mt-0 mt-14'>
                        <h2 className='md:text-[52px] text-[40px] font-seasons uppercase leading-[1.2]'>Lashkaraa is about heritage and beauty</h2>
                        <Paragraph className="mt-8">We’re about fashion that is timeless, but rooted in contemporary style. From minimal & sophisticated to heavily embellished, our clothes embody the spirit of the modern indian woman - effortlessly chic, with a touch of tradition.</Paragraph>
                    </div>
                </div>
            </div>
            <div className='w-full bg-white mt-10 md:p-12 p-8'>
                <div className='max-w-[720px] mx-auto'>
                    <h2 className='text-primary font-seasons uppercase text-center md:text-[40px] text-[30px] leading-[1.2]'>Take the sparkle of India with you wherever you go alongside us on this journey…</h2>
                </div>
            </div>
            <div className="flex justify-center items-center w-full cursor-pointer">
                <img src={"https://www.lashkaraa.in/cdn/shop/files/page-banner_7d5e122f-a2bc-4349-b47f-fc15492763f4.webp?v=1726191475&width=1500"} alt="banner" className="object-cover object-center w-full" />
            </div>
        </div>
    )
}

export default CompanyInfo;