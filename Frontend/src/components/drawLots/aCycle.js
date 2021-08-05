import React from "react";
import styled from "styled-components";

const BodyDiv = styled.div`
  width: 150px;
  height: 150px;
  display: inline-block;
  margin: 20px;
`;

const TopLabal = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MiddleGraph = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomLabel = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
`;

const Teamname = styled.div`
  display: flex;
  justify-content: center;
`;

const ACycle = (props) => {
  const data = Object.entries(props.data);
  const cycleNum = data.length;

  const Graph = styled.div`
    display: flex;
    font-size: ${cycleNum === 3 ? "110px" : "80px"};
    font-weight: ${cycleNum === 3 ? "100" : "50"};
    justify-content: center;
    position: absolute;
  `;

  const GroupSession = styled.div`
    display: flex;
    justify-content: center;
    position: absolute;
    margin-top: ${cycleNum === 3 ? "20px" : "10px"};
  `;

  return (
    <>
      {cycleNum === 3 ? (
        <BodyDiv>
          <TopLabal>
            <Teamname>{data[0][1].name || data[0][1].session}</Teamname>
          </TopLabal>
          <MiddleGraph>
            <Graph>&#9651;</Graph>
            <GroupSession>{props.groupSession}</GroupSession>
          </MiddleGraph>
          <BottomLabel>
            <Teamname>{data[1][1].name || data[1][1].session}</Teamname>
            <Teamname>{data[2][1].name || data[2][1].session}</Teamname>
          </BottomLabel>
        </BodyDiv>
      ) : (
        <BodyDiv>
          <BottomLabel>
            <Teamname>{data[0][1].name || data[0][1].session}</Teamname>
            <Teamname>{data[1][1].name || data[1][1].session}</Teamname>
          </BottomLabel>
          <MiddleGraph>
            <Graph>&#9634;</Graph>
            <GroupSession>{props.groupSession}</GroupSession>
          </MiddleGraph>
          <BottomLabel>
            <Teamname>{data[2][1].name || data[2][1].session}</Teamname>
            <Teamname>{data[3][1].name || data[3][1].session}</Teamname>
          </BottomLabel>
        </BodyDiv>
      )}
    </>
  );
};

export default ACycle;
