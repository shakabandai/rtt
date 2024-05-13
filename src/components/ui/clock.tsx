import React, { useState } from 'react';

interface TimerState {
  startTime: string | null;
  endTime: string | null;
  elapsedTime: number;
  duration: number;
}

const App: React.FC = () => {
  const [timer, setTimer] = useState<TimerState>({ startTime: null, endTime: null, elapsedTime: 0, duration: 60 });
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    const start = new Date();
    setTimer({ ...timer, startTime: start.toLocaleTimeString(), elapsedTime: 0 });

    const id = setInterval(() => {
      const now = new Date();
      const elapsedTime = Math.floor((now.getTime() - start.getTime()) / 1000);
      if (elapsedTime >= timer.duration) {
        stopTimer();
      } else {
        setTimer(prevTimer => ({
          ...prevTimer,
          elapsedTime: elapsedTime
        }));
      }
    }, 1000);

    setIntervalId(id);
  };

  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      const end = new Date();
      setTimer(prevTimer => ({ ...prevTimer, endTime: end.toLocaleTimeString() }));
    }
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimer({ ...timer, duration: parseInt(event.target.value, 10) });
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
        <button onClick={stopTimer}>Stop Timer</button>
        <p>Start Time: {timer.startTime || 'Not started'}</p>
        <p>End Time: {timer.endTime || 'Not stopped'}</p>
        <p>Time Elapsed: {timer.elapsedTime} seconds</p>
      </header>
    </div>
  );
}

export default App;
