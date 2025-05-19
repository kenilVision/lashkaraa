"use client";
import React , {useState} from 'react' 
import AccountSection from '@/components/checkout/information/AccountSection'
import ShipTo from '@/components/checkout/information/ShipTo'
import {ArrowLeft} from 'lucide-react'
import { useSelector } from "react-redux";
import { useCheckout } from "@/context/checkoutContext";
import { useRouter } from 'next/navigation'
import Link from 'next/link';
function page() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const { shippingAddress, setOrderInfo } = useCheckout();
  const [errors, setErrors] = useState({});

     const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.firstname?.trim()) newErrors.firstname = "First name is required";
    if (!formData.lastname?.trim()) newErrors.lastname = "Last name is required";
    if (!formData.address1?.trim()) newErrors.address1 = "Address1 is required";
    if (!formData.address2?.trim()) newErrors.address2 = "Address2 is required";
    if (!formData.city?.trim()) newErrors.city = "City is required";
    if (!formData.state?.trim()) newErrors.state = "State is required";

    const pincodeStr = formData.pincode?.toString().trim();
    if (!pincodeStr) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(pincodeStr)) newErrors.pincode = "Pincode must be 6 digits";

    const phoneStr = formData.phone?.toString().trim();
    if (!phoneStr) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phoneStr)) newErrors.phone = "Phone number must be 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleContinueToShipping = () => {
    if (!shippingAddress || !user?._id) {
      alert("Please fill in your shipping address and make sure you're logged in.");
      return;
    }

     const formData = {
      firstname: shippingAddress.firstname,
      lastname: shippingAddress.lastname,
      address1: shippingAddress.address1,
      address2: shippingAddress.address2,
      city: shippingAddress.city,
      state: shippingAddress.state,
      pincode: shippingAddress.pinCode,
      phone: shippingAddress.phoneNumber
    };

    const isValid = validateForm(formData);
    if (!isValid) return;

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
    errors={errors}
   user={user}
      />
    <div className="flex flex-col gap-4 md:flex-row md:justify-between items-center mt-6">
      <Link
        href="/cart"
        className="flex items-center text-sm text-gray-600 hover:text-black transition"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span>Return to bag</span>
      </Link>

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
