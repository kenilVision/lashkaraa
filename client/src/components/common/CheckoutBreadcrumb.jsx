"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const steps = [
  { label: "Bag", href: "/cart" },
  { label: "Information", href: "/checkout/information" },
  { label: "Shipping", href: "/checkout/shipping" },
  { label: "Payment", href: "/checkout/payment" }
];
function CheckoutBreadcrumb() {
    const pathname = usePathname();

  const currentStepIndex = steps.findIndex((step) =>
    pathname.startsWith(step.href)
  );

  if (currentStepIndex === -1) return null; 
  return (
    <nav
    aria-label="Breadcrumb"
    className="w-full max-w-[1500px] ps-0 md:pe-12 px-4 py-3 mx-auto"
  >
    <ol className="flex items-center text-xs md:text-sm text-primary/60">
      {steps.map((step, index) => (
        <React.Fragment key={step.href}>
          {index > 0 && (
            <li className="mx-1">
              <ChevronRight size={12} />
            </li>
          )}
          <li>
            {index === currentStepIndex ? (
              <span className="text-primary font-medium">{step.label}</span>
            ) : (
              <Link
                href={step.href}
                className="hover:text-primary transition-colors"
              >
                {step.label}
              </Link>
            )}
          </li>
        </React.Fragment>
      ))}
    </ol>
  </nav>
  )
}

export default CheckoutBreadcrumb
