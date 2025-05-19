"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout , fetchUser , updateUserProfile } from "../../../store/slice/userSlice"; // Update path accordingly
import Cookies from "js-cookie";
import OrderPage from "@/components/order/OrderPage";

function Page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Information');
    
  const [localLoading, setLocalLoading] = useState(true);


  const dispatch = useDispatch();
  const { firstname ,lastname ,email,  address, loading: userLoading } = useSelector((state) => state.user);

  useEffect(() => {
    
    const token = Cookies.get('Token');

    if (!token) {
      router.push('/account/login');
    } else {
      if (!firstname) {
        dispatch(fetchUser()).finally(() => {
          setLocalLoading(false);
        });
      } else {
        setLocalLoading(false);
      }
    }
  }, [dispatch, router, firstname]); 

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    country: 'India',
    zip: '',
    phone: '',
  });
  useEffect(() => {
    if (firstname) {
      setForm({
        first_name: firstname,
        last_name: lastname,
        company: address.company,
        address1: address?.address1 || '',
        address2: address?.address2 || '',
        city: address?.city || '',
        country: address?.country || 'India',
        zip: address?.pinCode || '',
        phone: address?.phoneNumber || '',
      });
    }
  }, [firstname, lastname, email, address]);

const handleChange = (e) => {
const { name, value, type, checked } = e.target;
setForm({
    ...form,
    [name]: type === 'checkbox' ? checked : value,
});
};

const handleSubmit = (e) => {
e.preventDefault();
const formData = {
    firstname: form.first_name,
    lastname: form.last_name,
    address: {
        company: form.company,
      country: form.country,
      address1: form.address1,
      address2: form.address2,
      city: form.city,
      state: form.state,
      pinCode: form.zip,
      phoneNumber: form.phone,
    }
  };

  dispatch(updateUserProfile(formData));
};

  if (localLoading || userLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }
            //
          
              
              // Sync form values when user data is loaded

  

  return (
    <div className="bg-[#F3F0ED] w-full font-seasons font-light flex justify-center">
    <div className=" max-w-[800px] w-full px-3 md:px-[25px] md:py-[17px] lg:px-[50px] lg:py-[36px]  ">
        {/* <h1 className=" font-lg  text-gray-900  ">Welcome Kenil Ptil</h1>
         */}

    <h1 className="text-3xl w-full sm:text-4xl text-center font-light uppercase tracking-wide">
        Welcome {firstname} {lastname}
      </h1>

      <div className="text-center mt-2">
      <button
            className="text-sm underline hover:text-[#B88E2F]"
            onClick={() => {
                dispatch(logout());
                router.push("/account/login");
            }}
            >
            Log out
            </button>
      </div>


      <div className="flex w-full  justify-between flex-wrap gap-8 text-xl mt-8">
            <div
                className={`pb-2 cursor-pointer ${activeTab === 'Information' ? 'border-b-2 border-secondry  ' : ''}`}
                onClick={() => setActiveTab('Information')}
            >
                Information
            </div>
            <div
                className={`pb-2 cursor-pointer ${activeTab === 'Orders' ? 'border-b-2 border-secondry' : ''}`}
                onClick={() => setActiveTab('Orders')}
            >
                Orders
            </div>
            <div
                className={`pb-2 cursor-pointer ${activeTab === 'Addresses' ? 'border-b-2 border-secondry' : ''}`}
                onClick={() => setActiveTab('Addresses')}
            >
                Addresses
            </div>
            <div
                className={`pb-2 cursor-pointer ${activeTab === 'Loyalty' ? 'border-b-2 border-secondry' : ''}`}
                onClick={() => setActiveTab('Loyalty')}
            >
                Loyalty
            </div>
            </div>


            {activeTab === 'Information' && (
            <div className="mt-10 w-full font-seasons font-light px-2 mx-auto">
                     {/* Account Info */}
                <h2 className="text-lg font-semibold mb-3">ACCOUNT INFORMATION</h2>
                <p className="mb-1"><span className="font-medium">Name:{firstname} {lastname}</span> </p>
                <p className="mb-6"><span className="font-medium">Email:{email}</span> </p>

                {/* Change Password Section */}
                <h2 className="text-lg font-semibold mb-3">CHANGE PASSWORD</h2>
                <p className="mb-3 text-sm text-gray-700">
                We will send you an email to reset your password.
                </p>

                <form
                // onSubmit={(e) => {
                //     e.preventDefault();
                //     onPasswordReset(user.email);
                // }}
                >
                    <div className="relative mb-6">
               <input
                  type="email"
                  name="email"
                  id="CustomerEmail"
                  required
                  autoComplete="off"
                  value={email}
                //   onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="peer w-full  px-3 pt-5 pb-1 focus:outline-none placeholder-transparent"
                />
                <span className="absolute left-3 text-sm text-[#696969] transition-all duration-200 top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-gray-600">
                  Email <span className="text-red-500">*</span>
                </span>
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#0A1D3B] text-white py-3 rounded hover:bg-[#122B55] transition"
                >
                    CHANGE PASSWORD
                </button>
                </form>
            </div>
            )}

            {activeTab === 'Orders' && (
                <>
                 <div className="mt-10  mx-auto">
                    <OrderPage/>
                     </div>
                </>
            )}

            {activeTab === 'Addresses' && (
                <>
               <div className="mt-10 mx-auto">
                     
                        <form
                        onSubmit={handleSubmit}
                        className="space-y-4  rounded  mx-auto"
                        >
                            <h2 className="text-lg  mb-3">Your Default Address</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                            <div className="relative mb-2">
                                <input
                                type="text"
                                name="first_name"
                                id="CustomerEmail"
                                required
                                autoComplete="off"
                                value={form.first_name}
                                onChange={handleChange}
                                placeholder="First name"
                                className="peer w-full border border-[#dddddd] px-3 pt-5 pb-1 focus:outline-none placeholder-transparent"
                                />
                                <span className="absolute left-3 text-sm text-[#696969] transition-all duration-200 top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-gray-600">
                                First name <span className="text-red-500">*</span>
                                </span>
                            </div>
                            
                            <div className="relative mb-2">
                                <input
                                type="text"
                                name="last_name"
                                id="CustomerEmail"
                                required
                                autoComplete="off"
                                value={form.last_name}
                                onChange={handleChange}
                                placeholder="Last name"
                                className="peer w-full border border-[#dddddd] px-3 pt-5 pb-1 focus:outline-none placeholder-transparent"
                                />
                                <span className="absolute left-3 text-sm text-[#696969] transition-all duration-200 top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-gray-600">
                                First name <span className="text-red-500">*</span>
                                </span>
                            </div>

                            </div>
                            <div>
                           
                        </div>

                        <div className="relative mb-2">
                                <input
                               type="text"
                               name="company"
                               value={form.company}
                               onChange={handleChange}
                               placeholder="Company"
                                autoComplete="off"
                                className="peer w-full border border-[#dddddd] px-3 pt-5 pb-1 focus:outline-none placeholder-transparent"
                                />
                                <span className="absolute left-3 text-sm text-[#696969] transition-all duration-200 top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-gray-600">
                                Company <span className="text-red-500">*</span>
                                </span>
                            </div>

                            <div className="relative mb-2">
                            <input
                            type="text"
                            name="address1"
                            value={form.address1}
                            onChange={handleChange}
                            placeholder="Address 1"
                            className="peer w-full border border-[#dddddd] px-3 pt-5 pb-1 focus:outline-none placeholder-transparent"
                            />
                            <span className="absolute left-3 text-sm text-[#696969] transition-all duration-200 top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-gray-600">
                            Address 1
                            </span>
                        </div>

                        <div className="relative mb-2">
                            <input
                            type="text"
                            name="address2"
                            value={form.address2}
                            onChange={handleChange}
                            placeholder="Address 1"
                            className="peer w-full border border-[#dddddd] px-3 pt-5 pb-1 focus:outline-none placeholder-transparent"
                            />
                            <span className="absolute left-3 text-sm text-[#696969] transition-all duration-200 top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-gray-600">
                            Address 1
                            </span>
                        </div>
                        <div className="relative mb-2">
                        <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="peer w-full border border-[#dddddd] px-3 pt-5 pb-1 focus:outline-none placeholder-transparent"
                        />
                        <span className="absolute left-3 text-sm text-[#696969] transition-all duration-200 top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-gray-600">
                        City
                        </span>
                    </div>

                    <div className=" mb-2">
                            <span className="text-sm text-[#696969]">
                            Country / Region
                            </span>
                            <select
                            name="country"
                            value={form.country}
                            onChange={handleChange}
                            className="peer w-full border border-[#dddddd] p-3 focus:outline-none"
                            >
                            <option value="India">India</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Australia">Australia</option>
                            </select>
                        </div>


                        <div className="relative mb-2">
                        <input
                        type="number"
                        name="zip"
                        value={form.zip}
                        onChange={handleChange}
                        placeholder="Postal / ZIP Code"
                        className="peer w-full border border-[#dddddd] px-3 pt-5 pb-1 focus:outline-none placeholder-transparent"
                        />
                        <span className="absolute left-3 text-sm text-[#696969] transition-all duration-200 top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-gray-600">
                        ZIP Code
                        </span>
                    </div>

                    <div className="relative mb-2">
                        <input
                        type="number"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className="peer w-full border border-[#dddddd] px-3 pt-5 pb-1 focus:outline-none placeholder-transparent"
                        />
                        <span className="absolute left-3 text-sm text-[#696969] transition-all duration-200 top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-gray-600">
                        Phone
                        </span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                        type="checkbox"
                        name="default"
                        id="default"
                        />
                        <label htmlFor="default" className="text-sm">
                        Set as default address
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                            Update address
                        </button>
                        </form>
                     </div> 
                </> 
            )}
    </div>
    </div>
  );
}

export default Page;
