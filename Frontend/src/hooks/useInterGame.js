import React, { useState, useEffect, useMemo, useContext } from 'react'
import { Team, Match } from '../axios'


const InterGameData = React.createContext()


export const useInterGame = () => {
    return useContext(InterGameData)
}



const InterGameProvider = ({children}) => {

    const [ interGameTable, setInterGameTable ] = useState([])
    const [ interTeamNum, setInterTeamNum ] = useState(8)
    const [ mapDict, setMapDict ] = useState({})
    

    useEffect(async() => {
        const interGameData = await Team.GetInterGame()
        console.log("in useInterGame, interGameData: ", interGameData)
        let newData = []
        Object.entries(interGameData).forEach((data) => newData.push({key:data[1].team_id, name:data[1].name, session:data[1].session_interGame }))
        setInterGameTable(newData)
    }, [])



    useMemo(() => {

        setTimeout(() => {
            let updateDict = {}
            for(let i=1; i<=interTeamNum; i++){
                updateDict[i.toString()] = {session:i.toString()}
            }
            Object.entries(interGameTable).map((team, index)=>{
                console.log("in assign mapDict: ", team)
                if(team[1].session!=='--'){
                    updateDict[team[1].session] = {key:team[1].key, name:team[1].name, session:team[1].session}
                }
            })
            console.log('use Inter Game, updateDict:', updateDict)
            setMapDict(updateDict)
        }, 500);


        
    }, [ interTeamNum, interGameTable])

    // const saveResult = async() => {
    //     console.log(" update session1: ", preGameTable)
    //     Object.entries(preGameTable).map(async( team ) => {
    //         console.log(" update session2: ", team, team[1].key, team[1].session)
    //         await Team.UpdateSession('session_preGame', team[1].key, team[1].session)
    //     })

        
    //     Object.entries(mapDict).map(async(sessionGroup, index)=>{
    //         let teams = Object.entries(sessionGroup[1])
    //         for (let i=0;i<teams.length;i++){
    //             for (let j=i+1;j<teams.length;j++){
    //                 if(i !== j){
    //                     const res = await Match.Create( teams[i][1].key, teams[j][1].key, 'preGame')
    //                     console.log("in saveResult, res:", res)
    //                 }
    //             }
    //         }
    //     })
    // }

    const value = {
        interGameTable,
        setInterGameTable,
        interTeamNum,
        setInterTeamNum,
        mapDict,
        setMapDict,
        // saveResult,
    }

    return (
        <InterGameData.Provider value={value}>
            {children}
        </InterGameData.Provider>
    )
}

export default InterGameProvider