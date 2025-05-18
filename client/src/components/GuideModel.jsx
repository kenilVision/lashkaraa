'use client';
import { useEffect, useState } from "react";
import React  from 'react'

function GuideModel({ isOpen ,  onClose , type =  "salwar-kameez"  }) {
    
    const [activeTab, setActiveTab] = useState('size-guide');
    const [selectedType, setSelectedType] = useState(null);
    const sizeData = [
        {
            type: "women",
            title: "Women’s Clothing Size Guide",
            note: "All measurements are in inches.",
            sizes: ["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"],
            measurements: [
              { name: "Bust", values: ["32", "34", "36", "38", "40", "42", "44", "46", "48", "50", "52"] },
              { name: "Around Above Waist", values: ["26", "28", "30", "32", "34", "36", "38", "42", "44", "46", "48"] },
              { name: "Around Waist", values: ["28", "30", "32", "34", "36", "38", "40", "44", "46", "48", "50"] },
              { name: "Hips", values: ["36", "38", "40", "42", "44", "46", "48", "51", "53", "55", "57"] },
              { name: "US Size", values: ["2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22"] },
              { name: "UK Size", values: ["6", "8", "10", "12", "14", "16", "18", "20", "22", "24", "26"] }
            ]
          },
        {
            type: "salwar-kameez",
      title: "Salwar Kameez Size Guide",
      note: "All measurements are in inches.The length of the kameez can vary based on its design and pattern.",
      sizes: ["XXS", "XS", "S", "M", "L", "XL"],
      measurements: [
        { name: "Bust", values: ["32", "34", "36", "38", "40", "42"] },
        { name: "Kameez Length Gharara & Sharara", values: ["34", "34", "34", "34", "34", "34"] },
        { name: "Kameez Length Patiala", values: ["36", "36", "36", "36", "36", "36"] },
        { name: "Bottom Length (Kameez) Gharara & Sharara", values: ["42", "42", "42", "42", "42", "42"] },
        { name: "Bottom Length (Kameez) Patiala", values: ["40", "40", "40", "40", "40", "40"] },
        { name: "Sleeve Half Length", values: ["10", "10", "10", "10", "10", "10"] },
        { name: "Sleeve 3/4 Length", values: ["17", "17", "17", "17", "17", "17"] },
        { name: "Sleeve Full Length", values: ["22", "22", "22", "22", "22", "22"] },
        { name: "Around Thigh Pant", values: ["22", "23", "24", "25", "26", "27"] },
        { name: "Around Thigh Churidar", values: ["23", "24", "25", "26", "27", "28"] },
        { name: "Around Knee", values: ["14", "14", "15", "16", "17", "18"] },
        { name: "Around Calf", values: ["12", "12", "13", "14", "15", "16"] },
        { name: "Around Ankle", values: ["10", "10", "11", "11", "12", "12"] },
        { name: "Around Thigh (Gharara)", values: ["22", "23", "24", "25", "26", "27"] },
        { name: "Around Knee (Gharara)", values: ["19", "20", "20", "21", "22", "23"] },
        { name: "Ankle Length Anarkali", values: ["52", "52", "52", "52", "52", "52"] },
        { name: "Calf Length Anarkali", values: ["48", "48", "48", "48", "48", "48"] },
        { name: "Floor Length Anarkali", values: ["58", "58", "58", "58", "58", "58"] },
        { name: "Anarkali Bottom Length (Churidar)", values: ["45", "45", "45", "45", "45", "45"] }
      ]
    },
    {
        type:"sarees",
        title: "Saree Size Guide",
        note: "Note: All measurements are in inches.",
        sizes: ["XXS", "XS", "S", "M", "L", "XL"],
        measurements: [
          { name: "Bust", values: ["32", "34", "36", "38", "40", "42"] },
          { name: "Blouse Length (Saree)", values: ["13", "13", "14", "14", "15", "15"] },
          { name: "Bottom Length (Saree)", values: ["42", "42", "42", "42", "42", "42"] },
          { name: "Sleeve Half Length", values: ["10", "10", "10", "10", "10", "10"] },
          { name: "Sleeve 3/4 Length", values: ["17", "17", "17", "17", "17", "17"] },
          { name: "Sleeve Full Length", values: ["22", "22", "22", "22", "22", "22"] },
          { name: "Armhole Sleeve", values: ["15", "16", "16", "17", "17", "18"] },
          { name: "Armhole Sleeveless", values: ["16", "17", "17", "18", "18", "19"] },
          { name: "Around Above Waist", values: ["26", "28", "30", "32", "34", "36"] },
          { name: "Around Waist", values: ["28", "30", "32", "34", "36", "38"] },
          { name: "Around Hips", values: ["36", "38", "40", "42", "44", "46"] },
          { name: "Petticoat Length", values: ["40", "40", "40", "40", "40", "40"] }
        ]
      },
      {
        type: "lehenga",
        title: "Lehenga Size Guide",
        note: "Note: All measurements are in inches.",
        sizes: ["XXS", "XS", "S", "M", "L", "XL"],
        measurements: [
          { name: "Bust", values: ["32", "34", "36", "38", "40", "42"] },
          { name: "Blouse Length (Lehenga)", values: ["13", "13", "14", "14", "15", "15"] },
          { name: "Bottom Length (Lehenga)", values: ["42", "42", "42", "42", "42", "42"] },
          { name: "Sleeve Half Length", values: ["10", "10", "10", "10", "10", "10"] },
          { name: "Sleeve 3/4 Length", values: ["17", "17", "17", "17", "17", "17"] },
          { name: "Sleeve Full Length", values: ["22", "22", "22", "22", "22", "22"] },
          { name: "Armhole Sleeve", values: ["15", "16", "16", "17", "17", "18"] },
          { name: "Armhole Sleeveless", values: ["16", "17", "17", "18", "18", "19"] },
          { name: "Around Above Waist", values: ["26", "28", "30", "32", "34", "36"] },
          { name: "Around Waist", values: ["28", "30", "32", "34", "36", "38"] },
          { name: "Around Hips", values: ["36", "38", "40", "42", "44", "46"] }
        ]
      }

];
useEffect(() => {
    const dataForType = sizeData.find(item => item.type === type);
    setSelectedType(dataForType);
}, [type]);

if (!isOpen) return null;

return (
    <div 
        role="dialog" 
        className="fixed inset-0 z-500 overflow-y-auto bg-[#00000080] flex items-center justify-center p-4"
    >
        <div className="bg-[#F3F0ED] relative rounded-lg shadow-xl max-w-4xl w-full h-[90vh] overflow-hidden">
            <button 
                type="button" 
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
                aria-label="Close"
                onClick={onClose}
            >
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" className="w-6 h-6" fill="none" viewBox="0 0 18 17">
                    <path d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z" fill="currentColor" />
                </svg>
            </button>

            <div className="p-6 overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between border-b mb-6">
                    <button
                        className={`px-6 py-3 font-medium ${activeTab === 'size-guide' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('size-guide')}
                    >
                        Size guide
                    </button>
                    <button
                        className={`px-6 py-3 font-medium ${activeTab === 'how-to-measure' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('how-to-measure')}
                    >
                        How to measure
                    </button>
                    <button
                        className={`px-6 py-3 font-medium ${activeTab === 'measurement-video' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('measurement-video')}
                    >
                        Measurement video
                    </button>
                </div>

                <div className="space-y-6">
                    {activeTab === 'size-guide'&& selectedType  && (
                                <div>
                                    <h2 className="text-xl font-bold text-center mb-6">{selectedType.title}</h2>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-center border-collapse">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    <th className="p-3 border">Measurement</th>
                                                    {selectedType.sizes.map((size, i) => (
                                                        <th key={i} className="p-3 border">{size}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedType.measurements.map((measurement, index) => (
                                                    <tr key={measurement.name} className={index % 2 === 0 ? 'bg-[#EFE5DC]' : 'bg-[#FFFFFF]'}>
                                                        <td className="p-3 border font-medium">{measurement.name}</td>
                                                        {measurement.values.map((value, i) => (
                                                            <td key={i} className="p-3 border">{value}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <p className="text-gray-500 italic text-center mt-6 whitespace-pre-line">
                                        {selectedType.note}
                                    </p>
                                </div>
                            )}

                    {activeTab === 'how-to-measure' && (
                        <div className="space-y-6">
                            <img 
                                src="https://cdn.shopify.com/s/files/1/2482/1950/files/htm.jpg?v=1677172465" 
                                loading="lazy" 
                                className="w-full mx-auto"
                                alt="Salwar Kameez measurement guide"
                            />
                        </div>
                    )}

                    {activeTab === 'measurement-video' && (
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe 
                                className="w-full h-[400px]"
                                src="https://www.youtube.com/embed/vEAfz02_3f8" 
                                title="How to Take Measurements For Salwar Kameez" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);
}

export default GuideModel
