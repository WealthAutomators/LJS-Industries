import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StarRating } from "@/components/ui/star-rating";
import { Badge } from "@/components/ui/badge";

export function CustomerReviews() {
  return (
    <section className="bg-muted/40 py-12 md:py-16">
      <Container>
        <SectionHeading
          title="Customer Reviews"
          subtitle="Real feedback from people putting LJS products to work."
          centered
        />
        <div className="mt-2 flex gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3">
          {testimonials.slice(0, 6).map((t, index) => (
            <div
              key={t.id}
              className="min-w-[280px] rounded-md border border-border bg-card p-6 md:min-w-0"
              style={{ marginTop: index % 2 === 1 ? "1.25rem" : 0 }}
            >
              <div className="flex items-center justify-between gap-3">
                <StarRating rating={t.rating} showCount={false} size="sm" />
                <Badge variant="outline" className="rounded-md text-[10px] uppercase tracking-wide">
                  Verified Purchase
                </Badge>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">&ldquo;{t.text}&rdquo;</p>
              <p className="mt-5 text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.location}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
