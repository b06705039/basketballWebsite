import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Acycle3 from './Acycle3'
import Acycle4 from './Acycle4'
// import usePreGame from '../hooks/usePreGame'

const CycleDiv = styled.div`
    display: inline-block;
    width: 100%;
    height: 100%;
`

const Cycles = (props) => {
    console.log("in cycle, ")

    return (
        <CycleDiv>
            {props.data && Object.entries(props.data).map((session, index)=>{
                if(Object.keys(session[1]).length ===3){
                    return <Acycle3 key={index} data={session[1]} />
                }else{
                    return <Acycle4 key={index} data={session[1]} />
                }
            })}
        </CycleDiv>
    )
}

export default Cycles