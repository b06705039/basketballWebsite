import React from "react";
import styled from "styled-components";
import { Checkbox } from "antd";

const TeamStopWatch = styled.div`
  // border: 1px solid black;
  padding: 5px;
  display: block;
`;
const StopWatchSubDiv = styled.div`
  width: 100%;
  display: flex;
  padding: 3px 0 3px 10px;
`;

const StyledH3 = styled.h3`
  margin: 0 10px 0 0;
`;
const StyledH5 = styled.h5`
  margin: 0 10px 0 0;
  font-weight: 400;
`;

const StopWatch = ({ arr, setArr }) => {
  const handleChange = (e, i) => {
    let updateArr = [...arr];
    updateArr[i] = updateArr[i] === true ? false : true;
    setArr(() => updateArr);
  };

  return StopWatch ? (
    <TeamStopWatch>
      <StyledH3>暫停</StyledH3>
      <StopWatchSubDiv>
        <StyledH5>上半場</StyledH5>
        {[0, 1].map((i, index) => (
          <Checkbox
            key={index}
            checked={arr[i]}
            onChange={(e) => handleChange(e, i)}
          />
        ))}
      </StopWatchSubDiv>
      <StopWatchSubDiv>
        <StyledH5>下半場</StyledH5>
        {[2, 3, 4].map((i, index) => {
          console.log(arr[i]);
          return (
            <Checkbox
              key={index}
              checked={arr[i]}
              onClick={(e) => handleChange(e, i)}
            />
          );
        })}
      </StopWatchSubDiv>
    </TeamStopWatch>
  ) : (
    <></>
  );
};

export default StopWatch;
