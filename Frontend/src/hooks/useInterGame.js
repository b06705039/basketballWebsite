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



    const generateModal = (action) =>{
        let secondsToGo = 5
        const modal = Modal.success({
            title: 'This is a notification message',
            content: action==="result"?`${secondsToGo} 秒後跳轉至結果頁面`:`目前隊伍資訊已儲存`,
        })
        const timer = setInterval(() => {
            secondsToGo -= 1
            if(secondsToGo>=0 & action==="result"){
                modal.update({
                    content: `${secondsToGo} 秒後跳轉至結果頁面`,
                })
            }
        }, 1000)
        setTimeout(() => {
            if(action==="result"){
                clearInterval(timer)
            }
            modal.destroy()
            setEditable(action==="result"?false:true)
        }, (secondsToGo+1) * 1000);
    }


    const saveResult = async() => {
        // update team session
        // check if all team session fill
        // if fill
        //      if checkIfStage, delete match 
        //      create match
        // else, break & show not fill msg

        await Object.entries(interGameTable).map( ( team ) => {
            Team.UpdateSession('session_interGame', team[1].key, team[1].session || '--')
        })

        const teamSessionFill = await Team.CheckFillSession('session_interGame')
        if ( teamSessionFill ) {
            const havePreGame = await Match.CheckIfStage('interGame')
            if( havePreGame ){
                await Match.DeleteSession('interGame')
            }

            let tempArr = []
            Object.entries(mapDict).map(async(team, index)=>{
                tempArr.push(team)
            })
            createMatch(tempArr)
            generateModal('result')
            matchCount = 0
        }else{
            await Match.DeleteSession('interGame')
            generateModal('not fill yet')
        }
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
