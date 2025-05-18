"use client";

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../../../store/slice/userSlice'; 
import { useRouter } from 'next/navigation';

function page() {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRegisterSubmit = async  (e) => {
    e.preventDefault();
    if (!firstname || !lastname || !email || !password) {
      setErrorMessage('All fields are required.');
      return;
    }
    try {
      const resultAction = await dispatch(signupUser({ firstname, lastname, email, password }));
  
      if (signupUser.fulfilled.match(resultAction)) {
        router.push('/account/login'); 
      } else {
        setErrorMessage(resultAction.payload?.message || 'Registration failed.');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred.');
    }

   
  };

  return (
    <div className="flex justify-center items-center bg-[#F3F0ED] p-4">
      <div className="p-8 rounded-lg w-full sm:w-125">
        <h1
          id="login"
          className="text-4xl text-center font-seasons font-light text-gray-900 mt-8 mb-6"
        >
          Create account
        </h1>
        {errorMessage && (
          <div
            className="form__message text-red-700 bg-red-100 p-4 rounded mb-4 border border-red-300"
            tabIndex="-1"
            autoFocus
          >
            <div className="flex items-start space-x-2">
              <svg
                className="w-5 h-5 mt-1 text-red-600"
                aria-hidden="true"
                focusable="false"
                role="presentation"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 8h2v4H9V8zm0 6h2v2H9v-2z" />
              </svg>
              <div>
                <strong className="block">Please adjust the following:</strong>
                <ul className="list-disc ml-6 mt-1 text-sm">
                  <li>
                    {errorMessage.includes('reset your password') ? (
                      <>
                        This email address is already associated with an account. If this account is yours, you can{' '}
                        <a href="/account/login#recover" className="underline text-blue-700">
                          reset your password
                        </a>.
                      </>
                    ) : (
                      errorMessage
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <form
          method="post"
          onSubmit={handleRegisterSubmit}
          id="customer_register"
          acceptCharset="UTF-8"
          noValidate
          className="space-y-4"
        >
          {/* First Name */}
          <div className="relative mb-6">
            <input
              type="text"
              name="firstName"
              id="FirstName"
              required
              autoComplete="off"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="peer w-full px-3 pt-5 pb-1 focus:outline-none placeholder-transparent"
            />
            <span className="absolute left-3 text-sm text-[#696969] transition-all duration-200 top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-gray-600">
              First Name <span className="text-red-500">*</span>
            </span>
          </div>

          {/* Last Name */}
          <div className="relative mb-6">
            <input
              type="text"
              name="lastName"
              id="LastName"
              required
              autoComplete="off"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="peer w-full px-3 pt-5 pb-1 focus:outline-none placeholder-transparent"
            />
            <span className="absolute left-3 text-sm text-[#696969] transition-all duration-200 top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-gray-600">
              Last Name <span className="text-red-500">*</span>
            </span>
          </div>

          {/* Email */}
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
              className="peer w-full px-3 pt-5 pb-1 focus:outline-none placeholder-transparent"
            />
            <span className="absolute left-3 text-sm text-[#696969] transition-all duration-200 top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-gray-600">
              Email <span className="text-red-500">*</span>
            </span>
          </div>

          {/* Password */}
          <div className="relative mb-6">
            <input
              type="password"
              name="password"
              id="CustomerPassword"
              required
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="peer w-full px-3 pt-6 pb-2 focus:outline-none placeholder-transparent"
            />
            <span className="absolute left-3 text-sm text-[#696969] transition-all duration-200 top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-gray-600">
              Password <span className="text-red-500">*</span>
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-secondry rounded-md hover:cursor-pointer"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
