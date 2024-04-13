import { useState } from "react";
import "./styles.css";
export default function Stopwatch() {
  const [hrs, setHrs] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [timerId, setTimerId] = useState()
  const [activeState, setActiveState] = useState('initial')

  function onStart() {
    const now = new Date();
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    setTimerId(setInterval(() => {
      now.setSeconds(now.getSeconds() + 1);
      setHrs(now.getHours());
      setMin(now.getMinutes());
      setSec(now.getSeconds());
    }, 1000));
  }

  function onReset() {
    setHrs(0)
    setMin(0)
    setSec(0)
  }
  function onStop() {
    clearInterval(timerId)
  }
  function onResume() {
    const now = new Date();
    now.setHours(hrs)
    now.setMinutes(min)
    now.setSeconds(sec)
    setTimerId(setInterval(() => {
      now.setSeconds(now.getSeconds() + 1);
      setHrs(now.getHours());
      setMin(now.getMinutes());
      setSec(now.getSeconds());
    }, 1000));
  }
  return (
    <div className="appContainer">
      <h1>Stopwatch</h1>
      <div className="container">
        <div className="clock">
          {String(hrs).padStart(2, '0') + ":" + String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0')}
        </div>
        <div
          className="innerContainer"
        >
          {activeState === 'initial' && <button onClick={() => {
            onStart()
            setActiveState('started')
          }}>START</button>}

          {activeState === 'started' &&
            <button onClick={function() {
              onStop()
              setActiveState('stopped')
            }}>STOP</button>}
          {activeState === 'stopped' && <button onClick={() => {
            setActiveState('started')
            onResume()
          }}> RESUME</button>}
          {activeState === 'stopped' && <button onClick={() => {
            setActiveState('initial')
            onReset()
          }}> RESET</button>}
        </div>
      </div>
    </div>
  );
}
