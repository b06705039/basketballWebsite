import React,{ useRef, useState } from 'react'
import { Modal, Form, Input } from 'antd'
import { usePages } from '../hooks/usePages'
import { Login } from '../axios'

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
  const { setUserInfo } = usePages()

  const [ LoginWarn, setLoginWarn ] = useState(false);
  const [ form ] = Form.useForm()

  const handleOK = async () => {
      const msg = await Login(usernameRef.current.props.value, passwordRef.current.props.value)
      if( typeof(msg) !== "string"){
        setUserInfo(msg)
        props.setVisible(false)
        setLoginWarn(false)
      }else{
        setLoginWarn(true)
      }
    form.resetFields();
  }

  const handleCancel = () =>{
    props.setVisible(false)
  }

  return(
    <div>
      <Modal 
      visible = { props.visible }
      onOk = { handleOK }
      onCancel = { handleCancel } 
      afterClose = { ()=>setLoginWarn(false) }
      >
        <Form 
          {...formItemLayout}
          style={{textAlign:"center"}}
          form={form}>
          <h2 style={{textAlign:"center"}}>登入</h2>
          <h4 style={{textAlign:"center",visibility:LoginWarn?"":"hidden",color:"red"}} >登入失敗!</h4>
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
        </Form>
      </Modal>
    </div>
  )
}