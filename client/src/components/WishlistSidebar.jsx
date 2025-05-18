"use client"
import { useEffect, useState ,  useRef } from 'react';
import Button from './common/Button';
import { ChevronRight } from 'lucide-react';
import WishlistItem from './common/WishlistItem';
import { useDispatch, useSelector } from "react-redux";
import {  removeFromWishlist } from "../store/slice/wishlistSlice";
import { addToCart , addToMultiCart} from "../store/slice/cartSlice"
import { useRouter } from 'next/navigation';


function WishlistSidebar({ isOpen, setIsOpen, menuItems }) {
    const router = useRouter();
    const sidebarRef = useRef(null);
     const { items: wishlist } = useSelector((state) => state.wishlist);
     const { items: cart } = useSelector((state) => state.cart);
     const dispatch = useDispatch();
   const [error, setError] = useState(null);
   const [quantity, setQuantity] = useState([]);
   const handleIncrease = (index) => {
        setQuantity((prev) => { 
            const newQuantity = [...prev];
            newQuantity[index] = (newQuantity[index] || 0) + 1;     
            return newQuantity;
        });
    }

    const [flag , setFlag] = useState(false);
    
    useEffect(() => {
        const initialQuantities = wishlist.map((item) => item.quantity || 1);
        setQuantity(initialQuantities);
    }, [wishlist]);

    const handleDecrease = (index) => {
        setQuantity((prev) => { 
            const newQuantity = [...prev];
            if (newQuantity[index] > 1) {
                newQuantity[index] = (newQuantity[index] || 0) - 1;
            }
            return newQuantity;
        });
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
                setIsOpen(false);
            }
        };

        // Handle escape key to close sidebar
        const handleEscKey = (event) => {
            if (event.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscKey);

        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, setIsOpen]);

    const handleAddToCart = (item) => {
        const data ={
            productId: item.productId._id,
            quantity: item.quantity,
            size: item.size  ,
            note: item.note || "",
        }
        dispatch(addToCart(data))
        .unwrap()
        .then(() => {
            setError(null);
        })
        .catch((err) => {
            setError(err.error);
        }); 


    }  
    


  return (
    <>
          
            <div
                className={`fixed inset-0  bg-black bg-opacity-0 z-30 transition-opacity duration-300 ${isOpen ? 'opacity-75' : 'opacity-0 pointer-events-none'
                    }`}
                aria-hidden="true"
            />

            
            <div
                ref={sidebarRef}
                className={`fixed right-0 top-0  h-full w-[460px] bg-white z-40 shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
            >
                <div className="flex flex-col h-full">
                    {/* Header with close button */}
                    <div className="flex items-center bg-[#F3F0ED] justify-between p-4">
                        {/* <Logo /> */}
                        <Button
                            onClick={() => setIsOpen(false)}
                            className="!p-0 rounded-full flex items-center text-bold gap-3  underline text-[#001D3D] border-0 hover:bg-neutral-100 transition-colors focus:outline-none"
                            aria-label="Close menu"
                        >
                          <ChevronRight size={18} />  My Wishlist
                        </Button>
                    </div>

                    {/* Menu items */}
                    <nav className="flex-grow overflow-y-auto py-2">
                        <ul className='px-4'>
                        {wishlist.map((item ,index) => (
                            <WishlistItem
                                key={item._id}
                                image={item.productId.media[0]?.url}
                                productId={item.productId._id}
                                quantity={quantity[index] || 1}
                                handleDecrease={() => handleDecrease(index)}
                                handleIncrease={() => handleIncrease(index)}
                                size={item.productId.sizes}
                                title={item.productId.name}
                                price={item.productId.price}
                                onRemove={() => dispatch(removeFromWishlist(item._id))}
                                addToCart = {() => handleAddToCart(item)}
                            />
                            ))}

                        {wishlist.length === 0 && (
                        <div className="col-span-full py-12 text-center flex flex-col items-center justify-center gap-4">
                            <img
                            src="https://s3.amazonaws.com/cdn.myshopapps.com/iwish/drawer/empty-heart.png"
                            alt="wishlist-empty_icon"
                            className="w-24 h-24 object-contain"
                            />
                            <p className="text-[21px] text-[#9e9e9e]">Your wishlist is empty!</p>
                            <p className="text-[17px] text-[#9e9e9e]">Explore more and shortlist some items</p>
                            <button
                            aria-label="Continue Shopping Button"
                            className="cart-btn-continue border border-primary text-[#9e9e9e] px-4 py-2  hover:bg-[#F3F0ED]  transition"
                            onClick={() => window.location.href = '/'} // Adjust navigation as needed
                            >
                            Continue Shopping
                            </button>
                        </div>
                        )}
                        </ul>
                   
                        <div>
                        {error && wishlist.length >0 && (
                            <div className="text-red-700 gap-2 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline">
                                {error || "Failed to add item to cart"}
                            </span>
                            </div>
                        )}
                        </div>
                    { wishlist.length > 0 && (<div className=" px-4">    
                        <button
                            className='p-2 w-full border hover:cursor-pointer border-primary text-primary '
                            onClick={() => {
                                const items = wishlist.map((item, index) => ({
                                  productId: item.productId._id,
                                  quantity: quantity[index] || 1,
                                  size: item.productId.sizes[0].label,
                                  note: item.note || "",
                                }));
                                console.log(items)
                            
                                dispatch(addToMultiCart({items})).unwrap()
                                .then(() => {
                                    setError(null);
                                    router.push('/cart');
                                    setIsOpen(false);
                                })
                                .catch((err) => {
                                    setError(err.error);
                                });
                              }}
                        >ADD ALL TO CART</button>
                    </div>)}
                    </nav>
                </div>
            </div>
        </>
  )
}

export default WishlistSidebar
