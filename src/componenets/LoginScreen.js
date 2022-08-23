import { Button, Image, Space,Layout,Menu} from 'antd';
import React, { useState } from 'react';
import car from './images/image1.png';
import Login from './Login';
const LoginScreen=()=>{
    const [random, setRandom] = useState();

    const { Header, Content, Footer, Sider } = Layout;
    return(
        <div className="main">
            <Layout style={{marginBottom:'20px'}}>
                <Layout>
                    <Content style={{padding: '0 24px',minHeight: 280}}>
                    <Login/>
                    </Content>
                    <Sider width={500}>
                        {/* <Image src={car} style={{width:'100%',height:'500px'}} preview='false'></Image> */}
                    <img src={car} style={{width:'100%',height:'500px',overflow:'hidden'}}/>
                    </Sider>
                </Layout>
            </Layout>
        </div>
    )
}

export default LoginScreen;