import Button from '@/components/common/Button'
import Paragraph from '@/components/common/Paragraph'
import Link from 'next/link'
import React from 'react'

const ForgotPassword = () => {
    return (
        <div className="flex justify-center items-center bg-[#F3F0ED] p-4">
            <div className="px-6 rounded-lg w-full sm:w-125 text-primary mt-2">
                <h1 className='text-[40px] font-seasons text-center'>Reset your password</h1>
                <Paragraph className="text-center my-2">We will send you an email to reset your password</Paragraph>
                <form className='mt-8'>
                    <div className="relative mb-6">
                        <input
                            type="email"
                            name="email"
                            id="CustomerEmail"
                            required
                            autoComplete="off"
                            placeholder="Email"
                            className="peer w-full px-3 pt-5 pb-1 focus:outline-none placeholder-transparent"
                        />
                        <span className="absolute left-3 text-[12px] text-[#001d3d] transition-all duration-200 top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-[#001d3d] peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[12px] peer-focus:text-[#001d3d]">
                            Email
                        </span>
                    </div>
                    <Button type='submit' className={"bg-primary text-secondry !py-3 uppercase text-sm w-full border-primary !rounded"}>Submit</Button>
                    <div className='flex justify-center items-center mt-3 my-6'>
                        <Link href={'/account/login'} className='underline text-[13px]'>Cancel</Link>
                    </div>
                </form> 
            </div>
        </div>
    )
}

export default ForgotPassword