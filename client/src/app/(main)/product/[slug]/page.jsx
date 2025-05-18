"use client";

import React, { useState, useEffect } from "react";

import Breadcrumb from "@/components/common/Breadcrumb";
import FilterSection, {
  ActiveFilters,
} from "@/components/common/FilterSection";
import ProductGrid from "@/components/ProductGrid";
import ReadMore from "@/components/common/ReadMore";
import Button from "@/components/common/Button";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../../../../store/slice/productSlice";
import ProductDetail from "@/components/ProductDetail";
import ProductGallery from "@/components/ProductGallery";
import SectionHeader from '../../../../components/common/SectionHeader';
import Link from 'next/link';
import { fetchdata } from '../../../../store/slice/readyToShipSlice';

function ProductPage() {
  const { product, loading, error } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();
      const { data , loading: readyToShipLoading } = useSelector((state) => state.readyToShip);
      useEffect(() => {             
                dispatch(fetchdata('women'));
            }, [ ]);

  const [slug, setSlug] = useState("");
  const params = useParams();
  const currentSlug = params?.slug;

  useEffect(() => {
    if (currentSlug !== slug) {
      setSlug(currentSlug);
    }
  }, [currentSlug]);

  useEffect(() => {
    const fetchData = async () => {
      if (slug) {
       
        dispatch(fetchSingleProduct(slug));
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-[#F3F0ED]">
      <Breadcrumb />
      <div className="w-full max-w-[1500px] mx-auto md:px-12 px-2">
        <div className="flex flex-col justify-between md:flex-row lg:gap-14 gap-6 px-2">
          <div className="w-full md:w-1/2 lg:max-w-[532px]  md:block">
            <ProductGallery media={product?.media} />
          </div>
          <div className="w-full md:w-1/2  md:block">
            <ProductDetail product={product} />
          </div>
        </div>
        <section className="px-4 py-8 md:py-12">
      <div className="grid grid-cols-3 gap-4 justify-center">
        
        {/* Collection Link */}
        <Link
          href={`/collection/${product.categorySlug}`}
          className="flex items-center justify-between px-6 py-3 border border-primary rounded-md 
                    text-sm font-medium uppercase tracking-wider text-gray-700  transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          More from collection
          <svg
            viewBox="0 0 14 10"
            fill="none"
            aria-hidden="true"
            className="w-4 h-4 ml-2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
              fill="currentColor"
            />
          </svg>
        </Link>

        {/* Fabric Link */}
        <Link
             href={`/collection/${product.categorySlug}`}
          className="flex items-center justify-between px-6 py-3 border border-primary rounded-md 
                    text-sm font-medium uppercase tracking-wider text-gray-700  transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          More from same fabric
          <svg
            viewBox="0 0 14 10"
            fill="none"
            aria-hidden="true"
            className="w-4 h-4 "
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
              fill="currentColor"
            />
          </svg>
        </Link>

        {/* Color Link */}
        <Link
             href={`/collection/${product.categorySlug}`}
          className="flex items-center justify-between px-6 py-3 border border-primary rounded-md 
                    text-sm font-medium uppercase tracking-wider text-gray-700  transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          More from same color
          <svg
            viewBox="0 0 14 10"
            fill="none"
            aria-hidden="true"
            className="w-4 h-4 ml-2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
              fill="currentColor"
            />
          </svg>
        </Link>

      </div>
    </section>
        <div className="    px-2">
        <div className='relative'>
            <div className='w-full max-w-[1500px] mx-auto flex justify-between items-center mb-[1.563rem] lg:px-[1.875rem] px-4'>
                <div className='flex items-center md:flex-row flex-col'>
                    <h2 className={`md:text-4xl text-2xl md:px-0 mb-0 font-seasons font-light `}>You may also like</h2>
                </div>
            </div>
        </div>
        {readyToShipLoading ? (
            <div className="w-full text-center py-6 text-gray-500">Loading suggestions...</div>
            ) : (
            <ProductGrid products={data.women.slice(0, 4)} />
            )}
            </div>

      </div>
    </div>
  );
}

export default ProductPage;
