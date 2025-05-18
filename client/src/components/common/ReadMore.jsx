import Link from 'next/link';
import React from 'react'

const ReadMore = ({ path = '/' }) => {
    return (
        <div className='w-full pt-10 pb-12'>
            <div className='w-full max-w-[1500px] mx-auto md:px-12 px-4'> 
                <Link href={path} className='text-sm text-primary underline hover:bg-[#e2e2e2]'>Read More</Link>
            </div>
        </div>
    )
}

export default ReadMore;
