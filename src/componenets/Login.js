import React, { useState} from "react";
import { Typography } from 'antd';
import { Button, Checkbox, Form, Input,Card,Select,Modal,Space,Layout} from 'antd';
import { LockOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { BrowserRouter as Router,useHistory} from "react-router-dom";
import axios from "axios";
import car from './images/image1.png';
import Dashboard from "./Dashboard";
const Login = ({checkLogin,checkCustomer}) => {
    const { Title,Text} = Typography;
    const [form] = Form.useForm();
    const [form1]= Form.useForm();
    const { Option } = Select;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [redirect,setRedirect]=useState(false);
    const { Header, Content, Footer, Sider } = Layout;
    let history=useHistory();
    

    const onFinish = (values) => {
        axios.post('http://localhost:8080/login',values,{
          headers: {'Content-Type': 'application/json'}    
        })
        .then((response)=>
        {
            
            // checkLogin(response.data.id);
            // console.log(response.data);
            if(response.data)
            {
                checkLogin(response.data.username);
                let username=response.data.username;
                sessionStorage.setItem('username',username);
                setRedirect(true);
                form.resetFields();
                if(response.data.role=="admin")
                {
                    history.push('/dashboard/home');
                        
                }
                if(response.data.role=="staff")
                {
                    history.push('/userTable');    
                }
                if(response.data.role=="customer")
                {
                    history.push('/customertable');
                }                
            }
            else{
                alert("Enter Valid Data");
            }
        })
        .catch(function (error) {
          console.log(error);
        });        
  };
  const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const onRegister=(values)=>{
    console.log(values);
    form1.resetFields();
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
    return (

        <div className="main">
            <Layout style={{marginBottom:'20px'}}>
                <Layout>
                    <Content style={{padding: '0 24px',minHeight: 280}}>
                        <Card title={<Title level={3}><Text  italic>Login</Text></Title>} style={{marginTop:'30px'}}>
                        <Form
                        form={form}
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        size={'large'}
                        >
                        <Form.Item name="username" rules={[{ required: true,message: 'Please input your Username!',},]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"
                            />
                        </Form.Item>
                        
                        <Form.Item name="password" rules={[{required: true,message: 'Please input your Password!',},]}>
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password"placeholder="Password"/>
                        </Form.Item>
                        {/* <Form.Item name="Role" rules={[{ required: true }]}>
                            <Select
                            placeholder="Select Role"
                            allowClear
                            >
                            <Option value="admin">Admin</Option>
                            <Option value="other">Other</Option>
                            </Select>
                        </Form.Item> */}
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <a className="login-form-forgot" href="">
                            Forgot password
                            </a>
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                <Button danger htmlType="submit" className="login-form-button">
                                Log in
                                </Button>
                                {/* <Button type="link" shape="round" onClick={showModal}>Register</Button>             */}
                            </Space>
                            
                        </Form.Item>     
                        </Form>
                        </Card>        
                    </Content>
                    <Sider width={500}>
                        {/* <Image src={car} style={{width:'100%',height:'500px'}} preview='false'></Image> */}
                    <img src={car} style={{width:'100%',height:'500px',overflow:'hidden'}}/>
                    </Sider>
                </Layout>
            </Layout>
        </div>
      );  
};
export default Login;


