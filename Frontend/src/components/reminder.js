import React,{useState } from 'react'
import { Modal, Form, Input} from 'antd'


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

export default function RemniderModel(props) {
  

  const handleOK = async () => {
    if(await login(usernameRef.current.value,passwordRef.current.value)){
      console.log("in model, true")
      props.setVisible(false)
      setLoginWarn(false)
      setId('admin')
    } 
    else{
      console.log("in model, false")
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
          form={form}
        >
          <h2 style={{textAlign:"center"}}>登入</h2>
          <h4 style={{textAlign:"center",visibility:LoginWarn?"":"hidden",color:"red"}} >登入失敗!</h4>
          <Form.Item
          name="username"
          label="Username"
        >
          <Input ref={usernameRef} value={null} />
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
            <Input.Password ref={passwordRef} value={null}/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}