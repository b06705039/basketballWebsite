import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Button, Table, Radio, Input } from "antd";
import "antd/dist/antd.css";

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

const RadioGroup = styled(Radio.Group)`
  display: flex;
  flex-direction: row;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
`;

const buttonDict = {
  num: "球員背號",
  steal: "抄截",
  assist: "助攻",
  block: "阻攻",
  "2point": "2分",
  "3point": "3分",
  bankShot: "籃板",
};
const columns = [];

Object.keys(buttonDict).map((type) => {
  columns.push({ title: buttonDict[type], dataIndex: type, key: type });
});

const RecordPlayer = () => {
  // should pass as props
  const aMatch = {
    match_id: 100,
    home: 5,
    away: 6,
    recorder: "紀錄員1",
  };
  const teamId = 5;

  const saveKey = `${aMatch.match_id}-${teamId}`;
  const [players, setPlayers] = useState();
  const [selectType, setSelectType] = useState("steal");
  const InputRef = useRef();
  const [number2column, setNumber2Column] = useState();

  useEffect(() => {
    let updatePlayers = JSON.parse(localStorage.getItem(`${saveKey}-players`));
    let updateNumber2Column = JSON.parse(
      localStorage.getItem(`${saveKey}-number2Column`)
    );
    if (!updatePlayers || !updateNumber2Column) {
      // get players from db
      const playersList = [1, 2, 3, 4, 5];
      updatePlayers = [];
      updateNumber2Column = {};
      playersList.map((num, index) => {
        // for players
        let newBtnDict = {};
        Object.keys(buttonDict).map((type) => {
          newBtnDict[type] = 0;
        });
        newBtnDict["num"] = num;
        updatePlayers.push(newBtnDict);
        // for map
        updateNumber2Column[num] = index;
      });
    }
    setPlayers(() => updatePlayers);
    setNumber2Column(() => updateNumber2Column);
    localStorage.setItem(`${saveKey}-players`, JSON.stringify(updatePlayers));
    localStorage.setItem(
      `${saveKey}-number2Column`,
      JSON.stringify(updateNumber2Column)
    );
  }, []);

  // const handleTypeChange = (e) => {
  //   setSelectType(() => e.target.value);
  // };

  const handleClick = () => {
    const number = InputRef.current.state.value;
    const index = number2column[number];
    const type = selectType;
    const updatePlayers = [...players];
    console.log("into handle click", number, index, type);

    if (type === "2point") {
      updatePlayers[index][type] += 2;
    } else if (type === "3point") {
      updatePlayers[index][type] += 3;
    } else {
      updatePlayers[index][type] += 1;
    }

    setPlayers(() => updatePlayers);
  };

  return (
    <ContentBackground>
      <ContentBody>
        <Table
          columns={columns}
          dataSource={players}
          scroll={{ x: "calc(700px + 50%)", y: 500 }}
        />

        <RadioGroup
          value={selectType}
          onChange={(e) => setSelectType(() => e.target.value)}
        >
          {Object.keys(buttonDict)
            .slice(1, Object.keys(buttonDict).length)
            .map((type, index) => (
              <Radio.Button key={index} value={type}>
                {buttonDict[type]}
              </Radio.Button>
            ))}
        </RadioGroup>
        <InputDiv>
          <Input ref={InputRef} />
          <Button onClick={handleClick}>+</Button>
          <Button onClick={handleClick}>-</Button>
        </InputDiv>
      </ContentBody>
    </ContentBackground>
  );
};

export default RecordPlayer;
