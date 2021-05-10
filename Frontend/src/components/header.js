import React from 'react';
import { useData } from '../data/context';
import { Menu, Layout } from 'antd';
import styled from 'styled-components';

const { Header, Content, Footer } = Layout;


const Background = styled.div`
    background-image: url("./img/tempback_img.jpg");
    height: 1000px;
    opacity: 10%;
    display: flex;
    box0
    
`;


function ContentHeader(){
    // const curPage= CurPage();
    const { curPage } = useData()


    console.log("in contentHeader", curPage);
    return (
        // <Content style={{ padding: '0 50px'}}>
        <div className="ant-layout-content" style={{ height: '1000px'}}>
            {/* <Background/> */}
            <div className="site-layout-content" style={{ padding: '0 50px'}}>
                    {curPage}
            </div>
        </div>
    )   
}

export default ContentHeader;