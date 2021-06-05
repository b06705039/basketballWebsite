import React, { useState, useRef, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import PreGameTable from '../components/preGameTable'
import Cycles from '../components/Cycles'
import { usePreGame } from '../hooks/usePreGame'
import { Form, Input, Modal } from 'antd'

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

const PreGameDiv = () => {

    console.log("in preGame Div")

    const { saveResult, setCycle3, setCycle4 } = usePreGame()
    const [ showChangeCycle, setShowChangeCycle ] = useState(false)
    // const [ showSaveMes, setShowSaveMes ] = useState(false)
    const [ editable, setEditable ] = useState(true)
    const cycle3Ref = useRef()
    const cycle4Ref = useRef()
    const [ form ] = Form.useForm()

    const handleOK = (e) => {
        setCycle3(cycle3Ref.current.props.value)
        setCycle4(cycle4Ref.current.props.value)
        form.resetFields()
        setShowChangeCycle(false)
    }   

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

    // useMemo(() => {
    //     console.log("in show modal, into useEffect", showSaveMes)
    //     if (showSaveMes){
    //         generateModal()
    //         setShowSaveMes(false)
    //     }else{
    //         setEditable(false)
    //     }
    // }, [showSaveMes])

    return(
        <>
            <ContentBackground className="ant-layout-content" >
                <ContentBody className="site-layout-content">
                   <TopDiv>
                        <Title>預賽安排</Title>
                        <ButtonDiv style={{"justify-content": editable?" space-between":"flex-end"}}>
                            { editable? (<>
                                                <StyledButton onClick={()=>setShowChangeCycle(true)}>更改循環數目</StyledButton>
                                                <StyledButton onClick={()=>{
                                                    saveResult()
                                                    // setShowSaveMes(true)
                                                    generateModal()
                                                }}>輸出結果</StyledButton>
                                        </>):(
                                                <StyledButton onClick={()=>{setEditable(true)}}>更動預賽</StyledButton>
                                        )
                            }
                        </ButtonDiv>
                    </TopDiv>
                    <BottomDiv>
                        { editable && ( <LeftBlock>
                                            <PreGameTable />
                                        </LeftBlock>)}
                        <RightBlock>
                            <Cycles />
                        </RightBlock>
                    </BottomDiv>
                    
                </ContentBody>
            </ContentBackground>

            <>
                <Modal 
                visible = { showChangeCycle }
                onOk = { (e)=>handleOK(e) }
                onCancel = { ()=>setShowChangeCycle(false) } 
                >
                    <Form 
                        {...formItemLayout}
                        style={{textAlign:"center"}}
                        form={form}
                        >
                        <h2 style={{textAlign:"center"}}>更改循環數</h2>
                        <Form.Item
                            name="cycle3Num"
                            label="三循環數目"
                            >
                            <Input ref={cycle3Ref} />
                        </Form.Item>
                        
                        <Form.Item
                            name="cycle4Num"
                            label="四循環數目"
                            >
                            <Input ref={cycle4Ref} />
                        </Form.Item>
                    </Form>
                </Modal>
            </>

            <>
                {/* <Modal 
                    visible= { showSaveMes }
                    onOk={()=>setShowSaveMes(false)}
                    centered={true}
                    closable={false}
                    mask={false}
                    style={{'alignItems':'center'}}
                >
                    預賽賽程已儲存，正在導到結果頁面
                </Modal> */}
            </>
        </>
    )
}


export default PreGameDiv