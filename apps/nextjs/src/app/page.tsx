"use client";

import { api } from "~/trpc/react";
import CreateTask from "./_components/tasks/CreateTask";
// export const runtime = "edge";

import TaskList from "./_components/tasks/TaskList";

export default function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below
  // const posts = api.post.all();
  const taskQuery = api.task.all.useQuery();

  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Omnia <span className="text-primary">Paratus</span>
        </h1>
        {taskQuery.data && <TaskList tasks={taskQuery.data} />}
        <CreateTask />
        {/* <AuthShowcase /> */}

        {/* <CreatePostForm /> */}
        {/* <div className="w-full max-w-2xl overflow-y-scroll">
          <Suspense
            fallback={
              <div className="flex w-full flex-col gap-4">
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
              </div>
            }>
            <PostList posts={posts} />
          </Suspense>
        </div> */}
      </div>
    </main>
  );
}
