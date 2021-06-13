import React, { useState } from 'react'
import styled from 'styled-components'
import { Carousel, Image, List, Typography, Divider } from 'antd';


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
    // background-color: #364d79;
`

const StyledImage = styled(Image)`
    height: 100%;
    width: 100%;
    display: inline-block;

`

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];



export default function News() {

    const [ images, setImages ] = useState(['1.jpeg', '2.jpeg','3.jpeg'])

    return (
        <div className="ant-layout-content" style={{ height: '1000px'}}>
            <LayoutContent className="site-layout-content">
                <Carousel autoplay>
                    {images.map((image, index)=>{ return <ContentStyled key={index}>
                                                            <StyledImage preview={false} src={"/img/news/"+image}></StyledImage>
                                                        </ContentStyled> })}
                </Carousel>
                <Divider orientation="left">News</Divider>
                    <List
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <Typography.Text mark>[ITEM]</Typography.Text> {item}
                        </List.Item>
                    )}
                />
            </LayoutContent>
        </div>
    )
}

