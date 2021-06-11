import React,{ useState, useContext, useMemo, useEffect } from 'react'
import { pagesMenu } from './pagesMenu'

const defId = "public"
const defCurPage = "news"
// 加入下面這行 const { ..., pageName } = pagesMenu()
const { News, PreGame, Default, Try , Scheduler, Timer, InterGame} = pagesMenu()

// 找到相對應頁面，改後面的component
const zhPage = {
  news: ["最新消息", News],
  schedule: ["賽程時間表", Scheduler],
  gameResult: ["比賽結果", Default],
  adminInfo: ["主辦介紹", Default],
  contact: ["聯絡資訊", Default],
  main: ["首頁", Default],
  teamInfo: ["球隊資訊", Try],
  preGame: ["安排預賽賽程", PreGame],
  interGame: ["安排複賽循環", InterGame],
  annouce: ["發布消息", Default],
  inChargeGame: ["負責賽事", Default],
  register: ["報名", Default],
  scheduleTime: ["填寫賽程時間", Timer],
};
const idPage = {
    'public':['news','schedule','gameResult','adminInfo','contact'],
    'administer':['main','teamInfo','schedule','preGame','interGame','annouce'],
    'recorder':['main','inChargeGame'],
    'team':['main','register','scheduleTime']
}

const Pages = React.createContext();

export function usePages() {
  return useContext(Pages);
}

const userForm = {  account: null,
                    active: null, 
                    adim: 'public', 
                    email: null, 
                    token: null,
                    user_id: null,
                    username: null }


export function PagesProvider({children}){
    const [ userInfo, setUserInfo ] = useState(userForm)
    const [ id, setId ] = useState(defId)
    const [ pageList, setPageList ] = useState(idPage[id])
    const [ zhPageList, setZhPageList ] = useState(pageList.map(page=>zhPage[page]))
    const [ curPage, setCurPage ] = useState(zhPageList[0])
    
    const logout = () => {
        setUserInfo(userForm)
    }

    useEffect(() => {
        console.log("user Info: ", userInfo)
        const updateId = userInfo['adim']
        const updatePageList = idPage[updateId]
        setId(updateId)
        setPageList(updatePageList)
        setZhPageList(updatePageList.map(page=>zhPage[page]))
        setCurPage(zhPage[updatePageList[0]])
      }, [userInfo])

    const value = {
        id,
        setId,
        zhPageList, 
        curPage,
        setCurPage,
        userInfo,
        setUserInfo, 
        logout
    }

    return(
        <Pages.Provider value={value}>
            {children}
        </Pages.Provider>
    )
}
