import React, { useState, useEffect } from 'react';
import './App.css';

interface TimerState {
  startTime: string | null;
  endTime: string | null;
  elapsedTime: number;
  duration: number;
}

const App: React.FC = () => {
  const [timer, setTimer] = useState<TimerState>({ startTime: null, endTime: null, elapsedTime: 0, duration: 60 });
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const startTimer = () => {
    const start = new Date();
    const end = new Date(start.getTime() + timer.duration * 1000);
    setTimer({
      ...timer,
      startTime: start.toLocaleTimeString(),
      endTime: end.toLocaleTimeString(),
      elapsedTime: timer.duration
    });

    const id = setInterval(() => {
      setTimer(prevTimer => {
        const newElapsedTime = prevTimer.elapsedTime - 1;
        if (newElapsedTime <= 0) {
          clearInterval(id);
          return { ...prevTimer, elapsedTime: 0 };
        }
        return { ...prevTimer, elapsedTime: newElapsedTime };
      });
    }, 1000);

    setIntervalId(id);
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimer({ ...timer, duration: parseInt(event.target.value, 10), elapsedTime: parseInt(event.target.value, 10) });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Timer</h1>
        <select value={timer.duration} onChange={handleDurationChange}>
          <option value={60}>1 minute</option>
          <option value={300}>5 minutes</option>
          <option value={600}>10 minutes</option>
          <option value={1800}>30 minutes</option>
          <option value={3600}>1 hour</option>
        </select>
        <button onClick={startTimer}>Start Timer</button>
        <p>Start Time: {timer.startTime || 'Not started'}</p>
        <p>End Time: {timer.endTime || 'Not started'}</p>
        <p>Time Remaining: {timer.elapsedTime} seconds</p>
      </header>
    </div>
  );
}

export default App;
