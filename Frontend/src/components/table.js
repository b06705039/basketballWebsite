import { Table } from "antd";
import React, { useState, useEffect } from "react";
import { Team, Match, User, Recorder } from "../axios";
import config from "./config";

/*
<table type='users'>  => 使用者資料
<table type='teams'>  => 各隊資料
<table type='recorders'>  => 紀錄員資料
<table type='matched'>  => 賽程資料
*/

const tableType = {
  users: async () => await User.GetALLAccount(),
  teams: async () => await Team.GetALLTeam(),
  recorders: async () => await Recorder.GetALLRecorder(),
  matches: async () => await Match.GetALLMatch(),
};

const pagination = {
  pageSize: 5,
};

const extension = {
  email: 250,
  createtime: 250,
  user_id: 130,
  team_id: 130,
  recorder_id: 130,
  match_id: 130,
  id: 80,
  startDate: 200,
  homeDepartment: 150,
  awayDepartment: 150,
};

const filters = {
  users: {
    adim: Object.values(config.adimType).map((adim) => ({
      text: adim,
      value: adim,
    })),
    department: Object.keys(config.department.info).map((part) => ({
      text: config.department.info[part]["zh"],
      value: config.department.info[part]["zh"],
    })),
  },
  teams: {
    status: config.teamstatus.map((status) => ({
      text: status,
      value: status,
    })),
    department: Object.keys(config.department.info).map((part) => ({
      text: config.department.info[part]["zh"],
      value: config.department.info[part]["zh"],
    })),
  },
  recorders: {},
  matches: {},
};

function Activator(props) {
  const [active, setactive] = useState(props.data.active);
  const sendactive = async () => {
    await User.AccountActive(props.data.user_id);
    setactive(active === "已啟用" ? "未啟用" : "已啟用");
  };
  return props.data.adim !== "主辦單位" ? (
    <h4
      onClick={sendactive}
      style={{ color: active === "未啟用" ? "red" : "blue" }}
    >
      {active}
    </h4>
  ) : (
    <h4>{active}</h4>
  );
}

let special = {
  active: {
    title: "啟用狀態",
    dataIndex: "",
    render: (data) => <Activator data={data} />,
  },
};

const tablename = {
  users: "使者資訊",
  teams: "系隊資訊",
  recorders: "紀錄員資訊",
  matches: "賽程資訊",
};

export default function (props) {
  const [data, setdata] = useState([]);
  const [columns, setcolume] = useState([]);
  const title = tablename[props.type || "users"];
  useEffect(() => {
    (async () => {
      let response = await tableType[props.type || "users"]();
      let res_columes = Object.keys(response[0]);

      setdata(
        response.map((element, index) => {
          for (let item in element) {
            if (item in config.translateItem) {
              element[item] = config.translateItem[item](element[item]);
            }
            if (element[item] === null || element[item] === undefined)
              element[item] = "NONE";
          }
          element["key"] = index;
          return element;
        })
      );
      setcolume(() => {
        let output = res_columes.map((col) =>
          col in special
            ? special[col]
            : {
                title: col in config.translate ? config.translate[col] : col,
                dataIndex: col,
                sorter: {
                  compare: (a, b) => {
                    if (typeof a[col] === "string")
                      return a[col].localeCompare(b[col]);
                    else if (typeof a[col] === "number") return a[col] - b[col];
                  },
                },
                width: col in extension ? extension[col] : undefined,
                filters:
                  col in filters[props.type]
                    ? filters[props.type][col]
                    : undefined,
                onFilter: (value, record) => record[col].indexOf(value) === 0,
              }
        );
        return output;
      });
    })();
  }, []);
  return (
    <div>
      <h1 style={{ margin: "15px 30px" }}>{title}</h1>
      <Table
        columns={columns}
        dataSource={data}
        sticky
        pagination={pagination}
        scroll={{ x: columns.length <= 10 ? "100%" : "110%" }}
      />
    </div>
  );
}
