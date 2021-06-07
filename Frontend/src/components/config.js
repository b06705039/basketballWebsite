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
};
const time = ["12:00", "18:30", "19:30"];

function Getdepartment(part) {
  return Department.info[part]["zh"];
}
function SpecialDate(date) {
  let output = new Date(date);
  return `${output.toLocaleDateString()} : ${time[output.getHours()]}`;
}
config.adimType = {
  administer: "主辦單位",
  team: "系隊",
  recorder: "紀錄員",
};

config.translateItem = {
  department: Getdepartment,
  homeDepartment: Getdepartment,
  awayDepartment: Getdepartment,
  startDate: SpecialDate,
  active: (input) => (input ? "已啟用" : "未啟用"),
  adim: (input) => config.adimType[input],
};

export default config;
