import type { CollectionDetailType } from "~/trpc/types";

export default function CollectionListView({
  collection,
}: {
  collection: CollectionDetailType;
}) {
  return (
    <div className="bg-warning flex flex-1">
      {collection.sections.map((section) => (
        <div key={section.id} className="section">
          <h3>{section.name}</h3>
        </div>
      ))}
    </div>
  );
}
