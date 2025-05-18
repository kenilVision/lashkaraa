import React from 'react';
import { Minus, Plus, XCircle } from 'lucide-react';
function CartItem({
    item ,
    onRemove,
  }) {
    return (
        <div className="flex gap-4 py-4 group">
        {/* Product Image */}
        <div className="w-20 h-27 flex-shrink-0">
          <img
            src={`http://localhost:5050/product/${item.productId.media[0]?.url}`}
            alt={`Product image for ${item.productId.name}`}
            className="w-auto h-full object-cover"
          />
        </div>
  
        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-sm">{item.productId.name}</p>
            <div className='text-sm flex flex-col items-center justify-end'>
            ₹{item.productId.price}
            <button
              onClick={()=>{onRemove(item._id)}}
              className="text-gray-400 hover:cursor-pointer ml-2"
              title="Remove from cart"
            >
                
              Remove
            </button>
            </div>
          </div>
          <p className="text-sm text-primary mt-1">₹{item.productId.price}</p>
          <p className="text-xs text-gray-500 mt-1">Stitching Type: {item.size}</p>
          {item?.blousePadding && (
          <p className="text-xs text-gray-500 mt-1">Blouse Padding: {item?.blousePadding}</p>)}
          <p className="text-xs text-gray-500 mt-1">Time To Ship : 10 Days</p>
        </div>
      </div>
      );
}

export default CartItem
