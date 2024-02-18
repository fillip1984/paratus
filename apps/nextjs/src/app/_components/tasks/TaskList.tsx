import type { RouterOutputs } from "@acme/api";

import TaskCard from "./TaskCard";

export default function TaskList({
  tasks,
}: {
  tasks: RouterOutputs["task"]["all"];
}) {
  return (
    <div className="my-2 flex w-full flex-col gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
