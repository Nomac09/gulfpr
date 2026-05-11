import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  accent,
  className,
}: {
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        accent ? "tracked-label-accent" : "tracked-label",
        "inline-flex items-center gap-2",
        className
      )}
    >
      {accent && (
        <span
          aria-hidden
          className="inline-block h-px w-6 bg-[var(--color-accent)]"
        />
      )}
      <span>{children}</span>
    </div>
  );
}
