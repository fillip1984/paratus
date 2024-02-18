import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

function TaskCard(props: {
  task: RouterOutputs["task"]["all"][number];
  onDelete: () => void;
}) {
  return (
    <View className="flex flex-row rounded-lg bg-muted p-4">
      <View className="flex-grow">
        <Link
          asChild
          href={{
            pathname: "/tasks/[id]",
            params: { id: props.task.id },
          }}>
          <Pressable className="">
            <Text className=" text-xl font-semibold text-primary">
              {props.task.title}
            </Text>
            <Text className="mt-2 text-foreground">{props.task.content}</Text>
          </Pressable>
        </Link>
      </View>
      <Pressable onPress={props.onDelete}>
        <Text className="font-bold uppercase text-primary">Delete</Text>
      </Pressable>
    </View>
  );
}

function CreateTask() {
  const utils = api.useUtils();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [duration, setDuration] = useState("");

  const { mutate, error } = api.task.create.useMutation({
    async onSuccess() {
      setTitle("");
      setContent("");
      setDuration("0");
      await utils.task.all.invalidate();
    },
  });

  return (
    <View className="mt-4 flex gap-2">
      <TextInput
        className=" items-center rounded-md border border-input bg-background px-3 text-lg leading-[1.25] text-foreground"
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      {error?.data?.zodError?.fieldErrors.title && (
        <Text className="mb-2 text-destructive">
          {error.data.zodError.fieldErrors.title}
        </Text>
      )}
      <TextInput
        className="items-center rounded-md border border-input bg-background px-3  text-lg leading-[1.25] text-foreground"
        value={content}
        onChangeText={setContent}
        placeholder="Content"
      />
      {error?.data?.zodError?.fieldErrors.content && (
        <Text className="mb-2 text-destructive">
          {error.data.zodError.fieldErrors.content}
        </Text>
      )}
      <TextInput
        className="items-center rounded-md border border-input bg-background px-3  text-lg leading-[1.25] text-foreground"
        value={duration}
        onChangeText={setDuration}
        placeholder="Duration"
      />
      {error?.data?.zodError?.fieldErrors.content && (
        <Text className="mb-2 text-destructive">
          {error.data.zodError.fieldErrors.content}
        </Text>
      )}
      <Pressable
        className="flex items-center rounded bg-primary p-2"
        onPress={() => {
          mutate({
            title,
            content,
            duration: parseInt(duration),
          });
        }}>
        <Text className="text-foreground">Create</Text>
      </Pressable>
      {error?.data?.code === "UNAUTHORIZED" && (
        <Text className="mt-2 text-destructive">
          You need to be logged in to create a task
        </Text>
      )}
    </View>
  );
}

export default function Index() {
  const utils = api.useUtils();

  const taskQuery = api.task.all.useQuery();

  const deleteTaskMutation = api.task.delete.useMutation({
    onSettled: () => utils.task.all.invalidate().then(),
  });

  return (
    <SafeAreaView className=" bg-background">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full bg-background p-4">
        <Text className="pb-2 text-center text-5xl font-bold text-foreground">
          Omnia <Text className="text-primary">Paratus</Text>
        </Text>

        <Pressable
          onPress={() => void utils.task.all.invalidate()}
          className="flex items-center rounded-lg bg-primary p-2">
          <Text className="text-foreground"> Refresh tasks</Text>
        </Pressable>

        <View className="py-2">
          <Text className="font-semibold italic text-primary">
            Press on a task
          </Text>
        </View>

        <FlashList
          data={taskQuery.data}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={(t) => (
            <TaskCard
              task={t.item}
              onDelete={() => deleteTaskMutation.mutate(t.item.id)}
            />
          )}
        />

        <CreateTask />
      </View>
    </SafeAreaView>
  );
}
