import { cn } from "@/lib/cn";

export function Stat({
  value,
  label,
  sub,
  className,
}: {
  value: string | number;
  label: string;
  sub?: string;
  className?: string;
}) {
  return (
    <div className={cn("group flex flex-col gap-2", className)}>
      <div className="font-display text-[44px] leading-none font-medium md:text-[64px] lg:text-[72px] tabular">
        {value}
      </div>
      <div className="tracked-label">{label}</div>
      {sub && (
        <div className="text-[12px] text-[var(--color-text-muted)]">{sub}</div>
      )}
    </div>
  );
}
