import React, {useState} from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router, Route, Link,Switch} from 'react-router-dom';
import NavBar from '../components/nav';
import ContentHeader from '../components/header';
import { Menu, Layout } from 'antd';
import {PageList} from '../data/context';
const { Header, Content, Footer } = Layout;


// const zhPage = {
//     'news':'最新消息',
//     'schedule':'賽程時間表',
//     'gameResult':'比賽結果',
//     'adminInfo':'主辦介紹',
//     'contact':'聯絡資訊',
//     'main':'首頁',
//     'teamInfo':'球隊資訊',
//     'preGame':'安排預賽賽程',
//     'interGame':'安排複賽循環',
//     'annouce':'發布消息',
//     'inChargeGame':'負責賽事',
//     'register':'報名',
//     'scheduleTime':'填寫賽程時間'

// };

// const identityPage = {
//     'public':['news','schedule','gameResult','adminInfo','contact'],
//     'admin':['main','teamInfo','schedule','preGame','interGame','annouce'],
//     'scoring':['main','inChargeGame'],
//     'team':['main','register','scheduleTime']
// };


// const identity = "admin";
// const userInfo = {};
// const currentPage = "news";

// const pageList = identityPage[identity];

// const zhPageList = pageList.map((item)=>zhPage[item]);
// const zhCurrentPage = zhPage[currentPage];




// const TempNav = styled.div`
//     height: 50px;
//     background-color: #24435c;
// `;

const TempBack = styled.div`
    height: 100%;
    background-image: url("./img/tempback_img.jpg") ;
    
    opacity: 10%;
    display: flex;

`;

// const menu = () => (
//     <Menu>
//     </Menu>
// );

// const TempNav = styled(menu)`
//     height: 50px;
//     background-color: #24435c;   
// `;





function Temp(){
    const pageList = PageList();

    return(
        <Router>
            
            <Layout className="layout">
                <Header>
                    {/* <div className="logo" /> */}
                    <NavBar/>
                </Header>
                
                <Switch>
                    {pageList.map((page)=>
                        <Route path={"/"+page} component={ContentHeader} />)}
                </Switch>
                <Footer style={{ textAlign: 'center' }}>Online Basketball Web design by </Footer>
            </Layout>

        </Router>
    );


};

export default Temp;


