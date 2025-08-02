import type { RouterOutputs } from "./react";

export type CollectionDetailType = NonNullable<RouterOutputs['collection']['readOne']>;
export type SectionDetailType = CollectionDetailType["sections"][number]