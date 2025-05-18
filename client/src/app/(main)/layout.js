import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PromotionalBanner from '@/components/PromotionalBanner'
import React, { Fragment } from 'react'

const Layout = ({ children }) => {
    
    return (
        <Fragment>
                <PromotionalBanner />
                <Header />
                <main className=''>
                {children}
                </main>
                <Footer />
        </Fragment>
    )
}

export default Layout