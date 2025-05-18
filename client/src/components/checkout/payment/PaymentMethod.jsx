import React from 'react'

function PaymentMethod() {
  return (
    <>
   <span className="text-[#000000]  mt-5 block font-medium mb-1  text-xl">
      Payment
      </span>
      <span className="text-[#888888]   mb-1  text-sm">
      All transactions are secure and encrypted.
      </span>



      <div className=" mt-[15px]">

      {/* Razorpay Option */}
      <div
        className={` bg-[#F4F4F4] border border-gray-300 rounded-lg `}
      >
        <div className={`flex border p-4 items-start rounded-t-lg justify-between `}>
          <div className="flex items-start rounded-t-lg gap-3">
            <div>
              <label htmlFor="razorpay" className="text-gray-800 font-medium">
              CCAvenue
              </label>
              <div className="flex gap-2 mt-2">
              
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <img
              src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/upi.CmgCfll8.svg"
              alt="upi"
              className="w-8 h-5"
            />
            <img
              src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/master.CzeoQWmc.svg"
              alt="master"
              className="w-8 h-5"
            />
              <img
                  src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/visa.sxIq5Dot.svg"
                  alt="visa"
                  className="w-8 h-5"
                />
                <span className="text-xs text-gray-500 self-center">+11</span>

          </div>
        </div>
        <div className={` mb-2  overflow-hidden`} >
        <div className="flex items-center justify-center p-2 space-x-2 w-max-[350px]">
            <div className="flex w-1/2 flex-col items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-270.8 371 102 52" className="w-50 mb-5">
                <path
                fill="none"
                stroke="#696969"
                strokeMiterlimit="10"
                strokeWidth="1"

                d="M-182 404v16.8c0 .7-.4 1.2-1 1.2h-75.7c-.7 0-1.2-.6-1.2-1.2v-47.6c0-.7.6-1.2 1.2-1.2h75.7c.7 0 1 .6 1 1.2V395m-78-14h78m-17 18h27m-3.9-4.6 4.5 4.6-4.5 4.6"
                ></path>
                <circle cx="-255.5" cy="376.5" r="1.5" fill="currentColor"></circle>
                <circle cx="-250.5" cy="376.5" r="1.5" fill="currentColor"></circle>
                <circle cx="-245.5" cy="376.5" r="1.5" fill="currentColor"></circle>
            </svg>
            <div className="max-w-[35rem]">
                <p className="text-sm text-center text-gray-700">
                After clicking “Pay now”, you will be redirected to CCAvenue to complete your purchase securely.
                </p>
            </div>
            </div>
        </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default PaymentMethod
