import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TeamScore from "../components/recordTeam/teamScore";
import RecordTime from "../components/recordTeam/recordTime";
import { Button } from "antd";
// import "antd/dist/antd.css";

const ContentBackground = styled.div`
  height: 1000px;
  padding: 50px 100px;
`;
const ContentBody = styled.div`
  padding: 0 50px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const StyledButton = styled(Button)`
  height: 33px;
  width: 100px;
  background-color: #6b9abb;
  border-radius: 10px;
  display: flex;
  margin: 10px;
`;

const TimeDiv = styled.div`
  margin: 50px 0 25px 0;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ScoreDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const LeftTeam = styled.div`
  display: flex;
  width: 48%;
  flex-direction: row;
  float: right;
  justify-content: flex-end;
`;
const RightTeam = styled.div`
  display: flex;
  width: 48%;
  flex-direction: row;
  float: right;
  justify-content: flex-start;
`;

const DivideLine = styled.div`
  border-left: 1px solid black;
  display: flex;
`;

const RecordTeam = (props) => {
  console.log("in recordTeam: ", JSON.parse(props.match.params.aMatch));
  // const aMatch = {
  //   match_id: 100,
  //   home: 5,
  //   away: 6,
  //   recorder: "紀錄員1",
  // };
  const aMatch = JSON.parse(props.match.params.aMatch);

  // teamInfo, from aMatch, and should got other data from backend
  const [session, setSession] = useState();
  const [homeBall, setHomeBall] = useState();

  useEffect(() => {
    let updateSession = parseInt(
      localStorage.getItem(`${aMatch.match_id}-session`)
    );
    let updateHomeBall = localStorage.getItem(`${aMatch.match_id}-homeBall`);
    if (!updateSession || !updateHomeBall) {
      updateSession = 1;
      updateHomeBall = true;
      localStorage.setItem(`${aMatch.match_id}-session`, updateSession);
      localStorage.setItem(`${aMatch.match_id}-homeBall`, updateHomeBall);
    }
    setSession(() => updateSession);
    setHomeBall(() => updateHomeBall);
  }, []);

  return (
    <ContentBackground className="ant-layout-content">
      <ContentBody className="site-layout-content">
        <ButtonDiv>
          <StyledButton>重置</StyledButton>
          <StyledButton>比賽結束</StyledButton>
        </ButtonDiv>
        <TimeDiv>
          <RecordTime
            session={session}
            setSession={setSession}
            aMatch={aMatch}
          />
        </TimeDiv>
        <ScoreDiv>
          <LeftTeam>
            <TeamScore
              teamType={"home"}
              aMatch={aMatch}
              session={session}
              homeBall={homeBall}
              setHomeBall={setHomeBall}
            />
          </LeftTeam>
          <DivideLine />
          <RightTeam>
            <TeamScore
              teamType={"away"}
              aMatch={aMatch}
              session={session}
              homeBall={homeBall}
              setHomeBall={setHomeBall}
            />
          </RightTeam>
        </ScoreDiv>
      </ContentBody>
    </ContentBackground>
  );
};

export default RecordTeam;
