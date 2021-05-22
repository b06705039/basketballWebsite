import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Menu, Avatar, Image, Modal, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
// import styled from 'styled-components';
import { useData } from '../data/context';
import LoginModel from './loginModel';
import SignupModel from './signupModel';



function NavBar() {
    const [User, setUser] = useState()
    const [loginVisible, setLoginVisible] = useState(false)
    const [signupVisible, setSignupVisible] = useState(false)


    // const pageList = PageList()
    // const updateCurPage = UpdateCurPage()

    const { zhPageList, setCurPage } = useData()



    const showLogin = () => {
        console.log("in showLogin")
        setLoginVisible(true)
    }

    const showSignup = () => {
        console.log("in showSignup")
        setSignupVisible(true)
    }

    return (
        <>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                onClick={(e) => { setCurPage(e.key) }}
            >

                {zhPageList.map((page) =>
                    <Menu.Item key={page}>
                        <Link to={"/" + page}>
                            {page}
                        </Link>
                    </Menu.Item>)}
                <Menu.Item key={"scheduler"}>
                    <Link to={"/scheduler"}>
                        {"scheduler"}
                    </Link>
                </Menu.Item>
                <Menu.Item key={"timer"}>
                    <Link to={"/timer"}>
                        {"timer"}
                    </Link>
                </Menu.Item>
                <Menu.Item >
                    <Avatar
                        style={{ backgroundColor: '#87d068', }}
                        icon={<UserOutlined />}
                    />
                </Menu.Item>
                <Menu.Item
                    onClick={showLogin}
                // style={{float:"right"}}
                >
                    登入
                </Menu.Item>
                <Menu.Item
                    onClick={showSignup}
                // style={{float:"right"}}
                >
                    註冊
                </Menu.Item>
            </Menu>


            <LoginModel
                visible={loginVisible}
                setVisible={setLoginVisible}
            />
            <SignupModel
                visible={signupVisible}
                setVisible={setSignupVisible}
            />
        </>
    )
}

export default NavBar;