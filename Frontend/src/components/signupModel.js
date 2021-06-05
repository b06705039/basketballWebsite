import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Select, Modal } from "antd";
import { doSignup, User } from "../axios";
import Department from "../department.json";

const { Option } = Select;

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
    sm: {
      span: 10,
    },
  },
};

let CheckInfo = {
  account: [],
  username: [],
  email: [],
  teamname: [],
};
(async () => {
  let response = await User.GetRegisterData();
  response.user.map((item) => {
    CheckInfo.account.push(item.account);
    CheckInfo.username.push(item.username);
    CheckInfo.email.push(item.email);
  });
  response.team.map((item) => {
    CheckInfo.teamname.push(item["name"]);
  });
})();

export default function SignupModel(props) {
  const [form] = Form.useForm();
  const [identity, setIdentity] = useState("adim");
  const [issignup, setsignup] = useState(false);
  const [showWarn, setShowWarn] = useState(false);
  const IdentityMode = {
    team: (
      <>
        <Form.Item
          name="teamname"
          label="teamname"
          rules={[
            {
              required: true,
              message: "Please input your teamname!",
            },
            () => ({
              validator(_, value) {
                if (!CheckInfo.teamname.includes(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Team name already use"));
              },
            }),
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="teamdepartment"
          label="teamdepartment"
          rules={[
            {
              required: true,
              message: "Please input your teamdepartment!",
            },
          ]}
          hasFeedback
        >
          <Select placeholder="Select your department">
            {Object.keys(Department.info).map((part, index) => (
              <Option key={index} value={part}>
                {Department.info[part]["zh"]}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </>
    ),
  };

  const handleOK = async () => {
    if (await doSignup(form.getFieldsValue())) {
      setsignup(true);
      setShowWarn(false);
    } else {
      setShowWarn(true);
    }

    form.resetFields();
  };

  const handleCancel = () => {
    props.setVisible(false);
  };

  return (
    <Modal
      visible={props.visible}
      onOk={() => {
        if (issignup) {
          props.setVisible(false);
          setsignup(false);
        } else form.submit();
      }}
      onCancel={handleCancel}
      afterClose={() => setShowWarn(false)}
    >
      {issignup && <h2 style={{ textAlign: "center" }}>註冊成功</h2>}
      {!issignup && (
        <Form
          {...formItemLayout}
          name="register"
          form={form}
          onFinish={handleOK}
        >
          <h2 style={{ textAlign: "center" }}>註冊</h2>
          <h4
            style={{
              textAlign: "center",
              visibility: showWarn ? "" : "hidden",
              color: "red",
            }}
          >
            註冊失敗!
          </h4>
          <Form.Item
            name="department"
            label="Department"
            hasFeedback
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select your department">
              {Object.keys(Department.info).map((part, index) => (
                <Option key={index} value={part}>
                  {Department.info[part]["zh"]}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="username"
            label="Username"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
              () => ({
                validator(_, value) {
                  if (!CheckInfo.username.includes(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Username already use"));
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="account"
            label="account"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your account!",
              },
              () => ({
                validator(_, value) {
                  if (!CheckInfo.account.includes(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Account already use"));
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="identity"
            label="Identity"
            hasFeedback
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select your identity"
              onChange={(adim) => {
                setIdentity(adim);
              }}
            >
              <Option key={1} value="administer">
                主辦人員
              </Option>
              <Option key={2} value="team">
                系隊代表
              </Option>
              <Option key={3} value="recorder">
                紀錄人員
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "Email's format is incorrect.",
              },
              {
                required: true,
              },
              () => ({
                validator(_, value) {
                  if (!CheckInfo.email.includes(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Email already use"));
                },
              }),
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          {IdentityMode[identity]}
        </Form>
      )}
    </Modal>
  );
}
