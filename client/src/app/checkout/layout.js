'use client'; 

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import CheckoutBreadcrumb from '@/components/common/CheckoutBreadcrumb';
import Bill from '@/components/checkout/bill';
import Logo from '@/components/common/Logo';
import { CheckoutProvider } from '@/context/checkoutContext';
import {  fetchUser } from "../../store/slice/userSlice"; 
import Cookies from "js-cookie";
export default function CheckoutLayout({ children }) {

  const { items: cart } = useSelector((state) => state.cart);
  const user = useSelector((state)=> state.user)
  const dispatch = useDispatch();

  
    useEffect(() => {
      
      const token = Cookies.get('Token');
      if (!token) {
        router.push('/account/login');
      } else {
        if (!user.firstname) {
          dispatch(fetchUser()).finally(() => {
          });
        } 
      }
    }, [dispatch , user._id]); 

    return (
      <CheckoutProvider>
      <div className="max-w-full  flex flex-col lg:flex-row h-full mx-auto ">
      <div className="w-auto lg:w-1/2 h-full  lg:min-h-screen flex justify-center lg:justify-end bg-[#ffffff]">
        <div className=" w-auto flex flex-col lg:w-[660px] p-[38px]">
           <Logo />
        <CheckoutBreadcrumb />
         
        <div className="flex-1">
        {children}
        </div>
        <footer className="w-full  py-3 border-t text-gray-500 border-gray-300  mt-5 ">
          <div className="text-sm ">
            All rights reserved Lashkaraa India
          </div>
        </footer>
        </div>
      </div>
      
      <div className=" w-auto lg:w-1/2 hidden lg:block lg:fixed lg:right-0 lg:top-0 right-0 top-0 lg:h-screen bg-[#F6F3F1] overflow-y-auto">
        <div>
          <Bill cart={cart}  />
        </div>
      </div>
    </div>
    </CheckoutProvider>
    );
  }