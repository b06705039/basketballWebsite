import React, { useState, useEffect, useMemo, useContext } from 'react'
import { Team, Match } from '../axios'


const PreGameData = React.createContext()


export const usePreGame = () => {
    return useContext(PreGameData)
}

const PreGamgeProvider = ({children}) => {

    const [ preGameTable, setPreGameTable ] = useState([])
    const [ cycle3, setCycle3 ] = useState(0)
    const [ cycle4, setCycle4 ] = useState(0)
    const [ mapDict, setMapDict ] = useState({})

    useEffect(async() => {
        const preGameData = await Team.GetALLTeam()
        let newData = []
        Object.entries(preGameData).forEach((data) => newData.push({key:data[1].team_id, name:data[1].name, session:data[1].session_preGame }))
        setPreGameTable(newData)
    }, [])

    useEffect(() => {
        try{
            let totalCycle = preGameTable.length
            if(totalCycle - (totalCycle%3 * 4) >= 0){
                setCycle3( (totalCycle - (totalCycle%3 * 4))/3 )
                setCycle4( totalCycle%3 )
            }
            else{
                console.log("in preGame, error with the team number")
            }
        }catch{
            console.log("in preGame, Signup teams count is below 3")
        }
    }, [preGameTable])


    // cycleDict format = {
    //     A:{
    //         A1:' ',
    //         A2:' ',
    //         A3:' '
    //     },
    //     B{
    //         B1:' ',
    //         B2:' ',
    //         B3:' '
    //     }
    // }
    // session depends on cycle3 & cycle4
    const cycleDict = () => {
        let dict = {}
        // A = 65
        for(let i=0; i<parseInt(cycle3)+parseInt(cycle4); i++){
            console.log("in usepreGame, generate cycleDict", cycle3, cycle4)
            let alphaChar = String.fromCharCode(65+i)
            let ACycleDict = {}
            for(let j=0; j<3; j++){
                let alpha = alphaChar+(j+1).toString()
                ACycleDict[alpha] = {session:alpha}
            }
            if(i>=cycle3){
                let alpha = alphaChar+(4).toString()
                ACycleDict[alpha] = {session:alpha}
            }
            dict[alphaChar] = ACycleDict
        }
        return dict
    }

    useMemo(() => {

        setTimeout(() => {
            let updateDict = cycleDict()
            Object.entries(preGameTable).map((team, index)=>{
                console.log("team", index, team)
                const teamSessionGroup = team[1].session[0]
                if(teamSessionGroup in updateDict && team[1].session !== '--'){
                    updateDict[teamSessionGroup][team[1].session] = {key:team[1].key, name:team[1].name, session:team[1].session_preGame}
                }
            })
            console.log("in usePreGame updateDict", updateDict, cycle3, cycle4)
            
            setMapDict(updateDict)
        }, 500);
        
    }, [ cycle3, cycle4, preGameTable])

    console.log("in usePreGame", preGameTable, cycle3, cycle4, mapDict)


    const saveResult = async() => {
        console.log(" update session1: ", preGameTable)
        Object.entries(preGameTable).map(async( team ) => {
            console.log(" update session2: ", team, team[1].key, team[1].session)
            await Team.UpdateSession('session_preGame', team[1].key, team[1].session)
        })

        
        Object.entries(mapDict).map(async(sessionGroup, index)=>{
            let teams = Object.entries(sessionGroup[1])
            for (let i=0;i<teams.length;i++){
                for (let j=i+1;j<teams.length;j++){
                    if(i !== j){
                        const res = await Match.Create( teams[i][1].key, teams[j][1].key, 'preGame')
                        console.log("in saveResult, res:", res)
                    }
                }
            }
        })
    }

    const value = {
        preGameTable,
        setPreGameTable,
        cycle3,
        setCycle3,
        cycle4,
        setCycle4,
        mapDict,
        setMapDict,
        cycleDict,
        saveResult,
    }

    return (
        <PreGameData.Provider value={value}>
            {children}
        </PreGameData.Provider>
    )
}

export default PreGamgeProvider