import { HeroBanner } from "@/components/homepage/hero-banner";
import { FeaturedDepartments } from "@/components/homepage/featured-departments";
import { NewArrivals } from "@/components/homepage/new-arrivals";
import { UtilityCollectionBanner } from "@/components/homepage/utility-collection-banner";
import { BestSellers } from "@/components/homepage/best-sellers";
import { ShopByNeed } from "@/components/homepage/shop-by-need";
import { ProductSpotlight } from "@/components/homepage/product-spotlight";
import { CustomerReviews } from "@/components/homepage/customer-reviews";
import { Newsletter } from "@/components/homepage/newsletter";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <FeaturedDepartments />
      <NewArrivals />
      <UtilityCollectionBanner />
      <BestSellers />
      <ShopByNeed />
      <ProductSpotlight />
      <CustomerReviews />
      <Newsletter />
    </>
  );
}
