import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const max = {
    default: "max-w-[1280px]",
    narrow: "max-w-[920px]",
    wide: "max-w-[1440px]",
  }[size];
  return (
    <div className={cn("mx-auto px-6 lg:px-12", max, className)}>{children}</div>
  );
}
