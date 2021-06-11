import React,{ useRef, useState } from 'react'
import { Modal, Form, Input, Button } from 'antd'
import { usePages } from '../hooks/usePages'
import { Login, User } from '../axios'

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
  const usernameRef = useRef()
  const passwordRef = useRef()
  const emailRef = useRef()
  const { setUserInfo } = usePages()

  const [ showWarn, setShowWarn ] = useState(false);
  const [ showForgetPw, setShowForgetPw ] = useState(false);
  const [ form ] = Form.useForm()

  const handleOK = async () => {
    if(!showForgetPw){
      const msg = await Login(usernameRef.current.props.value, passwordRef.current.props.value)
      if( typeof(msg) !== "string"){
        setUserInfo(msg)
        props.setVisible(false)
        setShowWarn(false)
      }else{
        setShowWarn(true)
      }
    }else{
        const msg = await User.SendRemindEmail(emailRef.current.props.value)
        console.log("remind email res: ", msg)
        if( typeof(msg) !== "string"){
          setShowWarn(false)
        }else{
          setShowWarn(true)
        }
    }
      
    form.resetFields();
  }

  const handleCancel = () => {
    props.setVisible(false)
  }

  const handleForgotPw = () => {
    setShowForgetPw(true)
  }


  return(
    <div>
      <Modal 
      visible = { props.visible }
      onOk = { handleOK }
      onCancel = { handleCancel } 
      afterClose = { ()=>{
            setShowWarn(false)
            setShowForgetPw(false)
           }}
      >
        <Form 
          {...formItemLayout}
          style={{textAlign:"center"}}
          form={form}>
          {showForgetPw?(<>
            <h2 style={{textAlign:"center"}}>寄密碼到您的信箱</h2>
            <h4 style={{textAlign:"center",visibility:showWarn?"":"hidden",color:"red"}} >查無此信箱！</h4>
            <Form.Item
              name="email"
              label="Email">
                <Input ref={emailRef} />
            </Form.Item>
          
          </>):(
            <>
              <h2 style={{textAlign:"center"}}>登入</h2>
              <h4 style={{textAlign:"center",visibility:showWarn?"":"hidden",color:"red"}} >登入失敗!</h4>
              <Form.Item
              name="username"
              label="Username">
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
              ]}>
                <Input.Password ref={passwordRef} />
              </Form.Item>
    
              <Form.Item>
                <a style={{'float':'right'}} onClick={handleForgotPw}>
                  Forgot password?
                </a>
              </Form.Item>
            </>
          )}
          
        </Form>
      </Modal>
    </div>
  )
}