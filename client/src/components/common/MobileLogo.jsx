import Image from 'next/image'
import React from 'react'

const MobileLogo = () => {
    return (
        <div className='p-2 px-0 lg:hidden block'>
            <Image
                src={'/assets/logo.png'}
                alt='Logo'
                width={130}
                height={12.5}
            />
        </div>
    )
}

export default MobileLogo