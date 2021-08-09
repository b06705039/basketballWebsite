import React from "react";
import styled from "styled-components";
import { Button } from "antd";

const ItemDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2px 5px;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 35%;
`;
const NumButton = styled(Button)`
  height: 20px;
  width: 20px;
  text-align: center;
  padding: 0;
`;

const AMember = ({ member, num, nums, setNums }) => {
  const handleClick = (type) => {
    let updateNums = JSON.parse(JSON.stringify(nums));
    if (type === "+") {
      updateNums[member] += 1;
    } else if (type === "-") {
      updateNums[member] -= 1;
    }
    setNums(() => updateNums);
  };
  return (
    <ItemDiv>
      <div>{member}</div>
      <div>{num}</div>
      <ButtonDiv>
        <NumButton onClick={() => handleClick("+")}>+</NumButton>
        <NumButton onClick={() => handleClick("-")}>-</NumButton>
      </ButtonDiv>
    </ItemDiv>
  );
};

export default AMember;
