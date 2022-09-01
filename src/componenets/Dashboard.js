import { HomeOutlined } from '@ant-design/icons';
import { render } from '@testing-library/react';
import { Breadcrumb, Layout, Menu,Button,Modal} from 'antd';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router,Route,Routes,Link, useHistory,Redirect} from 'react-router-dom';
import Customer from './admin/Customer/Customer';
import Product from './admin/Product/Product';
import User from './admin/User/User';
import UserTable from './admin/User/UserTable';
import CustomerTable from './CustomerTable';
import Home from './Home';
import Links from './Links';

const { Header, Content, Footer,Sider } = Layout;
const Dashboard=()=>{

    let history=useHistory();
    const [current, setCurrent] = useState('1');
    const [logger,setLoggger]=useState(false);
    const [redirect,setRedirect]=useState(false);
    const onClick = (e) => {
        setCurrent(e.key);
        console.log("hello");
      };
    const checkLinks=(value)=>{
        setLoggger(value);
        console.log(value);
    }  
    useEffect(()=>{
        if(sessionStorage.getItem('username'))
        {
            console.log(sessionStorage.getItem('username'));
        }
        else
        {
            console.log("******");
            setRedirect(true);
        }
    },[])

    const logout=()=>{
        Modal.confirm({
          title:'Are you sure,you want to logout this session?',
          onOk:()=>{
            //   sessionStorage.setItem('username','');
              sessionStorage.clear();   
            //   sessionStorage.removeItem('username');
              // <Redirect to={'/login'}/>
              history.push('/login');
          }
      })
      }

    if(redirect)
    {
        return(history.push("/login"));
    }
    else
    {
    return (
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
                            <Menu.Item><Link to= "/dashboard/userTable" onClick={(e)=>{console.log("1")}} >Tickets</Link></Menu.Item>
                            <Menu.Item style={{marginLeft:850}}><Link onClick={()=>{logout()}}>Sign out</Link></Menu.Item>
                            {/* <Link to= "/dashboard/CustomerTable" style={{marginLeft:850}} onClick={(e)=>{console.log("2")}}>Sign out</Link>                                                       */}
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
    // {(() => {
    //     if (redirect) {
    //     return (
    //         <Redirect to={'/login'}/>
    //     )
    //     } else 
    //     {
        
    //     }
    // })()}  
    
}

export default Dashboard;