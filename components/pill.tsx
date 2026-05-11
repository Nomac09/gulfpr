import { cn } from "@/lib/cn";

export function Pill({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "parent" | "accent" | "outline";
  className?: string;
}) {
  const styles = {
    default:
      "bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] border-transparent",
    parent:
      "border-[1.5px] border-[var(--color-text)] text-[var(--color-text)] bg-transparent font-mono tracking-[0.08em]",
    accent:
      "bg-[var(--color-accent)]/10 text-[var(--color-accent-deep)] border-[var(--color-accent)]/20",
    outline:
      "border-[var(--color-border-strong)] text-[var(--color-text-secondary)] bg-transparent",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[3px] border px-2 py-0.5 text-[11px] font-medium leading-none tracking-[0.04em]",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
