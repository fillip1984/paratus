import { FaEllipsisVertical } from "react-icons/fa6";
import type { SectionDetailType } from "~/trpc/types";
import PopupMenu from "../../ui/popupMenu";

export default function SectionCard({
  section,
}: {
  section: SectionDetailType;
}) {
  return (
    <div className="min-h-[200px] snap-start rounded border p-2">
      <div className="flex items-center justify-between">
        <p className="font-bold">{section.name}</p>
        <PopupMenu
          button={
            <button type="button">
              <FaEllipsisVertical />
            </button>
          }
          content={
            <div className="bg-foreground rounded-lg p-2">
              <div className="flex flex-col items-center justify-center gap-2">
                <p>Actions</p>
                {/* Add more actions here */}
              </div>
            </div>
          }
        />
      </div>
      {/* Add tasks or other content here */}
    </div>
  );
}
