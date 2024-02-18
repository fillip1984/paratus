import { useRef, useState } from "react";
import { Pressable, SafeAreaView, Text, Vibration, View } from "react-native";
import { Stack, useGlobalSearchParams } from "expo-router";

import { api } from "~/utils/api";

export default function Task() {
  // We need ref in this, because we are dealing
  // with JS setInterval to keep track of it and
  // stop it when needed
  const ref = useRef<NodeJS.Timeout | null>(null);

  const { id } = useGlobalSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");
  const { data } = api.task.byId.useQuery({ id });

  // The state for our timer
  const [timer, setTimer] = useState("00:00:00");
  const [timerRunning, setTimerRunning] = useState(false);

  const PATTERN = [500, 500, 500];

  const getTimeRemaining = (e: Date) => {
    const total = e.getTime() - new Date().getTime();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e: Date) => {
    const { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds),
      );
    } else {
      Vibration.vibrate(PATTERN, true);
      if (ref.current) clearInterval(ref.current);
    }
  };

  const clearTimer = (e: Date) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("00:00:00");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (ref.current) clearInterval(ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    ref.current = id;
  };

  const getDeadTime = (minutes: number) => {
    const deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + minutes * 60);
    return deadline;
  };

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  const start = (duration: number) => {
    Vibration.cancel();
    setTimerRunning(true);
    clearTimer(getDeadTime(duration));
  };

  const stop = () => {
    Vibration.cancel();
    setTimerRunning(false);
    if (ref.current) clearInterval(ref.current);
    setTimer("00:00:00");
  };

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  const onClickReset = (duration: number) => {
    Vibration.cancel();
    setTimerRunning(true);
    clearTimer(getDeadTime(duration));
  };

  if (!data) {
    return (
      <View>
        <Text>Unable to retrieve data</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-background">
      <Stack.Screen options={{ title: data.title }} />
      <View className="p-2">
        <Text className="py-2 text-3xl font-bold text-primary">
          {data.title}
        </Text>
        <Text className="py-4 text-foreground">{data.content}</Text>
      </View>

      <>
        <View className="m-4 flex">
          <Text className="mx-auto text-4xl text-black">{timer}</Text>
        </View>

        <View className="mx-4 flex gap-1">
          {!timerRunning && (
            <Pressable
              onPress={() => start(data.duration)}
              className="flex items-center rounded bg-secondary p-2">
              <Text className="text-3xl text-white">Start timer</Text>
              <Text className="text-xl text-white">
                {data.duration} minutes
              </Text>
            </Pressable>
          )}
          {timerRunning && (
            <Pressable
              onPress={() => onClickReset(data.duration)}
              className="flex items-center rounded bg-primary p-2">
              <Text className="text-3xl text-white">Reset</Text>
            </Pressable>
          )}
          {timerRunning && (
            <Pressable
              onPress={stop}
              className="flex items-center rounded bg-secondary p-2">
              <Text className="text-3xl text-white">Cancel</Text>
            </Pressable>
          )}
        </View>
      </>
    </SafeAreaView>
  );
}
