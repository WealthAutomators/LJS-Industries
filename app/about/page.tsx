import { company } from "@/data/company";
import { testimonials } from "@/data/testimonials";
import { PageHero, PageSection } from "@/components/ui/page-layout";
import { Container } from "@/components/ui/container";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Check, Award, Heart, Wrench } from "lucide-react";

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={`About ${company.name}`}
        description={company.description}
        breadcrumbs={[{ label: "About Us" }]}
      />

      <Container className="pb-16">
        <div className="grid items-center gap-10 py-12 md:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border">
            <Image src="/banners/about.jpg" alt={`About ${company.name}`} fill className="object-cover" sizes="50vw" />
          </div>
          <PageSection title="Our Story">
            <p>
              {company.name} was built around a simple idea: everyday spaces work better with the
              right tools. From storage systems and workspace upgrades to outdoor gear and practical
              electronics, we curate products that earn their place through function and durability.
            </p>
            <p className="mt-4">
              Based in {company.address.city}, {company.address.state}, we focus on industrial-modern
              essentials for home, work, and projects — selected for quality, clear value, and a
              shopping experience that stays straightforward from browse to delivery.
            </p>
          </PageSection>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Wrench, title: "Utility First", desc: "Products chosen for real tasks across home, workspace, and projects." },
            { icon: Award, title: "Built To Last", desc: "We prioritize durable materials and thoughtful construction." },
            { icon: Heart, title: "Customer First", desc: "30-day returns, responsive support, and clear policies." },
            { icon: Check, title: "One Marketplace", desc: "Practical essentials in one catalog — no clutter, no fluff." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-md border border-border bg-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <PageSection title="What Our Customers Say" className="mt-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {testimonials.map((t) => (
              <div key={t.id} className="rounded-md border border-border bg-card p-6">
                <StarRating rating={t.rating} showCount={false} size="md" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">&ldquo;{t.text}&rdquo;</p>
                <p className="mt-4 text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            ))}
          </div>
        </PageSection>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/shop">Shop Our Collection</Link>
          </Button>
        </div>
      </Container>
    </>
  );
}
