import React , {useState, useEffect} from "react";
import { useCheckout } from "@/context/checkoutContext";

function ShipTo({user , errors}) {
    const { shippingAddress, setShippingAddress } = useCheckout();

    const [selectedAddress, setSelectedAddress] = useState("default");
    const [showNewAddressForm, setShowNewAddressForm] = useState(false);
    const [formData, setFormData] = useState({
        country: "India",
        firstname:"",
        lastname:"",
        phoneNumber: "",
        pinCode: "",
        address1: "",
        address2: "",
        state: "",
        city: "",
      });
      const states = ["Gujarat"];
      useEffect(() => {
        if (selectedAddress === "default") {
          // Fill form with user default address
          const addr = user.address || {};
          setFormData({
            country: addr.country || "India",
            firstname:user.firstname,
            lastname:user.lastname,
            phoneNumber: addr.phoneNumber || "",
            pinCode: addr.pinCode || "",
            address1: addr.address1 || "",
            address2: addr.address2 || "",
            state: addr.state || "",
            city: addr.city || "",
          });

          setShippingAddress(addr);
          setShowNewAddressForm(false);
        } else if (selectedAddress === "new") {
          setFormData({
            country: "India",
            firstname:"",
            lastname:"",
            phoneNumber: "",
            pinCode: "",
            address1: "",
            address2: "",
            state: "",
            city: "",
          });
          setShippingAddress(null);
          setShowNewAddressForm(true);
        }
      }, [selectedAddress, setShippingAddress, user]);

      function handleSelectChange(e) {
        setSelectedAddress(e.target.value);
      }
    
      function handleFormChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      }

      useEffect(() => {
          setShippingAddress({ ...formData });
      }, [formData, setShippingAddress, showNewAddressForm]);
  return (
    <>
      <div className="rounded-b-lg">
        <label className="block font-medium mb-1 text-[#000000]   text-xl">Shipping address</label>
        <select
          className="w-full border bg-white border-gray-300 rounded px-3 py-4 "
          value={selectedAddress}
          onChange={handleSelectChange}
        >
          <option value="default">
            {user.address?.address1}, {user.address?.address2}, {user.address?.city}, {user.address?.state} - {user.address?.pinCode}
          </option>
          <option value="new">Add New Address</option>
        </select>
      </div>

      <form
        className="space-y-4 mt-2"
           onSubmit={(e) => e.preventDefault()}
      >
        {/* Form fields for address input */}
        <div>
        
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        

        <div className="relative">
          <input
            type="text"
            name="address1"
            placeholder="Address Line 1"
            value={formData.address1}
            onChange={handleFormChange}
            required
            className={`peer w-full border text-sm border-[#dddddd] px-3 py-3 pt-5 bg-white  placeholder-transparent ${
              errors.address1 ? "border-red-500" : ""
            }`}
          />
          <span className="absolute left-3 text-sm text-[#696969] transition-all duration-200 top-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-gray-600">
            Address Line 1 <span className="text-red-500">*</span>
          </span>
          {errors.address1 && (
            <p className="text-red-500 text-xs mt-1">{errors.address1}</p>
          )}
        </div>

        <div className="relative">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        
          <div className="relative">
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
    </>
  );
}

export default ShipTo;
