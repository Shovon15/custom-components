"use client";

import { useState, useEffect, useRef } from "react";

export default function CustomTimer() {
  const [initialTime, setInitialTime] = useState(60); // Default 60 seconds
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [inputValue, setInputValue] = useState("60");
  const timerRef = useRef(null);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  // Set the timer duration
  const setTimerDuration = () => {
    const newTime = Number.parseInt(inputValue) || 0;
    setInitialTime(newTime);
    setTimeLeft(newTime);
    // If timer is running, reset it with new time
    if (isRunning) {
      stopTimer();
      startTimer(newTime);
    }
  };

  // Start the timer
  const startTimer = (time = timeLeft) => {
    if (time <= 0) return;

    setIsRunning(true);

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          stopTimer();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  // Stop the timer
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
  };

  // Reset the timer
  const resetTimer = () => {
    stopTimer();
    setTimeLeft(initialTime);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Calculate progress percentage
  const progressPercentage =
    initialTime > 0 ? ((initialTime - timeLeft) / initialTime) * 100 : 0;

  return (
    <div className="min-h-96 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Custom Timer</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Set your countdown timer
          </p>
        </div>

        {/* Timer Display */}
        <div className="relative pt-10">
          <div className="w-[13rem] h-[13rem] mx-auto rounded-full flex items-center justify-center border-8 border-gray-100 dark:border-gray-700 relative">
            {/* Progress Circle */}
            <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="transparent"
                stroke="#e5e7eb"
                strokeWidth="8"
                className="dark:stroke-gray-700"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="transparent"
                stroke="#3b82f6"
                strokeWidth="8"
                strokeDasharray="552.9"
                strokeDashoffset={552.9 - (552.9 * progressPercentage) / 100}
                className="transition-all duration-300"
              />
            </svg>
            <div className="text-5xl font-bold z-10">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Timer Controls */}
        <div className="flex justify-center space-x-4">
          {!isRunning ? (
            <button
              onClick={() => startTimer()}
              disabled={timeLeft <= 0}
              className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start
            </button>
          ) : (
            <button
              onClick={stopTimer}
              className="py-2 px-6 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Pause
            </button>
          )}
          <button
            onClick={resetTimer}
            className="py-2 px-6 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Timer Settings */}
        <div className="pt-4 flex items-center space-x-2">
          <div className="flex-1">
            <label
              htmlFor="timer-input"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Set Timer (seconds)
            </label>
            <input
              id="timer-input"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter seconds"
            />
          </div>
          <button
            onClick={setTimerDuration}
            className="mt-6 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Set
          </button>
        </div>
      </div>
    </div>
  );
}
