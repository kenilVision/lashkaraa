import React, { useState , useEffect } from "react";
import { useCheckout } from "@/context/checkoutContext";
function BillingAddress() {
    const { setbillingAddress} = useCheckout();
    const [selectedType, setSelectedType] = useState("same");
    const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    zip: "",
    address: "",
    address2: "",
    state: "",
    city: "",
    country: "India",
  });

  const handleRadioChange = (e) => {
    const val = e.target.value;
    setSelectedType(val);

    if (val === "different") {
      setShowNewAddressForm(true);
      // Optional: you can reset formData here if you want
    } else {
      setShowNewAddressForm(false);
      setbillingAddress({}); // Clear billing address on "same as shipping"
    }
  };

  useEffect(() => {
    if (selectedType === "different") {
      setbillingAddress(formData);
    }
  }, [formData, selectedType, setbillingAddress]);

  const errors = {}

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const states = ["Gujarat"];
  const cities = ["Ahmedabad", "Surat", "Vadodara", "Rajkot"];
  return (
    
    <div className="mt-[15px]">
      <div>
        <span className="text-[#000000] block font-medium mb-1 text-xl">
          Billing Address
        </span>
      </div>

      {/* Same as shipping address option */}
      <div className="border rounded-t-lg cursor-pointer border-gray-300">
        <div
          className={`flex p-4 rounded-t-lg items-start justify-between ${
            selectedType === "same" ? "bg-[#F3F8F4]" : "bg-white"
          }`}
        >
          <div className="flex items-start gap-3">
            <input
              type="radio"
              id="same"
              name="billingAddress"
              value="same"
              checked={selectedType === "same"}
              onChange={handleRadioChange}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all mt-1"
            />
            <label htmlFor="same" className="text-gray-800 font-medium">
              Same as shipping address
            </label>
          </div>
        </div>
      </div>

      {/* Different billing address option */}
      <div className="border rounded-b-lg cursor-pointer border-gray-300">
        <div
          className={`flex p-4 items-center gap-3 ${
            selectedType === "different" ? "bg-[#F3F8F4]" : "bg-white"
          }`}
        >
          <input
            type="radio"
            id="different"
            name="billingAddress"
            value="different"
            checked={selectedType === "different"}
            onChange={handleRadioChange}
            className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
          />
          <label htmlFor="different" className="text-gray-800 font-medium">
            Use a different billing address
          </label>
        </div>

        {/* Conditionally rendered form */}
        {selectedType === "different" && (
          <form
            className="bg-[#F4F4F4] overflow-hidden transition-all rounded-b-lg duration-300 p-5"
            onSubmit={(e) => e.preventDefault()}
          >
        <div className="my-2">
        
          <select
            name="country"
            value={formData.country}
            onChange={handleFormChange}
            required
            className="w-full border border-gray-300  bg-white rounded px-3 py-4 "
          >
            <option value="India">India</option>
          </select>
        </div>
        <div className="grid my-2 grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            name="firstname"
            required
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleFormChange}
            className={`peer w-full border text-sm border-[#dddddd] bg-white px-3 py-3 pt-5  placeholder-transparent ${
              errors.firstname ? "border-red-500" : ""
            }`}
          />
          <span className="absolute left-3 text-sm text-[#696969] transition-all duration-200 top-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-gray-600">
            First Name <span className="text-red-500">*</span>
          </span>
          {errors.firstname && (
            <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            name="lastname"
            required
            placeholder="Full Name"
            value={formData.lastname}
            onChange={handleFormChange}
            className={`peer w-full border text-sm border-[#dddddd] bg-white px-3 py-3 pt-5  placeholder-transparent ${
              errors.lastname ? "border-red-500" : ""
            }`}
          />
          <span className="absolute left-3 text-sm text-[#696969] transition-all duration-200 top-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-gray-600">
          Last Name <span className="text-red-500">*</span>
          </span>
          {errors.lastname && (
            <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>
          )}
        </div>

        </div>

        

        <div className="relative my-2">
          <input
            type="text"
            name="address"
            placeholder="Address Line 1"
            value={formData.address}
            onChange={handleFormChange}
            required
            className={`peer w-full border text-sm border-[#dddddd] px-3 py-3 pt-5 bg-white  placeholder-transparent ${
              errors.address ? "border-red-500" : ""
            }`}
          />
          <span className="absolute left-3 text-sm text-[#696969] transition-all duration-200 top-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-gray-600">
            Address Line 1 <span className="text-red-500">*</span>
          </span>
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>

        <div className="relative my-2">
          <input
            type="text"
            name="address2"
            placeholder="Apartment, suite, etc."
            value={formData.address2}
            onChange={handleFormChange}
            className={`peer w-full border text-sm border-[#dddddd] px-3 py-3 pt-5 bg-white  placeholder-transparent
              ${errors.address ? "border-red-500" : ""}
              `}
          />
          <span className="absolute left-3 text-sm text-[#696969] transition-all duration-200 top-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-gray-600">
            Apartment, suite, etc.
          </span>
          {errors.address2 && (
            <p className="text-red-500 text-xs mt-1">{errors.address2}</p>
          )}
        </div>

        <div className="grid grid-cols-1 my-2 md:grid-cols-3 gap-4">
        <div className="relative">
        <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleFormChange}
            required
            className={`peer w-full border text-sm border-[#dddddd] px-3 py-3 pt-5 bg-white placeholder-transparent ${
            errors.city ? "border-red-500" : ""
            }`}
        />
        <span className="absolute left-3 text-sm text-[#696969] transition-all duration-200 top-1 
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base 
            peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-gray-600">
            City <span className="text-red-500">*</span>
        </span>
        {errors.city && (
            <p className="text-red-500 text-xs mt-1">{errors.city}</p>
        )}
        </div>
          <div>
            <select
              name="state"
              value={formData.state}
              required
              onChange={handleFormChange}
              className={`w-full border border-gray-300 bg-white rounded px-3 py-4  ${
                errors.state ? "border-red-500" : ""
              }`}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-red-500 text-xs mt-1">{errors.state}</p>
            )}
          </div>

     
            <div className="relative">
            <input
              type="text"
              name="pinCode"
              maxLength="6"
              pattern="\d{6}"
              placeholder="Postal/Zip Code"
                value={formData.pinCode}
                onChange={handleFormChange}
              required
                className={`peer w-full border text-sm border-[#dddddd] px-3 py-3 bg-white pt-5  placeholder-transparent ${
                  errors.pinCode ? "border-red-500" : ""
                }`}
            />
            <span className="absolute left-3 text-sm text-[#696969] transition-all duration-200 top-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-gray-600">
              Zip Code <span className="text-red-500">*</span>
            </span>
            {errors.zip && (
              <p className="text-red-500 text-xs mt-1">{errors.zip}</p>
            )}
          </div>
        </div>
        
          <div className="relative my-2">
            <input
              type="tel"
              name="phoneNumber"
              required
              pattern="\d{10}"
              placeholder="Phone"
                value={formData.phoneNumber}
                onChange={handleFormChange}
                className={`peer w-full border text-sm border-[#dddddd] px-3 bg-white py-3 pt-5  placeholder-transparent ${
                  errors.phoneNumber ? "border-red-500" : ""
                }`}
            />
            <span className="absolute left-3 text-sm text-[#696969] transition-all duration-200 top-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-gray-600">
              Phone <span className="text-red-500">*</span>
            </span>
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
          </form>
        )}
      </div>
    </div>
  
  )
}

export default BillingAddress
