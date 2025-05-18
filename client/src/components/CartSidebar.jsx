"use client" 
import { useEffect,useState, useRef } from 'react';
import Button from './common/Button';
import { X , ChevronLeft, ChevronRight ,  ChevronDown, Lock } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart} from "../store/slice/cartSlice"
import CartItem from './common/CartItem';
import { useRouter } from 'next/navigation';

const CartSidebar = ({ isOpen, setIsOpen,  }) => {
    const router = useRouter();
    const sidebarRef = useRef(null);
    const { items: cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [accordian, setaccordian ] = useState(false);

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

        // Prevent body scrolling when sidebar is open
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

    const images = [
        'https://www.lashkaraa.com/cdn/shop/files/SC0482.jpg?v=1715387192&width=400',
        'https://www.lashkaraa.com/cdn/shop/files/LashkaraDay325-01-242469.jpg?v=1708572472&width=400',
        'https://www.lashkaraa.com/cdn/shop/files/Lashkaraa01904.jpg?v=1710750235&width=400',
        'https://www.lashkaraa.com/cdn/shop/files/Lashkaraa00244copy.jpg?v=1713230408&width=400',
      ];
      
        const sliderRef = useRef(null);
      
        const scroll = (direction) => {
          if (!sliderRef.current) return;
          const scrollAmount = 200;
          sliderRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
          });
        };
    
    return (
        <>
            {/* Backdrop overlay */}
            <div
                className={`fixed inset-0 mt-8 bg-black bg-opacity-0 z-30 transition-opacity duration-300 ${isOpen ? 'opacity-75' : 'opacity-0 pointer-events-none'
                    }`}
                aria-hidden="true"
            />

            {/* Sidebar */}
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
                    <div className="flex items-center justify-between mx-4 border-b border-primary pb-0 pt-4">
                        Cart (0)
                        <Button
                            onClick={() => setIsOpen(false)}
                            className="!p-0 rounded-full underline text-[#001D3D] border-0 hover:bg-neutral-100 transition-colors focus:outline-none"
                            aria-label="Close menu"
                        >
                           <X size={20} />
                        </Button>
                    </div>

                    {/* Menu items */}
                    <nav className="flex-grow overflow-y-auto py-2">
                        <ul className='px-4'>
                            {cart.map((item) => (
                                <CartItem
                                    item={item}
                                    onRemove={(id) => {
                                        dispatch(removeFromCart(id));
                                    }}
                                />
                            ))}

                            {cart.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="cart-drawer__empty-content">
                                <h2 className="text-2xl font-semibold mb-2 text-gray-800">Your Cart is Empty</h2>
                                <p className="text-gray-600 mb-4">Give your bag some love!</p>
                                <button
                                    className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
                                    onClick={() => router.push('/products')} // Change route as needed
                                >
                                    Continue Shopping
                                </button>
                                </div>
                            </div>
                            )}
                        </ul>
                    </nav>
                    <div>
                        { cart.length > 0 && (
                            < div className='p-4 bg-[#F3F0ED]'>
                        
                                <p>Congrats! You’ve unlocked free shipping</p>
                            <div className=' border-2 border-[#E2B66A]'> </div>
                            <button
                                onClick={() => setaccordian(!accordian)}
                                className="w-full flex items-center justify-between p-4 text-left"
                                aria-expanded={accordian}
                                >
                                <span className="summary__title text-base font-medium">
                                    Order special instructions
                                </span>
                                <ChevronDown
                                    size={16}
                                    className={`ml-2 transition-transform duration-300 ${accordian ? 'rotate-180' : ''}`}
                                />
                                </button>

                                {accordian && (
                                <div className="p-4 text-xs  pt-0">
                                    <label className='mb-2'>
                                    Note: For any customization requests, we recommend choosing the custom stitching option.
                                    If you select the standard size and include a customization request, it may not be possible
                                    to accommodate it within the standard sizing.
                                    </label>
                                    <textarea
                                    id="CartDrawer-Note"
                                    name="note"
                                    placeholder="Order special instructions"
                                    className="w-full border bg-white rounded p-2 resize-y text-sm"
                                    
                                    />
                                </div>
                                )}

                                <div className=' border-t pt-2 border-primary '> 
                                    <div className='flex items-center justify-between  '>
                                        subtotal
                                        <span className='text-primary font-semibold'>₹{cart.reduce((acc, item) => acc + item.productId.price, 0)}</span>
                                    </div>
                                    <div className='flex items-center justify-between text-sm '>
                                    Tax included and shipping calculated at checkout
                                        </div>
                                        <div>
                                            <button 
                                            onClick={()=> {setIsOpen(false)
                                            router.push('/checkout/information') }}
                                            className='w-full bg-primary hover:cursor-pointer text-white p-2 rounded mt-4 flex items-center justify-center gap-2'>
                                                secure checkout
                                                <Lock size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center my-1">
                                        <div className="flex-grow h-px bg-gray-300" />
                                        <span className="mx-4 text-sm uppercase text-gray-600 tracking-widest">Or Express Checkout</span>
                                        <div className="flex-grow h-px bg-gray-300" />
                                        </div>

                            </div>
                        )

                        }
                        {cart.length === 0 && (   <div className="bg-[#f8f5f0] px-6 py-8">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Explore our top Categories</h3>

                            <div className="relative">
                                {/* Left arrow */}
                                <button
                                onClick={() => scroll('left')}
                                className="absolute left-[-30px] top-1/2 -translate-y-1/2 z-10  p-2 rounded-full "
                                >
                                <ChevronLeft size={20} />
                                </button>

                                {/* Scrollable Slider */}
                                <div
                                ref={sliderRef}
                                className="flex gap-4 overflow-x-auto scrollbar-hide"
                                    style={{ scrollbarWidth: 'none' }}
                                    
                                >
                                {images.map((src, index) => (
                                    <div
                                    key={index}
                                    className="min-w-[150px] max-w-[150px] flex-shrink-0 overflow-hidden shadow hover:shadow-md transition bg-white"
                                    >
                                    <img src={src} alt={`Category ${index + 1}`} className="w-full h-auto object-cover" />
                                    </div>
                                ))}
                                </div>

                                {/* Right arrow */}
                                <button
                                onClick={() => scroll('right')}
                                className="absolute right-[-30px] top-1/2 -translate-y-1/2 z-10 p-2 rounded-full ho"
                                >
                                <ChevronRight size={20} />
                                </button>
                            </div>
                             </div>)}
                         
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartSidebar;