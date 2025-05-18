import React from 'react';
import Button from './common/Button';
import Link from 'next/link';
import Pinterest from './icons/Pinterest';
import Youtube from './icons/Youtube';
import Facebook from './icons/Facebook';
import TikTok from './icons/TikTok';
import Instagram from './icons/Instagram';
import Paypal from './icons/Paypal';

const Footer = () => {
    // Social media icons
    const socialIcons = [
        { icon: <Instagram />, href: "/" },
        { icon: <TikTok />, href: "/" },
        { icon: <Facebook />, href: "/" },
        { icon: <Youtube />, href: "/" },
        { icon: <Pinterest />, href: "/" },
    ];

    // Help links data
    const helpLinks = [
        { title: "Contact Us", href: "/pages/contact" },
        { title: "Shipping Information", href: "/pages/shipping-information" },
        { title: "Returns Policy", href: "/pages/returns-policy" },
        { title: "FAQ", href: "/pages/faq" },
        { title: "Sizing Info", href: "/pages/size-chart" },
    ];


    // About links data
    const aboutLinks = [
        { title: "About", href: "/pages/company-info" },
        { title: "Blog" },
        { title: "Reviews" },
    ];

    // Shop links data
    const shopLinks = [
        { title: "Salwar Kameez", slug: 'salwar-kameez', href: "/" },
        { title: "Sarees", slug: "sarees", href: "/" },
        { title: "Lehengas", slug: "lehengas", href: "/" },
        { title: "Men", slug: "men", href: "/" },
    ];

    return (
        <footer className="w-full bg-primary lg:py-20 py-12">
            <div className='w-full max-w-[1500px] mx-auto md:px-[50px] px-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:gap-18 gap-2'>
                    <div>
                        <h2 className='text-secondry text-xl pb-5 font-seasons'>Stay in the Know</h2>
                        <p className='text-white text-[13px] pb-4'>Be the first one to receive new releases, special offers, and more</p>
                        <div className='flex'>
                            <input type="text" className='placeholder:text-secondry border rounded placeholder:text-[13px] text-white border-white py-[8px] px-[10px] w-full lg:max-w-[260px] md:max-w-[230px] max-w-[260px]' placeholder='Sign up to get 10% off first purchase' />
                            <Button className="bg-secondry rounded ml-[-6px] text-[13px]">
                                SIGN UP
                            </Button>
                        </div>
                        <ul className='flex items-center gap-6 pt-6 ps-3'>
                            {
                                socialIcons?.map((item, index) => (
                                    <li key={index} className='text-white cursor-pointer'>{item?.icon}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:gap-0 gap-8 md:mt-0 mt-10'>
                        <div>
                            <h3 className='text-lg uppercase text-secondry font-medium mb-6 text-left'>Help</h3>
                            <ul className='flex flex-col gap-3 justify-start items-start'>
                                {
                                    helpLinks?.map((item, index) => (
                                        <li className='text-sm text-left' key={index}>
                                            <Link href={item?.href} className='text-white hover:underline'>{item?.title}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div>
                            <h3 className='text-lg uppercase text-secondry mb-6 font-medium text-left'>About</h3>
                            <ul className='flex flex-col gap-3 justify-start items-start'>
                                {
                                    aboutLinks?.map((item, index) => (
                                        <li className='text-sm text-left' key={index}>
                                            {
                                                item?.href ?
                                                    <Link href={item?.href} className='text-white hover:underline'>{item?.title}</Link>
                                                    :
                                                    <span className='text-white hover:underline cursor-pointer'>{item?.title}</span>
                                            }
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div>
                            <h3 className='text-lg uppercase text-secondry mb-6 font-medium text-left'>Shop</h3>
                            <ul className='flex flex-col gap-3 justify-start items-start'>
                                {
                                    shopLinks?.map((item, index) => (
                                        <li className='text-sm text-left' key={index}>
                                            <Link href={`/collection/${item?.slug}`} className='text-white hover:underline'>{item?.title}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between items-center md:flex-row flex-col md:mt-18 mt-14'>
                    <div>
                        <p className="text-white text-sm md:block hidden">
                            ⓒ2025 | Lashkaraa, Inc. India, All Rights Reserved
                        </p>
                        <p className='pt-3 md:flex md:justify-start justify-center pb-5 hidden'>
                            <svg className="icon icon--full-color" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" width="38" height="24" role="img" aria-labelledby="pi-paypal"><title id="pi-paypal">PayPal</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path fill="#003087" d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"></path><path fill="#3086C8" d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"></path><path fill="#012169" d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"></path></svg>
                        </p>
                    </div>
                    <div className='md:mt-6 mt-4'>
                       <ul className='flex md:flex-row flex-col md:items-start items-center text-white'>
                            <li className='md:order-1 order-2'>
                                <Link href={'/pages/privacy-policy'} className='text-white text-[13px] hover:underline'>Privacy Policy</Link>
                            </li>
                            <li className='md:order-2 order-1'>
                                <span className='hidden md:inline px-3'>|</span>
                                <Link href={'/pages/site-disclaimer'} className='text-white text-[13px] hover:underline'>Terms & Conditions</Link>
                            </li>
                        </ul>
                        <p className="text-white text-[13px] md:hidden block mt-2">
                            ⓒ2025 | Lashkaraa, Inc. USA
                        </p>
                        <p className='md:hidden md:justify-start justify-center pt-16 flex'>
                            <Paypal />
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
