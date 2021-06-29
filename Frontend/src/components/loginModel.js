import React, { useRef, useState, useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { usePages } from "../hooks/usePages";
import { Login, User } from "../axios";

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
  const emailRef = useRef();
  const { setUserInfo } = usePages();

  const [showWarn, setShowWarn] = useState(false);
  const [showForgetPw, setShowForgetPw] = useState(false);
  const [form] = Form.useForm();

  const handleOK = async () => {
    if (!showForgetPw) {
      try {
        const msg = await Login(
          usernameRef.current.props.value,
          passwordRef.current.props.value
        );
        localStorage.setItem("userInfo", JSON.stringify(msg.token));
        setUserInfo(msg);
        props.setVisible(false);
        setShowWarn(false);
      } catch {
        setShowWarn(true);
      }
    } else {
      try {
        await User.SendRemindEmail(emailRef.current.props.value);
        setShowWarn(false);
      } catch {
        setShowWarn(true);
      }
    }

    form.resetFields();
  };

  const handleForgotPw = () => {
    setShowForgetPw(true);
  };

  useEffect(() => {
    setShowWarn(false);
  }, [showForgetPw]);

  return (
    <div>
      <Modal
        visible={props.visible}
        onOk={handleOK}
        onCancel={
          showForgetPw
            ? () => setShowForgetPw(false)
            : () => props.setVisible(false)
        }
        afterClose={() => {
          setShowWarn(false);
          setShowForgetPw(false);
        }}
        cancelText={showForgetPw ? "返回登入" : "Cancel"}
      >
        <Form {...formItemLayout} style={{ textAlign: "center" }} form={form}>
          {showForgetPw ? (
            <>
              <h2 style={{ textAlign: "center" }}>寄密碼到您的信箱</h2>
              <h4
                style={{
                  textAlign: "center",
                  visibility: showWarn ? "" : "hidden",
                  color: "red",
                }}
              >
                查無此信箱！
              </h4>
              <Form.Item name="email" label="Email">
                <Input ref={emailRef} />
              </Form.Item>
            </>
          ) : (
            <>
              <h2 style={{ textAlign: "center" }}>登入</h2>
              <h4
                style={{
                  textAlign: "center",
                  visibility: showWarn ? "" : "hidden",
                  color: "red",
                }}
              >
                登入失敗!
              </h4>
              <Form.Item name="username" label="Username">
                <Input ref={usernameRef} />
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
              >
                <Input.Password ref={passwordRef} />
              </Form.Item>

              <Form.Item>
                <a
                  style={{ float: "right" }}
                  href="/#"
                  onClick={handleForgotPw}
                >
                  Forgot password?
                </a>
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
}
