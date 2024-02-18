// Filename - App.js

import type { Dispatch, SetStateAction } from "react";
import { useEffect, useRef, useState } from "react";

export default function Countdown({
  minutes,
  dismiss,
}: {
  minutes: number;
  dismiss: Dispatch<SetStateAction<boolean>>;
}) {
  // We need ref in this, because we are dealing
  // with JS setInterval to keep track of it and
  // stop it when needed
  const ref = useRef<NodeJS.Timeout | null>(null);

  // The state for our timer
  const [timer, setTimer] = useState("00:00:00");

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
  useEffect(() => {
    clearTimer(getDeadTime(minutes));
  }, []);

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  const onClickReset = () => {
    clearTimer(getDeadTime(minutes));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-2">
      <h2 className="text-xl">{timer}</h2>
      <div className="flex gap-2">
        <button onClick={onClickReset}>Reset</button>
        <button onClick={() => dismiss(false)}>Close</button>
      </div>
    </div>
  );
}
