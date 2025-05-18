import Image from 'next/image'
import React from 'react'

const Logo = () => {
    return (
        <div className='p-2 px-0 lg:block hidden'>
            <Image
                src={'/assets/logo.png'}
                alt='Logo'
                width={200}
                height={19}
            />
        </div>
    )
}

export default Logo