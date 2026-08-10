"use client";

import { useState } from "react";
import { bestSellerTabs, homepageBestsellerSlugs } from "@/data/homepage";
import { getBestsellerProducts, getProductsBySlugs } from "@/data/products";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Carousel } from "@/components/ui/carousel";
import { ProductCard } from "@/components/product/product-card";
import { cn } from "@/lib/utils";

export function BestSellers() {
  const [activeTab, setActiveTab] = useState("all");
  const curatedBestsellers = getProductsBySlugs(homepageBestsellerSlugs);
  const bestsellers = getBestsellerProducts();

  const filtered =
    activeTab === "all"
      ? curatedBestsellers
      : bestsellers.filter((p) => p.categorySlug === activeTab).slice(0, 8);

  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeading title="Best Sellers" viewMoreLink="/best-sellers" />

        <div className="mb-8 flex flex-wrap gap-2">
          {bestSellerTabs.map((tab) => (
            <button
              key={tab.slug}
              onClick={() => setActiveTab(tab.slug)}
              className={cn(
                "rounded-md px-5 py-2 text-sm font-semibold transition-colors",
                activeTab === tab.slug
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Carousel slidesToShow={3} className="px-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} className="lg:min-h-[420px]" />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
