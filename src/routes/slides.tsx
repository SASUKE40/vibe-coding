import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { SlideContainer } from "~/features/slides/components/SlideContainer";
import { TOTAL_SLIDES } from "~/features/slides/data/slides-content";
import { seo } from "~/utils/seo";

const slideSearchSchema = z.object({
  slide: z.number().int().min(1).max(TOTAL_SLIDES).optional().default(1),
});

export const Route = createFileRoute("/slides")({
  validateSearch: slideSearchSchema,
  head: () => ({
    meta: [
      ...seo({
        title: "Claude Code Workflows",
        description:
          "Advanced patterns for productive AI-assisted development with Claude Code",
      }),
    ],
  }),
  component: SlidesPage,
});

function SlidesPage() {
  const { slide } = Route.useSearch();

  return <SlideContainer slideNumber={slide} />;
}
