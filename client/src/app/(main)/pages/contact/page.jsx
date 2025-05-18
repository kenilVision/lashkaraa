import Banner from "@/components/common/Banner";
import Button from "@/components/common/Button";
import SideBarMenu from "@/components/common/SideBarMenu";
import Link from "next/link";
import { Fragment } from "react";

const options = [
    {
        value: "Product Question",
        label: "Product Question",
    },
    {
        value: "Order Status",
        label: "Order Status",
    },
    {
        value: "Returns",
        label: "Returns",
    },
    {
        value: "Bulk Order",
        label: "Bulk Order",
    },
    {
        value: "Feedback",
        label: "Feedback",
    },
    {
        value: "Other",
        label: "Other",
    },
]

const ContactPage = () => {
    return (
        <div className="md:pb-9 pb-7 md:pt-8 pt-28 lg:px-0 md:px-[70px] px-4">
            <h2 class="md:text-[52px] md:text-left text-center text-[40px] font-seasons leading-[1.3] md:mb-7 mb-5">CONTACT US</h2>
            <form>
                <select id="query" name="contact" class="w-full font-futura bg-white text-[1rem] py-2 focus:outline-0 px-5 appearance-none" required="">
                    <option value="">Please select your issue from the list</option>
                    {
                        options?.map((item, index) => (
                            <option key={index} value={item.value}>{item?.label}</option>
                        ))
                    }
                </select>
                <div className="grid md:grid-cols-2 grid-cols-1 mt-3 gap-x-8 gap-y-3">
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            id="CustomerName"
                            required
                            autoComplete="off"
                            placeholder="Name"
                            className="peer w-full border-0 px-3 pt-5 pb-1 focus:outline-none placeholder-transparent"
                        />
                        <span className="absolute left-3 text-[12px] text-[rgb(0,29,61)] transition-all duration-200 top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[13px] peer-placeholder-shown:text-[rgb(0,29,61)] peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[12px] peer-focus:text-[rgb(0,29,61)]">
                            Name
                        </span>
                    </div>
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            id="CustomerEmail"
                            required
                            autoComplete="off"
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="peer w-full border-0 px-3 pt-5 pb-1 focus:outline-none placeholder-transparent"
                        />
                        <span className="absolute left-3 text-[12px] text-[rgb(0,29,61)] transition-all duration-200 top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[13px] peer-placeholder-shown:text-[rgb(0,29,61)] peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[12px] peer-focus:text-[rgb(0,29,61)]">
                            Email <span className="text-[#696969]">*</span>
                        </span>
                    </div>
                    <div className="relative">
                        <input
                            type="tel"
                            name="phoneNo"
                            id="CustomerPhonNumber"
                            required
                            autoComplete="off"
                            placeholder="Phone number"
                            className="peer w-full border-0 px-3 pt-5 pb-1 focus:outline-none placeholder-transparent"
                        />
                        <span className="absolute left-3 text-[12px] text-[rgb(0,29,61)] transition-all duration-200 top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[13px] peer-placeholder-shown:text-[rgb(0,29,61)] peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[12px] peer-focus:text-[rgb(0,29,61)]">
                            Phone number
                        </span>
                    </div>
                    <div className="relative md:col-span-2 mt-1">
                        <textarea
                            placeholder=" "
                            className="peer w-full resize-none rounded px-3 pt-6 pb-1 focus:outline-none placeholder-transparent"
                        />
                        <span className="absolute left-3 text-[12px] text-[rgb(0,29,61)] transition-all duration-200 
                                    top-2 
                                    peer-placeholder-shown:top-2 
                                    peer-placeholder-shown:text-[14px] 
                                    peer-focus:top-1 
                                    peer-focus:text-[12px]">
                            Your message
                        </span>
                    </div>
                    <div className="md:col-span-2 mt-3">
                        <Button className="w-full bg-primary text-secondry py-[0.625rem] transition duration-300 hover:shadow-[0_0_0_1.3px_rgba(226,182,106,0),_0_0_0_1px_rgba(0,29,61,1)] border-primary uppercase text-[13px] !rounded">Send Message</Button>
                    </div>
                </div>
            </form>
            <div className="grid grid-cols-2 md:gap-8 gap-5">
                <div class="pt-4">
                    <div class="uppercase mt-4 text-lg font-seasons">Call us</div>
                    <div class="text-[13px] mt-3 underline-offset-[3px]">📞
                        <a class="underline" href="tel:+18883792166">+1 888-379-2166</a>, M-F 9AM to 5PM PST</div>
                </div>
                <div class="pt-6">
                    <div class="md:text-3xl text-[17px] uppercase md:mt-4 mt-2 font-seasons">WhatsApp Us</div>
                    <div class="text-[13px] md:mt-3 mt-1"><a class="underline underline-offset-[3px]" href="https://wa.me/+15557005425">Click here</a> to chat with us on WhatsApp</div>
                </div>
                <div class="pt-6">
                    <div class="mt-4 text-lg font-seasons uppercase">General Assistance</div>
                    <div class="text-[13px] mt-2">For all order related queries you can also email us directly at
                        <a href="mailto:info@lashkaraa.com" class="underline underline-offset-[3px]">info@lashkaraa.com</a></div>
                </div>
                <div class="pt-6">
                    <div class="mt-4 text-lg font-seasons uppercase">Live Chat</div>
                    <div class="text-[13px] mt-2">Need help? We're here to answer your questions.</div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage;
