import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import NavBar from '../components/nav';
import ContentHeader from '../components/header';
import { Menu, Layout } from 'antd';
import { useData } from '../data/context';
import Scheduler from '../components/scheduler'

const { Header, Content, Footer } = Layout;


const TempBack = styled.div`
    height: 100%;
    background-image: url("./img/tempback_img.jpg") ;
    
    opacity: 10%;
    display: flex;

`;


function Temp() {
    // const pageList = PageList();
    const { zhPageList } = useData();

    return (
        <Router>

            <Layout className="layout">
                <Header>
                    {/* <div className="logo" /> */}
                    <NavBar />
                </Header>

                <Switch>
                    <Route exact path="/" component={ContentHeader} />
                    {zhPageList.map((page) => <Route path={"/" + page} component={ContentHeader} />)}
                    <Route path={"/scheduler"} component={Scheduler} />
                </Switch>
                <Footer style={{ textAlign: 'center' }}>Online Basketball Web design by </Footer>
            </Layout>

        </Router>
    );


};

export default Temp;


