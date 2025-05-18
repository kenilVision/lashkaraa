import Banner from '@/components/common/Banner'
import Breadcrumb from '@/components/common/Breadcrumb'
import PageWrapper from '@/components/common/PageWrapper'
import SideBarMenu from '@/components/common/SideBarMenu'
import React from 'react'

const Layout = ({ children }) => {
    return (
        <div className="w-full bg-background">
            <Breadcrumb isShowNested={false} />
            <Banner />
            <div className="relative">
                <SideBarMenu />
                <PageWrapper children={children} />
            </div>
        </div>
    )
}

export default Layout