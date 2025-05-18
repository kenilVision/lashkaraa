'use client';

import React , { useMemo } from 'react';
import ImageSlider from './common/ImageSlider';
import { sliderImages } from '@/constant/constant';
import {  useSelector } from 'react-redux';



const NewArrivals = () => {
    const { categories, loading } = useSelector((state) => state.category);
      
    if (loading) {
        return (
          <div className="text-center">
            <div className="loader">Loading...</div> 
          </div>
        );
      }

      let latestSubcategories = [];

  if (categories?.length) {
   
    const allSubcategories = categories.flatMap((cat) => cat.subcategories || []);

    latestSubcategories = allSubcategories
      .filter((sub) => sub.createdAt)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  }

    return (
        <div className='lg:pt-16 pt-10 pb-10'>
            <ImageSlider images={sliderImages }  data= {latestSubcategories} />
        </div>
    );
};

export default NewArrivals;
