import React, { useState, useContext, useMemo, useEffect } from "react";
import { pagesMenu } from "./pagesMenu";
import { CheckToken, Post } from "../axios";

const defId = "administer";
// 加入下面這行 const { ..., pageName } = pagesMenu()
const {
  News,
  PreGame,
  Default,
  Try,
  Scheduler,
  Timer,
  InterGame,
  PostNews,
  InChargeGame,
  RecordTeam,
  Checkteam,
  GameResult,
  SchedulerRead,
} = pagesMenu();

// 找到相對應頁面，改後面的component
const zhPage = {
  news: ["最新消息", News],
  schedule: ["賽程時間表", Scheduler],
  scheduleRead: ["賽程時間表", SchedulerRead],
  gameResult: ["比賽結果", GameResult],
  adminInfo: ["主辦介紹", Default],
  contact: ["聯絡資訊", Default],
  main: ["首頁", News],
  teamInfo: ["球隊資訊", Try],
  preGame: ["安排預賽賽程", PreGame],
  interGame: ["安排複賽循環", InterGame],
  annouce: ["發布消息", PostNews],
  inChargeGame: ["負責賽事", InChargeGame],
  register: ["報名", Default],
  scheduleTime: ["填寫賽程時間", Timer],
  Checkteam: ["確認隊伍資訊", Checkteam],
};
const idPage = {
  public: ["main", "scheduleRead", "gameResult", "adminInfo", "contact"],
  administer: [
    "main",
    "schedule",
    "preGame",
    "interGame",
    "annouce",
    "Checkteam",
  ],
  recorder: ["main", "inChargeGame", "scheduleTime", "scheduleRead"],
  team: ["main", "register", "scheduleTime", "Checkteam", "scheduleRead"],
};

const Pages = React.createContext();

export function usePages() {
  return useContext(Pages);
}

const userForm = {
  account: null,
  active: null,
  adim: "public",
  email: null,
  token: null,
  user_id: null,
  username: null,
};

export function PagesProvider({ children }) {
  const [userInfo, setUserInfo] = useState(userForm);
  const [id, setId] = useState(defId);
  const [pageList, setPageList] = useState(idPage[id]);
  const [zhPageList, setZhPageList] = useState(
    pageList.map((page) => zhPage[page])
  );
  const [curPage, setCurPage] = useState(zhPageList[0]);

  const logout = () => {
    setUserInfo(userForm);
    localStorage.removeItem("userInfo");
  };

  useEffect(async () => {
    const storageUserInfo = localStorage.getItem("userInfo");
    try {
      const getUserInfo = await CheckToken(storageUserInfo);
      if (
        (JSON.stringify(getUserInfo) === "{}") |
        (typeof getUserInfo === "undefined")
      ) {
        setUserInfo(() => userForm);
      } else {
        setUserInfo(() => getUserInfo);
      }
    } catch (err) {
      setUserInfo(() => userForm);
      localStorage.removeItem("userInfo");
    }
  }, []);

  useEffect(() => {
    const updateId = userInfo["adim"];
    const updatePageList = idPage[updateId];
    setId(updateId);
    setPageList(updatePageList);
    setZhPageList(updatePageList.map((page) => zhPage[page]));
    setCurPage(zhPage[updatePageList[0]]);
  }, [userInfo]);

  const value = {
    id,
    setId,
    zhPageList,
    curPage,
    setCurPage,
    userInfo,
    setUserInfo,
    logout,
  };

  return <Pages.Provider value={value}>{children}</Pages.Provider>;
}
