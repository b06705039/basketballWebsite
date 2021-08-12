import { useState, useEffect, useMemo } from "react";

const useTeamScore = ({ aMatch, teamType, session }) => {
  const teamId = aMatch[teamType];
  const saveKey = `${aMatch.match_id}-${teamId}`;
  const [teamInfo, setTeamInfo] = useState({});
  const [quarterScore, setQuarterScore] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [quarterFoul, setQuarterFoul] = useState([]);
  const [membersFoul, setMembersFoul] = useState({});
  const [stopWatch, setStopWatch] = useState([]);

  console.log("in useTeamScore: ", aMatch, teamId, session, saveKey);

  useEffect(() => {
    let updateTeamInfo = JSON.parse(
      localStorage.getItem(`${saveKey}-teamInfo`)
    );
    let updateQuarterScore = JSON.parse(
      localStorage.getItem(`${saveKey}-quarterScore`)
    );
    let updateQuarterFoul = JSON.parse(
      localStorage.getItem(`${saveKey}-quarterFoul`)
    );
    let updateMembersFoul = JSON.parse(
      localStorage.getItem(`${saveKey}-membersFoul`)
    );
    let updateStopWatch = JSON.parse(
      localStorage.getItem(`${saveKey}-stopWatch`)
    );
    if (
      !updateTeamInfo ||
      !updateQuarterScore ||
      !updateQuarterFoul ||
      !updateMembersFoul ||
      !updateStopWatch
    ) {
      // get teamInfo using team_id
      if (teamType === "home") {
        updateTeamInfo = {
          name: "隊伍一",
          type: "home",
        };
      } else if (teamType === "away") {
        updateTeamInfo = {
          name: "隊伍二",
          type: "away",
        };
      } //temp

      // get member list using teamInfo
      const tempMemberList = [1, 2, 3, 4, 5]; //temp
      // memberFoul format

      updateQuarterScore = Array(4).fill(-1);
      updateQuarterScore[0] = 0;
      updateQuarterFoul = Array(4).fill(-1);
      updateQuarterFoul[0] = 0;
      updateMembersFoul = {}; // temp
      tempMemberList.map((member) => {
        updateMembersFoul[member] = 0;
      }); // temp
      updateStopWatch = Array(5).fill(false);

      localStorage.setItem(
        `${saveKey}-teamInfo`,
        JSON.stringify(updateTeamInfo)
      );
      localStorage.setItem(
        `${saveKey}-quarterScore`,
        JSON.stringify(updateQuarterScore)
      );
      localStorage.setItem(
        `${saveKey}-quarterFoul`,
        JSON.stringify(updateQuarterFoul)
      );
      localStorage.setItem(
        `${saveKey}-membersFoul`,
        JSON.stringify(updateMembersFoul)
      );
      localStorage.setItem(
        `${saveKey}-stopWatch`,
        JSON.stringify(updateStopWatch)
      );
    }
    setTeamInfo(() => updateTeamInfo);
    setQuarterScore(() => updateQuarterScore);
    setQuarterFoul(() => updateQuarterFoul);
    setMembersFoul(() => updateMembersFoul);
    setStopWatch(() => updateStopWatch);
  }, []);

  useEffect(() => {
    // totalScore change
    if (quarterScore.length !== 0) {
      let updateTotalScore = quarterScore
        .slice(0, session)
        .reduce((acc, curVal) => {
          return acc + curVal;
        });
      setTotalScore(() => updateTotalScore);

      // localStorage
      localStorage.setItem(
        `${saveKey}-quarterScore`,
        JSON.stringify(quarterScore)
      );
    }
  }, [quarterScore]);

  useEffect(() => {
    localStorage.setItem(`${saveKey}-quarterFoul`, JSON.stringify(quarterFoul));
  }, [quarterFoul]);

  useEffect(() => {
    localStorage.setItem(`${saveKey}-stopWatch`, JSON.stringify(stopWatch));
  }, [stopWatch]);

  useEffect(() => {
    localStorage.setItem(`${saveKey}-membersFoul`, JSON.stringify(membersFoul));
  }, [membersFoul]);

  useMemo(() => {
    let updateQuarterScore = [];
    let updateQuarterFoul = [];
    if (session !== 1) {
      updateQuarterScore = [...quarterScore];
      updateQuarterFoul = [...quarterFoul];
      updateQuarterScore[session - 1] = 0;
      updateQuarterFoul[session - 1] = 0;
      setQuarterScore(() => updateQuarterScore);
      setQuarterFoul(() => updateQuarterFoul);
    }
  }, [session]);

  const value = {
    teamInfo,
    setTeamInfo,
    totalScore,
    setTotalScore,
    quarterScore,
    setQuarterScore,
    quarterFoul,
    setQuarterFoul,
    membersFoul,
    setMembersFoul,
    stopWatch,
    setStopWatch,
  };
  return value;
};

export default useTeamScore;
