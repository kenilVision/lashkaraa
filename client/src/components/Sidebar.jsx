import { useEffect, useRef } from 'react';
import SidebarItem from './SidebarItem';
import Button from './common/Button';

const Sidebar = ({ isOpen, setIsOpen, menuItems }) => {
    const sidebarRef = useRef(null);

    // Handle clicks outside sidebar to close it
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

    // Handle menu item selection
    const handleMenuSelect = () => {
        setIsOpen(false);
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
                className={`fixed left-0 top-0 mt-8 h-full w-[380px] bg-white z-40 shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
            >
                <div className="flex flex-col h-full">
                    {/* Header with close button */}
                    <div className="flex items-center justify-between p-4">
                        {/* <Logo /> */}
                        <Button
                            onClick={() => setIsOpen(false)}
                            className="!p-0 rounded-full underline text-[#001D3D] border-0 hover:bg-neutral-100 transition-colors focus:outline-none"
                            aria-label="Close menu"
                        >
                           Close
                        </Button>
                    </div>

                    {/* Menu items */}
                    <nav className="flex-grow overflow-y-auto py-2">
                        <ul className='px-4'>
                            {menuItems?.map((item, index) => (
                                <SidebarItem
                                    key={index}
                                    item={item}
                                    onSelect={handleMenuSelect}
                                />
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;