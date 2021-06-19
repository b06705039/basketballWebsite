import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Button, Select } from 'antd'
import InterGameTable from '../components/interGameTable'
import Kickout from '../components/kickout'
import { Form, Modal } from 'antd'
import { useInterGame } from '../hooks/useInterGame'
const { Option } = Select;

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
    width: 250px;
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
    const [ showChangeTeamNum, setShowChangeTeamNum ] = useState(false)
    const TeamNumRef = useRef()
    const [ form ] = Form.useForm()
    const { setInterTeamNum, saveResult, editable, setEditable } = useInterGame()

    const RightBlock = styled.div`
        padding: 5px;
        width: ${editable?"75%":"100%"};
        float:left;
    `

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
                                                <StyledButton onClick={()=>setShowChangeTeamNum(true)}>更改複賽隊伍數目</StyledButton>
                                                <StyledButton onClick={()=>{
                                                    saveResult()
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
                                            <InterGameTable />
                                        </LeftBlock>)}
                        <RightBlock>
                            <Kickout />
                        </RightBlock>
                    </BottomDiv>
                    
                </ContentBody>
            </ContentBackground>

            <>
                <Modal 
                visible = { showChangeTeamNum }
                onOk = { () =>{
                        setInterTeamNum(TeamNumRef.current.props.value)
                        setShowChangeTeamNum(false)}}
                onCancel = { ()=>setShowChangeTeamNum(false) } 
                >
                    <Form 
                        {...formItemLayout}
                        style={{textAlign:"center"}}
                        form={form}
                        >
                        <h2 style={{textAlign:"center"}}>更改循環數</h2>
                        <Form.Item
                            name="Number of Team"
                            label="numOfTeam"
                            rules={[ { required: true,}, ]}
                            >
                            <Select
                                placeholder="選擇預賽隊伍數"
                                // onChange={this.onGenderChange}
                                ref={TeamNumRef}
                                allowClear
                            >
                                <Option value="8">8</Option>
                                <Option value="9">9</Option>
                                <Option value="10">10</Option>
                                <Option value="11">11</Option>
                                <Option value="12">12</Option>
                            </Select>
                            </Form.Item>
                    </Form>
                </Modal>
            </>
        </>
    )
}


export default InterGameDiv