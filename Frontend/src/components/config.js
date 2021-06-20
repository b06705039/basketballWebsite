import { Result } from "antd";
import Department from "../department.json";
const config = {};
config.department = Department;
config.translate = {
  user_id: "使用者編號",
  account: "使用者帳號",
  username: "使用者名稱",
  email: "信箱",
  department: "系所",
  active: "帳號啟用狀態",
  adim: "身份別",
  team_id: "隊伍編號",
  teamname: "隊伍名稱",
  status: "隊伍狀態",
  createtime: "創建時間",
  owner: "隊伍代表",
  ownerDepartment: "隊伍代表系所",
  recorder_id: "紀錄員編號",
  name: "姓名",
  id: "編號",
  home: "主隊",
  away: "客隊",
  homeStatus: "主隊狀態",
  homeDepartment: "主隊系所",
  awayStatus: "客隊狀態",
  awayDepartment: "客隊系所",
  startDate: "賽程日期",
  field: "場地",
  recorder: "紀錄員",
  winner: "勝方",
};
const time = ["下午12:30", "晚上6:30", "晚上7:30"];

function Getdepartment(part) {
  if (part in Department.info) return Department.info[part]["zh"];
  else return "NULL";
}
function SpecialDate(date) {
  if (date === null) return "NONE";
  let output = new Date(date);
  return `${output.toLocaleDateString()} ${time[output.getHours() - 1]}`;
}
config.adimType = {
  administer: "主辦單位",
  team: "系隊",
  recorder: "紀錄員",
};
config.teamstatus = ["未報名", "已報名", "未繳費", "已繳費"];

config.translateItem = {
  department: Getdepartment,
  homeDepartment: Getdepartment,
  awayDepartment: Getdepartment,
  ownerDepartment: Getdepartment,
  startDate: SpecialDate,
  active: (input) => (input ? "已啟用" : "未啟用"),
  adim: (input) => config.adimType[input],
  createtime: (date) => new Date(date).toLocaleDateString(),
  field: (place) =>
    place === null ? "NONE" : place === 0 ? "中央場 A" : "中央場 B",
  winner: (result) =>
    result === null ? "NONE" : result === 1 ? "主隊" : "客隊",
};

export default config;
