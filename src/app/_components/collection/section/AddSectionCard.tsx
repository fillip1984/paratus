import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { api } from "~/trpc/react";

export default function AddSectionCard({
  collectionId,
}: {
  collectionId: string;
}) {
  const [sectionName, setSectionName] = useState("");
  const trpc = api.useUtils();
  const { mutate: addSection } = api.section.create.useMutation({
    onSuccess: () => {
      void trpc.collection.invalidate();
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
}
