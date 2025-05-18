import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import React from "react";
import Link from 'next/link';

export default function FooterSection() {
    // Help links data
    const helpLinks = [
        { title: "Contact Us", href: "#" },
        { title: "Shipping Information", href: "#" },
        { title: "Returns Policy", href: "#" },
        { title: "FAQ", href: "#" },
        { title: "Sizing Info", href: "#" },
    ];

    // About links data
    const aboutLinks = [
        { title: "About", href: "#" },
        { title: "Blog", href: "#" },
        { title: "Reviews", href: "#" },
    ];

    // Shop links data
    const shopLinks = [
        { title: "Salwar Kameez", href: "/collection/salwar-kameez" },
        { title: "Sarees", href: "/collection/sarees" },
        { title: "Lehengas", href: "/collection/lehengas" },
        { title: "Men", href: "/collection/men" },
      ];
    // Social media icons
    const socialIcons = [
        { icon: <Facebook className="w-7 h-7" />, href: "#" },
        { icon: <Twitter className="w-6 h-6" />, href: "#" },
        { icon: <Instagram className="w-6 h-7" />, href: "#" },
        { icon: <Youtube className="w-7 h-5" />, href: "#" },
        { icon: <Linkedin className="w-7 h-7" />, href: "#" },
    ];

    return (
        <footer className="w-full bg-[#001d3d] py-20">
            <div className="container mx-auto max-w-[1400px]">
                <div className="grid grid-cols-4 gap-8">
                    {/* Newsletter Section */}
                    <div className="col-span-2">
                        <div className="max-w-[373px]">
                            <h3 className="font-normal italic text-[#e2b66a] text-[26.6px] leading-[26px] font-['Open_Sans-CondensedItalic',Helvetica]">
                                Stay in the Know
                            </h3>
                            <p className="mt-5 font-normal italic text-white text-[11.7px] leading-[23px] font-['Fira_Sans-Italic',Helvetica]">
                                Be the first one to receive new releases, special offers, and
                                more
                            </p>
                            <div className="mt-4 relative">
                                <input
                                    className="h-[45px] bg-[#001d3d] rounded-[5px] border border-solid border-white text-[#e2b66a] italic font-['Fira_Sans-Italic',Helvetica]"
                                    placeholder="Sign up to get 10% off first purchase"
                                />
                            </div>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex space-x-4 mt-8">
                            {socialIcons.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="flex items-center justify-center"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Help Section */}
                    <div>
                        <h3 className="font-normal italic text-[#e2b66a] text-[19.4px] leading-[30px] font-['Fira_Sans-Italic',Helvetica]">
                            HELP
                        </h3>
                        <ul className="mt-[51px] space-y-[34px]">
                            {helpLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="font-normal italic text-white text-[14.3px] leading-[25px] font-['Fira_Sans-Italic',Helvetica]"
                                    >
                                        {link.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About Section */}
                    <div>
                        <h3 className="font-normal italic text-[#e2b66a] text-[19.1px] leading-[30px] font-['Fira_Sans-Italic',Helvetica]">
                            ABOUT
                        </h3>
                        <ul className="mt-[51px] space-y-[34px]">
                            {aboutLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="font-normal italic text-white text-[13.5px] leading-[25px] font-['Fira_Sans-Italic',Helvetica]"
                                    >
                                        {link.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Shop Section */}
                    <div>
                        <h3 className="font-normal italic text-[#e2b66a] text-[19.1px] leading-[30px] font-['Fira_Sans-Italic',Helvetica]">
                            SHOP
                        </h3>
                        <ul className="mt-[51px] space-y-[34px]">
                            {shopLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="font-normal italic text-white text-[14.4px] leading-[25px] font-['Fira_Sans-Italic',Helvetica]"
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom - Legal Links */}
                <div className="flex justify-end mt-24">
                    <div className="flex items-center space-x-2">
                        <a
                            href="#"
                            className="font-normal italic text-white text-[14.2px] leading-[25px] font-['Fira_Sans-Italic',Helvetica]"
                        >
                            Privacy Policy
                        </a>
                        <span className="font-normal italic text-white text-[13px] leading-[23px] font-['Fira_Sans-Italic',Helvetica]">
                            |
                        </span>
                        <a
                            href="#"
                            className="font-normal italic text-white text-[13.8px] leading-[25px] font-['Fira_Sans-Italic',Helvetica]"
                        >
                            Terms &amp; Conditions
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}