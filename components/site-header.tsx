"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV } from "@/lib/site";
import { Wordmark } from "@/components/wordmark";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 lg:px-12">
        <div className="flex items-baseline gap-6">
          <Wordmark />
          <span className="hidden text-[12px] text-[var(--color-text-muted)] md:inline">
            An open reference for the Gulf communications industry
          </span>
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-1.5 rounded-sm px-3 py-2 text-[13px] font-medium transition-colors",
                  active
                    ? "text-[var(--color-text)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                )}
              >
                {item.label}
                {item.status === "soon" && (
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]">
                    Soon
                  </span>
                )}
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-x-3 -bottom-px h-[2px] bg-[var(--color-accent)]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="rounded-sm border border-[var(--color-border-strong)] p-2 lg:hidden"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-[var(--color-border)] bg-[var(--color-surface)] lg:hidden">
          <div className="mx-auto flex max-w-[1280px] flex-col px-6 py-2">
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between border-b border-[var(--color-border)] py-3 text-[15px] last:border-0",
                    active
                      ? "text-[var(--color-text)]"
                      : "text-[var(--color-text-secondary)]"
                  )}
                >
                  {item.label}
                  {item.status === "soon" && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                      Soon
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
