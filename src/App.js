import logo from './logo.svg';
import './App.css';
import Login from './componenets/Login';
import { useEffect, useState} from 'react';
import Dashboard from './componenets/Dashboard';
import { Route, Router,Switch, useHistory,Link} from 'react-router-dom';
import User from './componenets/admin/User/User';
import Customer from './componenets/admin/Customer/Customer';
import { Layout,Menu,Button} from 'antd';
import Home from './componenets/Home';
import CustomerTable from './componenets/admin/Customer/CustomerTable';
import UsersTable from './UsersTable';
// import { BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom';
const { Header, Content, Footer,Sider } = Layout;
function App() {

  const[username,setUsername]=useState();
  const[password,setPassword]=useState('123');
  const[isLogin,setIsLogin]=useState(false);
  let history=useHistory();
  const checkLogin=(value)=>{
    setUsername(value);
    console.log(value);
  }
  return (
    <div className="App">
      <Route path='/' component={Login} exact>
        <Login checkLogin={checkLogin}/>            
      </Route>
      <Route path='/login' component={Login} exact>
        <Login checkLogin={checkLogin}/>            
      </Route>
      <Route path='/dashboard'>
        <Dashboard/>            
      </Route>
      {/* abhishek */}
      <Route path='/user'>
        <User/>
      </Route>
      <Route path='/userTable'>
        <UsersTable username={username}/>
      </Route>
      <Route path='/customerTable'>
        <CustomerTable cust_name={username}/>
      </Route>
      {/* {isLogin?
          <Route path='/dashboard'>
            <Dashboard/>            
          </Route>
          :
          <Login checkLogin={checkLogin}/>
      } */}
      {/* <div className="dashboard">            
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
                                <Menu.Item><Link to= "/user">Users</Link></Menu.Item>
                                <Menu.Item><Link to= "/customer">Customers</Link></Menu.Item>
                                <Menu.Item><Link to= "/product">Products</Link></Menu.Item>
                            </Menu.SubMenu>                            
                            <Menu.Item><Link to= "/users" >User</Link></Menu.Item>
                            <Menu.Item><Link to= "/CustomerTable">Customer</Link></Menu.Item>                                                      
                        </Menu>
                        </Header>                        
                        <Content className="site-layout" style={{ padding: '0 50px', marginTop:40,position:'relative'}}>                                                                                
                            <div className="site-layout-background" style={{ padding: 24, minHeight:400}}>                                
                              <Route path='/dashboard'>
                                  <Dashboard/>
                              </Route>
                              <Route path='/user'>
                                <User/>
                              </Route>
                              <Route path='/customer'>
                                <Customer/>
                              </Route>                                                             
                            </div>
                        </Content>
                    </Content>
                </Layout>
            </Layout>                      
        </div> */}
    </div>
  );  
}

export default App;



{/* <form onSubmit={handleSubmit(onRegister)}>
        <label>Select Product</label>
        <select {...register("product")}>
                <option value="RFID">RFID</option>
//              <option value="AVCC">AVCC</option>
//              <option value="ATCC">ATCC</option>
        </select>
        <textarea {...register("description")} />
        <input type="textarea" {...register("description")} />
        <input {...register("serialnumber")} />
        <input {...register("remark")}/>
        <input style={{border:'1px solid'}} name="file" type="file" ref={register} {...register("file")} />
        <input {...register("status", { required: true })} type="radio" value="Open"/>
        
        <input type="submit" />
        </form> */}