import React, { useState, useRef } from 'react'
import { Form, Card, Input, Select, Typography, Button } from 'antd'
import styled from 'styled-components'
import { Post } from '../axios'

const { Text } = Typography;
const { Option } = Select;

const ContentBackground = styled.div`
    height: 1000px;
    padding: 50px 100px;
`
const TopDiv = styled.div`
    height: 64px;
    margin: 0 0 20px 0;
`

const ContentBody = styled.div`
    padding: 50px;
    border: 1px solid black;
    flex-direction: column;
    // justify-content: space-between;
    height:100%;
`

const StyledForm = styled(Form)`
    margin: 50px;
`

const Title = styled.h1`
    float: left;
`
const ButtonDiv = styled.div`
    float: right;
    display: flex;
    justify-content: flex-end;
    width: 225px;
`
const StyledButton = styled(Button)`
    height: 33px;
    background-color: #6b9abb;
    border-radius: 10px;
    float: right;
    display: flex;
`



const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
};



const PostNews = () => {


    const [ createType, setCreateType ] = useState('news')
    const title_cateRef = useRef()
    const title_contentRef = useRef()
    const urlRef = useRef()
    const [ form ] = Form.useForm()


    const postNews = async() => {
        try{
            if(createType==='news'){
                await Post.Create(createType, title_cateRef.current.props.value , 
                title_contentRef.current.props.value ,urlRef.current.props.value)
            } else {
                await Post.Create(createType, "圖片" , "圖片",urlRef.current.props.value)
            }
            form.resetFields()
        } catch(err) {
            throw err
        }
    }

    return(
        <ContentBackground className="ant-layout-content" style={{ height: '1000px'}}>
            <ContentBody className="site-layout-content" style={{ padding: '0 50px'}}>
                <StyledForm {...layout} form={form} name="basic">
                    <TopDiv>
                        <Title>首頁編輯/更新</Title>
                        <ButtonDiv >
                            <StyledButton onClick={()=>postNews()}>發布消息</StyledButton>
                        </ButtonDiv>
                    </TopDiv>
                    <Form.Item label="更新類型" name="type" labelAlign="left">
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Choose a type"
                            optionFilterProp="children"
                            onChange={(e)=>setCreateType(()=>e)}
                        >
                            <Option value="news_image">大圖上傳</Option>
                            <Option value="news">發布消息</Option>
                        </Select>
                    </Form.Item>
                    {createType==='news' && (
                        <>
                            <Form.Item label="消息分類" name="title_category" labelAlign="left">
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    ref={title_cateRef}
                                    placeholder="Select a category"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="報名">報名</Option>
                                    <Option value="賽程">賽程</Option>
                                    <Option value="消息">消息</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="標題" name="title_content" labelAlign="left">
                                    <Input ref={title_contentRef} />
                            </Form.Item>
                        </>
                    )}
                    
                    <Form.Item label="連結" name="url" labelAlign="left">
                            <Input ref={urlRef} />
                    </Form.Item>
                    
                </StyledForm>
            </ContentBody>
        </ContentBackground>
    )
}


export default PostNews