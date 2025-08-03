import { FaEllipsisVertical } from "react-icons/fa6";
import type { SectionDetailType } from "~/trpc/types";
import PopupMenu from "../../ui/popupMenu";
import { FaTrash } from "react-icons/fa";
import { api } from "~/trpc/react";
import { isPermanentSection } from "~/utils/section";

export default function SectionCard({
  section,
}: {
  section: SectionDetailType;
}) {
  const trpc = api.useUtils();
  const { mutate: deleteSection } = api.section.delete.useMutation({
    onSuccess: () => {
      void trpc.collection.invalidate();
    },
  });
  return (
    <div className="min-h-[200px] min-w-[400px] snap-start rounded border p-2">
      <div className="flex items-center justify-between">
        <p className="font-bold">{section.name}</p>
        {!isPermanentSection(section.name) && (
          <PopupMenu
            button={
              <button type="button">
                <FaEllipsisVertical />
              </button>
            }
            content={
              <div className="bg-foreground rounded-lg p-2">
                <div className="flex flex-col items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => deleteSection({ id: section.id })}
                    className={`text-danger flex items-center gap-2`}
                  >
                    <FaTrash /> Delete
                  </button>
                  {/* Add more actions here */}
                </div>
              </div>
            }
          />
        )}
      </div>
      {/* Add tasks or other content here */}
    </div>
  );
}
