import React, { useState, useEffect } from "react";
// import List from '../components/list'
import { Recorder } from "../axios";
import { List, Divider } from "antd";
import { Link } from "react-router-dom";

const InChargeGame = () => {
  const [dataSource, setDataSource] = useState();

  useEffect(async () => {
    try {
      const result = await Recorder.InCharge(8);
      setDataSource(() => result);
    } catch (err) {
      throw err;
    }
  }, []);

  return (
    <div className="ant-layout-content" style={{ height: "1000px" }}>
      <div className="site-layout-content" style={{ padding: "0 50px" }}>
        <Divider orientation="left">負責賽事</Divider>
        <List
          bordered
          dataSource={dataSource}
          renderItem={(aMatch) => (
            <List.Item>
              <div>{aMatch.startDate.slice(0, 10) || "none"}</div>
              <div style={{ width: "150px" }}>
                {aMatch.homeName} vs {aMatch.awayName}
              </div>
              <div></div>
              <Link to={"/"}>球員名單確認</Link>
              <Link to={"/recordTeam"}>紀錄台</Link>
              <Link to={"/"}>A隊球員紀錄表</Link>
              <Link to={"/"}>B隊球員紀錄表</Link>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default InChargeGame;
