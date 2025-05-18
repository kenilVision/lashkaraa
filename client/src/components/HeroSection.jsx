import Link from "next/link";

const HeroSection = () => {
    return (
        <Link href={'/'} className='cursor-pointer'>
            <div className="hidden md:block">
                <img
                    src={'/assets/amira_web_banner.webp'}
                    alt='Banner'
                    className='w-full h-full'
                />
            </div>
            <div className="md:hidden block">
                <img
                    src={'/assets/amira_mobile_banner.webp'}
                    alt='Banner'
                    className='w-full h-full'
                />
            </div>
        </Link>
    );
};

export default HeroSection;
