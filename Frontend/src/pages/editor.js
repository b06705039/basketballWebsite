import React, { useState, useEffect } from "react";
import { User } from "../axios";
import DepartmentInfo from "../department.json";
import { Form, Input, Button, Typography, Select, Spin, Card } from "antd";
import Table from "../components/table";
const { Text } = Typography;
const { Option } = Select;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};

export const UserEditor = () => {
  const [username, setUsername] = useState("");
  const [account, setAccount] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("ME");
  const [onEdit, setEditMode] = useState();

  useEffect(() => {
    (async () => {
      let response = await User.GetAccountByID(1);
      setUsername(response.username);
      setAccount(response.account);
      setEmail(response.email);
      setDepartment(response.department);
      setEditMode(false);
    })();
  }, []);
  return onEdit === undefined ? (
    <Spin size="large" style={{ marginTop: 30 }} />
  ) : (
    <>
      <Card title="個人資訊" style={{ width: 550, margin: 25 }} bordered={true}>
        <Form {...layout} name="basic">
          <Form.Item label="使用者名稱" name="username" labelAlign="left">
            {onEdit ? (
              <Input
                defaultValue={username}
                style={{ width: 300 }}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            ) : (
              <Text strong>{username}</Text>
            )}
          </Form.Item>
          <Form.Item label="使用者帳號" name="account" labelAlign="left">
            {onEdit ? (
              <Input
                defaultValue={account}
                onChange={(e) => {
                  setAccount(e.target.value);
                }}
                style={{ width: 300 }}
              />
            ) : (
              <Text strong>{account}</Text>
            )}
          </Form.Item>
          <Form.Item label="使用者信箱" name="email" labelAlign="left">
            {onEdit ? (
              <Input
                defaultValue={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                style={{ width: 300 }}
              />
            ) : (
              <Text strong>{email}</Text>
            )}
          </Form.Item>
          <Form.Item label="使用者學系" name="department" labelAlign="left">
            {onEdit ? (
              <Select
                defaultValue={department}
                showSearch
                style={{ width: 300 }}
                placeholder="Search to Select"
                optionFilterProp="children"
                onChange={(part) => {
                  setDepartment(part);
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {Object.keys(DepartmentInfo.info).map((part, index) => (
                  <Option key={index} value={part}>
                    {DepartmentInfo.info[part]["zh"]}
                  </Option>
                ))}
              </Select>
            ) : (
              <Text strong>{DepartmentInfo.info[department]["zh"]}</Text>
            )}
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                if (onEdit)
                  (async () =>
                    await User.Update(account, username, email, department))();
                setEditMode((mode) => !mode);
              }}
            >
              {onEdit ? "Submit" : "Edit"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Table type="users" />
      <Table type="teams" />
      <Table type="recorders" />
      <Table type="matches" />
    </>
  );
};
