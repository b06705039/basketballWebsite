import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Acycle3 from './Acycle3'
import Acycle4 from './Acycle4'
import { usePreGame } from '../hooks/usePreGame'

const CycleDiv = styled.div`
    display: inline-block;
    width: 100%;
    height: 100%;
`

const Cycles = () => {

    const { mapDict } = usePreGame()

    return (
        <CycleDiv>
            {mapDict && Object.entries(mapDict).map((sessionObject, index)=>{
                console.log("in cycle, update aCycles", sessionObject)
                if(Object.keys(sessionObject[1]).length ===3){
                    return <Acycle3 key={index} groupSession={sessionObject[0]} data={sessionObject[1]} />
                }else{
                    return <Acycle4 key={index} groupSession={sessionObject[0]} data={sessionObject[1]} />
                }
            })}
        </CycleDiv>
    )
}

export default Cycles