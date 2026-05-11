import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { AccentRule } from "@/components/accent-rule";

export function PhaseStub({
  phase,
  title,
  blurb,
  shippingNotes,
}: {
  phase: string;
  title: string;
  blurb: string;
  shippingNotes: string[];
}) {
  return (
    <div className="pb-32 pt-16 lg:pt-24">
      <Container size="narrow">
        <Eyebrow accent>{phase}</Eyebrow>
        <h1 className="mt-4 font-display text-[44px] leading-[0.98] font-medium tracking-[-0.025em] sm:text-[64px] lg:text-[72px]">
          {title}
        </h1>
        <AccentRule className="mt-10 w-32" />
        <p className="mt-10 max-w-[60ch] text-[18px] leading-[1.6] text-[var(--color-text-secondary)]">
          {blurb}
        </p>

        <div className="mt-14 border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full bg-[var(--color-accent)] animate-pulse"
            />
            <span className="tracked-label-accent">In development</span>
          </div>
          <h2 className="mt-4 font-display text-[24px] leading-tight font-medium">
            What this section will cover
          </h2>
          <ul className="mt-5 space-y-3 text-[15px] leading-[1.55] text-[var(--color-text-secondary)]">
            {shippingNotes.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2.5 inline-block h-px w-3 shrink-0 bg-[var(--color-text-muted)]"
                />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[14px] font-medium underline decoration-[var(--color-border-strong)] underline-offset-[6px] hover:decoration-[var(--color-accent)]"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back to the atlas
          </Link>
        </div>
      </Container>
    </div>
  );
}
