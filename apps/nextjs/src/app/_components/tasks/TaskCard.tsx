"use client";

import { useState } from "react";

import type { RouterOutputs } from "@acme/api";
import { Button } from "@acme/ui/button";
import { toast } from "@acme/ui/toast";

import { api } from "~/trpc/react";
import Countdown from "./Countdown";

export default function TaskCard({
  task,
}: {
  task: RouterOutputs["task"]["all"][number];
}) {
  const utils = api.useUtils();
  const deleteTask = api.task.delete.useMutation({
    onSuccess: async () => {
      await utils.task.invalidate();
      toast.success("It worked");
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to delete a task"
          : "Failed to delete task",
      );
    },
  });

  const [showTime, setShowTimer] = useState(false);

  return (
    <div className="relative">
      <div className="flex flex-col rounded-lg bg-muted">
        <div className="card-title flex items-center justify-between p-1">
          <h2 className="text-2xl font-bold text-primary">{task.title}</h2>
          <button
            type="button"
            onClick={() => setShowTimer(!showTime)}
            className="rounded bg-white p-1 text-xl text-secondary">
            {task.duration} minutes
          </button>
        </div>
        <div className="card-body p-2">
          <p className="text-sm">{task.content}</p>
        </div>
        <div className="card-footer flex justify-end">
          <Button
            variant="ghost"
            className="cursor-pointer text-sm font-bold uppercase text-primary hover:bg-transparent hover:text-white"
            onClick={() => deleteTask.mutate(task.id)}>
            Delete
          </Button>
        </div>
      </div>

      {showTime && (
        <div className="absolute inset-4 rounded-lg bg-white/90 text-black">
          <Countdown minutes={task.duration} dismiss={setShowTimer} />
        </div>
      )}
    </div>
  );
}
