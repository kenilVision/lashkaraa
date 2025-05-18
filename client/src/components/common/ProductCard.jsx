import React, { useState ,useEffect } from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import Button from './Button';
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../store/slice/wishlistSlice";
// interface ProductCardProps {
//   product: Product;
// }

const ProductCard = ({ product }) => {
  // const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);


  const dispatch = useDispatch();

  const { items: wishlist } = useSelector((state) => state.wishlist);

  const isInWishlist = wishlist.some((item) => item.productId._id === product._id);

  const wishlistItem = wishlist.find((item) => item.productId._id === product._id);

  const handleWishlistClick = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(wishlistItem._id));
    } else {
      dispatch(addToWishlist(product._id));
    }
  };
  // const toggleWishlist = (e) => {
  //   e.preventDefault();
  //   setIsWishlisted(!isWishlisted); 
  // };

  // Format price with Indian Rupee symbol
  const formatPrice = (price) => {
    // return new Intl.NumberFormat('en-IN', {
    //   style: 'currency',
    //   currency: 'INR',
    //   maximumFractionDigits: 0,
    // }).format(price);
  };

  return (
    <div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* <Link href={`/product/${product.id}`} className="block"> */}
      <Link href={`/product/${product.slug}`} className="block group">
        <div className="relative overflow-hidden bg-gray-100">
          <img
           src={isHovered && product.media.length > 1 
            ? `http://localhost:5050/product/${product.media[1].url}` 
            : `http://localhost:5050/product/${product.media[0].url}`}
            alt={product.name}
            className="w-full lg:h-92 object-center transition-transform duration-500 group-hover:scale-105"
          />

          <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleWishlistClick(); 
              }}
            className={`absolute top-2 right-2 !p-2 z-50 bg-white !rounded-full border-0 transition-colors ${isInWishlist ? 'text-primary' : 'text-primary/60'
              }`}
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={17} fill={isInWishlist ? "text-primary" : "none"} color='#001D3D' />
          </Button>
        </div>

        <div className="my-3 mb-5 space-y-1">
          <h3 className="text-[13px] text-primary font-medium leading-[2] group-hover:underline">{product.name}</h3>
          <p className="text-[13px] font-semibold text-primary pt-1">
            Rs. {Number(product?.price).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </p>
          {product.discountedPrice && product.discountedPrice > product.price && (
            <p className="text-sm text-primary">
              Rs. {Number(product?.discountedPrice).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;