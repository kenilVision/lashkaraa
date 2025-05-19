"use client"
import React from "react";
import Link from "next/link";
import {ArrowLeft} from 'lucide-react'
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation'
import { useCheckout } from "@/context/checkoutContext";

function page() {
      const router = useRouter();
      const user = useSelector((state) => state.user);
       const {order } = useCheckout();
  return (
    <>
    
      <section aria-label="Review" className="w-full mb-3">
        <div
          role="table"
          aria-label="Review your information"
          className="w-full border border-gray-200  px-2 rounded-md divide-y divide-gray-100"
        >
          {/* Table Header */}
          

          {/* Contact Row */}
          <div role="rowgroup" className="flex items-center text-sm px-4 py-3">
            <div role="rowheader" className="w-1/4 font-medium text-gray-400">
              Contact
            </div>
            <div role="cell" className="w-1/2 text-gray-600">
             {user.email}
            </div>
            <div role="cell" className="w-1/4 text-right">
              <Link
                href="/checkout/information"
                className="text-xs  hover:underline"
              >
                Change
              </Link>
            </div>
          </div>

          {/* Shipping Row */}
          <div role="rowgroup" className="flex items-start text-sm px-4 py-3">
            <div role="rowheader" className="w-1/4 font-medium text-gray-400">
              Ship to
            </div>
            <div role="cell" className="w-1/2 text-gray-600">
              <address className="not-italic">
              {order?.shippingAddress?.address1 || "-"},{" "}
    {order?.shippingAddress?.address2 || ""},{" "}
    {order?.shippingAddress?.city || "-"},{" "}
    {order?.shippingAddress?.pinCode || "-"},{" "}
    {order?.shippingAddress?.country || "-"}
                </address>
            </div>
            <div role="cell" className="w-1/4 text-right">
              <Link
                href="/checkout/information"
                className="text-xs  hover:underline"
              >
                Change
              </Link>
            </div>
          </div>
        </div>
      </section>

      <span className="text-[#000000]  block font-medium mb-1  text-xl">
        Shipping method
      </span>
      <div className={`pt-[5px] overflow-hidden `}>
        <div className="flex items-center justify-between rounded-xl p-3 border  bg-[#F6F6F6]">
          <span className="flex w-full justify-between">
            Free Shipping <span>Free</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:justify-between items-center mt-6">
       <Link
                href="/checkout/information"
        className="flex items-center text-sm text-gray-600 hover:text-black transition"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span>Return to bag</span>
      </Link>

      <button
        type="submit"
        className="bg-black text-white text-sm px-6 py-6 rounded hover:cursor-pointer hover:bg-gray-800 transition"
        onClick={()=>router.push('/checkout/payment') }
      >
        Continue to shipping
      </button>
    </div>
    </>
  );
}

export default page;
