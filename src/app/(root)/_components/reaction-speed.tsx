"use client";

import ResultModal from "./result-modal";
import "animate.css";
import { useTest } from "@/hooks/ues-test";

export default function ReactionSpeed() {
  const {
    history,
    canClick,
    isWaiting,
    dialogRef,
    handleMeasure,
    handleStop,
    handleReset,
  } = useTest();

  const bgColor = isWaiting
    ? "bg-blue-500"
    : canClick
    ? "bg-green-500"
    : "bg-red-500";

  return (
    <section
      className={`h-screen flex flex-col items-center justify-center text-white ${bgColor} p-6 rounded-lg text-center`}
      onClick={isWaiting ? handleMeasure : handleStop}
    >
      <h1 className="text-2xl font-bold mb-4 animate__animated animate__bounce">
        Reaction Speed Test
      </h1>
      <p className="mb-2">Number of tries remaining: {5 - history.length}</p>

      {history.length === 5 ? (
        <p className="mb-4 text-red-500">Game Over! Reset to try again.</p>
      ) : isWaiting ? (
        <p className="text-white text-2xl mb-4">Click Again</p>
      ) : (
        <p className="text-white text-2xl mb-4">
          {canClick ? "Click to Stop" : "Wait for Green"}
        </p>
      )}

      {!isWaiting ||
        (history.length === 5 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReset();
            }}
            className="px-6 py-3 bg-linear-to-r from-yellow-400 to-yellow-500 rounded-full text-black font-semibold shadow-lg hover:from-yellow-500 hover:to-yellow-600 transition-transform transform hover:scale-105"
          >
            Reset
          </button>
        ))}

      <ul className="mt-8 space-y-2 h-[200px]">
        {history.map((time, index) => (
          <li key={index} className="text-lg">
            Try {index + 1}: {time} ms
          </li>
        ))}
      </ul>

      <ResultModal ref={dialogRef} history={history} />
    </section>
  );
}
