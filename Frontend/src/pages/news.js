import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { Carousel, Image, Button, Divider } from 'antd'
import { Post } from '../axios'
import { usePages } from '../hooks/usePages'
import List from '../components/list'


const LayoutContent = styled.div`
    padding: 0 15%;
`

const ContentStyled = styled.div`
    display: block;
    width: 100%;
    height: 600px;
    color: #fff;
    line-height: 160px;
    text-align: center;
    align-items: center;
    justify-content: center;
    position: relative;
    
`

const StyledImage = styled(Image)`
    height: 100%;
    width: 100%;
    display: inline-block;
    z-index: 0;
`

const StyledButton = styled(Button)`
    height: 33px;
    background-color: #6b9abb;
    border-radius: 10px;
    float: right;
    display: flex;
    
`

const EditButton = styled(Button)`
    height: 33px;
    background-color: #bb6b72;
    border-radius: 10px;
    display: flex;
    z-index:2;
    position: absolute;
    
`



export default function News() {
    const { userInfo, id } = usePages()
    const [ images, setImages ] = useState(['https://scontent-tpe1-1.xx.fbcdn.net/v/t1.6435-9/88248336_2748659698502400_4995492301816987648_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=jcuNQBefKZMAX8P7n8l&_nc_ht=scontent-tpe1-1.xx&oh=af08b5edc39adfd85ae9642cc23b062e&oe=60CF4791', 
                                            'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.6435-9/164677841_3792984020736624_538012617258779879_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=730e14&_nc_ohc=LwwIa8yLc3kAX8vSMHN&tn=mFYE-wBXf4Mdg2TI&_nc_ht=scontent-tpe1-1.xx&oh=8aceed041919b19452c425a2b7cde786&oe=60D03437',
                                            'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.6435-9/149724083_3687399324628428_7947289851242291231_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=730e14&_nc_ohc=olQbIwqnOcQAX-o7W8_&_nc_ht=scontent-tpe1-1.xx&oh=e92acab44311a1427293415d0a90cac8&oe=60CFA43D'])
    
    const [ news, setNews ] = useState()
    const [ edit, setEdit ] = useState(false)
    const [ model, setModel ] = useState(false)

    const handleEdit = (e) => {
        console.log("in handle edit")
    }

    useMemo(async() => {
        const imageResult = await Post.GetTypeContent('news_image')
        setImages(()=>imageResult)
        const newsResult = await Post.GetTypeContent('news')
        setNews(()=>newsResult)
    }, [userInfo])

    console.log(images)
    return (
        <div className="ant-layout-content" style={{ height: '1000px'}}>
            <LayoutContent className="site-layout-content">

            {id==='administer' && <Divider orientation="right">
                                        {edit? 
                                            <StyledButton onClick={()=>setEdit(false)}>取消編輯</StyledButton>:
                                            <StyledButton onClick={()=>setEdit(true)}>編輯</StyledButton>
                                        }
                                    </Divider>}
                <Carousel autoplay>
                    {images.map((image, index)=>{ return <ContentStyled key={index}>
                                                            <StyledImage preview={false} 
                                                                        src={image.content}
                                                                        onClick={e=>handleEdit(e)}>
                                                            </StyledImage>
                                                            {edit && <EditButton onClick={()=>setEdit(true)}>編輯</EditButton>}
                                                        </ContentStyled> })}
                    
                </Carousel>
                <List 
                    titleName={'News'}
                    dataSource={news}
                    catagoryColName={'title_category'}
                    contentColName={'title_content'}
                    urlColName={''}
                    edit={edit}
                />
            </LayoutContent>

            {/* <>
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
            </> */}
        </div>
    )
}

