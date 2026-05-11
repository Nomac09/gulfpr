import Link from "next/link";
import { cn } from "@/lib/cn";

export function Wordmark({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "text-[17px]",
    md: "text-[19px]",
    lg: "text-[26px]",
  };
  return (
    <Link
      href="/"
      aria-label="Gulf PR Atlas — home"
      className={cn("group inline-flex items-baseline gap-[6px]", className)}
    >
      <span
        className={cn(
          "font-display font-medium leading-none text-[var(--color-text)]",
          sizes[size]
        )}
      >
        Gulf PR
      </span>
      <span
        aria-hidden
        className="inline-block h-[6px] w-[6px] rounded-full bg-[var(--color-accent)] translate-y-[-2px] transition-transform group-hover:scale-125"
      />
      <span
        className={cn(
          "font-display font-medium leading-none text-[var(--color-text)]",
          sizes[size]
        )}
      >
        Atlas
      </span>
    </Link>
  );
}
