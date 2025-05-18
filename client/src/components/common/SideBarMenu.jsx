"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const menus = [
    {
        name: "About Us",
        path: "/pages/company-info"
    },
    {
        name: "Contact Us",
        path: "/pages/contact"
    },
    {
        name: "Shipping Info",
        path: "/pages/shipping-information"
    },
    {
        name: "Returns",
        path: "/pages/returns-policy"
    },
    {
        name: "FAQ",
        path: "/pages/faq"
    },
    {
        name: "Sizing Info",
        path: "/pages/size-chart"
    },
    {
        name: "Privacy Policy",
        path: "/pages/privacy-policy"
    },
]

const SideBarMenu = () => {
    const pathname = usePathname();

    // Paths where breadcrumb should be hidden
    const hiddenBreadCrumbPaths = ['/pages/company-info','/pages/our-campaigns']; // add your custom paths here

    // Check if current path should hide breadcrumb
    if (hiddenBreadCrumbPaths.includes(pathname)) return null;

    return (
        <div class="page-width sidebar-menu only absolute left-3 top-[128px] xl:block hidden">
            <ul class="list-unstyled px-[50px]">
                {
                    menus?.map((item, index) => {
                        const isActive = pathname === item.path;
                        return (
                            <li key={index} className="py-[3px]" >
                                <Link href={item.path} class={`${isActive && 'underline underline-offset-[3px]'} uppercase strong text-[13px] hover:underline hover:underline-offset-[3px]`}>{item.name}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div >
    )
}

export default SideBarMenu