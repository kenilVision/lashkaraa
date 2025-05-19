import React from 'react'
import Link from 'next/link';
import OrderCard from './OrderCard';

function OrderList({orders}) {

  if (orders?.length === 0) {
    return (
        <div className="w-full h-[400px] flex flex-col items-center justify-center  text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-4">
                When you place orders, they will appear here.
            </p>
            <Link href="/" passHref>
                <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
                    Start Shopping
                </button>
            </Link>
        </div>
    );
}



return (
        <div className="space-y-4">
            {orders?.map((order) => (
                <OrderCard key={order._id} order={order} />
            ))}
        </div>
    );

}


export default OrderList
