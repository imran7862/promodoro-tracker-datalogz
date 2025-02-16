import { useState, useEffect } from "react";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";
import "./App.css";

const App = () => {
  const [time, setTime] = useState(25 * 60); // Default 25 min work session
  const [isRunning, setIsRunning] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(25);
  const [mode, setMode] = useState("work"); // Modes: "work", "shortBreak", "longBreak"

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const setSession = (sessionType) => {
    setIsRunning(false); // Pause when switching session types
    setMode(sessionType);
    if (sessionType === "work") setTime(25 * 60);
    if (sessionType === "shortBreak") setTime(5 * 60);
    if (sessionType === "longBreak") setTime(15 * 60);
  };

  return (
    <div className="app-wrapper">
      <div className="container">
        <h1>Pomodoro Tracker</h1>
        <div className="mode-buttons">
          <button
            className={mode === "work" ? "active" : ""}
            onClick={() => setSession("work")}
          >
            Work
          </button>
          <button
            className={mode === "shortBreak" ? "active" : ""}
            onClick={() => setSession("shortBreak")}
          >
            Short Break
          </button>
          <button
            className={mode === "longBreak" ? "active" : ""}
            onClick={() => setSession("longBreak")}
          >
            Long Break
          </button>
        </div>

        <div className="timer">{formatTime(time)}</div>

        <input
          type="number"
          value={customMinutes}
          onChange={(e) => setCustomMinutes(e.target.value)}
          placeholder="Enter minutes"
        />
        <button onClick={() => setTime(customMinutes * 60)}>Set Custom Time</button>

        <div className="controls">
          <button onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={() => setTime(25 * 60)}>
            <FaRedo />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;