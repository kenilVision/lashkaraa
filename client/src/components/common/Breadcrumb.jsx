"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumb = ({ isShowNested = true }) => {
    const pathname = usePathname();

    // Paths where breadcrumb should be hidden
    const hiddenBreadCrumbPaths = ['/pages/contact', '/pages/faq', '/pages/size-chart','/pages/company-info','/pages/our-campaigns']; // add your custom paths here

    // Check if current path should hide breadcrumb
    if (hiddenBreadCrumbPaths.includes(pathname)) return null;

    const getBreadcrumbItems = () => {
        if (!pathname) return [];

        const paths = pathname.split('/').filter(path => path !== '');

        let items;

        if (isShowNested) {
            items = paths.map((path, index) => {
                const href = `/${paths.slice(0, index + 1).join('/')}`;
                const label = path.charAt(0).toUpperCase() + path.slice(1);
                return {
                    label: label.replace(/-/g, ' '),
                    path: href,
                };
            });
        } else {
            const last = paths[paths.length - 1];
            const href = `/${last}`;
            items = [{
                label: last.charAt(0).toUpperCase() + last.slice(1).replace(/-/g, ' '),
                path: href
            }];
        }

        // Always add Home at the beginning
        return [{ label: 'Home', path: '/' }, ...items];
    };

    const items = getBreadcrumbItems();

    return (
        <nav aria-label="Breadcrumb" className='w-full max-w-[1500px] md:px-12 px-2 py-2 mx-auto'>
            <ol className="flex items-center space-x-1 text-sm p-2">
                {items.map((item, index) => (
                    <React.Fragment key={item.path}>
                        {index > 0 && (
                            <li className="flex items-center align-middle">
                                <ChevronRight size={11} className="text-primary/60 mt-[3px]" />
                            </li>
                        )}
                        <li className='text-primary/60'>
                            {index === items.length - 1 ? (
                                <span className="font-medium text-primary/60 text-[11px]">{item.label}</span>
                            ) : (
                                <Link
                                    href={item.path}
                                    className="hover:text-primary hover:underline text-primary/60 transition-colors text-[11px]"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    </React.Fragment>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
