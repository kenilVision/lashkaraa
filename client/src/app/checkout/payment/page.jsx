"use client"
import React , {useState  } from 'react'
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
    const [selectedType, setSelectedType] = useState("same");
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

          const phoneStr = formData.phoneNumber?.toString().trim();
          if (!phoneStr) newErrors.phoneNumber = "Phone number is required";
          else if (!/^\d{10}$/.test(phoneStr)) newErrors.phoneNumber = "Phone number must be 10 digits";

          setErrors(newErrors);
          return Object.keys(newErrors).length === 0;
        };


    const handlePayNow = async () => {
        try {
          const paymentMethod = "card";
          
      
          if (selectedType === "different") {
            const isValid = validateForm(billingAddress);
            if (!isValid) return;  // Stop if validation fails
          }

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
    <BillingAddress  errors={errors} selectedType = {selectedType} setSelectedType = {setSelectedType}/>
      

     <div className="flex flex-col gap-4 md:flex-row md:justify-between items-center mt-6">
      <Link
                href="/checkout/shipping"
        className="flex items-center text-sm text-gray-600 hover:text-black transition"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span>Return to bag</span>
      </Link>

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
