import React from 'react'
import styled from 'styled-components'

const BodyDiv = styled.div`
    width: 150px;
    height: 150px;
    // border: 1px solid black;
    display: inline-block;
    margin: 20px;
`

const MiddleGraph = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 80px;
    font-weight: 50;
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

const Acycle4 = (props) => {

    const data = Object.entries(props.data)

    return (
        <BodyDiv>
            <BottomLabel>
                <Teamname>{data[0][1]}</Teamname>
                <Teamname>{data[1][1]}</Teamname>
            </BottomLabel>
            <MiddleGraph>
                &#9634;
            </MiddleGraph>
            <BottomLabel>
                <Teamname>{data[2][1]}</Teamname>
                <Teamname>{data[3][1]}</Teamname>
            </BottomLabel>
        </BodyDiv>
    )
}

export default Acycle4