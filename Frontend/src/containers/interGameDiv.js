import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
// import InterGameTable from '../components/interGameTable'
import PreGameTable from '../components/preGameTable'
import Kickout from '../components/kickout'
import { Form, Modal } from 'antd'

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
    float: right;
    display: flex;
`
const LeftBlock = styled.div`
    padding: 5px;
    width: 25%;
    float:left;
`
const RightBlock = styled.div`
    padding: 5px;
    // border: 1px solid black;
    width: 75%;
    float:left;
`

const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      // xs: {
      //   span: ,
      // },
      sm: {
        span: 10,
      },
    },
  };

const InterGameDiv = () => {

    // const { saveResult } = usePreGame()
    const [ showChangeCycle, setShowChangeCycle ] = useState(false)
    const [ editable, setEditable ] = useState(true)
    const [ form ] = Form.useForm()


    const generateModal = () =>{
        let secondsToGo = 5
        const modal = Modal.success({
            title: 'This is a notification message',
            content: `${secondsToGo} 秒後跳轉至結果頁面`,
        })
        const timer = setInterval(() => {
            secondsToGo -= 1
            modal.update({
                content: `${secondsToGo} 秒後跳轉至結果頁面`,
            })
        }, 1000)
        setTimeout(() => {
            clearInterval(timer)
            modal.destroy()
            setEditable(false)
        }, secondsToGo * 1000);

        
    }

    return(
        <>
            <ContentBackground className="ant-layout-content" >
                <ContentBody className="site-layout-content">
                   <TopDiv>
                        <Title>複賽安排</Title>
                        <ButtonDiv style={{"justifyContent": editable?" space-between":"flex-end"}}>
                            { editable? (<>
                                                <StyledButton onClick={()=>{
                                                    // saveResult()
                                                    generateModal()
                                                }}>輸出結果</StyledButton>
                                        </>):(
                                                <StyledButton onClick={()=>{setEditable(true)}}>更動複賽</StyledButton>
                                        )
                            }
                        </ButtonDiv>
                    </TopDiv>
                    <BottomDiv>
                        { editable && ( <LeftBlock>
                                            {/* <PreGameTable /> */}
                                        </LeftBlock>)}
                        <RightBlock>
                            <Kickout />
                        </RightBlock>
                    </BottomDiv>
                    
                </ContentBody>
            </ContentBackground>


        </>
    )
}


export default InterGameDiv