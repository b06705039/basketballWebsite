import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import PreGameTable from '../components/preGameTable'
import Cycles from '../components/Cycles'
import usePreGame from '../hooks/usePreGame'

const ContentBackground = styled.div`
    height: 1000px;
    padding: 50px 100px;
`
const ContentBody = styled.div`
    padding: 50px;
    border: 1px solid black;
    flex-direction: column;
    // justify-content: space-between;
    height:100%;

`
const TopDiv = styled.div`
    height: 64px;

`
const BottomDiv = styled.div`
    width:100%;
    display: inline-block;
`
const Title = styled.h1`
    float: left;
`
const ButtonDiv = styled.div`
    float: right;
    display: flex;
    justify-content: space-between;
    width: 225px;
`
const StyledButton = styled(Button)`
    height: 33px;
    background-color: #6b9abb;
    border-radius: 10px;
`
const LeftBlock = styled.div`
    padding: 5px;
    width: 25%;
    float:left;
`
const RightBlock = styled.div`
    padding: 5px;
    border: 1px solid black;
    width: 75%;
    float:left;
`

const PreGame = () => {
    
    const { mapDict } = usePreGame()
    
    return(
        <ContentBackground className="ant-layout-content" >
            <ContentBody className="site-layout-content">

                <TopDiv>
                    <Title>預賽安排</Title>
                    <ButtonDiv>
                        <StyledButton>更改循環數目</StyledButton>
                        <StyledButton>輸出結果</StyledButton>
                    </ButtonDiv>
                </TopDiv>
                
                <BottomDiv>
                    <LeftBlock>
                        <PreGameTable />
                    </LeftBlock>

                    <RightBlock>
                        {mapDict && <Cycles data={mapDict}/>}
                    </RightBlock>
                </BottomDiv>
                
            </ContentBody>
        </ContentBackground>
    )
}


export default PreGame