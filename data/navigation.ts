import { NavLink } from "@/types";

export const utilityStripLinks: NavLink[] = [
  { label: "Shop All", href: "/shop" },
  { label: "Customer Support", href: "/contact" },
  { label: "Shipping & Returns", href: "/shipping" },
];

export const categoryNavLinks: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Home & Living", href: "/categories/home-living" },
  { label: "Workspace", href: "/categories/workspace" },
  { label: "Tools & Utility", href: "/categories/tools-utility" },
  { label: "Electronics", href: "/categories/electronics" },
  { label: "Outdoor", href: "/categories/outdoor" },
  { label: "Deals", href: "/shop?sale=true" },
];

export const navigationLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  {
    label: "Departments",
    href: "/categories",
    children: categoryNavLinks.filter((l) => l.href !== "/shop" && !l.href.includes("sale")),
  },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  shop: [
    { label: "Shop All", href: "/shop" },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Best Sellers", href: "/best-sellers" },
    { label: "Deals", href: "/shop?sale=true" },
    { label: "Categories", href: "/categories" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faq" },
  ],
  customerCare: [
    { label: "Track Order", href: "/track-order" },
    { label: "Returns", href: "/returns" },
    { label: "Shipping Policy", href: "/shipping" },
    { label: "Support", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
  ],
};

export const paymentMethods = [
  { name: "Visa", icon: "/payments/visa.svg" },
  { name: "Mastercard", icon: "/payments/mastercard.svg" },
  { name: "Amex", icon: "/payments/amex.svg" },
  { name: "PayPal", icon: "/payments/paypal.svg" },
  { name: "Apple Pay", icon: "/payments/apple-pay.svg" },
];
