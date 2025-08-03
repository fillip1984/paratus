import { FaEllipsisVertical, FaPlus } from "react-icons/fa6";
import type { SectionDetailType } from "~/trpc/types";
import PopupMenu from "../../ui/popupMenu";
import { FaTrash } from "react-icons/fa";
import { api } from "~/trpc/react";
import { isPermanentSection } from "~/utils/section";
import AddTaskCard from "./task/AddTaskCard";
import { useState } from "react";
import { startOfDay } from "date-fns";

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

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

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
      <>
        {section.tasks.map((task) => (
          <div key={task.id} className="my-2">
            <p className="text-sm">{task.text}</p>
            {/* Render other task details here */}
          </div>
        ))}
      </>
      <>
        {isAddTaskOpen ? (
          <AddTaskCard
            currentCollectionId={section.collectionId}
            currentSectionId={section.id}
            defaultDueDate={startOfDay(new Date())}
            dismiss={() => setIsAddTaskOpen((prev) => !prev)}
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsAddTaskOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded p-1 font-thin hover:bg-white/10"
          >
            <FaPlus className="text-primary" /> Add task
          </button>
        )}
      </>
    </div>
  );
}
