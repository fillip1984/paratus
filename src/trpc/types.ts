import type { RouterOutputs } from "./react";

// sumary types
export type CollectionSummaryType = NonNullable<
  RouterOutputs["collection"]["readAll"]
>[number];
export type SectionSummaryType = CollectionSummaryType["sections"][number];

// detail types
export type CollectionDetailType = NonNullable<
  RouterOutputs["collection"]["readOne"]
>;
export type SectionDetailType = CollectionDetailType["sections"][number];
