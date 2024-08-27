import React, { useState, useEffect } from 'react';
import styles from './StopWatch.module.scss';

function StopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const startStopHandler = () => {
    setIsRunning(!isRunning);
  };

  const resetHandler = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.stopwatch}>
        <span className={styles.time}>
          {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
        </span>
        <span className={styles.time}>
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
        </span>
        <span className={styles.time}>
          {("0" + ((time / 10) % 100)).slice(-2)}
        </span>
      </div>
      <div className={styles.buttons}>
        <button onClick={startStopHandler} className={styles.button}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button onClick={resetHandler} className={styles.button}>Reset</button>
      </div>
    </div>
  );
}

export default StopWatch;
