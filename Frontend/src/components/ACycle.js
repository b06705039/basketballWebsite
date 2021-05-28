import React from 'react'
import styled from 'styled-components'

const BodyDiv = styled.div`
    width: 150px;
    height: 150px;
    border: 1px solid black;
    display: inline-block;
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
    font-size: 120px;
    font-weight: 100;
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

const ACycle = () => {
    return (
        <BodyDiv>
            <TopLabal>
                <Teamname>team1</Teamname>
            </TopLabal>
            <MiddleGraph>
                &#9651;
                {/* <div style={{"font-size":"100px", "display":"inline-block"}}></div> */}
            </MiddleGraph>
            <BottomLabel>
                <Teamname>team2</Teamname>
                <Teamname>team3</Teamname>
            </BottomLabel>
        </BodyDiv>
    )
}

export default ACycle