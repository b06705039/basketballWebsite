import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Acycle3 from './Acycle3'
import Acycle4 from './Acycle4'
import { usePreGame } from '../hooks/usePreGame'
import { usePages } from '../hooks/usePages'
import { Spin } from 'antd'

const CycleDiv = styled.div`
    display: inline-flex;
    width: 100%;
    height: 100%;
    justify-content: center;
`


const Cycles = () => {

    const { mapDict, editable } = usePreGame()
    const { id } = usePages()
    

    return (
        <CycleDiv>
            { (id!=='administer' && editable)?
                <React.Fragment><p>未發布預賽</p></React.Fragment>:
                mapDict && Object.entries(mapDict).map((sessionObject, index)=>{
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
