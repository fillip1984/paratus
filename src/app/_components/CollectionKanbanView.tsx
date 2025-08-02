import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { api } from "~/trpc/react";
import type { CollectionDetailType, SectionDetailType } from "~/trpc/types";

export default function CollectionKanbanView({
  collection,
}: {
  collection: CollectionDetailType;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 overflow-hidden">
        <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto p-2">
          {collection.sections.map((section) => (
            <Section key={section.id} section={section} />
          ))}
          <AddSection collectionId={collection.id} />
        </div>
      </div>
    </div>
  );
}

const Section = ({ section }: { section: SectionDetailType }) => {
  return (
    <div className="min-w-[400px] snap-center rounded border p-2">
      <p className="font-bold">{section.name}</p>
      {/* Add tasks or other content here */}
    </div>
  );
};

const AddSection = ({ collectionId }: { collectionId: string }) => {
  const [sectionName, setSectionName] = useState("");
  const trpc = api.useUtils();
  const { mutate: addSection } = api.section.create.useMutation({
    onSuccess: () => {
      void trpc.collection.readOne.invalidate({ id: collectionId });
      setSectionName("");
    },
  });
  const handleAddSection = () => {
    addSection({ name: sectionName, collectionId });
  };
  return (
    <div className="mx-8 flex h-fit min-w-[300px] snap-center rounded border">
      <input
        type="text"
        value={sectionName}
        onChange={(e) => setSectionName(e.target.value)}
        placeholder="New Section Name..."
        className="w-full p-1"
      />
      <button
        className="flex items-center justify-center gap-2 border p-2"
        onClick={handleAddSection}
      >
        <FaPlus />
      </button>
    </div>
  );
};
