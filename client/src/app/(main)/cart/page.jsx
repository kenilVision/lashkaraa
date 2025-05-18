"use client";
import { useState } from 'react';
import {  Lock } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart} from "./../../../store/slice/cartSlice"
import { useRouter } from 'next/navigation';

function page() {
  const router = useRouter();
    const [note, setNote] = useState('');
    const { items: cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    return (
        <div className="flex justify-between bg-[#F3F0ED] w-full pt-[50px] ">
        <div className="w-full max-w-[840px] px-[50px] ">
          <h2 className="text-3xl font-light mb-6">Cart ({ cart.reduce((sum, item) => sum + item.quantity, 0) })</h2>
    
          {cart.map((item, idx) => (
            <div key={idx} className="flex items-start mb-6 border-b border-[#E5E5E5] pb-4">
              <img
                src={`http://localhost:5050/product/${item.productId.media[0]?.url}`}
                alt="Product"
                className="w-24 h-36 object-cover mr-4"
              />
              <div className="flex-1">
                <h3 className="font-medium text-base">
                {item.productId.name}
                </h3>
                <p className="text-sm">₹{item.productId.price}</p>
                
                    <p className="text-sm text-gray-700">Stitching Type: {item.size}</p>
                    {item?.blousePadding && (
                    <p className="text-sm text-gray-700">blouse Padding: {item?.blousePadding}</p>)}
                    <p className="text-sm text-gray-700">Time To Ship: 10 Days</p>
            
              </div>
              <div className="text-right ml-auto">
                <p className="font-medium">Rs. ₹{item.productId.price * item.quantity}</p>
                <button 
                onClick={()=>{dispatch(removeFromCart(item._id))}}
                className="text-sm underline text-gray-700 mt-2">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full  max-w-[604px] px-[50px] lg:pl-12 mt-10 lg:mt-0">
      {/* Free Shipping Message */}
      <p className="text-sm text-gray-800 my-3">
        Congrats! You’ve unlocked free shipping
      </p>
      <div className="h-[4px] w-full bg-[#E2B66A] mb-6" />

      {/* Summary Heading */}
      <h3 className="text-3xl font-light my-6">SUMMARY</h3>

      {/* Subtotal */}
      <div className="flex justify-between py-4 border-y text-sm border-gray-300 font-semibold">
        <span>SUBTOTAL:</span>
        <span>Rs. { cart.reduce((sum, item) => sum + item.productId.price*item.quantity, 0) }</span>
      </div>
      <p className="text-sm text-gray-600 border-b py-4  border-gray-300 flex justify-end  mt-2 mb-6">
        Tax included and shipping calculated at checkout
      </p>

      {/* Accordion for Order Notes */}
      <div className=" flex mb-6">
        <button
          type="button"
          className="flex items-center text-sm font-medium text-left"
        >
          <span >
            Order special instructions
          </span>
        </button>

     
          <textarea
         
            className="w-full mt-3 p-3 bg-white rounded resize-y text-sm text-gray-800"
            name="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

      </div>

      {/* Proceed to Checkout Button */}
      <button
      onClick={()=> {router.push('/checkout/information') }}
       className="w-full bg-[#0a1c3d] hover:cursor-pointer py-3 rounded text-sm flex item-center justify-center text-secondry tracking-wide hover:bg-[#081531] transition">
        PROCEED TO CHECKOUT
        <Lock size={16} className="inline ml-2 text-[#E2B66A]" />
      </button>

      {/* OR Express Checkout */}
      <div className="flex items-center justify-center my-6">
        <div className="flex-grow h-px bg-gray-300" />
        <span className="mx-4 text-xs uppercase tracking-widest text-gray-500 whitespace-nowrap">
          OR EXPRESS CHECKOUT
        </span>
        <div className="flex-grow h-px bg-gray-300" />
      </div>
    </div>
        </div>
      );
}

export default page
