import { Feature, HeroSlide, PromoBanner } from "@/types";

export const heroSlides: HeroSlide[] = [
  {
    id: "1",
    image: "/hero/hero-1.jpg",
    headline: "Built For The Way You Live.",
    description:
      "Discover practical products for your home, workspace and everyday projects, selected for quality, function and lasting value.",
    ctaText: "Shop Everything",
    ctaLink: "/shop",
    secondaryCtaText: "Explore New Arrivals",
    secondaryCtaLink: "/new-arrivals",
  },
];

export const heroCategoryStrip = [
  { label: "Home", href: "/categories/home-living" },
  { label: "Workspace", href: "/categories/workspace" },
  { label: "Utility", href: "/categories/tools-utility" },
  { label: "Outdoor", href: "/categories/outdoor" },
  { label: "Tech", href: "/categories/electronics" },
] as const;

export const featuredDepartments = [
  {
    id: "1",
    name: "Home & Living",
    slug: "home-living",
    image: "/categories/home-living.jpg",
    description: "Storage and essentials that keep rooms working harder.",
    size: "large" as const,
  },
  {
    id: "2",
    name: "Workspace",
    slug: "workspace",
    image: "/categories/workspace.jpg",
    description: "Desks, lighting, and organization for focused work.",
    size: "medium" as const,
  },
  {
    id: "3",
    name: "Tools & Utility",
    slug: "tools-utility",
    image: "/categories/tools-utility.jpg",
    description: "Reliable tools for repairs, builds, and daily fixes.",
    size: "medium" as const,
  },
  {
    id: "4",
    name: "Outdoor",
    slug: "outdoor",
    image: "/categories/outdoor.jpg",
    description: "Portable gear for yard, camp, and weekend projects.",
    size: "small" as const,
  },
  {
    id: "5",
    name: "Electronics",
    slug: "electronics",
    image: "/categories/electronics.jpg",
    description: "Charging, docking, and smart utilities that simplify tech.",
    size: "small" as const,
  },
];

export const shopByNeed = [
  {
    id: "1",
    title: "Organize Your Space",
    description: "Modular storage, wall systems, and carts that reclaim every corner.",
    image: "/banners/need-organize.jpg",
    href: "/categories/home-living",
    cta: "Shop Storage",
  },
  {
    id: "2",
    title: "Upgrade Your Workspace",
    description: "Risers, lamps, trays, and drawers for a cleaner desk setup.",
    image: "/banners/need-workspace.jpg",
    href: "/categories/workspace",
    cta: "Shop Workspace",
  },
  {
    id: "3",
    title: "Improve Your Kitchen",
    description: "Scales, grinders, and organizers that make prep feel effortless.",
    image: "/banners/need-kitchen.jpg",
    href: "/categories/kitchen",
    cta: "Shop Kitchen",
  },
  {
    id: "4",
    title: "Prepare For The Outdoors",
    description: "Lanterns, tables, and gear storage ready for yard or trail.",
    image: "/banners/need-outdoor.jpg",
    href: "/categories/outdoor",
    cta: "Shop Outdoor",
  },
  {
    id: "5",
    title: "Upgrade Your Tech",
    description: "Docks, hubs, trackers, and plugs that keep devices under control.",
    image: "/banners/need-tech.jpg",
    href: "/categories/electronics",
    cta: "Shop Tech",
  },
  {
    id: "6",
    title: "Make Everyday Tasks Easier",
    description: "Utility tools and essentials designed for real daily work.",
    image: "/banners/need-utility.jpg",
    href: "/categories/tools-utility",
    cta: "Shop Utility",
  },
];

export const features: Feature[] = [
  {
    id: "1",
    icon: "truck",
    title: "Fast Shipping",
    description: "Free shipping on orders over $75. Delivered in 3–5 business days.",
  },
  {
    id: "2",
    icon: "shield",
    title: "Secure Checkout",
    description: "Your payment information is protected with industry-standard encryption.",
  },
  {
    id: "3",
    icon: "rotate",
    title: "Easy Returns",
    description: "Hassle-free 30-day returns on most items. We make it simple.",
  },
  {
    id: "4",
    icon: "headphones",
    title: "Customer Support",
    description: "Our team is available Mon–Fri to help with orders and questions.",
  },
  {
    id: "5",
    icon: "star",
    title: "Trusted Quality",
    description: "Every product is selected for function, durability, and lasting value.",
  },
];

export const dealsEndTime = new Date(Date.now() + 1000 * 60 * 60 * 18).toISOString();

export const homepageDealsSlugs = [
  "modular-storage-organizer",
  "usb-c-docking-station",
  "electric-spice-grinder",
  "magnetic-tool-holder-bar",
  "portable-camping-lantern",
  "bath-towel-set",
] as const;

export const homepageBestsellerSlugs = [
  "bamboo-monitor-riser",
  "under-sink-organizer",
  "usb-c-docking-station",
  "precision-screwdriver-set",
  "digital-kitchen-scale",
  "foldable-utility-cart",
  "yoga-mat",
  "multi-device-charging-station",
] as const;

export const homepageFeaturedSlugs = [
  "modular-storage-organizer",
  "bamboo-monitor-riser",
  "magnetic-tool-holder-bar",
  "portable-camping-lantern",
  "usb-c-docking-station",
  "electric-spice-grinder",
  "motion-sensor-cabinet-light",
  "cable-management-tray",
] as const;

export const homepageNewArrivalSlugs = [
  "modular-storage-organizer",
  "bamboo-monitor-riser",
  "magnetic-tool-holder-bar",
  "usb-c-docking-station",
  "electric-spice-grinder",
  "portable-camping-lantern",
  "foldable-utility-cart",
  "desk-charging-hub",
  "silicone-food-storage-set",
  "bluetooth-item-tracker",
] as const;

export const productSpotlightSlug = "usb-c-docking-station";

export const promotionalBanner: PromoBanner = {
  id: "1",
  title: "Make Space For Better Things.",
  description:
    "Smart storage, practical tools and everyday essentials designed to make your spaces work better.",
  buttonText: "Explore Utility",
  buttonLink: "/categories/tools-utility",
  image: "/banners/utility-collection.jpg",
};

export const aboutSection = {
  title: "Built For Everyday Life.",
  description:
    "LJS Industries brings together practical products for home, workspace, and projects — curated for function, durability, and lasting value. We focus on tools and essentials that earn their place in your day.",
  checklist: [
    "Utility-focused product selection",
    "Quality checked for lasting use",
    "Fast, reliable shipping nationwide",
    "Dedicated customer support team",
  ],
  buttonText: "Learn More About Us",
  buttonLink: "/about",
  image: "/banners/about.jpg",
};

export const featuredCollection = {
  title: "Featured Products",
  description:
    "Hand-picked favorites across home, workspace, tools, and tech — built for everyday life.",
  bannerImage: "/banners/featured.jpg",
  categorySlug: "home-living",
};

export const bestSellerTabs = [
  { label: "All", slug: "all" },
  { label: "Home", slug: "home-living" },
  { label: "Workspace", slug: "workspace" },
  { label: "Tools", slug: "tools-utility" },
  { label: "Electronics", slug: "electronics" },
];

export const newsletter = {
  title: "Get More From Every Purchase.",
  description: "Be the first to see new products, useful collections and exclusive offers.",
  placeholder: "Enter your email address",
  buttonText: "Subscribe",
};

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];
