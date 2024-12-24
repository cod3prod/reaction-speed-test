"use client";

import { ResultModalHandle } from "@/types/modal";
import { useCallback, useEffect, useRef, useState } from "react";

const useTest = () => {
  const [history, setHistory] = useState<number[]>([]);
  const [canClick, setCanClick] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);

  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const dialogRef = useRef<ResultModalHandle | null>(null);

  useEffect(() => {
    if (history.length === 5) {
      setIsWaiting(true);
      setCanClick(false);
      dialogRef.current?.open();
    }

    return () => {
      clearTimeout(timeoutRef.current!);
      clearInterval(intervalRef.current!);
    };
  }, [history]);

  useEffect(() => {
    if (!canClick) return;

    intervalRef.current = window.setInterval(() => {
      setNow(performance.now());
    }, 10);

    return () => clearInterval(intervalRef.current!);
  }, [canClick]);

  const handleMeasure = useCallback(() => {
    if (!isWaiting) return;
    if (history.length == 5) return;

    setIsWaiting(false);
    setCanClick(false);

    timeoutRef.current = window.setTimeout(() => {
      setCanClick(true);
      setStartTime(performance.now());
      setNow(performance.now());
    }, Math.random() * 2000 + 1000);
  }, [history, isWaiting, timeoutRef]);

  const handleStop = useCallback(() => {
    if (!canClick || startTime === null || now === null) return;

    const reactionTime = Math.floor(now - startTime);
    setHistory((prev) => [...prev, reactionTime]);
    setCanClick(false);
    clearInterval(intervalRef.current!);
    setIsWaiting(true);
  }, [canClick, startTime, now, intervalRef]);

  const handleReset = useCallback(() => {
    setHistory([]);
    setIsWaiting(true);
    setCanClick(false);
    setStartTime(null);
    setNow(null);
    clearInterval(intervalRef.current!);
    clearTimeout(timeoutRef.current!);
  }, [intervalRef, timeoutRef]);

  return {
    history,
    canClick,
    isWaiting,
    dialogRef,
    handleMeasure,
    handleStop,
    handleReset,
  };
};

export { useTest };
