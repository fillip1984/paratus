import type { CollectionDetailType } from "~/trpc/types";
import AddSectionCard from "./section/AddSectionCard";
import SectionCard from "./section/SectionCard";

export default function CollectionKanbanView({
  collection,
}: {
  collection: CollectionDetailType;
}) {
  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto p-2">
        {collection.sections.map((section) => (
          <SectionCard key={section.id} section={section} />
        ))}
        <AddSectionCard
          collectionId={collection.id}
          collectionName={collection.name}
        />
      </div>
    </div>
  );
}
