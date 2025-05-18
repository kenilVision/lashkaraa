"use client";
import React from "react";
function AccountSection({user}) {
   
  return (
    <div className="py-[14px]">
    <h2 className="">
      <button
        type="button"
        className="w-full"
      >
        <div className="flex justify-between w-full">
          <span className="flex items-center">
            <span className= "text-[#000000]  block font-medium mb-1  text-xl">Contact</span>
          </span>
        </div>
        <div className="pt-[5px]">
          <div className="text-start">
            <span className="">{user.email}</span>
            {/* <span className="text-sm">kenilp1911@gmail.com</span> */}
          </div>
        </div>
      </button>
    </h2>
          <div
        className={`pt-[5px] overflow-hidden `}
      >
        <p className="underline text-sm">Logout</p>
      </div>
      <div className="flex items-center space-x-2 pt-[14px]">
        <input
          type="checkbox"
          name="email"
          className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
        />
        <label htmlFor="marketing_opt_in" className="text-[14px] text-gray-700">
          Email me with news and offers
        </label>
      </div>
  </div>
  )
}

export default AccountSection
