import React from 'react'

const ShippingInformation = () => {
    return (
        <div className='text-primary md:pb-9 pb-7 md:pt-8 pt-6 lg:px-0 md:px-[70px] px-4'>
            <h1 class="md:text-[40px] text-3xl font-seasons leading-[1.3] mb-8">Shipping Information</h1>
            <div className="rte">
                <h4 className='mb-6 font-seasons text-lg'><strong>SHIPPING METHODS AND COSTS</strong></h4>
                <p className='text-[13px] text-primary'>
                    - Shipping is free for all the orders.<br />
                    - We only use reputed couriers for dispatching our products - such as DHL, FedEx and UPS. We provide tracking information for all orders once dispatched.
                </p>

                <p className='text-[13px] text-black mt-3 font-bold mb-4'><strong className='font-bold'><br />IMPORTANT INFORMATION</strong></p>
                <p className='text-[13px] text-primary'>
                    Order cut-off times are provided as guidelines only, and do not take into account possible delays caused by payment authorization delays or holidays.<br />
                    We aim to dispatch all ready to ship items 48 hours of payment confirmation. Estimated delivery times are to be used as a guideline only and commence from the date of dispatch. We are not responsible for any delays caused by customs in your respective country.<br />
                    We are unable to redirect orders to a different address once items have been dispatched.<br />
                    All orders will require a signature upon delivery, however, in some cases for deliveries to a residential address the shipment may be left at the door.<br />
                    We do NOT deliver to P.O Box Addresses.
                </p>

                <h4 className='font-seasons mt-4 mb-5 text-lg text-primary'><strong>WHEN DO WE DELIVER</strong></h4>
                <p className='text-[13px] text-primary'>
                    All orders do take about 2-5 days for delivery from the date of dispatch depending on the respective destination. Further information on the order status can be provided by our customer care upon request.
                </p>

                <h3 className='font-seasons md:my-8 my-4 md:text-3xl text-lg'><strong>REMOTE AREA FEES</strong></h3>
                <p className='text-[13px] text-primary '>
                    Certain zip codes are subject to a remote area fee of $40 USD. DHL and FedEx charge us this fee if your address zip code happens to fall out of their delivery zones. If your address happens to fall into a remote area zip code, we will have to bill you for this fee post order placement to ensure delivery of your order. You may also check if your zip code happens to fall into a remote area delivery zone below:
                </p>
                <p className='text-[13px] text-primary my-[13px]'>
                    <br />
                    You can view the DHL remote area zip code list{" "}
                    <a
                        href="https://www.dhl.com/content/dam/downloads/g0/express/services/surcharges/dhl_express_remote_areas.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        here
                    </a>.
                </p>
                <p className='text-[13px] text-primary'>
                    You can view the FedEx remote area zip code list{" "}
                    <a
                        href="https://www.fedex.com/content/dam/fedex/us-united-states/services/Zipcodes_OPA_ODA.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        here
                    </a>.
                </p>

                <h3 className='font-seasons md:my-8 my-4 md:text-3xl text-lg'>ADDRESS CHANGE REQUESTS</h3>
                <p className='text-[13px] text-primary'>
                    Once an order is confirmed, you cannot make any changes. However, address change requests will only be honored if requested within 24 hours of placing your order.
                </p>
                <p className='text-[13px] text-primary mt-3'>
                    If you make any address change requests post dispatch of your order, we may or may not be able to honor your request depending on the communication from the carrier. However, if we are able to change your address, a $20 fee is applicable for address change requests which is payable to the carrier. Please note that we cannot guarantee any address change requests and cannot be held liable if we are unable to change your address post dispatch of your order.
                </p>

                <h4 className='md:my-6 my-5 font-seasons text-lg'><strong>PACKAGE REFUSED AT DELIVERY</strong></h4>
                <p className='text-[13px] text-primary'>
                    If for any reason you refuse to accept your order at the time of delivery, a 75% restocking fee will be levied upon your order and will be deducted from the refund amount to you.
                </p>

                <h4 className='font-seasons my-6 text-lg'><strong>INSURANCE</strong></h4>
                <p className='text-[13px] text-primary'>
                    Lashkaraa insures each purchase during the time it is in transit until it is delivered to you, at which point liability for your purchased goods is transferred to you. If the courier company fails to deliver your order due to the package being lost in transit, you do not suffer any loss. The in-transit risk is all ours and borne by Lashkaraa. However, Lashkaraa is not liable for lost/stolen packages or any other damages to the package post being left at the customer's address by the courier company. We cannot be held accountable for packages where tracking information states the package has been delivered to your order address.
                    If you have previously experienced lost or stolen packages where you reside, we encourage you to instead have your package delivered to a work address to ensure that you receive it safe and sound or we would advise calling the courier company fulfilling your order (i.e DHL, FedEx, UPS) alongside your tracking number and request to pick up your package at their nearest authorized pick up point closest to your address. Your tracking number can be viewed in the 'Shipping Confirmation' e-mail we send out to you once your order has been shipped from our end.
                </p>
                <p className='text-[13px] text-primary mt-3'>
                    If you have specified a recipient who is not you for delivery purposes (for example as a gift) then you accept that evidence of a signature by them (or at that delivery address) is evidence of delivery and fulfillment by Lashkaraa and transfer of responsibility in the same way.
                </p>
                <h3 className='font-seasons md:mb-8 mb-4 md:text-3xl text-lg mt-17'>DELIVERED BUT NOT DELIVERED</h3>
                <p className='text-[13px] text-primary'>
                    We cannot be held accountable for packages where tracking information states the package has been delivered to your order address. If you have previously experienced lost or stolen packages where you reside, we encourage you to instead have your package delivered to a work address to ensure that you receive it safe and sound.
                </p>
            </div>
        </div>
    )
}

export default ShippingInformation;
