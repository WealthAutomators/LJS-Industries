"use client";

import Image from "next/image";
import Link from "next/link";
import { shopByNeed } from "@/data/homepage";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export function ShopByNeed() {
  return (
    <section className="bg-card py-12 md:py-16">
      <Container>
        <SectionHeading
          title="Shop By Need"
          subtitle="Start with the job you need done — then find the right tools and essentials."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shopByNeed.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative overflow-hidden rounded-md border border-border"
            >
              <div className="relative aspect-[5/4]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/45 to-dark/10" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/75">{item.description}</p>
                <span className="mt-4 inline-flex text-sm font-semibold text-accent transition-colors group-hover:text-white">
                  {item.cta} →
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="secondary">
            <Link href="/shop">Browse Full Catalog</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
