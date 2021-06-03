const databaseInfo = {
  user: {
    connectionLimit: 10,
    queueLimit: 0,
    host: "remotemysql.com",
    port: 3306,
    user: "t5yKOl57F6",
    password: "W0WVfD5ZN4",
    database: "t5yKOl57F6",
    supportBigNumbers: true,
  },
};
const config = {};
config.SECRET_KEY = "S8*%X$N.AFwx";
config.TOKEN_EXPIRE_TIME = 18000;

//使用者帳號需少於50數字
config.ACCOUNT_FORMAT = "^.{1,50}$";
//密碼需少於50數字
config.PWD_FORMAT = "^.{1,50}$";
config.MAIL_FORMAT =
  /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
//使用者名稱需少於50數字
config.USERNAME_FORMAT = "^.{1,50}$";

config.databases = databaseInfo;
config.AdimLevel = { administer: 2, recorder: 1, team: 1, public: 0 };

config.department = [
  "CHIN",
  "FL",
  "HIST",
  "PHL",
  "ANTH",
  "LIS",
  "JPNL",
  "THEA",
  "MATH",
  "PHYS",
  "CHEM",
  "GEO",
  "PSY",
  "GEOG",
  "ATMSCI",
  "PS",
  "ECON",
  "SOC",
  "SW",
  "MED",
  "DENT",
  "PHARM",
  "CLILAB",
  "NURSE",
  "PT",
  "OT",
  "CIE",
  "ME",
  "CHEME",
  "ESOE",
  "MSE",
  "AGRON",
  "BSE",
  "AC",
  "FOREST",
  "ANISCI",
  "AGEC",
  "HORT",
  "VM",
  "BICD",
  "BME",
  "ENT",
  "PPM",
  "BA",
  "ACC",
  "FIN",
  "IB",
  "IM",
  "PH",
  "EE",
  "CSIE",
  "LAW",
  "LS",
  "BST",
];
config.teamStatus = ["已報名", "已繳費", "審核中", "未報名", "未繳費"];
config.recorderStatus = ["已報名", "未報名"];

config.AdministerEmail = {
  user: "thomson861106@gmail.com",
  pass: "qqqq10134037", // 台大女籃 (用英文打)
};

module.exports = config;
