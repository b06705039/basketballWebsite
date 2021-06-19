import React,{ useState, useContext, useEffect } from 'react';

const zhPage = {
    'news':'最新消息',
    'schedule':'賽程時間表',
    'gameResult':'比賽結果',
    'adminInfo':'主辦介紹',
    'contact':'聯絡資訊',
    'main':'首頁',
    'teamInfo':'球隊資訊',
    'preGame':'安排預賽賽程',
    'interGame':'安排複賽循環',
    'annouce':'發布消息',
    'inChargeGame':'負責賽事',
    'register':'報名',
    'scheduleTime':'填寫賽程時間'

};

const idPage = {
    'public':['news','schedule','gameResult','adminInfo','contact', 'teamInfo'],
    'admin':['main','teamInfo','schedule','preGame','interGame','annouce', 'teamInfo'],
    'scoring':['main','inChargeGame'],
    'team':['main','register','scheduleTime']
};

const defId = "public";

const defCurPage = "news";

// const ConId = React.createContext(defId);
// const ConZhPageList = React.createContext();
// const ConZhCurPage = React.createContext();
// const CurPageFunc = React.createContext();

const Data = React.createContext();

export function useData(){
    return useContext(Data)
}


// export function PageList(){
    
//     return useContext(ConZhPageList);
// };

// export function CurPage(){
//     return useContext(ConZhCurPage);
// };


// export function UpdateCurPage(){
//     return useContext(CurPageFunc);
// }


export function ContextProvider({children}){
    const [id, setId] = useState(defId);
    const [pageList, setPageList] = useState(idPage[id])
    const [zhPageList, setZhPageList] = useState(pageList.map(page=>zhPage[page]))
    const [curPage, setCurPage] = useState(zhPage[defCurPage])

    useEffect(() => {
      setZhPageList(pageList.map(page=>zhPage[page]))
      }, [pageList])

    const value = {
        id,
        setId,
        zhPageList, 
        curPage,
        setCurPage
    }

    // function UpdatePageFunc(e){
    //     console.log("in context, updatePage");
    //     setCurPage(e.key);
    // }

    console.log(pageList);
    return(
        // <ConId.Provider value={id}>
        //     <ConZhPageList.Provider value={pageList.map(page=>zhPage[page])}>
        //         <ConZhCurPage.Provider value={curPage}>
        //             <CurPageFunc.Provider value={UpdatePageFunc}>
        //                 {children}
        //             </CurPageFunc.Provider>
        //         </ConZhCurPage.Provider>
        //     </ConZhPageList.Provider>
        // </ConId.Provider>

        <Data.Provider value={value}>
            {children}
        </Data.Provider>
    )

}
