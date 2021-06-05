import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "../components/nav";
import { Layout } from "antd";
import { usePages } from "../hooks/usePages";
import { pagesMenu } from "../hooks/pagesMenu";
import { UserEditor } from "../pages/editor";
const { Header, Footer } = Layout;

const TempBack = styled.div`
  height: 100%;
  background-image: url("./img/tempback_img.jpg");
  opacity: 10%;
  display: flex;
`;

function Temp() {
  const { zhPageList } = usePages();
  const { News } = pagesMenu();

  return (
    <Router>
      <Layout className="layout">
        <Header>
          {/* <div className="logo" /> */}
          <NavBar />
        </Header>
        <Switch>
          <Route exact path="/" component={News} />
          {zhPageList.map((page, index) => (
            <Route key={index} path={"/" + page[0]} component={page[1]} />
          ))}
          <Route exact path="/profile" component={UserEditor} />
        </Switch>
        <Footer style={{ textAlign: "center" }}>
          Online Basketball Web design by{" "}
        </Footer>
      </Layout>
    </Router>
  );
}

export default Temp;
