import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketballBall } from "@fortawesome/free-solid-svg-icons";
import StopWatch from "./stopWatch";
import QuarterDiv from "./quarterDiv";
import UseTeamScore from "../../hooks/useTeamScore";
import MemberFoul from "./memberFoul";

const TeamScoreDiv = styled.div`
  width: 70%;
`;

const ScoreDiv = styled.div`
  padding: 5px;
`;
const Teamscore = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const TeamBall = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: row;
  padding: 5px 5px 10px 5px;
`;
const TeamFoul = styled.div`
  display: inline-flex;
  width: 100%;
  flex-direction: column;
  padding: 5px 5px 10px 5px;
`;
const PlayerFoul = styled.div`
  padding: 5px 5px 10px 5px;
`;
const TotalScore = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  height: 100px;
  margin: 5px;
`;
const TotalScoreNum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  border-radius: 10px;
  background-color: black;
  color: white;
  font-size: 40px;
`;
const MoveRight = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

// TeamBall
const BasketballIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;
  font-size: 20px;
`;

// // TeamFoul

// // PlayerFoul

// use in many big div
const StyledH3 = styled.h3`
  margin: 0 10px 0 0;
`;

const TeamScore = ({ aMatch, teamType, session, homeBall, setHomeBall }) => {
  console.log("in teamScore1: ", aMatch, teamType, session);
  const {
    teamInfo,
    totalScore,
    quarterScore,
    setQuarterScore,
    quarterFoul,
    setQuarterFoul,
    membersFoul,
    setMembersFoul,
    stopWatch,
    setStopWatch,
  } = UseTeamScore({ aMatch, teamType, session });

  return (
    <>
      {teamInfo !== {} && (
        <TeamScoreDiv>
          <ScoreDiv>
            <StyledH3>團隊得分</StyledH3>
            <Teamscore>
              <QuarterDiv
                session={session}
                Nums={quarterScore}
                setNums={setQuarterScore}
              />
              <TotalScore>
                <TotalScoreNum>{totalScore}</TotalScoreNum>
              </TotalScore>
            </Teamscore>
          </ScoreDiv>

          <TeamBall>
            <StyledH3>{teamInfo.name}</StyledH3>
            {teamInfo.type === "home" && homeBall && (
              <BasketballIcon
                icon={faBasketballBall}
                onClick={() => setHomeBall(() => (homeBall ? false : true))}
              />
            )}
            {teamInfo.type === "away" && !homeBall && (
              <BasketballIcon
                icon={faBasketballBall}
                onClick={() => setHomeBall(() => (homeBall ? false : true))}
              />
            )}
          </TeamBall>

          <TeamFoul>
            <StyledH3>團隊犯規</StyledH3>
            <MoveRight>
              <QuarterDiv
                session={session}
                Nums={quarterFoul}
                setNums={setQuarterFoul}
              />
            </MoveRight>
          </TeamFoul>

          <PlayerFoul>
            <StyledH3>球員犯規</StyledH3>
            <MemberFoul
              memberDict={membersFoul}
              setMemberDict={setMembersFoul}
            />
          </PlayerFoul>

          <StopWatch arr={stopWatch} setArr={setStopWatch} />
        </TeamScoreDiv>
      )}
    </>
  );
};

export default TeamScore;
