import React from 'react'
import styled from 'styled-components'

const BodyDiv = styled.div`
    width: 150px;
    height: 150px;
    // border: 1px solid black;
    display: inline-block;
    margin: 20px;
`

const TopLabal = styled.div`
    width: 100%;
    height: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const MiddleGraph = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Graph = styled.div`
    display:flex;
    font-size: 110px;
    font-weight: 100;
    justify-content: center;
    position: absolute;
`

const GroupSession = styled.div`
    display:flex;   
    justify-content: center;    
    position: absolute;
    margin-top: 20px;
`

const BottomLabel = styled.div`
    width: 100%;
    height: 25%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
`
const Teamname = styled.div`
    display:flex;   
    justify-content: center;
`



const Acycle3 = (props) => {

    const data = Object.entries(props.data)
    console.log("in cycle3, ", data)

    return (
        <BodyDiv>
            <TopLabal>
                <Teamname>{data[0][1].name || data[0][1].session}</Teamname>
            </TopLabal>
            <MiddleGraph>
                <Graph>&#9651;</Graph>
                <GroupSession>{props.groupSession}</GroupSession>
            </MiddleGraph>
            <BottomLabel>
                <Teamname>{data[1][1].name || data[1][1].session}</Teamname>
                <Teamname>{data[2][1].name || data[2][1].session}</Teamname>
            </BottomLabel>
        </BodyDiv>
    )
}

export default Acycle3


