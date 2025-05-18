"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Paragraph from './Paragraph';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqItems = [
        {
            question: "How do I place an order?",
            answer: (
                <div className='px-2 mb-7'>
                    <Paragraph className={"mb-3"}><strong className='text-sm'>A:</strong>&nbsp;To place an order, simply follow the steps below for a seamless ordering experience:</Paragraph>
                    <ul className='list-disc ps-4 text-[13px] text-primary'>
                        <li>Select the item you wish to place an order for (If stitching will be needed, be sure to add stitching options)</li><li>Add the item to your shopping cart.</li>
                        <li>Click on your shopping cart to proceed to the checkout.</li><li>Enter your billing &amp; shipping details and any applicable coupon codes.</li>
                        <li>Select your method of payment - credit card details will be entered on the same page while those paying with paypal will be redireceted to the paypal website to complete the order.</li>
                        <li>Woohoo! You've successfully placed an order. You will be able to view your order # and order details on the final screen. You'll also receive an order confirmation e-mail at the e-mail address provided by you at checkout.</li>
                    </ul>
                </div>
            )
        },
        {
            question: (
                <>I<span className="font-sans">'</span>ve placed an order, when will I receive it?</>
            ),
            answer: (
                <div className='px-2 mb-4'>
                    <Paragraph className={"mb-3"}><strong>A:&nbsp;</strong>The processing time required to get each product ready for dispatch is listed on the respective product page. If you've ordered a Ready to Ship item, it will be dispatched within 48 hrs (2 business days). If your order contains multiple items with different processing times, your order will be dispatched only when all products are ready.&nbsp;</Paragraph>
                    <Paragraph className={"mt-3"}><em>Example:</em>&nbsp;You've placed an order for three products. The processing time for product A is 48 hrs, product B is 7 days and product C is 21 days. Your order will be dispatched within 21 days. Once your order is dispatched, you will receive your order within 4-7 business days.</Paragraph>
                </div>
            )
        },
        {
            question: "How will my order be delivered to me?",
            answer: (
                <div className='px-2'>
                    <Paragraph className={"mb-4"}><strong>A:&nbsp;</strong>We at Lashkaraa only work with reputed carriers such as UPS, FedEx, DHL, and Aramex. Your order will be dispatched through one of these reputed couriers. You'll also be receiving a tracking number in your shipment confirmation e-mail so you may also keep track on your order status.</Paragraph>
                </div>
            )
        },
        {
            question: "How can I check the status of my order?",
            answer: (
                <div className='px-2'>
                    <Paragraph className={"mb-4"}><strong>A:&nbsp;&nbsp;</strong>Checking your order status is very easy - simply log in to your Lashkaraa account and proceed to My Account section. From there, click on the Orders tab, where you will be able to view the item(s) ordered and respective status for each. Alternatively, you may also e-mail us at info@lashkaraa.com alongside your order # and one of our representatives will be happy to update you with the status of your order.</Paragraph>
                </div>
            )
        },
        {
            question: "Do I need to make an account to shop at Lashkaraa?",
            answer: (
                <div className='px-2'>
                    <Paragraph className={"mb-4"}><strong>A:&nbsp;&nbsp;</strong>No, you do not need to make an account to shop with us. However, registering an account with us allows for a faster checkout and personalized recommendations catered to your style. You'll also be able to view the current, real-time status of your order within your Lashkaraa account and also earn points for every purchase you make with us via our Lashkaraa Loyalty rewards program, redeemable for discounts and special perks. When checking out as a Guest, we'll always give you the option to register your account in-case you change your mind.</Paragraph>
                </div>
            )
        },
        {
            question: "Can we use more than one coupon/promo codes on a single purchase?",
            answer: (
                <div className='px-2'>
                    <Paragraph className={"mb-4"}><strong>﻿A:&nbsp;</strong>No, only one coupon code is applicable per order.&nbsp;</Paragraph>
                </div>
            )
        },
        {
            question: "How can I care for my purchase?",
            answer: (
                <div className='px-2'>
                    <Paragraph className={"mb-4"}><strong>﻿A:&nbsp;</strong>We would recommend dry cleaning all embellished outfits. Outfits of cotton/digital print should only be washed in cold water.&nbsp;</Paragraph>
                </div>
            )
        },
        {
            question: "I just placed an order but now want to cancel it. How can I do this?  ",
            answer: (
                <div className='px-2 mb-4'>
                    <Paragraph className={"mb-4"}><strong>A:&nbsp;</strong>Please e-mail info@lashkaraa.com immediately with your order # and request to cancel. Order cancellation requests must be received within 24 hours of order placement for a 100% refund back to your used method of payment. Order cancellation requests made after this period are only approved on a case-to-case basis, depending on if the product(s) in your order are nearing completion for dispatch. If your order cancellation request is approved, you will receive a refund in the form of a store credit only. If you need a refund back to your card, a 10% re-stocking fee will be applied.<br /></Paragraph>
                    <Paragraph className={"mt-4"}>Please note that READY TO SHIP items (items with a dispatch time of 48 hrs) cannot be cancelled once the order is placed. When you place an order for a Ready To Ship product with us, this item immediately goes into processing as we have to dispatch this item from our warehouse within 48 hours as noted online.</Paragraph>
                </div>
            )
        },
        {
            question: "Why must I inform you within 24 hours of order placement if I want to cancel my order?",
            answer: (
                <div className='px-2'>
                    <Paragraph className={"mb-4"}><strong>﻿A:&nbsp;</strong>As soon as you place your order, we get to work. At this point, the picking, customization and logistics for your order has already begun, hence we request all cancellation requests be reported to us within 24 hours of order placement only.&nbsp;</Paragraph>
                </div>
            )
        },
        {
            question: "I missed a very important detail regarding my order. Do I need to cancel my order for this and place a new order?",
            answer: (
                <div className='px-2 mb-10'>
                    <Paragraph className={"mb-4"}><strong>﻿A:&nbsp;</strong>No worries! If you need to update something in your shipping/contact information or need to update your measurements, please e-mail info@lashkaraa.com with your order # and our team will update the required information. However, please note that if the item in your order has already been stitched and/or dispatched, we will not be able to make any changes. Hence, we would request you e-mail us as soon as possible.&nbsp;</Paragraph>
                </div>
            )
        },
    ];

    return (
        <div className="px-4">
            <h1 className="md:text-[52px] text-[40px] leading-[1.5] font-seasons md:mb-6 mb-10">FAQ</h1>
            <div className="">
                {faqItems.map((item, index) => (
                    <div key={index} className="last:border-b border-t border-primary">
                        <div
                            className={`flex justify-between items-center cursor-pointer pr-3 hover:bg-[#001d3d0a] py-[15px]`}
                            onClick={() => toggleFAQ(index)}
                        >
                            <h2 className={`text-lg hover:underline font-seasons`}>Q: {item.question}</h2>
                            <span className="text-xl">
                                {activeIndex === index ? <ChevronUp size={16} className='text-primary' /> : <ChevronDown size={16} className='text-primary' />}
                            </span>
                        </div>
                        {activeIndex === index && (
                            <div className="mt-2 text-gray-700">
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;