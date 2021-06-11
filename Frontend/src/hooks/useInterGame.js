import React, { useState, useEffect, useMemo, useContext } from 'react'
import { Team, Match } from '../axios'
import { Modal } from 'antd'


const InterGameData = React.createContext()


export const useInterGame = () => {
    return useContext(InterGameData)
}

const InterGameProvider = ({children}) => {

    const [ interGameTable, setInterGameTable ] = useState([])
    const [ interTeamNum, setInterTeamNum ] = useState(8)
    // const [ keyinWarn, setKeyinWarn ] = useState(false)
    const [ mapDict, setMapDict ] = useState({})
    let matchCount = 0
    

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


    const createMatch = async(arr) => {
        console.log("another createMatch, arr: ", arr, arr.length)
        if(arr.length === 1){
            matchCount += 1
            console.log("arr.length==1: ", null , arr[0][1].key, matchCount.toString())
            const res = await Match.CreateInterMatch( null , arr[0][1].key, matchCount.toString())
            console.log(res)
        }else if(arr.length === 2 ){
            matchCount += 1
            console.log("arr.length==2: ",arr[0][1].key , arr[1][1].key, matchCount.toString())
            const res = await Match.CreateInterMatch( arr[0][1].key , arr[1][1].key, matchCount.toString())
            console.log(res)
        }else{
            const sepIndex = Math.ceil(arr.length/2)
            console.log("sepIndex: ", sepIndex)
            createMatch(arr.slice(0,sepIndex))
            createMatch(arr.slice(sepIndex, arr.length))
        }
    }

    const completeKeyIn = () => {
        console.log("into check complete key in")
        Object.entries(interGameTable).map(team=> {
            console.log("check complete team", team, team[1].session)
            if(team[1].session === "--"){ return false }
        })
        return true
    }

    const generateKeyinWarn = () =>{
        console.log("into generateKeyinWarn")
        let secondsToGo = 5
        const modal = Modal.success({
            title: 'This is a notification message',
            content: `未輸入完整資訊`,
        })
        const timer = setInterval(() => {
            secondsToGo -= 1
            // modal.update({
            //     content: `未輸入完整資訊`,
            // })
        }, 1000)
        setTimeout(() => {
            clearInterval(timer)
            modal.destroy()
        }, secondsToGo * 1000);
    }


    const saveResult = async() => {
        console.log(" update interGame result: ", interGameTable)

        console.log(completeKeyIn())
        if(!completeKeyIn()) {
            // setKeyinWarn(true)
            generateKeyinWarn()
        }else{
            Object.entries(interGameTable).map(async( team ) => {
                console.log(" update session2: ", team, team[1].key, team[1].session)
                await Team.UpdateSession('session_interGame', team[1].key, team[1].session)
            })
            let tempArr = []
            Object.entries(mapDict).map(async(team, index)=>{
                tempArr.push(team)
            })
            console.log("tempArr: ", tempArr)
            createMatch(tempArr)
            matchCount = 0
        }
    }

    const value = {
        interGameTable,
        setInterGameTable,
        interTeamNum,
        setInterTeamNum,
        mapDict,
        setMapDict,
        saveResult,
        // keyinWarn,
        // setKeyinWarn
    }

    return (
        <InterGameData.Provider value={value}>
            {children}
        </InterGameData.Provider>
    )
}

export default InterGameProvider