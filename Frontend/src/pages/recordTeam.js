import React from "react";
import styled from "styled-components";

import { Button, Checkbox } from "antd";
import { CaretLeftOutlined } from "@ant-design/icons";

const ContentBackground = styled.div`
  height: 1000px;
  padding: 50px 100px;
`;
const ContentBody = styled.div`
  padding: 50px;
  border: 1px solid black;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StopWatchDiv = styled.div`
  margin: 50px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StopWatch = styled.div`
  background-color: gray;
  border-radius: 10px;
  width: 100%;
  height: 100px;
  margin: 10px 0;
`;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  text-align: center;
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

const ScoreBlock = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  border: 1px solid black;
`;
const TeamDiv = styled.div`
  display: flex;
  width: 48%;
  flex-direction: column;
`;

const DivideLine = styled.div`
  border-left: 1px solid black;
  height: 500px;
  display: flex;
`;

const ScoreDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
`;
const ScoreNum = styled.div`
  display: flex;
  width: 55%;
  flex-direction: column;
`;
const TotalScore = styled.div`
  display: flex;
  width: 45%;
  height: 100px;
  margin: 0 10px;
  border-radius: 10px;
  background-color: pink;
`;

const FourNumberDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  padding: 0 5px;
  justify-content: space-around;
  margin: 5px 0;
`;
const TwoButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const AScoreDiv = styled.div`
  display: inline-flex;
`;
const BallRight = styled.div`
  width: 100%;
  margin: 10px;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: row;
`;
const Ballh1 = styled.h1`
  margin: 0;
`;

const FoulDiv = styled.div`
  width: 100%;
  margin: 10px;
`;

const TimeOutDiv = styled.div``;

const CheckBox = styled(Checkbox)`
  width: 20px;
  height: 20px;
`;

const RecordTeam = () => {
  return (
    <ContentBackground
      className="ant-layout-content"
      style={{ height: "1000px" }}
    >
      <ContentBody
        className="site-layout-content"
        style={{ padding: "0 50px" }}
      >
        <StopWatchDiv>
          <h1>大錶</h1>
          <StopWatch></StopWatch>
          <ButtonDiv>
            <NumButton>+</NumButton>
            <NumButton>-</NumButton>
            <div></div>
            <StyledButton>暫停</StyledButton>
            <StyledButton>下一節</StyledButton>
          </ButtonDiv>
        </StopWatchDiv>
        <ScoreBlock>
          <TeamDiv>
            <ScoreDiv>
              <ScoreNum>
                <FourNumberDiv>
                  <AScoreDiv>--</AScoreDiv>
                  <AScoreDiv>--</AScoreDiv>
                  <AScoreDiv>--</AScoreDiv>
                  <AScoreDiv>--</AScoreDiv>
                </FourNumberDiv>
                <TwoButton>
                  <NumButton>+</NumButton>
                  <NumButton>-</NumButton>
                </TwoButton>
              </ScoreNum>

              <TotalScore></TotalScore>
            </ScoreDiv>
            <BallRight>
              <Ballh1>A 隊</Ballh1>
              <CaretLeftOutlined />
            </BallRight>
            <FoulDiv>
              團體犯規:
              <FourNumberDiv>
                <AScoreDiv>--</AScoreDiv>
                <AScoreDiv>--</AScoreDiv>
                <AScoreDiv>--</AScoreDiv>
                <AScoreDiv>--</AScoreDiv>
              </FourNumberDiv>
              <TwoButton>
                <NumButton>+</NumButton>
                <NumButton>-</NumButton>
              </TwoButton>
            </FoulDiv>

            <TimeOutDiv>
              <div>上半場：</div>
              <CheckBox></CheckBox>
              <CheckBox></CheckBox>
              <div>下半場：</div>
              <Checkbox></Checkbox>
              <Checkbox></Checkbox>
              <Checkbox></Checkbox>
            </TimeOutDiv>
          </TeamDiv>
          <DivideLine />
          <TeamDiv>kk</TeamDiv>
        </ScoreBlock>
      </ContentBody>
    </ContentBackground>
  );
};

export default RecordTeam;
