import { useState, useEffect, useRef } from "react";

const TimerWidget = () => {
  // Modes: 'timer' | 'stopwatch' | 'focus'
  const [mode, setMode] = useState("focus");

  // Custom durations stored separately in seconds
  const [focusDuration, setFocusDuration] = useState(25 * 60);
  const [timerDuration, setTimerDuration] = useState(15 * 60);

  // Active running times
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Total Focus Session Tracking (ONLY for "Focus Time", resets on reload)
  const [totalFocusTime, setTotalFocusTime] = useState(0);

  const timerRef = useRef(null);

  // Active total duration used for progress calculation
  const currentTotal = mode === "focus" ? focusDuration : timerDuration;

  // Interval Engine
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        // Condition: ONLY track focus time when running in Focus Time mode
        if (mode === "focus") {
          setTotalFocusTime((prev) => prev + 1);
        }

        if (mode === "stopwatch") {
          setStopwatchTime((prev) => prev + 1);
        } else {
          // Focus Time or Timer countdown
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timerRef.current);
              setIsActive(false);
              alert(
                mode === "focus"
                  ? "Focus session complete!"
                  : "Timer finished!",
              );
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, mode]);

  // Mode change handler
  const handleModeChange = (newMode) => {
    setIsActive(false);
    setMode(newMode);
    if (newMode === "focus") {
      setTimeLeft(focusDuration);
    } else if (newMode === "timer") {
      setTimeLeft(timerDuration);
    } else {
      setStopwatchTime(0);
    }
  };

  // Adjust duration by minutes (+/-)
  const adjustMinutes = (deltaMinutes) => {
    if (isActive) return;

    if (mode === "focus") {
      const updated = Math.max(60, focusDuration + deltaMinutes * 60);
      setFocusDuration(updated);
      setTimeLeft(updated);
    } else if (mode === "timer") {
      const updated = Math.max(60, timerDuration + deltaMinutes * 60);
      setTimerDuration(updated);
      setTimeLeft(updated);
    }
  };

  // Preset setter (e.g., 25m, 45m, 60m)
  const setPresetMinutes = (minutes) => {
    if (isActive) return;
    const seconds = minutes * 60;
    if (mode === "focus") {
      setFocusDuration(seconds);
      setTimeLeft(seconds);
    } else if (mode === "timer") {
      setTimerDuration(seconds);
      setTimeLeft(seconds);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    if (mode === "stopwatch") {
      setStopwatchTime(0);
    } else if (mode === "focus") {
      setTimeLeft(focusDuration);
    } else {
      setTimeLeft(timerDuration);
    }
  };

  // Time formatters
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const formatFocusDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  // Calculate percentage remaining (100% down to 0%) for water fill
  const progressPercent =
    mode === "stopwatch"
      ? 100
      : Math.max(0, Math.min(100, (timeLeft / currentTotal) * 100));

  // Circular border calculations
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    mode === "stopwatch"
      ? 0
      : circumference - (progressPercent / 100) * circumference;

  return (
    <div className="w-full rounded-2xl border border-blue-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-100">
          <span>⏱️</span> Time & Focus
        </h3>
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            isActive
              ? "animate-pulse bg-emerald-500"
              : "bg-slate-300 dark:bg-slate-700"
          }`}
        />
      </div>

      {/* Mode Navigation Tabs */}
      <div className="mb-5 flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
        {[
          { key: "focus", label: "Focus Time" },
          { key: "timer", label: "Timer" },
          { key: "stopwatch", label: "Stopwatch" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleModeChange(tab.key)}
            className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition ${
              mode === tab.key
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Quick Presets for Focus and Timer */}
      {mode !== "stopwatch" && !isActive && (
        <div className="mb-4 flex items-center justify-center gap-1.5">
          {[15, 25, 45, 60].map((mins) => (
            <button
              key={mins}
              onClick={() => setPresetMinutes(mins)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                Math.round(currentTotal / 60) === mins
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-200"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-800/80 dark:text-slate-400"
              }`}
            >
              {mins}m
            </button>
          ))}
        </div>
      )}

      {/* Water-Filling Visual Circle */}
      <div className="relative mx-auto flex h-52 w-52 items-center justify-center">
        {/* Inner Water Tank Container */}
        <div className="relative h-44 w-44 overflow-hidden rounded-full border-4 border-slate-100 bg-slate-50 shadow-inner dark:border-slate-800 dark:bg-slate-950">
          {/* Water level that drains downwards */}
          <div
            className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-linear ${
              mode === "focus"
                ? "bg-gradient-to-t from-blue-600 to-sky-400 opacity-80"
                : mode === "timer"
                  ? "bg-gradient-to-t from-indigo-600 to-blue-400 opacity-80"
                  : "bg-gradient-to-t from-emerald-500 to-teal-400 opacity-70"
            }`}
            style={{ height: `${progressPercent}%` }}
          >
            {/* Subtle surface wave shimmer */}
            <div className="absolute -top-1 left-0 right-0 h-2 bg-white/30 blur-[1px]" />
          </div>

          {/* Time text centered above the water */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center">
            <span className="text-3xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm dark:text-white">
              {mode === "stopwatch"
                ? formatTime(stopwatchTime)
                : formatTime(timeLeft)}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-700/80 dark:text-slate-300">
              {isActive ? "Running" : "Paused"}
            </span>
          </div>
        </div>

        {/* Outer Circular Stroke Meter */}
        <svg className="pointer-events-none absolute h-52 w-52 -rotate-90 transform">
          <circle
            cx="104"
            cy="104"
            r={radius}
            className="stroke-slate-200/50 dark:stroke-slate-800/60"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="104"
            cy="104"
            r={radius}
            className="stroke-blue-500 transition-all duration-700"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
      </div>

      {/* Adjust Duration Buttons (+/-) */}
      {mode !== "stopwatch" && !isActive && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            onClick={() => adjustMinutes(-5)}
            className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
          >
            -5m
          </button>
          <span className="text-xs font-medium text-slate-500">
            Set: {Math.round(currentTotal / 60)} mins
          </span>
          <button
            onClick={() => adjustMinutes(5)}
            className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
          >
            +5m
          </button>
        </div>
      )}

      {/* Action Controls */}
      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`flex-1 rounded-xl py-2.5 text-sm font-semibold text-white shadow-sm transition ${
            isActive
              ? "bg-amber-500 hover:bg-amber-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          Reset
        </button>
      </div>

      {/* Total Focus Time Display (Strictly tracks Focus Time) */}
      <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-slate-600 dark:text-slate-300">
            Total Time Focused:
          </span>
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {formatFocusDuration(totalFocusTime)}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-slate-400">
          Accumulates during Focus Time • Resets on reload
        </p>
      </div>
    </div>
  );
};

export default TimerWidget;
