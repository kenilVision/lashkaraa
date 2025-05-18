'use client';
import { useEffect, useState } from 'react';
import React from 'react';

function MenSizeGuideModal({ isOpen, onClose }) {

    const mensSizeGuide = {
        title: "Men’s Traditional Wear",
        categories: [
          {
            title: "Men’s Sherwani & Kurta",
            table: {
              headers: ["Size", "S-36", "M-38", "L-40", "XL-42", "2XL-44"],
              rows: [
                ["Sherwani Length", "46", "46", "46", "46", "46"],
                ["Kurta Length", "43", "43", "43", "43", "43"],
                ["Chest", "40", "42", "44", "46", "48"],
                ["Waist", "36.5", "38.5", "41", "43", "46"],
                ["Hip", "41", "42.5", "45", "47", "48"],
                ["Kurta Sleeve Length", "24", "24.5", "25", "25.5", "26"],
                ["Sherwani Sleeve Length", "24.5", "25", "25.5", "26", "26.5"],
              ],
            },
          },
          {
            title: "Men’s Jacket & Kurta",
            table: {
              headers: ["Size", "S-36", "M-38", "L-40", "XL-42", "2XL-44"],
              rows: [
                ["Jacket Length", "27", "28", "29", "29", "30"],
                ["Kurta Length", "46", "46", "46", "47", "47"],
                ["Chest", "40", "42", "44", "46", "48"],
                ["Waist", "36.5", "38.5", "41", "43", "46"],
                ["Hip", "41", "42.5", "45", "47", "48"],
                ["Sleeve Length", "24.5", "25", "25.5", "26", "26.5"],
              ],
            },
          },
          // Add other categories here...
        ],
        note: "All measurements are in inches.",
        imageGuide: {
          label: "How to measure",
          src: "//cdn.shopify.com/s/files/1/2482/1950/files/menswear-guide_2048x_4faf9af2-ce5d-405c-b85f-415cd2d218f7.jpg",
        },
    };

    const [isImageGuideOpen, setIsImageGuideOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
    }, [isOpen]);

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
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 18 17">
                <path
                  d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z"
                  fill="currentColor"
                />
              </svg>
            </button>

            <div className="p-6 overflow-y-auto max-h-[90vh]">

              
              {/* Toggle Between Size Guide and Image Guide */}
              <div className="flex justify-evenly border-b mb-6">
                <button
                  className={`px-6  py-3 font-medium  ${!isImageGuideOpen ? "active" : ""}`}
                  onClick={() => setIsImageGuideOpen(false)}
                >
                  Size Guide
                </button>
                <button
                  className={`px-6 py-3 font-medium  ${isImageGuideOpen ? "active" : ""}`}
                  onClick={() => setIsImageGuideOpen(true)}
                >
                  Image Guide
                </button>
              </div>

              {/* Size Guide Table Section */}
              {!isImageGuideOpen && (
                <div className="space-y-6">
                  {mensSizeGuide.categories.map((category, index) => (
                    <div key={index}>
                      <h2 className="text-xl font-bold text-center mb-6">{category.title}</h2>
                      <div className="overflow-x-auto">
                        <table className="w-full text-center border-collapse">
                          <thead>
                            <tr className="bg-gray-100">
                              {category.table.headers.map((header, i) => (
                                <th key={i} className="p-3 border">{header}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {category.table.rows.map((row, index) => (
                              <tr key={index} className={index % 2 === 0 ? "bg-[#EFE5DC]" : "bg-white"}>
                                {row.map((cell, i) => (
                                  <td key={i} className="p-3 border">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Image Guide Section */}
              {isImageGuideOpen && (
                <div className="mt-6 text-center">
                  <img
                    src={mensSizeGuide.imageGuide.src}
                    alt={mensSizeGuide.imageGuide.label}
                    className="w-full mx-auto"
                  />
                  <p className="text-gray-500 italic mt-4">{mensSizeGuide.note}</p>
                </div>
              )}
            </div>
          </div>
        </div>
    );
}

export default MenSizeGuideModal;
