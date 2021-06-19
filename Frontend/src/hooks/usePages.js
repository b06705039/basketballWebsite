import React,{ useState, useContext, useEffect } from 'react'
import { pagesMenu } from './pagesMenu'

const defId = "admin"
const defCurPage = "news"
// 加入下面這行 const { ..., pageName } = pagesMenu()
const { News, PreGame, Default, Try , Scheduler, Timer, Checkteam} = pagesMenu()


// 找到相對應頁面，改後面的component
const zhPage = {
    'news':[ '最新消息', News ],
    'schedule':[ '賽程時間表', Scheduler ],
    'gameResult':['比賽結果', Default ],
    'adminInfo':['主辦介紹', Default],
    'contact':['聯絡資訊', Default],
    'main':['首頁', Default],
    'teamInfo':['球隊資訊', Try],
    'preGame':['安排預賽賽程', PreGame],
    'interGame':['安排複賽循環', Default],
    'annouce':['發布消息', Default],
    'inChargeGame':['負責賽事', Default],
    'register':['報名', Default],
    'scheduleTime':['填寫賽程時間', Timer],
    'Checkteam': ['確認隊伍資訊', Checkteam]
};
const idPage = {
    'testPublic':['news','schedule'],
    'public':['news','schedule','gameResult','adminInfo','contact'],
    'admin':['main','teamInfo','schedule','preGame','interGame','annouce', 'Checkteam'],
    'scoring':['main','inChargeGame'],
    'team':['main','register','scheduleTime', 'Checkteam']
}

const Pages = React.createContext()

export function usePages(){
    return useContext(Pages)
}

export function PagesProvider({children}){
    const [id, setId] = useState(defId);
    const [pageList, setPageList] = useState(idPage[id])
    const [zhPageList, setZhPageList] = useState(pageList.map(page=>zhPage[page]))
    const [curPage, setCurPage] = useState(zhPageList[0])

    useEffect(() => {
        setPageList(idPage[id])
        
    }, [id])

    useEffect(() => {
        setZhPageList(pageList.map(page=>zhPage[page]))
        setCurPage(zhPage[pageList[0]])
    }, [pageList])

    const value = {
        id,
        setId,
        zhPageList, 
        curPage,
        setCurPage
    }

    return(
        
        <Pages.Provider value={value}>
            {children}
        </Pages.Provider>
    )

}
