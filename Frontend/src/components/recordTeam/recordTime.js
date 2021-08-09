import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "antd";

// css
const TimeTitle = styled.h1`
  margin: 0;
`;
const TimeClock = styled.div`
  background-color: gray;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;ㄋ
  margin: 10px 0;
  font-size: xxx-large;
`;
const TimeButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  text-align: center;
  margin: 15px 0;
`;
const StyledButton = styled(Button)`
  text-align: center;
`;
const NumButton = styled(Button)`
  height: 32px;
  width: 32px;
  text-align: center;
  padding: 0;
`;

// utilities function
const TimeFormat = (time) => {
  let diffMin = time / 60000;
  let Min = Math.floor(diffMin);

  let diffSec = (diffMin - Min) * 60;
  let Sec = Math.floor(diffSec);

  let diffMilsec = (diffSec - Sec) * 60;
  let MilSec = Math.floor(diffMilsec);

  let formatMin = Min.toString().padStart(2, "0");
  let formatSec = Sec.toString().padStart(2, "0");
  let formatMilSec = MilSec.toString().padStart(2, "0");

  return `${formatMin}:${formatSec}:${formatMilSec}`;
};

let elapsedTime = 0;
let startTime = 0;
let timerInterval = 0;

const RecordTime = ({ session, setSession, aMatch }) => {
  let initialTime = 600000;

  const [pauseState, setPauseState] = useState(true);
  const [time, setTime] = useState(initialTime);

  const start = () => {
    startTime = Date.now();
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      let newTime = initialTime - elapsedTime;
      setTime(() => newTime);
    }, 10);
    setPauseState(() => false);
  };

  const pause = () => {
    clearInterval(timerInterval);
    setPauseState(() => true);
  };

  const nextSession = () => {
    console.log("sessionType", typeof session, session);
    setSession(() => session + 1);
    setTime(() => initialTime);
    elapsedTime = 0;
    startTime = 0;
    timerInterval = 0;
  };

  const addTime = () => {
    setTime(() => time + 1000);
  };
  const minusTime = () => {
    setTime(() => time - 1000);
  };

  useEffect(() => {
    if (time < 0) {
      pause();
      setTime(() => 0);
    }

    localStorage.setItem(`${aMatch.match_id}-recordTime`, time);
  }, [time]);

  useEffect(() => {
    // initial(refresh | new)
    const refreshTime = localStorage.getItem(`${aMatch.match_id}-recordTime`);
    if (refreshTime) {
      setTime(() => refreshTime);
    } else {
      localStorage.setItem(`${aMatch.match_id}-recordTime`, time);
    }
  }, []);

  return (
    <>
      <TimeTitle>第{session}節/大錶</TimeTitle>
      <TimeClock> {TimeFormat(time)} </TimeClock>
      <TimeButton>
        <NumButton onClick={addTime}>+</NumButton>
        <NumButton onClick={minusTime}>-</NumButton>
        <div></div>
        {pauseState ? (
          <StyledButton onClick={start}>開始</StyledButton>
        ) : (
          <StyledButton onClick={pause}>暫停</StyledButton>
        )}

        {session !== 4 && (
          <StyledButton onClick={nextSession}>下一節</StyledButton>
        )}
      </TimeButton>
    </>
  );
};

export default RecordTime;
