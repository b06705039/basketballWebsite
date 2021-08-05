import React, { useState, useEffect, useContext } from "react";
import { Modal } from "antd";
import { Team, Match } from "../axios";

const PreGameData = React.createContext();

export const usePreGame = () => {
  return useContext(PreGameData);
};

const PreGamgeProvider = ({ children }) => {
  const [preGameTable, setPreGameTable] = useState([]);
  const [editable, setEditable] = useState(true);
  const [cycle3, setCycle3] = useState(0);
  const [cycle4, setCycle4] = useState(0);
  const [mapDict, setMapDict] = useState({});

  useEffect(() => {
    async function effect() {
      const preGameData = await Team.GetALLTeam();
      let newData = [];
      Object.entries(preGameData).forEach((data) =>
        newData.push({
          key: data[1].team_id,
          name: data[1].name,
          session: data[1].session_preGame,
        })
      );
      setPreGameTable(newData);

      try {
        const stage = "preGame";
        const ifStage = await Match.CheckIfStage(stage);
        setEditable(() => (ifStage ? false : true));
      } catch (err) {
        console.log("in preGame, checkIfStage false");
      }
    }
    effect();
  }, []);

  useEffect(() => {
    try {
      let totalCycle = preGameTable.length;
      if (totalCycle - (totalCycle % 3) * 4 >= 0) {
        setCycle3((totalCycle - (totalCycle % 3) * 4) / 3);
        setCycle4(totalCycle % 3);
      } else {
        console.log("in preGame, error with the team number");
      }
    } catch (e) {
      console.log("in preGame, Signup teams count is below 3");
    }
  }, [preGameTable]);

  useEffect(() => {
    setTimeout(() => {
      let updateDict = cycleDict();
      Object.entries(preGameTable).forEach((team, index) => {
        const teamSessionGroup = team[1].session[0];
        if (teamSessionGroup in updateDict && team[1].session !== "--") {
          updateDict[teamSessionGroup][team[1].session] = {
            key: team[1].key,
            name: team[1].name,
            session: team[1].session,
          };
        }
      });

      setMapDict(() => updateDict);
    }, 500);
  }, [cycle3, cycle4, preGameTable]);

  const cycleDict = () => {
    let dict = {};
    // A = 65
    for (let i = 0; i < parseInt(cycle3) + parseInt(cycle4); i++) {
      let alphaChar = String.fromCharCode(65 + i);
      let ACycleDict = {};
      for (let j = 0; j < 3; j++) {
        let alpha = alphaChar + (j + 1).toString();
        ACycleDict[alpha] = { session: alpha };
      }
      if (i >= cycle3) {
        let alpha = alphaChar + (4).toString();
        ACycleDict[alpha] = { session: alpha };
      }
      dict[alphaChar] = ACycleDict;
    }
    return dict;
  };

  const generateModal = (action) => {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: "This is a notification message",
      content:
        action === "result"
          ? `${secondsToGo} 秒後跳轉至結果頁面`
          : `目前隊伍資訊已儲存`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      if ((secondsToGo >= 0) & (action === "result")) {
        modal.update({
          content: `${secondsToGo} 秒後跳轉至結果頁面`,
        });
      }
    }, 1000);
    setTimeout(() => {
      if (action === "result") {
        clearInterval(timer);
      }
      modal.destroy();
      setEditable(action === "result" ? false : true);
    }, (secondsToGo + 1) * 1000);
  };

  const saveResult = async () => {
    await Object.entries(preGameTable).map((team) => {
      const res = Team.UpdateSession(
        "session_preGame",
        team[1].key,
        team[1].session
      );
    });

    const teamSessionFill = await Team.CheckFillSession("session_preGame");
    if (teamSessionFill) {
      const havePreGame = await Match.CheckIfStage("preGame");
      if (havePreGame) {
        await Match.DeleteSession("preGame");
      }
      Object.entries(mapDict).map((sessionGroup, index) => {
        let teams = Object.entries(sessionGroup[1]);
        for (let i = 0; i < teams.length; i++) {
          for (let j = i + 1; j < teams.length; j++) {
            if (i !== j) {
              const res = Match.Create(
                teams[i][1].key,
                teams[j][1].key,
                "preGame",
                sessionGroup[0]
              );
            }
          }
        }
      });
      generateModal("result");
      return;
    } else {
      await Match.DeleteSession("preGame");
      generateModal("not fill session yet");
      return;
    }
  };

  const value = {
    preGameTable,
    setPreGameTable,
    cycle3,
    setCycle3,
    cycle4,
    setCycle4,
    mapDict,
    setMapDict,
    cycleDict,
    saveResult,
    editable,
    setEditable,
    generateModal,
  };

  return <PreGameData.Provider value={value}>{children}</PreGameData.Provider>;
};

export default PreGamgeProvider;
