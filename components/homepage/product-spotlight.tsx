"use client";

import Image from "next/image";
import Link from "next/link";
import { productSpotlightSlug } from "@/data/homepage";
import { getProductBySlug } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/star-rating";

export function ProductSpotlight() {
  const product = getProductBySlug(productSpotlightSlug);
  const { addToCart } = useCart();

  if (!product) return null;

  const specs = Object.entries(product.specifications).slice(0, 4);

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="grid overflow-hidden rounded-md border border-border bg-card lg:grid-cols-2">
          <div className="relative aspect-square bg-muted lg:aspect-auto lg:min-h-[520px]">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center px-8 py-10 md:px-12 lg:px-14">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
              Product Spotlight
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{product.name}</h2>
            <div className="mt-3">
              <StarRating rating={product.rating} reviews={product.reviews} size="sm" />
            </div>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{product.description}</p>

            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              {specs.map(([key, value]) => (
                <div key={key} className="rounded-md border border-border bg-background px-3 py-2.5">
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {key}
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <p className="text-2xl font-bold tracking-tight">
                {formatPrice(product.salePrice ?? product.price)}
                {product.salePrice && (
                  <span className="ml-2 text-base font-medium text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href={`/product/${product.slug}`}>View Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
