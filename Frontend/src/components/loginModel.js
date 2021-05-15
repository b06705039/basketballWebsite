import React, { useRef } from 'react'
import { Modal, Button, Form, Input, Checkbox } from 'antd'
import { isLogin, isSignup } from '../axios'

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


export default function LoginModel(props) {

  const usernameRef = useRef();
  const passwordRef = useRef();

  console.log("in login model", props.visible);

  const handleOK = () => {
    props.setVisible(false)
    const msg = isLogin(usernameRef.current.value, passwordRef.current.value)
    console.log("in handle ok", props.visible)
  }

  const handleCancel = () => {
    props.setVisible(false)
  }


  return (
    <div>
      <Modal
        visible={props.visible}
        onOk={handleOK}
        onCancel={handleCancel}
      >
        <Form
          {...formItemLayout}
          style={{ textAlign: "center" }}
        >

          <h2 style={{ textAlign: "center" }}>登入</h2>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input ref={usernameRef} />
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


        </Form>

      </Modal>
    </div>
  )
}