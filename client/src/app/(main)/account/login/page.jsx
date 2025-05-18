"use client";
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { loginUser } from "../../../../store/slice/userSlice";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
function page() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const dispatch = useDispatch();
    const router = useRouter();
    const handleLoginSubmit = async (e) => {
      e.preventDefault();
  
      const formData = {
        email,
        password,
      };
  
      try {
        const response = await dispatch(loginUser(formData)).unwrap(); 
        if (response) {
          router.push('/account');
        }
      } catch (error) {
        console.error('Login failed:', error);
       
      }
    };
      return (
        <div className="flex justify-center items-center   bg-[#F3F0ED] p-4">
          <div className="  p-8 rounded-lg w-full sm:w-125">
            
            <h1 id="login" className="text-4xl  text-center font-seasons font-light text-gray-900 mt-8 mb-6">Login</h1>
            <form method="post" onSubmit={handleLoginSubmit} id="customer_login" acceptCharset="UTF-8" data-login-with-shop-sign-in="true" noValidate className="space-y-4">
                <div className="relative mb-6">
                <input
                  type="email"
                  name="email"
                  id="CustomerEmail"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="peer w-full border border-[#dddddd] px-3 pt-5 pb-1 focus:outline-none placeholder-transparent"
                />
                <span className="absolute left-3 text-sm text-[#696969] transition-all duration-200 top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-gray-600">
                  Email <span className="text-red-500">*</span>
                </span>
              </div>

                <div className="relative mb-6">
                <input
                  type="password"
                  name="password"
                  id="CustomerPassword"
                  required
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Password"
                  className="peer w-full border border-[#dddddd] px-3 pt-6 pb-2 focus:outline-none  placeholder-transparent"
                />
                <span className="absolute left-3 text-sm text-[#696969] transition-all duration-200 top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-gray-600">
                  Password <span className="text-red-500">*</span>
                </span>
              </div>




              <Link href="/account/forgot-password" className="block text-center">Forgot your password?</Link>
              <button type="submit" className="w-full py-3 bg-primary text-secondry rounded-md hover:cursor-pointer">
                SIGN IN
              </button>
              <a
                href="/account/register"
                className="block text-center text-sm  mt-4"
                >
                Create account
                </a>
            </form>
          </div>
        </div>
      );
}

export default page



