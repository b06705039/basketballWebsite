import React, { useState, useEffect } from "react";
import { User } from "../axios";
import DepartmentInfo from "../department.json";
import { Form, Input, Button, Typography, Select } from "antd";
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
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
    <Text strong>Loading</Text>
  ) : (
    <div style={{ marginLeft: 10, marginTop: 20, width: 600 }}>
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="使用者名稱" name="username" labelAlign="left">
          {onEdit ? (
            <Input
              defaultValue={username}
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
              placeholder="Search to Select"
              optionFilterProp="children"
              onChange={(part) => {
                setDepartment(part);
                console.log(part);
              }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
    </div>
  );
};
