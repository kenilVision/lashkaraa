'use client';
import React, { useEffect } from 'react';
import { useCheckout } from "@/context/checkoutContext";


function Bill({ cart }) {

  const { addItemToOrder } = useCheckout();
  console.log('Rendering Bill with cart:', cart);
  useEffect(() => {
    console.log("Current cart:", cart); 
    if (cart && cart.length > 0) {
      const newItems = cart.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
        size: item.size || '',
        note: item.note || ''
      }));
      console.log("Prepared items:", newItems); 
      
      setOrder(prev => {
        const updated = {
          ...prev,
          items: newItems
        };
        console.log("Will update order with:", updated); 
        return updated;
      });
    }
  }, [cart]);
  return (
    <div className="w-full max-w-[520px] h-full p-[38px] rounded-lg ">
     
    <section>
      
      <div className="overflow-y-auto max-h-[444px]">
        {cart.map((item, index) => {
          return (
            <div key={index} className="grid grid-cols-4 items-center py-4 ">
              <div className="flex relative items-center justify-center">
                <div className='relative'>
              <img
                  src={`http://localhost:5050/product/${item.productId.media[0]?.url}`}
                  alt={item.productId.name}
                  className="w-auto h-16 object-cover rounded"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
                <div className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {item.quantity}
              </div>
              </div>
              </div>

              <div className='col-span-2'>
                <p className="font-medium text-sm">{item.productId.name}</p>
                <p className="text-xs text-gray-500">
                  {item.size}
                </p>
              </div>


              <div className="text-right font-semibold">₹{item.productId.price}</div>
            </div>
          );
        })}
      </div>
    </section>

    {/* <section className="mt-6">
      <h3 className="text-lg font-medium mb-2">Discount</h3>
      <form className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Discount code"
          className="flex-1 px-4 py-2 border border-gray-300 bg-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
        type="button"
          className=" text-[#696969] border border-[#dddddd] shadow-sm  px-4 py-2 rounded bg-transparent transition"
        >
          Apply
        </button>
      </form>
    </section> */}

    <section className="mt-6  pt-4 space-y-2">
      <div className="flex justify-between">
        <span>Subtotal. {cart.reduce((sum , item) => sum + item.quantity , 0)} {cart.reduce((sum , item) => sum + item.quantity , 0) === 1 ? 'item' : 'items'}</span>
        <span>₹{cart.reduce((sum , item) => sum + item.productId.price * item.quantity,0)}</span>
      </div>
      
      <div className="flex justify-between">
        <span>Shipping</span>
        <span >
           FREE 
        </span>
      </div>

      <div className="flex justify-between text-lg font-semibold mt-4 pt-2">
        <span>Total</span>
        <span>₹{cart.reduce((sum , item) => sum + item.productId.price * item.quantity , 0)}</span>
      </div>

      
    </section>
  </div>
  )
}

export default Bill
