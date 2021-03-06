import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { usePages } from '../hooks/usePages';
import LoginModel from '../components/loginModel';
import SignupModel from '../components/signupModel';

function NavBar(){
    const [ loginVisible, setLoginVisible ] = useState(false)
    const [ signupVisible, setSignupVisible ] = useState(false)
    const { id, zhPageList, setCurPage, logout } = usePages()

    const showLogin = () => {
        setLoginVisible(true)
    }
    const showSignup = () => {
        setSignupVisible(true)
    }

  return (
    <React.Fragment>
      <Menu
        className="ant-row"
        style={{ flexFlow: "nowrap", height: "64px", rowGap: "0px" }}
        theme="dark"
        mode="horizontal"
        onClick={(e) => {
          setCurPage(e.key);
        }}
      >
          {zhPageList.map((page, index) => (
            <Menu.Item key={index}>
              <Link to={"/" + page[0]}>{page[0]}</Link>
            </Menu.Item>
          ))}
          <div style={{width:"-webkit-fill-available"}}></div>
          
          {id === "public" ? (
            <React.Fragment>
              <Menu.Item key="login" onClick={showLogin}>
                <Link to={"/"+zhPageList[0][0]}>登入</Link>
              </Menu.Item>
              <Menu.Item key="signup" onClick={showSignup}>
                註冊
              </Menu.Item>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Menu.Item>
              <Link to={"/profile"}>
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                />
              </Link>
            </Menu.Item>
            <Menu.Item key="logout" onClick={logout}>
              <Link to={"/"+zhPageList[0][0]}>
                登出
              </Link> 
            </Menu.Item>
            </React.Fragment>
          )}
      </Menu>
      

      <LoginModel visible={loginVisible} setVisible={setLoginVisible} />
      <SignupModel visible={signupVisible} setVisible={setSignupVisible} />
    </React.Fragment>
  );
}

export default NavBar;
