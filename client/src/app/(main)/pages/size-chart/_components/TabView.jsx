"use client";

import Paragraph from '@/components/common/Paragraph';
import { useState } from 'react';

export default function TabView() {
    const [activeTab, setActiveTab] = useState('Women');

    const tabs = ['Women', 'Men', 'Kids'];

    const sizeGuides = {
        Women: (
            <div className="overflow-x-auto scrollbar-hide">
                <h2 className='text-center font-seasons md:text-4xl text-xl mt-6 mb-8'>Women’s Clothing Size Guide</h2>
                <table className="min-w-full bg-white">
                    <thead className="bg-[#EFE5DC]">
                        <tr>
                            <th className="px-4 py-1 text-center text-[13px] font-blod text-primary uppercase tracking-wider">SIZE</th>
                            <th className="px-4 py-1 text-center text-[13px] font-blod text-primary uppercase tracking-wider">BUST</th>
                            <th className="px-4 py-1 text-center text-[13px] font-blod text-primary uppercase tracking-wider">AROUND <br /> ABOVE WAIST</th>
                            <th className="px-4 py-1 text-center text-[13px] font-blod text-primary uppercase tracking-wider">AROUND <br /> WAIST</th>
                            <th className="px-4 py-1 text-center text-[13px] font-blod text-primary uppercase tracking-wider">HIPS</th>
                            <th className="px-4 py-1 text-center text-[13px] font-blod text-primary uppercase tracking-wider">US SIZE</th>
                            <th className="px-4 py-1 text-center text-[13px] font-blod text-primary uppercase tracking-wider">UK SIZE</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {[
                            { size: 'XXS', bust: '32"', aboveWaist: '26"', waist: '28"', hips: '36"', us: '2', uk: '6' },
                            { size: 'XS', bust: '34"', aboveWaist: '28"', waist: '30"', hips: '38"', us: '4', uk: '8' },
                            { size: 'S', bust: '36"', aboveWaist: '30"', waist: '32"', hips: '40"', us: '6', uk: '10' },
                            { size: 'M', bust: '38"', aboveWaist: '32"', waist: '34"', hips: '42"', us: '8', uk: '12' },
                            { size: 'L', bust: '40"', aboveWaist: '34"', waist: '36"', hips: '44"', us: '10', uk: '14' },
                            { size: 'XL', bust: '42"', aboveWaist: '36"', waist: '38"', hips: '46"', us: '12', uk: '16' },
                            { size: 'XXL', bust: '44"', aboveWaist: '38"', waist: '40"', hips: '48"', us: '14', uk: '18' },
                            { size: '3XL', bust: '46"', aboveWaist: '42"', waist: '44"', hips: '51"', us: '16', uk: '20' },
                            { size: '4XL', bust: '48"', aboveWaist: '44"', waist: '46"', hips: '53"', us: '18', uk: '22' },
                            { size: '5XL', bust: '50"', aboveWaist: '46"', waist: '48"', hips: '55"', us: '20', uk: '24' },
                            { size: '6XL', bust: '52"', aboveWaist: '48"', waist: '50"', hips: '57"', us: '22', uk: '26' },
                        ].map((row, index) => (
                            <tr key={row.size} className={index % 2 === 0 ? 'bg-white' : 'bg-[#EFE5DC]'}>
                                <td className="px-4 whitespace-nowrap text-[13px] text-primary text-center">{row.size}</td>
                                <td className="px-4 whitespace-nowrap text-[13px] text-primary text-center">{row.bust}</td>
                                <td className="px-4 whitespace-nowrap text-[13px] text-primary text-center">{row.aboveWaist}</td>
                                <td className="px-4 whitespace-nowrap text-[13px] text-primary text-center">{row.waist}</td>
                                <td className="px-4 whitespace-nowrap text-[13px] text-primary text-center">{row.hips}</td>
                                <td className="px-4 whitespace-nowrap text-[13px] text-primary text-center">{row.us}</td>
                                <td className="px-4 whitespace-nowrap text-[13px] text-primary text-center">{row.uk}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ),
        Men: (
            <div>
                <div className="overflow-x-auto scrollbar-hide">
                    <h2 className='text-center font-seasons md:text-4xl text-xl mt-6 mb-8'>Men’s Sherwani <span className='font-sans'>&</span> Kurta</h2>
                    <table className="min-w-full bg-white border border-primary border-collapse">
                        <thead className="bg-[#EFE5DC] border border-primary">
                            <tr className='border border-primary'>
                                <th className="px-4 border border-primary py-1 text-center text-[13px] font-blod text-primary tracking-wider">Size</th>
                                <th className="px-4 border border-primary py-1 text-center text-[13px] font-blod text-primary tracking-wider">S-36</th>
                                <th className="px-4 border border-primary py-1 text-center text-[13px] font-blod text-primary tracking-wider">M-38</th>
                                <th className="px-4 border border-primary py-1 text-center text-[13px] font-blod text-primary tracking-wider">L-40</th>
                                <th className="px-4 border border-primary py-1 text-center text-[13px] font-blod text-primary tracking-wider">XL-42</th>
                                <th className="px-4 border border-primary py-1 text-center text-[13px] font-blod text-primary tracking-wider">2XL-44</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {[
                                { size: <span>Sherwani <br /> Length</span>, s36: '46', m38: '46', l40: '46', xl42: '46', xl44: '46', },
                                { size: 'Kurta Length', s36: '43', m38: '43', l40: '43', xl42: '43', xl44: '43', },
                                { size: 'Chest', s36: '40', m38: '42', l40: '44', xl42: '46', xl44: '48', },
                                { size: 'Waist', s36: '36.5', m38: '38.5', l40: '41', xl42: '43', xl44: '46', },
                                { size: 'Hip', s36: '41', m38: '42.5', l40: '45', xl42: '47', xl44: '48', },
                                { size: <span>Kurta Sleeve <br /> Length</span>, s36: '24', m38: '24.5', l40: '25', xl42: '25.5', xl44: '26', },
                                { size: <span>Sherwani <br /> Sleeve Length</span>, s36: '24.5', m38: '25', l40: '25.5', xl42: '26', xl44: '26.5', },
                            ].map((row, index) => (
                                <tr key={row.size} className={`border border-primary ${index % 2 === 0 ? 'bg-white' : 'bg-[#EFE5DC]'}`}>
                                    <td className="px-4 border border-primary whitespace-nowrap text-[13px] text-primary text-center">{row.size}</td>
                                    <td className="px-4 border border-primary whitespace-nowrap text-[13px] text-primary text-center">{row.s36}</td>
                                    <td className="px-4 border border-primary whitespace-nowrap text-[13px] text-primary text-center">{row.m38}</td>
                                    <td className="px-4 border border-primary whitespace-nowrap text-[13px] text-primary text-center">{row.l40}</td>
                                    <td className="px-4 border border-primary whitespace-nowrap text-[13px] text-primary text-center">{row.xl42}</td>
                                    <td className="px-4 border border-primary whitespace-nowrap text-[13px] text-primary text-center">{row.xl44}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="overflow-x-auto scrollbar-hide md:mt-8 mt-4">
                    <h2 className='text-center font-seasons md:text-4xl text-xl mt-6 mb-8'>Men’s Jacket <span className='font-sans'>&</span> Kurta</h2>
                    <table className="min-w-full bg-white border border-primary border-collapse">
                        <thead className="bg-[#EFE5DC] border border-primary">
                            <tr className='border border-primary'>
                                <th className="px-4 border border-primary py-1 text-center text-[13px] font-blod text-primary tracking-wider">Size</th>
                                <th className="px-4 border border-primary py-1 text-center text-[13px] font-blod text-primary tracking-wider">S-36</th>
                                <th className="px-4 border border-primary py-1 text-center text-[13px] font-blod text-primary tracking-wider">M-38</th>
                                <th className="px-4 border border-primary py-1 text-center text-[13px] font-blod text-primary tracking-wider">L-40</th>
                                <th className="px-4 border border-primary py-1 text-center text-[13px] font-blod text-primary tracking-wider">XL-42</th>
                                <th className="px-4 border border-primary py-1 text-center text-[13px] font-blod text-primary tracking-wider">2XL-44</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {[
                                { size: 'Jacket Length', s36: '27', m38: '28', l40: '29', xl42: '29', xl44: '30', },
                                { size: 'Kurta Length', s36: '46', m38: '46', l40: '46', xl42: '47', xl44: '47', },
                                { size: 'Chest', s36: '40', m38: '42', l40: '44', xl42: '46', xl44: '48', },
                                { size: 'Waist', s36: '36.5', m38: '38.5', l40: '41', xl42: '43', xl44: '46', },
                                { size: 'Hip', s36: '41', m38: '42.5', l40: '45', xl42: '47', xl44: '48', },
                                { size: 'Sleeve Length', s36: '24.5', m38: '25', l40: '25.5', xl42: '26', xl44: '26.5', },
                            ].map((row, index) => (
                                <tr key={row.size} className={`border border-primary ${index % 2 === 0 ? 'bg-white' : 'bg-[#EFE5DC]'}`}>
                                    <td className="px-4 border border-primary whitespace-nowrap text-[13px] text-primary text-center">{row.size}</td>
                                    <td className="px-4 border border-primary whitespace-nowrap text-[13px] text-primary text-center">{row.s36}</td>
                                    <td className="px-4 border border-primary whitespace-nowrap text-[13px] text-primary text-center">{row.m38}</td>
                                    <td className="px-4 border border-primary whitespace-nowrap text-[13px] text-primary text-center">{row.l40}</td>
                                    <td className="px-4 border border-primary whitespace-nowrap text-[13px] text-primary text-center">{row.xl42}</td>
                                    <td className="px-4 border border-primary whitespace-nowrap text-[13px] text-primary text-center">{row.xl44}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="overflow-x-auto scrollbar-hide md:mt-8 mt-4">
                    <h2 className='text-center font-seasons md:text-4xl text-xl mt-6 mb-8'>Men’s Pants</h2>
                    <table className="min-w-full bg-white border border-primary border-collapse">
                        <thead className="bg-[#EFE5DC] border border-primary">
                            <tr className='border border-primary'>
                                <th className="px-4 border border-primary py-1 text-center text-[13px] font-blod text-primary tracking-wider">Size</th>
                                <th className="px-4 border border-primary py-1 text-center text-[13px] font-blod text-primary tracking-wider">S-36</th>
                                <th className="px-4 border border-primary py-1 text-center text-[13px] font-blod text-primary tracking-wider">M-38</th>
                                <th className="px-4 border border-primary py-1 text-center text-[13px] font-blod text-primary tracking-wider">L-40</th>
                                <th className="px-4 border border-primary py-1 text-center text-[13px] font-blod text-primary tracking-wider">XL-42</th>
                                <th className="px-4 border border-primary py-1 text-center text-[13px] font-blod text-primary tracking-wider">2XL-44</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {[
                                { size: 'Bottom Length', s36: '40', m38: '42', l40: '42', xl42: '42', xl44: '42', },
                                { size: 'Hips', s36: '42', m38: '44', l40: '46', xl42: '48', xl44: '50', },
                                { size: 'Thigh', s36: '24', m38: '25', l40: '26', xl42: '27', xl44: '28', },
                                { size: 'Knee', s36: '17', m38: '18', l40: '19', xl42: '20', xl44: '20.5', },
                                { size: 'Ankle', s36: '13', m38: '14', l40: '14', xl42: '15', xl44: '15', },
                                { size: 'Crotch', s36: '26', m38: '27', l40: '28', xl42: '29', xl44: '30', },
                            ].map((row, index) => (
                                <tr key={row.size} className={`border border-primary ${index % 2 === 0 ? 'bg-white' : 'bg-[#EFE5DC]'}`}>
                                    <td className="px-4 border border-primary whitespace-nowrap text-[13px] text-primary text-center">{row.size}</td>
                                    <td className="px-4 border border-primary whitespace-nowrap text-[13px] text-primary text-center">{row.s36}</td>
                                    <td className="px-4 border border-primary whitespace-nowrap text-[13px] text-primary text-center">{row.m38}</td>
                                    <td className="px-4 border border-primary whitespace-nowrap text-[13px] text-primary text-center">{row.l40}</td>
                                    <td className="px-4 border border-primary whitespace-nowrap text-[13px] text-primary text-center">{row.xl42}</td>
                                    <td className="px-4 border border-primary whitespace-nowrap text-[13px] text-primary text-center">{row.xl44}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="overflow-x-auto scrollbar-hide md:mt-8 mt-4">
                    <h2 className='text-center font-seasons md:text-4xl text-xl mt-6 mb-8'>Men’s Churidar Sizes</h2>
                    <table className="min-w-full bg-white border border-primary border-collapse">
                        <thead className="bg-[#EFE5DC] border border-primary">
                            <tr className='border border-primary'>
                                <th className="px-4 border border-primary py-1 text-center text-[13px] font-blod text-primary tracking-wider">Size</th>
                                <th className="px-4 border border-primary py-1 text-center text-[13px] font-blod text-primary tracking-wider">S-36</th>
                                <th className="px-4 border border-primary py-1 text-center text-[13px] font-blod text-primary tracking-wider">M-38</th>
                                <th className="px-4 border border-primary py-1 text-center text-[13px] font-blod text-primary tracking-wider">L-40</th>
                                <th className="px-4 border border-primary py-1 text-center text-[13px] font-blod text-primary tracking-wider">XL-42</th>
                                <th className="px-4 border border-primary py-1 text-center text-[13px] font-blod text-primary tracking-wider">2XL-44</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {[
                                { size: 'Bottom Length', s36: '50', m38: '50', l40: '50', xl42: '50', xl44: '50', },
                                { size: 'Hips', s36: '42', m38: '44', l40: '46', xl42: '48', xl44: '50', },
                                { size: 'Thigh', s36: '24', m38: '25', l40: '26', xl42: '27', xl44: '28', },
                                { size: 'Knee', s36: '16', m38: '17', l40: '18', xl42: '19', xl44: '20', },
                                { size: 'Ankle', s36: '12.5', m38: '12.5', l40: '13', xl42: '13', xl44: '13.5', },
                                { size: 'Crotch', s36: '26', m38: '27', l40: '28', xl42: '29', xl44: '30', },
                            ].map((row, index) => (
                                <tr key={row.size} className={`border border-primary ${index % 2 === 0 ? 'bg-white' : 'bg-[#EFE5DC]'}`}>
                                    <td className="px-4 border border-primary whitespace-nowrap text-[13px] text-primary text-center">{row.size}</td>
                                    <td className="px-4 border border-primary whitespace-nowrap text-[13px] text-primary text-center">{row.s36}</td>
                                    <td className="px-4 border border-primary whitespace-nowrap text-[13px] text-primary text-center">{row.m38}</td>
                                    <td className="px-4 border border-primary whitespace-nowrap text-[13px] text-primary text-center">{row.l40}</td>
                                    <td className="px-4 border border-primary whitespace-nowrap text-[13px] text-primary text-center">{row.xl42}</td>
                                    <td className="px-4 border border-primary whitespace-nowrap text-[13px] text-primary text-center">{row.xl44}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Paragraph className={"mt-10 mb-6"}>Note: All measurements are in inches.</Paragraph>
            </div>
        ),
        Kids: (
            <div className="overflow-x-auto scrollbar-hide">
                <h2 className='text-center font-seasons md:text-4xl text-xl mt-6 mb-8'>Kidswear</h2>
                <div>
                    <img src="https://cdn.shopify.com/s/files/1/2482/1950/files/kidswear_size_new.png?v=1526007577" alt="Kidswear" className='w-full max-w-[500px] mx-auto' />
                </div>
                <div className="overflow-x-auto scrollbar-hide mt-8">
                    <h2 className='text-center font-seasons md:text-4xl text-xl mt-6 mb-8'>Kidswear Boys</h2>
                    <table className="min-w-full bg-white">
                        <thead className="bg-[#EFE5DC] ">
                            <tr className=''>
                                <th className="px-4  py-1 text-center text-[13px] font-blod text-primary tracking-wider"></th>
                                <th className="px-4  py-1 text-center text-[13px] font-blod text-primary tracking-wider">3M</th>
                                <th className="px-4  py-1 text-center text-[13px] font-blod text-primary tracking-wider">6M</th>
                                <th className="px-4  py-1 text-center text-[13px] font-blod text-primary tracking-wider">9M</th>
                                <th className="px-4  py-1 text-center text-[13px] font-blod text-primary tracking-wider">1Y</th>
                                <th className="px-4  py-1 text-center text-[13px] font-blod text-primary tracking-wider">2Y</th>
                                <th className="px-4  py-1 text-center text-[13px] font-blod text-primary tracking-wider">3Y</th>
                                <th className="px-4  py-1 text-center text-[13px] font-blod text-primary tracking-wider">4Y</th>
                                <th className="px-4  py-1 text-center text-[13px] font-blod text-primary tracking-wider">5Y</th>
                                <th className="px-4  py-1 text-center text-[13px] font-blod text-primary tracking-wider">6Y</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {[
                                {
                                    size: 'Shoulder',
                                    M3: '9"',
                                    m6: '9"',
                                    m9: '10"',
                                    y1: '10"',
                                    y2: '11"',
                                    y3: '11.5"',
                                    y4: '12"',
                                    y5: '12.5"',
                                    y6: '12.5"',
                                },
                                {
                                    size: <span>Chest-<br />Kurta</span>,
                                    M3: '21"',
                                    m6: '21"',
                                    m9: '21"',
                                    y1: '21"',
                                    y2: '24"',
                                    y3: '25"',
                                    y4: '25"',
                                    y5: '26"',
                                    y6: '26"',
                                },
                                {
                                    size: <span>Chest-<br />Jacket</span>,
                                    M3: '19"',
                                    m6: '15"',
                                    m9: '16"',
                                    y1: '17"',
                                    y2: '19"',
                                    y3: '22"',
                                    y4: '23"',
                                    y5: '24.5"',
                                    y6: '24.5"',
                                },
                                {
                                    size: <span>Kurta <br /> Length</span>,
                                    M3: '14"',
                                    m6: '15"',
                                    m9: '16"',
                                    y1: '17"',
                                    y2: '19"',
                                    y3: '22"',
                                    y4: '23"',
                                    y5: '24"',
                                    y6: '25"',
                                },
                                {
                                    size: <span>Jacket  <br /> Length</span>,
                                    M3: '10"',
                                    m6: '10"',
                                    m9: '10"',
                                    y1: '12"',
                                    y2: '14"',
                                    y3: '15"',
                                    y4: '15"',
                                    y5: '17"',
                                    y6: '17"',
                                },
                                {
                                    size: <span>Full <br />Sleeve   <br /> Length</span>,
                                    M3: '9"',
                                    m6: '9"',
                                    m9: '9"',
                                    y1: '9"',
                                    y2: '10.5"',
                                    y3: '13"',
                                    y4: '13"',
                                    y5: '13.5"',
                                    y6: '13.5"',
                                },
                                {
                                    size: <span>Bottom  <br />Length    <br /> (Pant)</span>,
                                    M3: '12"',
                                    m6: '12"',
                                    m9: '12"',
                                    y1: '16"',
                                    y2: '21"',
                                    y3: '24"',
                                    y4: '26"',
                                    y5: '26"',
                                    y6: '28"',
                                },
                                {
                                    size: 'Churidar',
                                    M3: '17"',
                                    m6: '17"',
                                    m9: '17"',
                                    y1: '21"',
                                    y2: '26"',
                                    y3: '29"',
                                    y4: '31"',
                                    y5: '31"',
                                    y6: '33"',
                                },
                                {
                                    size: <span>Kurta  <br />Waist</span>,
                                    M3: '21"',
                                    m6: '21"',
                                    m9: '21"',
                                    y1: '21"',
                                    y2: '22"',
                                    y3: '22"',
                                    y4: '24"',
                                    y5: '24"',
                                    y6: '24"',
                                },
                            ].map((row, index) => (
                                <tr key={row.size} className={` ${index % 2 === 0 ? 'bg-white' : 'bg-[#EFE5DC]'}`}>
                                    <td className="px-4  whitespace-nowrap text-[13px] text-primary text-center">{row.size}</td>
                                    <td className="px-4  whitespace-nowrap text-[13px] text-primary text-center">{row.M3}</td>
                                    <td className="px-4  whitespace-nowrap text-[13px] text-primary text-center">{row.m6}</td>
                                    <td className="px-4  whitespace-nowrap text-[13px] text-primary text-center">{row.m9}</td>
                                    <td className="px-4  whitespace-nowrap text-[13px] text-primary text-center">{row.y1}</td>
                                    <td className="px-4  whitespace-nowrap text-[13px] text-primary text-center">{row.y2}</td>
                                    <td className="px-4  whitespace-nowrap text-[13px] text-primary text-center">{row.y3}</td>
                                    <td className="px-4  whitespace-nowrap text-[13px] text-primary text-center">{row.y4}</td>
                                    <td className="px-4  whitespace-nowrap text-[13px] text-primary text-center">{row.y5}</td>
                                    <td className="px-4  whitespace-nowrap text-[13px] text-primary text-center">{row.y6}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        ),
    };

    return (
        <div className="px-4">
            <div className="">
                <nav className="grid md:grid-cols-3 grid-cols-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-2 px-1 border-b-2 font-medium font-seasons cursor-pointer text-[13px] ${activeTab === tab
                                ? 'border-secondry text-primary'
                                : 'border-transparent'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="mt-6">
                {sizeGuides[activeTab]}
            </div>
        </div>
    );
}