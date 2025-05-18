'use client';
import { createContext, useContext, useState , useEffect } from 'react';
import { useSelector } from 'react-redux';
const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {    

    const [shippingAddress, setShippingAddress] = useState(null);
    const [billingAddress, setbillingAddress] = useState(null);
    const cart = useSelector(state => state.cart.items);

      const [order, setOrder] = useState({
        userId: "",
        shippingAddress: {
          phone: "",
          addressLine: "",
          city: "",
          state: "",
          pincode: "",
          landmark: ""
        },
        billingAddress: {
            phone: "",
            addressLine: "",
            city: "",
            state: "",
            pincode: "",
            landmark: ""
          },
        items: [],  
        paymentMethod: "" 
      });

    const setOrderInfo = (userId, shippingAddress) => {
    const formattedItems = cart?.map(item => ({
        productId: item.productId?._id ?? item.productId ?? '',
        quantity: item.quantity ?? 1,
        price: item.productId?.price ?? item.price ?? 0,
        size: item.size ?? '',
        note: item.note ?? ''
    }));

    const newOrder = {
        ...order, // Current order state
        userId,
        shippingAddress,
        items: formattedItems
    };

    setOrder(newOrder); // Update state (async)

};
const setPayment = (billingAddress, paymentMethod) => {
    return new Promise((resolve) => {
      setOrder((prev) => {
        const effectiveBillingAddress = 
          !billingAddress || Object.keys(billingAddress).length === 0
            ? shippingAddress
            : billingAddress;
  
        const updatedOrder = {
          ...prev,
          billingAddress: effectiveBillingAddress,
          paymentMethod,
        };
  
        resolve(updatedOrder); // Resolve with the new order data
        return updatedOrder;   // Update React state
      });
    });
  };
    

      const addItemToOrder = (newItem) => {
        setOrder((prevOrder) => {
          // Check if item already exists
          const itemExists = prevOrder.items.some(
            (item) => item.productId === newItem.productId && item.size === newItem.size
          );
      
          // Only add if not already present
          return {
            ...prevOrder,
            items: itemExists ? prevOrder.items : [...prevOrder.items, newItem],
          };
        });
      };
    

      useEffect(() => {
        const interval = setInterval(() => {
          console.log('Current shippingAddress:', shippingAddress);
          console.log('Current order:', order);
        }, 5000);
    
        return () => clearInterval(interval);
      }, [shippingAddress, order]);

  return (
    <CheckoutContext.Provider value={{ shippingAddress, setShippingAddress , order, setOrder, setOrderInfo ,  addItemToOrder , billingAddress, setbillingAddress , setPayment}}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  return useContext(CheckoutContext);
}