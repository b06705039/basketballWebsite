import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./nav";
import { Layout } from "antd";
import { usePages } from "../hooks/usePages";
import { pagesMenu } from "../hooks/pagesMenu";
import Checkteam from "../pages/Checkteam"
const { Header, Footer } = Layout;

const TempBack = styled.div`
  height: 100%;
  background-image: url("./img/tempback_img.jpg");
  opacity: 10%;
  display: flex;
`;

function Temp() {
  const { zhPageList} = usePages();
  console.log(usePages())
  const { user_id, adim} = usePages().userInfo
  const { News, RecordTeam, UserEditor } = pagesMenu();
  return (
    <Router>
      <Layout className="layout">
        <Header>
          {/* <div className="logo" /> */}
          <NavBar />
        </Header>
        <Switch>
          <Route exact path="/">
            <Redirect to={"/" + zhPageList[0][0]} />
          </Route>
          <Route path="/確認隊伍資訊" render={(props) => (<Checkteam user_id = {user_id} adim = {adim} />)} />
          {zhPageList.map((page, index) => (
            <Route key={index} path={"/" + page[0]} component={page[1]} />
          ))}
          <Route exact path="/profile" component={UserEditor} />
          <Route exact path="/recordTeam" component={RecordTeam} />
        </Switch>
        <Footer style={{ textAlign: "center" }}>
          Online Basketball Web design by{" "}
        </Footer>
      </Layout>
    </Router>
  );
}

export default Temp;
