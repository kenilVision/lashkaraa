import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import OrderTimeLine from './OrderTimeLine';
function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // ----- Helper Functions -----
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatShortDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
    });
  };

  const StatusBadge = ({ status }) => {
    const statusColors = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Processing: 'bg-blue-100 text-blue-800',
      Delivered: 'bg-green-100 text-green-800',
      Cancelled: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || ' text-gray-800'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className=" rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md mb-6">
      {/* Header */}
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200">
        <div className="mb-2 sm:mb-0">
          <div className="flex items-center">
            <h3 className="text-lg font-medium text-gray-900">Order #{order._id}</h3>
            <span className="mx-2 text-gray-300">•</span>
            <p className="text-sm text-gray-500 hidden sm:block">{formatDate(order.createdAt)}</p>
            <p className="text-sm text-gray-500 sm:hidden">{formatShortDate(order.createdAt)}</p>
          </div>
          <div className="flex items-center mt-1">
            <StatusBadge status={order.orderStatus[order.orderStatus.length - 1]?.status} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-end sm:items-center">
          <p className="text-lg font-semibold text-gray-900 mr-4">
            {formatCurrency(order.totalAmount)}
          </p>
          <button
            onClick={toggleExpanded}
            className="flex items-center text-sm font-medium text-[#000000] transition-colors mt-2 sm:mt-0"
          >
            {expanded ? (
              <>
                <span>Hide Details</span>
                <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                <span>View Details</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="p-4 sm:p-6">
           <div className="mb-6">
                        <OrderTimeLine steps={order?.statusTimeline} />
                    </div>

          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-900 mb-3">Order Items</h4>
            <div className="divide-y divide-gray-200">
              {order.items.map((item) => (
                <div key={item.productId._id} className="py-3 flex justify-between">
                    <div className='flex gap-2'>
                     <div className="h-25 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                             <img
                                src={`http://localhost:5050/product/${item.productId.media[0].url}`}
                                alt={item.productId.name}
                                className="h-full w-full object-cover object-center"
                            />
                    </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.productId.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address (Optional) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-2">Shipping Address</h4>
              <div className="text-sm text-gray-500">
                
                <p>{`${order.shippingAddress.address1}, ${order.shippingAddress.address2}`}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
             <div>
              <h4 className="text-md font-semibold text-gray-900 mb-2">billing Address</h4>
              <div className="text-sm text-gray-500">
                
                <p>{`${order.billingAddress.address1}, ${order.billingAddress.address2}`}</p>
                <p>{order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zip}</p>
                <p>{order.billingAddress.country}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderCard;
