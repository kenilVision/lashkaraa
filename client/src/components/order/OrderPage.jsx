import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  {fetchUserOrders} from "../../store/slice/orderSlice"
import Cookies from 'js-cookie'
import OrderList from './components/OrderList'

function OrderPage() {
    const { userOrders, loading } = useSelector((state) => state.order);
     const dispatch = useDispatch();
    const token = Cookies.get('Token')

      useEffect(() => {
        if (token) {
            dispatch(fetchUserOrders());
        }
    }, [])


  return (
   <>
    <div>
                    {
                        loading ?
                            <div className="w-full h-[500px] flex items-center justify-center bg-white">
                               Loading ....
                            </div>
                            :
                            <Fragment>
                                <h2 className="text-lg font-medium text-gray-900 mb-4">
                                    {userOrders?.length === 0
                            ? 'No orders found'
                            : `${userOrders.length} order${userOrders.length > 1 ? 's' : ''}`}
                                </h2>
                                 <OrderList orders={userOrders} />
                            </Fragment>

                    }
    </div>
   </>
  )
}

export default OrderPage
