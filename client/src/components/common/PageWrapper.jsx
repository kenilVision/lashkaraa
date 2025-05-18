"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

const PageWrapper = ({ children }) => {
    const pathname = usePathname();

    // Paths where breadcrumb should be hidden
    const hiddenBreadCrumbPaths = ['/pages/company-info','/pages/our-campaigns'];
    
    return (
        <div className={`w-full ${hiddenBreadCrumbPaths.includes(pathname) ? "" : "max-w-[45.625rem]"} mx-auto`}>
            {children}
        </div>
    )
}

export default PageWrapper