"use client";

import React, { Fragment,  useState } from "react";
import {
  Heart,
  TimerReset,
  Truck,
  Mail,
  MessageSquareMore,
  Smartphone,
  PhoneCall,
  Facebook,
  Instagram,
  Twitter,
  X,
  Youtube,
} from "lucide-react";
import GuideModel from "./GuideModel";
import MenSizeGuideModal from "./MenSizeGuideModal";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../store/slice/wishlistSlice";
import {addToCart} from "../store/slice/cartSlice"

// const sizes = {
//   xxs: {
//     bust: '32"',
//     aboveWaist: '26"',
//     waist: '28"',
//     hips: '36"',
//   },
//   xs: {
//     bust: '34"',
//     aboveWaist: '28"',
//     waist: '30"',
//     hips: '38"',
//   },
//   s: {
//     bust: '36"',
//     aboveWaist: '30"',
//     waist: '32"',
//     hips: '40"',
//   },
//   m: {
//     bust: '38"',
//     aboveWaist: '32"',
//     waist: '34"',
//     hips: '42"',
//   },
//   l: {
//     bust: '40"',
//     aboveWaist: '34"',
//     waist: '36"',
//     hips: '44"',
//   },
//   xl: {
//     bust: '42"',
//     aboveWaist: '36"',
//     waist: '38"',
//     hips: '46"',
//   },
// }

const ProductDetail = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [blousePadding, setBlousePadding] = useState('');


  const toggleAccordion = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const socialIcons = [
    { icon: <Facebook className="w-7 h-7" fill="#F3F0ED" />, href: "#" },
    {
      icon: <X className="w-6 h-6" stroke="#F3F0ED" fill="#F3F0ED" />,
      href: "#",
    },
    { icon: <Instagram className="w-6 h-7" fill="#F3F0ED" />, href: "#" },
    { icon: <Twitter className="w-6 h-6" fill="#F3F0ED" />, href: "#" },
  ];

    const dispatch = useDispatch();
  
    const { items: wishlist } = useSelector((state) => state.wishlist);
    const showFitting = selectedSize?.fitting && product?.categorySlug === 'women';
    const showBlousePadding = selectedSize && selectedSize.label !== 'Unstitched' && selectedSize.label !== 'Custom' && selectedSize?.blousePadding == true;
    const isInWishlist = wishlist.some((item) => item.productId._id === product._id);
    const wishlistItem = wishlist.find((item) => item.productId._id === product._id);
  
    const handleWishlistClick = () => {
      if (isInWishlist) {
        dispatch(removeFromWishlist(wishlistItem._id));
      } else {
        dispatch(addToWishlist(product._id));
      }
    };

    const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setBlousePadding(''); // Reset blouse padding selection on size change
  };
    // const tofits = sizes[selectedSize?.toLowerCase()];

  return (
    <div className=" max-w-4xl mx-auto text-[#001d3d]">
      <div className="mb-6">
        <h1 className="text-3xl  font-seasons font-light text-gray-900">
          {product?.name}
        </h1>
      </div>

      <div className="mb-4">
        <div className="text-[20px] font-semibold text-gray-800">
          Rs. {product?.discountedPrice ?? product?.price ?? "0.00"}
        </div>

        {product?.price &&
          product?.discountedPrice &&
          product?.price !== product?.discountedPrice && (
            <div className="text-gray-500 text-sm line-through">
              Rs. {product?.price}
            </div>
          )}
      </div>

      {/* Tax Note */}
      <div className="text-sm text-gray-600 mb-4 border-b " 
      style={{
        marginTop: "-1.5rem",
      }}>Tax included.</div>

      {/* Size Guide Button */}
      <div className="mb-4 flex">
        <button
          type="button"
          className="underline ms-auto hover:cursor-pointer"
          onClick={() => setIsGuideOpen(true)}
        >
          Size guide
        </button>
        {product.categorySlug === "men" ? (
          <MenSizeGuideModal
            isOpen={isGuideOpen}
            onClose={() => setIsGuideOpen(false)}
          />
        ) : (
          <GuideModel
            isOpen={isGuideOpen}
            onClose={() => setIsGuideOpen(false)}
            type={product.groupSlug || product.categorySlug}
          />
        )}
      </div>

      <div className="mb-6 ">
        <p className="mb-2">Select Your Size:</p>
        <div className="flex gap-2 flex-wrap">
          {product?.sizes?.map((size, index) => (
            <button
              key={index}
              value={size.label}
              onClick={() => handleSizeSelect(size)}
              className={`px-4 py-2 border hover:cursor-pointer rounded-md
                ${selectedSize?.label === size.label
                  ? "border-secondry bg-primary text-secondry"
                  : "border-[#001d3d] hover:border-secondry hover:bg-primary hover:text-secondry"
                }`}
            >
              {size.label}
            </button>
          ))}
        </div>


              {showFitting && (
        <div className="flex text-[13px] mt-7 mb-5">
          <div className="option-selector font-medium uppercase pr-4">To Fit:</div>
          <div className="flex gap-4">
            <div>Bust: {selectedSize.fitting.bust}</div>
            <div>Above Waist: {selectedSize.fitting.aboveWaist}</div>
            <div>Waist: {selectedSize.fitting.waist}</div>
            <div>Hips: {selectedSize.fitting.hips}</div>
          </div>
        </div>
      )}

       {showBlousePadding && (
        <div>
          <div className="uppercase mb-[0.625rem] font-medium text-[13px]">Blouse Padding:</div>
          <select
            className="border border-black p-[0.625rem] focus:outline-0 rounded text-[13px] w-full"
            id="blouse-padding"
            name="blousePadding"
            required
            value={blousePadding}
            onChange={(e) => setBlousePadding(e.target.value)}
          >
            <option value="">Select</option>
            {[28, 30, 32, 34, 36, 38, 40, 42].map(size => (
              <option key={size} value={`For Bust Size ${size}"`}>
                For Bust Size {size}" (+$5)
              </option>
            ))}
            <option value="Without Blouse Padding">Without Blouse Padding</option>
          </select>
        </div>
      )}
        {/* {
          (product?.categorySlug === 'women' && Object.keys(tofits ?? {}).length !== 0) && <Fragment>
            <div className="flex text-[13px] mt-7 mb-5">
              <div class="margin-top-1 -bottom-0 option-selector font-medium uppercase pr-4">To Fit:</div>
              <div class="flex gap-4">
                <div>Bust: {tofits?.bust}</div>
                <div>Above Waist: {tofits?.aboveWaist}</div>
                <div>Waist: {tofits?.waist}</div>
                <div>Hips: {tofits?.hips}</div>
              </div>
            </div>
            <div class="">
              <div class="uppercase mb-[0.625rem] font-medium text-[13px]">Blouse Padding:</div>
              <select class="required border border-black p-[0.625rem] focus:outline-0 rounded text-[13px]" id="blouse-padding" name="properties" required="true">
                <option value="">Select</option>
                <option value="Without Blouse Padding">Without Blouse Padding</option>
                <option value="For Bust Size 28&quot;">For Bust Size 28" (+$5)</option>
                <option value="For Bust Size 30&quot;">For Bust Size 30" (+$5)</option>
                <option value="For Bust Size 32&quot;">For Bust Size 32" (+$5)</option>
                <option value="For Bust Size 34&quot;">For Bust Size 34" (+$5)</option>
                <option value="For Bust Size 36&quot;">For Bust Size 36" (+$5)</option>
                <option value="For Bust Size 38&quot;">For Bust Size 38" (+$5)</option>
                <option value="For Bust Size 40&quot;">For Bust Size 40" (+$5)</option>
                <option value="For Bust Size 42&quot;">For Bust Size 42" (+$5)</option>
              </select>
            </div>
          </Fragment>
        } */}
      </div>

      <div className="mb-6 ">
        <button 
        className="px-4 mb-5 py-2  w-full bg-primary  hover:cursor-pointer text-secondry rounded-md "
        onClick={() => {
          const item = {
            productId: product._id,
            quantity: 1,
            size: selectedSize.label || product.sizes[0].label,
            blousePadding: blousePadding,
            note: "",
          }; 
          dispatch(addToCart(item));
        }}
        >
          ADD TO BAG
        </button>

        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleWishlistClick(); 
              }}
        className={`flex items-center justify-center  hover:cursor-pointer  gap-2 px-4 py-2 w-full bg-transparent text-primary rounded-md${isInWishlist ? 'text-primary' : 'text-primary/60'
              }`}>
          <Heart size={17}  fill={isInWishlist ? "text-primary" : "none"} color='#001D3D'  />
          <span>{isInWishlist ? "ADDED TO WISHLIST" : "ADD TO WISHLIST"}</span>
        </button>
      </div>
      <div className="mb-6 flex  flex-col gap-3 ">
        <div className="flex gap-3 items-center">
          <TimerReset size={25} color="#001d3d" /> Time to Ship: 48 Hours
        </div>
        <div className="flex gap-3 item-center">
          <Truck size={25} color="#001d3d" /> Estimated Delivery: May 22, 2025
        </div>
      </div>

      <div className="border-y px-2">
        <div onClick={toggleAccordion}>
          <div className="py-2">
            <h2 className=" hover:cursor-pointer">Product Details</h2>
          </div>
        </div>
        {isExpanded && (
          <div
            className="accordion__content rte"
            id="ProductAccordion-collapsible-row-3-template--description__main"
          >
            {Object.entries(product.productDetails[0]).map(([key, value]) => (
              <p key={key} className="mb-3">
                <span className="semi-strong capitalize">{key}:</span> {value}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className="my-4 flex">Customer Support</div>
      <div className="my-4">
        <div className="flex flex-wrap gap-4 text-sm">
          <a className="flex items-center gap-2  hover:cursor-pointer hover:underline">
            <Smartphone size={24} /> WhatsApp us
          </a>
          <button
            onClick={() => GorgiasChat.open()}
            className="flex items-center gap-2  hover:cursor-pointer hover:underline"
          >
            <MessageSquareMore size={24} /> Chat with us
          </button>
          <a
            href="tel:+18883792166"
            className="flex items-center gap-2  hover:cursor-pointer  hover:underline"
          >
            <PhoneCall size={24} /> Call us +1 888-379-2166
          </a>
          <a
            href="mailto:support@example.com"
            className="flex items-center gap-2  hover:cursor-pointer hover:underline"
          >
            <Mail size={24} /> E-mail us
          </a>
        </div>
      </div>
      <div className="mb-4 flex">Share</div>
      <div className="my-4 flex">
        {socialIcons.map((icon, index) => (
          <a
            key={index}
            href={icon.href}
            className="flex bg-primary  hover:cursor-pointer items-center justify-center mr-4 rounded-lg  "
          >
            {icon.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
