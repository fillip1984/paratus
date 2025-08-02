"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { api } from "~/trpc/react";
import type { CollectionDetailType, SectionDetailType } from "~/trpc/types";

export default function CollectionListView({
  collection,
}: {
  collection: CollectionDetailType;
}) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-1 snap-y snap-mandatory flex-col gap-2 overflow-auto p-2 pb-12">
        {collection.sections.map((section) => (
          <Section key={section.id} section={section} />
        ))}
        <AddSection
          collectionId={collection.id}
          collectionName={collection.name}
        />
      </div>
    </div>
  );
}

const Section = ({ section }: { section: SectionDetailType }) => {
  return (
    <div className="min-h-[200px] snap-start rounded border p-2">
      <p className="font-bold">{section.name}</p>
      {/* Add tasks or other content here */}
    </div>
  );
};

const AddSection = ({
  collectionId,
  collectionName,
}: {
  collectionId: string;
  collectionName: string;
}) => {
  const [sectionName, setSectionName] = useState("");
  const trpc = api.useUtils();
  const { mutate: addSection } = api.section.create.useMutation({
    onSuccess: () => {
      console.log("invalidate collection", collectionId, collectionName);
      void trpc.collection.readOne.invalidate({ id: collectionId });
      void trpc.collection.readOne.invalidate({ id: collectionName });
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
