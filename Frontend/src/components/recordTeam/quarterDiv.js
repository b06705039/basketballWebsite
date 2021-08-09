import React from "react";
import styled from "styled-components";
import { Button } from "antd";

const QuarterScore = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const QuarterScoreNum = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  padding: 0 5px;
  justify-content: space-around;
  margin: 5px 0;
`;
const QuarterScoreButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  // margin-right: 10px;
  // float: right;
`;
const AScoreDiv = styled.div`
  display: inline-flex;
`;
const NumButton = styled(Button)`
  height: 32px;
  width: 32px;
  text-align: center;
  padding: 0;
  margin-left: 10px;
`;

const QuarterDiv = ({ session, Nums, setNums, title }) => {
  const handleClick = (type) => {
    let updateNums = [...Nums];
    if (type === "add") {
      updateNums[session - 1] += 1;
    } else if (type === "minus") {
      updateNums[session - 1] -= 1;
    }
    setNums(() => updateNums);
  };

  return (
    <QuarterScore>
      <QuarterScoreNum>
        {Nums &&
          Nums.map((num, index) => (
            <AScoreDiv key={index}>{num === -1 ? "--" : num}</AScoreDiv>
          ))}
      </QuarterScoreNum>
      <QuarterScoreButton>
        <NumButton onClick={() => handleClick("add")}>+</NumButton>
        <NumButton onClick={() => handleClick("minus")}>-</NumButton>
      </QuarterScoreButton>
    </QuarterScore>
  );
};

export default QuarterDiv;
