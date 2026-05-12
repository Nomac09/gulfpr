"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { Agency, PracticeArea } from "@/content/agencies/types";
import { PracticeHeatmap } from "@/components/charts/practice-heatmap";

export function PracticeHeatmapInteractive({
  agencies,
  practices,
}: {
  agencies: Agency[];
  practices: PracticeArea[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handlePracticeClick(p: PracticeArea) {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get("practice") === p) {
      params.delete("practice");
    } else {
      params.set("practice", p);
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    // Scroll to the directory grid after filter change
    if (typeof window !== "undefined") {
      const el = document.getElementById("directory");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <PracticeHeatmap
      agencies={agencies}
      practices={practices}
      onPracticeClick={handlePracticeClick}
    />
  );
}
