"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { promotionalBanner } from "@/data/homepage";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function UtilityCollectionBanner() {
  const banner = promotionalBanner;

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="grid overflow-hidden rounded-md border border-border bg-dark lg:grid-cols-2">
          <div className="relative min-h-[280px] lg:min-h-[420px]">
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark/40 to-transparent lg:hidden" />
          </div>
          <div className="flex flex-col justify-center px-8 py-12 md:px-12 lg:px-14">
            <span className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Utility Collection
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              {banner.title}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
              {banner.description}
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="accent">
                <Link href={banner.buttonLink}>
                  {banner.buttonText}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
