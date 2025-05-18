'use client';

import React, { useEffect, useRef, useState } from 'react'
import Logo from './common/Logo';
import { menus, womenItems } from '@/constant/constant';
import Sidebar from './Sidebar';
import Button from './common/Button';
import MegaMenu from './common/MegaMenu';
import DiscoverMenu from './common/DiscoverMenu';
import Link from 'next/link';
import SearchIcon from './icons/SearchIcon';
import UserIcon from './icons/UserIcon';
import HeartIcon from './icons/HeartIcon';
import ShoppingIcon from './icons/ShoppingIcon';
import MobileLogo from './common/MobileLogo';
import ModalCloseIcon from './icons/ModalCloseIcon';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories  } from '../store/slice/categorySlice';
import { useRouter } from 'next/navigation'; // For App Router (Next.js 13+)

import { fetchWishlist } from "../store/slice/wishlistSlice";
import {fetchCart , addToCart , removeFromCart} from "../store/slice/cartSlice"
import Cookies from "js-cookie";
import WishlistSidebar from './WishlistSidebar';
import CartSidebar from './CartSidebar';
import { set } from 'date-fns';

const Header = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredDiscover, setIsHoveredDiscover] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [Wishlist, setWishlistIsOpen] = useState(false);
    const [cart, setCartIsOpen] = useState(false);
    const wrapperRef = useRef(null);
    const router = useRouter();
// ----Kenil ------------------
const dispatch = useDispatch();
const { categories, loading } = useSelector((state) => state.category);
const { items: cartItems } = useSelector((state) => state.cart);
const { items: wishlistItem } = useSelector((state) => state.wishlist);

useEffect(() => {
  dispatch(fetchCategories());

  const token = Cookies.get('Token'); 
  if (token) {
    dispatch(fetchWishlist());
    dispatch(fetchCart());
  }
}, [dispatch]);


const generateSlug = (name) => {
    return name
      .toLowerCase()                    // Convert to lowercase
      .replace(/[^a-z0-9\s-]/g, '')     // Remove special characters
      .replace(/\s+/g, '-')             // Replace spaces with hyphens
      .replace(/-+/g, '-');             // Replace multiple hyphens with a single hyphen
  };

// ----------------------------------

        const icons = [
        {
            icon: <SearchIcon />,
            hidden: false,
            onClick: () => setIsSearchOpen(!isSearchOpen),
            countTrue: false
        },
        {
            icon: <UserIcon />,
            hidden: false,
            onClick: () => {
                router.push('/account');
            },
            countTrue: false
        },
        {
            icon: <HeartIcon />,
            hidden: true,
            onClick: () => {
                setWishlistIsOpen(true);
            },
            countTrue: true,
            count: wishlistItem?.length
        },
        {
            icon: <ShoppingIcon />,
            hidden: false,
            onClick: () => {
                setCartIsOpen(true);
            },
            countTrue: true,
            count: cartItems?.length
        },
    ];

    const handleMouseEnter = () => {
        setIsHovered(true);
        setIsHoveredDiscover(false);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleDiscoverMouseEnter = () => {
        setIsHoveredDiscover(true);
        setIsHovered(false);
    };

    const handleDiscoverMouseLeave = () => {
        setIsHoveredDiscover(false);
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
        };

        if (isSearchOpen) {
            document.body.classList.add('!overflow-hidden');
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.body.classList.remove('!overflow-hidden');
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.body.classList.remove('!overflow-hidden');
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSearchOpen]);

    return (
        <header  className='bg-white border-b border-gray-200 mt-8 sticky top-0 z-[60]'>
            <nav className='w-full max-w-[1500px] lg:py-[10px] py-[1px] md:px-[3.125rem] px-4 mx-auto'>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <div className="lg:hidden pe-1">
                            <Button className={'border-0 !p-0'} onClick={() => setSidebarOpen(true)}>
                                <svg width="40" height="9" aria-hidden="true" focusable="false" role="presentation" className="text-[#001D3D]" viewBox="0 0 40 9" fill="#001D3D" xmlns="http://www.w3.org/2000/svg">
                                    <line y1="0.5" x2="40" y2="0.5" stroke="currentColor"></line>
                                    <line y1="8.5" x2="40" y2="8.5" stroke="currentColor"></line>
                                </svg>
                            </Button>
                        </div>
                        <Logo />
                        <MobileLogo />
                    </div>
                    <ul className='lg:flex gap-6 hidden'>
                        {/* <li
                            className={`relative tracking-[1px] text-[14.5px] text-primary cursor-pointer ${isHovered ? 'underline' : ''}`}
                            onMouseEnter={handleMouseEnter}
                        >
                            <span>Women</span>
                        </li>
                        <li
                            className={"relative tracking-[1px] text-[14.5px] text-primary hover:underline transition duration-300 cursor-pointer"}
                        >
                            <Link href={'/men'} ><span>Men</span></Link>
                        </li>
                        <li
                            className={"relative tracking-[1px] text-[14.5px] text-primary hover:underline transition duration-300 cursor-pointer"}
                            onMouseEnter={handleDiscoverMouseEnter}
                        >
                            <span>Discover</span>
                        </li> */}

                        {loading ? (
                            <div className="flex gap-4">
                            <div className="w-16 h-4 bg-gray-300 rounded animate-pulse" />
                            <div className="w-20 h-4 bg-gray-300 rounded animate-pulse" />
                            <div className="w-24 h-4 bg-gray-300 rounded animate-pulse" />
                            </div>
                        ) : (
                            <>
                            {/* <li
                                className={`relative tracking-[1px] text-[14.5px] text-primary cursor-pointer ${isHovered ? 'underline' : ''}`}
                                onMouseEnter={handleMouseEnter}
                            >
                                <span>Women</span>
                            </li>
                            <li
                                className="relative tracking-[1px] text-[14.5px] text-primary hover:underline transition duration-300 cursor-pointer"
                            >
                                <Link href={'/men'}><span>Men</span></Link>
                            </li> */}
                            {categories
                            .map((cat) => (
                            <li
                                key={cat.name}
                                className={`relative tracking-[1px] text-[14.5px] text-primary cursor-pointer hover:underline transition duration-300
                                ${cat.name === 'Women' && isHovered ? 'underline' : ''}`}
                                onMouseEnter={cat.name === 'Women' ? handleMouseEnter : undefined}
                            >
                                <Link href={`/collection/${generateSlug(cat.name)}`}>
                                <span>{cat.name}</span>
                                </Link>
                            </li>
                            ))}
                            <li
                                className="relative tracking-[1px] text-[14.5px] text-primary hover:underline transition duration-300 cursor-pointer"
                                onMouseEnter={handleDiscoverMouseEnter}
                            >
                                <span>Discover</span>
                            </li>
                            </>
                        )}
                    </ul>
                    <div className='p-2 pe-0'>
                        <ul className='flex items-center lg:gap-6 gap-[1.25rem]'>
                            <div className="w-full px-4"></div>
                             {
                                icons?.map((icon, index) => {
                                    return (
                                        <li onClick={icon?.onClick} key={index} className={`relative cursor-pointer transform transition-transform duration-200 hover:scale-105 text-[#001D3D] ${icon?.hidden ? 'hidden md:block' : ''}`}>
                                            {icon.icon}
                                            {
                                                (icon?.countTrue && icon?.count !== 0) &&
                                                <span className="absolute bottom-[-2px] left-[12px] size-[17px] rounded-full bg-primary text-secondry text-[9px] flex justify-center items-center">{icon?.count}</span>
                                            }
                                        </li>
                                    )
                                }
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            {/* Mobile Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
                menuItems={menus}
            />
            {!loading && isHovered && (
                <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <MegaMenu categories={categories.find(cat => cat.name === 'Women')?.subcategories || []} />
                </div>
            )}
            {isHoveredDiscover &&
                <div
                    onMouseEnter={handleDiscoverMouseEnter}
                    onMouseLeave={handleDiscoverMouseLeave}
                >
                    <DiscoverMenu setIsHoveredDiscover={setIsHoveredDiscover} />
                </div>}

                <WishlistSidebar
                isOpen={Wishlist}
                setIsOpen={setWishlistIsOpen}
                menuItems={womenItems}

                />
                <CartSidebar
                isOpen={cart}
                setIsOpen={setCartIsOpen}
                menuItems={womenItems}

                />
            {/* Search Input Overlay */}
            {isSearchOpen && (
                <div className="absolute left-0 right-0 top-full h-screen !bg-[#001d3d80] z-20 animate-slide-down">
                    <div ref={wrapperRef}  className='bg-[#F3F0ED]'>
                        <div className="relative w-full max-w-[1500px] md:px-[3.125rem] px-4 mx-auto py-2">
                            <div className="relative flex items-center bg-white px-3">
                                {/* Search Icon */}
                                <SearchIcon size={18} />

                                {/* Input Field */}
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder=""
                                    className="w-full pl-3 pr-12 py-2 outline-none transition-colors peer"
                                />

                                {/* Floating Label */}
                                <label
                                    className="absolute tracking-[0.8px] left-10 top-1/2 -translate-y-1/2 text-[12px] text-primary peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-xs peer-placeholder-shown:text-primary peer-placeholder-shown:-translate-y-1/2 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-primary peer-focus:-translate-y-0"
                                >
                                    Search
                                </label>

                                {/* Close Icon */}
                                <Button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="absolute cursor-pointer right-3 border-0 !p-1 transform transition-transform duration-200 hover:scale-105"
                                    aria-label="Close search"
                                >
                                    <ModalCloseIcon />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header;