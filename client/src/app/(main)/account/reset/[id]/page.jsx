import Button from '@/components/common/Button'
import Paragraph from '@/components/common/Paragraph'
import Link from 'next/link'
import React from 'react'

const ResetPassword = () => {
    return (
        <div className="flex justify-center items-center bg-[#F3F0ED] p-4">
            <div className="px-6 rounded-lg w-full sm:w-125 text-primary mt-2">
                <h1 className='text-[40px] font-seasons text-center'>Reset account password</h1>
                <Paragraph className="text-center my-2">Enter a new password</Paragraph>
                <form className='mt-8'>
                    <div className="relative mb-4">
                        <input
                            type="password"
                            name="password"
                            id="CustomerPassword"
                            required
                            autoComplete="off"
                            placeholder="Password"
                            className="peer w-full px-3 pt-5 pb-1 focus:outline-none placeholder-transparent"
                        />
                        <span className="absolute left-3 text-[12px] text-[#001d3d] transition-all duration-200 top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-[#001d3d] peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[12px] peer-focus:text-[#001d3d]">
                            Password
                        </span>
                    </div>
                    <div className="relative mb-5">
                        <input
                            type="password"
                            name="confirmPassword"
                            id="CustomerEmail"
                            required
                            autoComplete="off"
                            placeholder="Confirm password"
                            className="peer w-full px-3 pt-5 pb-1 focus:outline-none placeholder-transparent"
                        />
                        <span className="absolute left-3 text-[12px] text-[#001d3d] transition-all duration-200 top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-[#001d3d] peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[12px] peer-focus:text-[#001d3d]">
                            Confirm password
                        </span>
                    </div>
                    <Button type='submit' className={"bg-primary mb-8 text-secondry !py-3 uppercase text-sm w-full border-primary !rounded"}>Reset password</Button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword