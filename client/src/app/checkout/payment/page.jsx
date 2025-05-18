"use client"
import React from 'react'
import Link from "next/link";
import {ArrowLeft} from 'lucide-react'
import PaymentMethod from '@/components/checkout/payment/PaymentMethod';
import BillingAddress from '@/components/checkout/payment/BillingAddress';
import { useSelector , useDispatch } from "react-redux";
import { useRouter } from 'next/navigation'
import { useCheckout } from "@/context/checkoutContext";
import { placeOrder } from '@/store/slice/orderSlice';
function page() {
    const { billingAddress , setPayment , order} = useCheckout();
    const router = useRouter();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();


    const handlePayNow = async () => {
        try {
          const paymentMethod = "card";
          
          // Wait for setPayment to complete and get the updated order
          const updatedOrder = await setPayment(billingAddress, paymentMethod);
          
          // Now dispatch with the latest order
          const resultAction = await dispatch(placeOrder(updatedOrder));
      
          if (placeOrder.fulfilled.match(resultAction)) {
            router.push(`/`);
          } else {
            throw new Error(resultAction.payload || 'Failed to place order');
          }
        } catch (error) {
          console.error('Payment failed:', error);
          alert('Payment failed: ' + error.message);
        }
      };

     
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

          
          {/* Contact Row */}
          <div role="rowgroup" className="flex items-center text-sm px-4 py-3">
            <div role="rowheader" className="w-1/3 font-medium text-gray-400">
            Shipping method
            </div>
            <div role="cell" className="w-1/3 text-gray-600">
            Free Shipping · Free
            </div>
            <div role="cell" className="w-1/3 text-right">
            </div>
          </div>

        </div>
      </section>

    <PaymentMethod />
    <BillingAddress />
      

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
        className="bg-black text-white text-sm px-6 py-6 rounded hover:cursor-pointer hover:bg-gray-800 transition"
        onClick={handlePayNow}
      >
        Pay Now
      </button>
    </div>
    </>
  )
}

export default page
