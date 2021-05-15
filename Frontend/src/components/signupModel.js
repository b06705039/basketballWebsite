import React, { useRef } from 'react'
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Modal } from 'antd'
import { isSignup } from '../axios'

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
    // xs: {
    //   span: ,
    // },
    sm: {
      span: 10,
    },
  },
};

export default function SignupModel(props) {

  const departmentRef = useRef()
  const usernameRef = useRef()
  const identityRef = useRef()
  const passwordRef = useRef()


  const handleOK = () => {
    props.setVisible(false)
    const msg = isSignup(departmentRef.current.value, usernameRef.current.value, identityRef.current.value, passwordRef.current.value);
    console.log("in handle ok", props.visible, msg)
  }

  const handleCancel = () => {
    props.setVisible(false)
  }


  return (

    <Modal
      visible={props.visible}
      onOk={handleOK}
      onCancel={handleCancel}
    >
      <Form
        {...formItemLayout}
        name="register"
      >

        <h2 style={{ textAlign: "center" }}>註冊</h2>

        <Form.Item
          name="department"
          label="Department"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select your department"
            ref={departmentRef}
          >
            <Option value="d1">d1</Option>
            <Option value="d2">d2</Option>
            <Option value="d3">d3</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input ref={usernameRef} />
        </Form.Item>

        <Form.Item
          name="identity"
          label="Identity"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select your identity"
            ref={identityRef}
          >
            <Option value="i1">i1</Option>
            <Option value="i2">i2</Option>
            <Option value="i3">i3</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password ref={passwordRef} />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>


      </Form>

    </Modal>
  );
};
