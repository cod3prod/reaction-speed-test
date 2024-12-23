"use client";

import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function ReactionSpeed() {
  const [history, setHistory] = useState<number[]>([]);
  const [canClick, setCanClick] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true);
  const [startTime, setStartTime] = useState(0);
  const [now, setNow] = useState(0);

  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (history.length === 5) {
      setIsWaiting(true);
      setCanClick(false);
    }

    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [history]);

  function handleMeasure() {
    console.log("Measure 시작");
    setIsWaiting(false);
    setCanClick(false);

    timeoutRef.current = window.setTimeout(() => {
      console.log("초록불 켜짐 (canClick: true)");
      setCanClick(true);
      setStartTime(0);
      setNow(0);
    }, Math.random() * 2000 + 1000);
  }

  function handleStart() {
    if (!canClick) {
      console.log("handleStart 실행 취소 (canClick이 false)");
      return;
    }

    console.log("Reaction 시작");
    setStartTime(Date.now());
    setNow(Date.now());

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setNow(Date.now());
    }, 10);

  }
  useEffect(()=>{
    if(!canClick){
      console.log("canClick이 false");
      return;
    }
    handleStart();
  }, [canClick])

  function handleStop() {
    if (!canClick) {
      console.log("handleStop 실행 취소 (canClick이 false)");
      return;
    }

    const reactionTime = now - startTime;
    if (reactionTime <= 0) return;

    console.log(`Reaction Time: ${reactionTime} ms`);
    setHistory((prev) => [...prev, reactionTime]);
    setCanClick(false);

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    setIsWaiting(true);
  }

  function handleReset() {
    console.log("리셋");
    setHistory([]);
    setIsWaiting(true);
    setCanClick(false);
    setStartTime(0);
    setNow(0);

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
  }

  const bgColor = twMerge(
    "h-screen flex flex-col items-center justify-center text-white",
    isWaiting ? "bg-blue-500" : canClick ? "bg-green-500" : "bg-red-500"
  );

  return (
    <section className={bgColor}>
      <h1 className="text-2xl font-bold mb-4">Reaction Speed Test</h1>
      <p className="mb-2">Number of times remaining: {5 - history.length}</p>
      {history.length === 5 && (
        <p className="mb-4">Game Over! Reset to try again.</p>
      )}
      <div className="space-y-4">
        {!isWaiting && (
          <button
            onClick={handleStop}
            className={`px-6 py-3 ${
              canClick ? "bg-black" : "bg-gray-500 cursor-not-allowed"
            } rounded-lg text-white`}
            disabled={!canClick}
          >
            {canClick ? "Start" : "Stop"}
          </button>
        )}
        {!isWaiting && (
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-yellow-500 rounded-lg text-black"
          >
            Reset
          </button>
        )}
        {isWaiting && (
          <button
            onClick={handleMeasure}
            className="px-6 py-3 bg-yellow-500 rounded-lg text-black"
          >
            Click to start
          </button>
        )}
      </div>
      <ul className="mt-8">
        {history.map((time, index) => (
          <li key={index}>
            Try {index + 1}: {time} ms
          </li>
        ))}
      </ul>
    </section>
  );
}
