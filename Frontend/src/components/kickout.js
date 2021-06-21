import React, { useState, useEffect } from 'react'
import { Image, Spin } from 'antd'
import styled from 'styled-components'
import { useInterGame } from '../hooks/useInterGame'


const StyledKickout = styled(Image)`
  width: 100%;
  padding-top: 50px;
  margin: 1px;
`
const BottomDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`

const StyledGroupTeam = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  margin-left
`

const StyleP = styled.div`
  display: flex;
  
`

const groupTeamFunc = (num) => {
  let newGroup = Array(4)
  let half = Math.ceil(num/2)
  newGroup[0] = Math.ceil(half/2)
  newGroup[1] = half-newGroup[0]
  newGroup[2] = Math.ceil((num-half)/2)
  newGroup[3] = num-half-newGroup[2]
  return newGroup
}

const Kickout = () => {

  const { mapDict, interTeamNum } = useInterGame()
  const [ renderDict, setRenderDict ] = useState(handleRenderDict())


  function handleRenderDict() {
    const mapDictArr = Object.entries(mapDict)
    console.log(mapDictArr)
    const numArr = groupTeamFunc(interTeamNum)
    let acumNum = 0
    let newMapDict = []
    for(let i=0;i<4;i++){
      newMapDict[i] = []
      for(let j=acumNum;j<acumNum+numArr[i];j++){
        newMapDict[i].push(mapDictArr[j])
      }
      acumNum+=numArr[i]
    }
    return newMapDict
  }

  useEffect(async () => {
    await setRenderDict(()=>handleRenderDict())
  }, [mapDict, interTeamNum])

  console.log("this is renderDic: ", renderDict)

  return (
    <>
        <StyledKickout
            src={"/img/interGame" + interTeamNum.toString() + ".png"}
            preview={false}
            />
        <BottomDiv>
            {/* {Object.entries(mapDict).map((item,index)=><p key={index}>{item[1].name || item[1].session}</p>)} */}

            {renderDict.map((group,index)=>
              (<StyledGroupTeam>
                {group.map((team,index)=> <StyleP key={index}>{team[1].name || team[1].session}</StyleP>)}
              </StyledGroupTeam>)
            )}
        </BottomDiv>
    </>
  )
}


export default Kickout