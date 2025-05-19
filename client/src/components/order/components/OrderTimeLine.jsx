import React ,{useMemo} from 'react'
import {
    ShoppingBag,
    Truck,
    Package,
    Clock,
    AlertCircle,
    RefreshCw,
    DollarSign,
    CheckCircle,
} from 'lucide-react';
const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
        case 'order placed':
        case 'order confirmed':
        case 'packed':
            return <ShoppingBag className="h-5 w-5" />;
        case 'shipped':
            return <Truck className="h-5 w-5" />;
        case 'out for delivery':
            return <Clock className="h-5 w-5" />;
        case 'delivered':
            return <Package className="h-5 w-5" />;
        case 'cancelled':
            return <AlertCircle className="h-5 w-5" />;
        case 'returned':
            return <RefreshCw className="h-5 w-5" />;
        case 'refunded':
            return <DollarSign className="h-5 w-5" />;
        default:
            return <ShoppingBag className="h-5 w-5" />;
    }
};

const getCompletedDescription = (title) => {
    switch (title.toLowerCase()) {
        case 'order placed':
            return 'Your order has been placed and is being processed.';
        case 'order confirmed':
            return 'Your order has been confirmed and is now being prepared.';
        case 'packed':
            return 'Your order has been packed and is ready for shipping.';
        case 'shipped':
            return 'Your order has been shipped and is on its way to you.';
        case 'out for delivery':
            return 'Your order is out for delivery and will arrive soon.';
        case 'delivered':
            return 'Your order has been delivered successfully.';
        case 'cancelled':
            return 'Your order has been cancelled and will not be processed.';
        case 'returned':
            return 'Your order has been returned and is being processed.';
        case 'refunded':
            return 'Your order has been refunded successfully.';
        default:
            return 'Status not available.';
    }
};

const getPendingDescription = (title) => {
    switch (title.toLowerCase()) {
        case 'order placed':
            return 'Your order has been placed and is awaiting confirmation.';
        case 'order confirmed':
            return 'Your order is confirmed and will be prepared shortly.';
        case 'packed':
            return 'Your order is being packed and will be shipped soon.';
        case 'shipped':
            return 'Your order is on its way to you.';
        case 'out for delivery':
            return 'Your order is out for delivery.';
        case 'delivered':
            return 'Your order will be delivered soon.';
        case 'cancelled':
            return 'Your order is pending cancellation.';
        case 'returned':
            return 'Your return request is being processed.';
        case 'refunded':
            return 'Your refund is being processed.';
        default:
            return 'Status is being updated.';
    }
};


const formatDateTime = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleString();
};

function OrderTimeLine({ steps = [] }) {
    const timelineSteps = useMemo(() => {
        return steps.map((step) => ({
            status: step.title.toLowerCase(),
            label: step.title,
            description:
                step.status === 'completed'
                    ? getCompletedDescription(step.title)
                    : getPendingDescription(step.title),
            date: step.timeLogged ? formatDateTime(step.timeLogged) : '',
            completed: step.status === 'completed',
            current: step.status === 'pending',
        }));
    }, [steps]);

  return (
   <div className='px-4 py-2'>
            <h4 className="text-md font-semibold text-gray-900 mb-3">Order Status</h4>
            <ol className="relative border-s border-gray-200 dark:border-gray-700">
                {timelineSteps.map((step, idx) => (
                    <li
                        className="mb-6 ms-6"
                        key={`${step.status}-${idx}`}
                    >
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-[#F3F0ED] rounded-full -start-4  ">
                            <div
                                className={`relative flex h-8 w-8 items-center justify-center bg-[#F3F0ED] rounded-full ${step?.completed
                                    ? ' text-[#000000]'
                                    : step.current
                                        ? ' text-[#000000] border border-[#020202]'
                                        : ' text-gray-400'
                                    }`}
                            >
                                {step?.completed ? (
                                    <CheckCircle className="h-5 w-5" />
                                ) : (
                                    getStatusIcon(step?.status)
                                )}
                            </div>
                        </span>
                        <h3 className="flex items-center mb-1 text-sm font-semibold text-gray-900 ms-1">
                            {step.label}
                            {step.current && (
                                <span className=" text-[#000000] text-xs font-medium px-2.5 py-0.5 rounded ms-3">
                                    In progress
                                </span>
                            )}
                        </h3>
                        {step.date && (
                          <time className="block mb-2 text-xs font-normal leading-none text-gray-400">
                            {step.date}
                          </time>
                        )}
                        <p className="mb-4 text-sm font-normal text-gray-500">
                            {step.description}
                        </p>
                    </li>
                ))}
            </ol>
        </div>
  )
}

export default OrderTimeLine
