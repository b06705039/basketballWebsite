import React, { useState, useEffect, useMemo, useContext } from "react";
import { Team, Match } from "../axios";

const InterGameData = React.createContext();

export const useInterGame = () => {
  return useContext(InterGameData);
};

const InterGameProvider = ({ children }) => {
  const [interGameTable, setInterGameTable] = useState([]);
  const [interTeamNum, setInterTeamNum] = useState(8);
  const [editable, setEditable] = useState(false);
  const [mapDict, setMapDict] = useState({});
  let matchCount = 0;

  useEffect(async () => {
    const interGameData = await Team.GetInterGame();
    console.log("in useInterGame, interGameData: ", interGameData);
    let newData = [];
    Object.entries(interGameData).forEach((data) =>
      newData.push({
        key: data[1].team_id,
        name: data[1].name,
        session: data[1].session_interGame,
      })
    );
    setInterGameTable(newData);
    setInterTeamNum(newData.length);

    try {
      const stage = "interGame";
      const ifStage = await Match.CheckIfStage(stage);
      console.log("interGame, ifStage: ", ifStage);
      setEditable(() => (ifStage ? false : true));
    } catch (err) {
      console.log("in preGame, checkIfStage false");
    }
  }, []);

  useMemo(async () => {
    // setTimeout(() => {
    let updateDict = {};
    for (let i = 1; i <= interTeamNum; i++) {
      updateDict[i.toString()] = { session: i.toString() };
    }
    Object.entries(interGameTable).forEach((team) => {
      if (team[1].session !== "--") {
        updateDict[team[1].session] = {
          key: team[1].key,
          name: team[1].name,
          session: team[1].session,
        };
      }
    });
    await setMapDict(updateDict);
    // }, 500);
  }, [interTeamNum, interGameTable]);

  const createMatch = (arr) => {
    console.log("another createMatch, arr: ", arr, arr.length);
    if (arr.length === 1) {
      matchCount += 1;
      console.log(
        "arr.length==1: ",
        null,
        arr[0][1].key,
        matchCount.toString()
      );
      const res = Match.Create(
        0,
        arr[0][1].key,
        "interGame",
        matchCount.toString()
      );
      console.log(res);
    } else if (arr.length === 2) {
      matchCount += 1;
      console.log(
        "arr.length==2: ",
        arr[0][1].key,
        arr[1][1].key,
        matchCount.toString()
      );
      const res = Match.Create(
        arr[0][1].key,
        arr[1][1].key,
        "interGame",
        matchCount.toString()
      );
      console.log(res);
    } else {
      const sepIndex = Math.ceil(arr.length / 2);
      console.log("sepIndex: ", sepIndex);
      createMatch(arr.slice(0, sepIndex));
      createMatch(arr.slice(sepIndex, arr.length));
    }
  };

  const saveResult = async () => {
    // update team session
    // check if all team session fill
    // if fill
    //      if checkIfStage, delete match
    //      create match
    // else, break & show not fill msg

    Object.entries(interGameTable).forEach((team) => {
      console.log(" update session2: ", team, team[1].key, team[1].session);
      Team.UpdateSession("session_interGame", team[1].key, team[1].session);
    });

    const teamSessionFill = await Team.CheckFillSession("session_interGame");
    if (teamSessionFill) {
      console.log("checkFillSession true");
      const havePreGame = await Match.CheckIfStage("interGame");
      if (havePreGame) {
        console.log("into delete ");
        await Match.DeleteSession("interGame");
      }

      let tempArr = [];
      Object.entries(mapDict).map(async (team, index) => {
        tempArr.push(team);
      });
      console.log("tempArr: ", tempArr);
      createMatch(tempArr);
      matchCount = 0;
    }
  };

  const value = {
    interGameTable,
    setInterGameTable,
    interTeamNum,
    setInterTeamNum,
    mapDict,
    setMapDict,
    saveResult,
    editable,
    setEditable,
  };

  return (
    <InterGameData.Provider value={value}>{children}</InterGameData.Provider>
  );
};

export default InterGameProvider;
