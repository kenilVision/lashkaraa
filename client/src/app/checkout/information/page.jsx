"use client";
import React from 'react' 
import AccountSection from '@/components/checkout/information/AccountSection'
import ShipTo from '@/components/checkout/information/ShipTo'
import {ArrowLeft} from 'lucide-react'
import { useSelector } from "react-redux";
import { useCheckout } from "@/context/checkoutContext";
import { useRouter } from 'next/navigation'
function page() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const { shippingAddress, setOrderInfo } = useCheckout();

  const handleContinueToShipping = () => {
    if (!shippingAddress || !user?._id) {
      alert("Please fill in your shipping address and make sure you're logged in.");
      return;
    }
    setOrderInfo(user._id, shippingAddress);
    router.push('/checkout/shipping'); 
  };

  return (
      <>
  <div className="w-full">

      <AccountSection 
  user={user}
/>
    <ShipTo
   user={user}
      />
    <div className="flex flex-col gap-4 md:flex-row md:justify-between items-center mt-6">
      <a
        href="https://www.lashkaraa.in/cart?logged_in=true"
        className="flex items-center text-sm text-gray-600 hover:text-black transition"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span>Return to bag</span>
      </a>

      <button
        type="submit"
        className="bg-black text-white text-sm px-6 py-6 rounded hover:bg-gray-800 transition"
        onClick={handleContinueToShipping}
      >
        Continue to shipping
      </button>
    </div>
  </div>
        </>
  )
}

export default page
