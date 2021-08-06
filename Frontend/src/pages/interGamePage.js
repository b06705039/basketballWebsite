import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Button, Select, Form, Modal } from "antd";
import DrawLotsTable from "../components/drawLots/drawLotsTable";
import Kickout from "../components/drawLots/kickout";
import { useInterGame } from "../hooks/useInterGame";

const { Option } = Select;

const ContentBackground = styled.div`
  height: 1000px;
  padding: 50px 100px;
`;
const ContentBody = styled.div`
  padding: 50px;
  border: 1px solid black;
  flex-direction: column;
  // justify-content: space-between;
  height: 100%;
`;
const TopDiv = styled.div`
  height: 64px;
`;
const BottomDiv = styled.div`
  width: 100%;
  display: inline-block;
`;
const Title = styled.h1`
  float: left;
`;
const ButtonDiv = styled.div`
  float: right;
  display: flex;
  justify-content: space-between;
  width: 250px;
`;
const StyledButton = styled(Button)`
  height: 33px;
  background-color: #6b9abb;
  border-radius: 10px;
  float: right;
  display: flex;
`;
const LeftBlock = styled.div`
  padding: 5px;
  width: 25%;
  float: left;
`;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    // xs: {
    //   span: ,
    // },
    sm: {
      span: 10,
    },
  },
};

const InterGamePage = () => {
  const [showChangeTeamNum, setShowChangeTeamNum] = useState(false);
  const TeamNumRef = useRef();
  const [form] = Form.useForm();
  const {
    interGameTable,
    setInterGameTable,
    setInterTeamNum,
    saveResult,
    editable,
    setEditable,
    mapDict,
    interTeamNum,
  } = useInterGame();

  const RightBlock = styled.div`
    padding: 5px;
    width: ${editable ? "75%" : "100%"};
    float: left;
  `;

  return (
    <React.Fragment>
      <ContentBackground className="ant-layout-content">
        <ContentBody className="site-layout-content">
          <TopDiv>
            <Title>複賽安排</Title>
            <ButtonDiv
              style={{
                justifyContent: editable ? " space-between" : "flex-end",
              }}
            >
              {editable ? (
                <React.Fragment>
                  <StyledButton onClick={() => setShowChangeTeamNum(true)}>
                    更改複賽隊伍數目
                  </StyledButton>
                  <StyledButton
                    onClick={() => {
                      saveResult();
                    }}
                  >
                    輸出結果
                  </StyledButton>
                </React.Fragment>
              ) : (
                <StyledButton
                  onClick={() => {
                    setEditable(true);
                  }}
                >
                  更動複賽
                </StyledButton>
              )}
            </ButtonDiv>
          </TopDiv>
          <BottomDiv>
            {editable && (
              <LeftBlock>
                <DrawLotsTable
                  gameTable={interGameTable}
                  setGameTable={setInterGameTable}
                />
              </LeftBlock>
            )}
            <RightBlock>
              <Kickout mapDict={mapDict} interTeamNum={interTeamNum} />
            </RightBlock>
          </BottomDiv>
        </ContentBody>
      </ContentBackground>

      <React.Fragment>
        <Modal
          visible={showChangeTeamNum}
          onOk={() => {
            setInterTeamNum(TeamNumRef.current.props.value);
            setShowChangeTeamNum(false);
          }}
          onCancel={() => setShowChangeTeamNum(false)}
        >
          <Form {...formItemLayout} style={{ textAlign: "center" }} form={form}>
            <h2 style={{ textAlign: "center" }}>更改循環數</h2>
            <Form.Item
              name="Number of Team"
              label="numOfTeam"
              rules={[{ required: true }]}
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
      </React.Fragment>
    </React.Fragment>
  );
};

export default InterGamePage;
