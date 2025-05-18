import React from "react";
import { Trash2 , Plus , Minus } from "lucide-react";

function WishlistItem({
  image,
  title,
  price,
  onRemove,
  productId,
  size,
  addToCart,
  quantity,
    handleDecrease,
    handleIncrease,
}) {

   
  return ( 
    <div className="flex gap-4 py-2 group ">
      {/* Product Image */}
      <div className="w-20 h-24 flex-shrink-0">
        <img
          src={`http://localhost:5050/product/${image}`}
          alt={`Product image for ${title}`}
          className="w-auto h-full object-cover "
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <p className="text-sm ">{title}</p>

          <button
            onClick={onRemove}
            className="text-gray-400 hover:cursor-pointer  ml-2"
            title="Remove from wishlist"
          >
            <Trash2 size={18} />
          </button>
        </div>
        <p className="text-sm  text-primary mt-1">₹{price}</p>

        <div className="flex items-center justify-between mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">

          <div className="flex items-center  border border-[#F6F6F6]  ">
            <span className="bg-[#F6F6F6]">
            <button
              onClick={handleDecrease}
              className="text-lg   p-2 disabled:opacity-50 hover:cursor-pointer"
              disabled={quantity <= 1}
            >
                
              <Minus size={10} />
            </button>
            </span>
            <span className="px-1 h-auto">{quantity}</span>
            <span className="bg-[#F6F6F6]">
            <button
              onClick={handleIncrease}
              className="text-lg bg-[#F6F6F6] p-2  hover:cursor-pointer"
            >
              <Plus size={10} />
            </button>
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={()=>{
                console.log(size)
               let item ={
                    productId: productId,
                    quantity: quantity,
                    size: size[0].label,
                    note:"",
                }
                console.log(item)
                addToCart(item)
            }}
            className="bg-[#F6F6F6]   text-sm px-10 py-1 text-primary hover:bg-primary-dark transition hover:cursor-pointer"
            aria-label="Add to cart"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Remove Button */}
    </div>
  );
}

export default WishlistItem;
