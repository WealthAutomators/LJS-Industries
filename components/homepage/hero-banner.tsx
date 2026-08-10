"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { heroCategoryStrip, heroSlides } from "@/data/homepage";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  const slide = heroSlides[0];

  return (
    <section className="relative">
      <div className="relative h-[70vh] min-h-[420px] max-h-[760px] w-full overflow-hidden">
        <Image
          src={slide.image}
          alt={slide.headline}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/55 to-dark/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent" />

        <Container className="relative flex h-full items-end pb-12 md:pb-16">
          <motion.div
            className="max-w-xl text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <h1 className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              {slide.headline}
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
              {slide.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={slide.ctaLink}>{slide.ctaText}</Link>
              </Button>
              {slide.secondaryCtaText && slide.secondaryCtaLink && (
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="border-white/40 bg-white/10 text-white hover:bg-white hover:text-primary"
                >
                  <Link href={slide.secondaryCtaLink}>{slide.secondaryCtaText}</Link>
                </Button>
              )}
            </div>
          </motion.div>
        </Container>
      </div>

      <div className="border-b border-border bg-card">
        <Container>
          <ul className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
            {heroCategoryStrip.map((item) => (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  className="inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
