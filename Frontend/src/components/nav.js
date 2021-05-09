import React from 'react';
import styled from 'styled-components';
import {PageList,UpdateCurPage} from '../data/context';
import { Menu } from 'antd';
import 'antd/dist/antd.css';
import {BrowserRouter as Router, Route, Link,Switch} from 'react-router-dom';



function NavBar(){
    const pageList = PageList();
    const updateCurPage = UpdateCurPage();


    
    return(
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} onClick={(e)=>{updateCurPage(e)}}>
                {pageList.map((page)=>
                    <Menu.Item key={page}>
                        <Link to={"/"+page}>
                            {page}
                        </Link>
                    </Menu.Item>)}
            </Menu>
    )
}

export default NavBar;