import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu,Button} from 'antd';
import React, { useState } from 'react';
import { BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom';
import Customer from './admin/Customer/Customer';
import Product from './admin/Product/Product';
import User from './admin/User/User';
import UserTable from './admin/User/UserTable';
import CustomerTable from './CustomerTable';
import Home from './Home';
import Links from './Links';
const { Header, Content, Footer,Sider } = Layout;

const Dashboard=()=>{

    const [current, setCurrent] = useState('1');
    const [logger,setLoggger]=useState(false);
    const onClick = (e) => {
        setCurrent(e.key);
        console.log("hello");
      };
    
    const ChangeLogger=(name)=>{
        setLoggger(name);
    }
    const checkLinks=(value)=>{
        setLoggger(value);
        console.log(value);
    }  
    function getItem(label, key, icon, children) {
        return {
          key,
          icon,
          children,
          label,
        };
      }

      const items = [
        { label: 'item 1', key: 'item-1' }, // remember to pass the key prop
        { label: 'item 2', key: 'item-2' }, // which is required
        {
          label: 'sub menu',
          key: 'submenu',
          children: [{ label: 'item 3', key: 'submenu-item-1' }],
        },
      ];
    return(
        <Router>
        <div className="dashboard">            
            <Layout style={{marginBottom:'20px'}}>
                <Layout>
                    <Content>
                    <Header
                        style={{
                            position: 'relative',
                            zIndex: 1,
                            width: '100%',
                            backgroundColor:'white'
                        }}
                        >
                        <div className="logo" />
                        <Menu mode='horizontal'>
                            <Menu.SubMenu title="Admin">
                                <Menu.Item><Link to= "/dashboard/user" onClick={(e)=>{checkLinks(false)}}>Users</Link></Menu.Item>
                                <Menu.Item><Link to= "/dashboard/customer" onClick={(e)=>{console.log("customer")}}>Customers</Link></Menu.Item>
                                <Menu.Item><Link to= "/dashboard/product" onClick={(e)=>{console.log("product")}}>Products</Link></Menu.Item>
                            </Menu.SubMenu>                            
                            <Menu.Item><Link to= "/dashboard/userTable" onClick={(e)=>{console.log("1")}} >User</Link></Menu.Item>
                            <Menu.Item><Link to= "/dashboard/CustomerTable" onClick={(e)=>{console.log("2")}}>Customer</Link></Menu.Item>                                                      
                        </Menu>
                        </Header>
                        <div style={{marginTop:'15px'}}>
                            <Breadcrumb
                             style={{marginLeft:'50px'}}
                             >
                                <Breadcrumb.Item>
                                <Link to="/dashboard/home"><HomeOutlined/></Link>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                                                
                        <Content className="site-layout" style={{ padding: '0 50px', marginTop:10,position:'relative'}}>                                                                                
                            <div className="site-layout-background" style={{ padding: 24, minHeight:400}}>                                
                                {(() => {
                                    if (logger==false) {
                                    return (
                                        <Links checkLinks={checkLinks}/>
                                    )
                                    } else 
                                    {
                                    return (
                                        <Home/>
                                    )
                                    }
                                })()}
                                    
                                {/* {logger?
                                <Links checkLinks={checkLinks}/> 
                                // <div>
                                //     <Route path='/home'>
                                //         <Home/>
                                //     </Route>
                                //     <Route path='/user'>
                                //         <User/>
                                //     </Route>
                                //     <Route path='/customer'>
                                //         <Customer checkLinks={checkLinks}/>
                                //     </Route>
                                //     <Route path='/product'>
                                //         <Product checkLinks={checkLinks}/>
                                //     </Route>
                                // </div>
                                :<Home checkLinks={checkLinks}/>}                                                                                               */}
                            </div>
                        </Content>
                    </Content>
                </Layout>
            </Layout>                      
        </div>
        </Router>  
    )
}

export default Dashboard;