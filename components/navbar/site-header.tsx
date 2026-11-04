"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Menu, ShoppingBag, User, X } from "lucide-react";
import { company } from "@/data/company";
import { categoryNavLinks, navigationLinks, utilityStripLinks } from "@/data/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { SearchBar } from "@/components/navbar/search-bar";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-dark text-white">
        <Container className="flex h-8 items-center justify-between gap-4 text-[11px] font-medium tracking-wide">
          <p className="hidden truncate text-white/70 sm:block">{company.tagline}</p>
          <ul className="flex w-full items-center justify-center gap-5 sm:w-auto sm:justify-end">
            {utilityStripLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/80 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      <div className="border-b border-border bg-card">
        <Container>
          <div className="flex items-center gap-4 py-3 lg:gap-8 lg:py-4">
            <Link href="/" className="flex shrink-0 items-center">
              <Image
                src="/logo/logo.svg"
                alt={company.name}
                width={240}
                height={44}
                priority
                className="h-9 w-auto sm:h-10"
              />
            </Link>

            <div className="hidden min-w-0 flex-1 md:block">
              <SearchBar variant="inline" />
            </div>

            <div className="ml-auto flex items-center gap-1">
              <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex relative h-10 w-10">
                <Link href="/wishlist" aria-label="Wishlist">
                  <Heart className="h-[18px] w-[18px]" />
                  {wishlist.length > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
              </Button>

              <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex h-10 w-10">
                <Link href="/profile" aria-label="Account">
                  <User className="h-[18px] w-[18px]" />
                </Link>
              </Button>

              <Button variant="ghost" size="icon" asChild className="relative h-10 w-10">
                <Link href="/cart" aria-label="Cart">
                  <ShoppingBag className="h-[18px] w-[18px]" />
                  {itemCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 lg:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
              </Button>
            </div>
          </div>

          <div className="pb-3 md:hidden">
            <SearchBar variant="inline" />
          </div>
        </Container>

        <nav className="hidden border-t border-border bg-card lg:block">
          <Container>
            <ul className="flex items-center gap-1 py-2">
              {categoryNavLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex rounded-md px-3.5 py-2 text-sm font-semibold text-foreground/85 transition-colors hover:bg-muted hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      </div>

      {mobileOpen && (
        <div className="border-b border-border bg-card lg:hidden">
          <Container className="py-3">
            <ul className="space-y-0.5">
              {categoryNavLinks.map((link) => (
                <li key={`m-${link.href}-${link.label}`}>
                  <Link
                    href={link.href}
                    className="block rounded-md px-3 py-2.5 text-sm font-semibold hover:bg-muted"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="my-2 border-t border-border" />
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
                          <li data-mobile-extra className="sm:hidden"><Link href="/wishlist" className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground" onClick={() => setMobileOpen(false)}>Wishlist</Link></li>
              <li data-mobile-extra className="sm:hidden"><Link href="/profile" className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground" onClick={() => setMobileOpen(false)}>Account</Link></li>
            </ul>
          </Container>
        </div>
      )}
    </div>
  );
}
