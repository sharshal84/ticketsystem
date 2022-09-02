
import { SyncOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar,Skeleton,Divider,Tooltip,Radio,Breadcrumb,Space,Table,List,Menu,Tag,Button,Layout,Row,Col,Checkbox,Typography,Modal,Dropdown,Input,Select,Form,Upload,Steps,message} from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import VirtualList from 'rc-virtual-list';
import InfiniteScroll from 'react-infinite-scroll-component';
import TicketModal from './TicketModal';
import { ToastContainer,toast } from 'react-toastify';
// import '../componenets/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { stepIconClasses } from '@mui/material';
const { Title,Text} = Typography;
const { Header, Content, Footer,Sider } = Layout;

const UsersTable=() =>
{
const [loading, setLoading] = useState(false);
const [listdata, setListData] = useState([]);
const [appendData,setAppentData]=useState([]);
const [username,setUsername]=useState();
const [redirect,setRedirect]=useState(false);
let history=useHistory();
const loadMoreData = (id) => {
  // if (loading) {
  //   return;
  // }
  // setLoading(true);
  fetch(`${'http://localhost:8080'}/getCommentBy/${id}`)
  // fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
    .then((res) => res.json())
    .then((body) => {
      console.log(body);
      setListData([...listdata,...body]);
      setAppentData([...appendData,...body]);
      // setLoading(false);
      // window.dispatchEvent(new Event('resize'));
    })
    .catch(() => {
      // setLoading(false);
    });
};
const [isModalVisible, setIsModalVisible] =useState(false);
const [isModal,setModal]=useState(false);
const { Option } = Select;
const [form1]= Form.useForm();
const [user_id,setUserId]=useState();
const [user_name,setUserName]=useState();
const [userdata,setData]=useState([]);
const [ticket_id,setTicketid]=useState();
const [date,setDate]=useState();
const [state,setState]=useState(true);
const [currentTimestamp,setTimestamp]=useState('');
const [remark,setRemark]=useState();
const [description,setDescription]=useState('Reader is not working');
const [products,setProducts]=useState(<div><Tag color='gold' key='product'>AVCC</Tag></div>);
const [status,setStatus]=useState(<div><Tag color='green' key='product'>Open</Tag></div>);
const [confirmationstatus,setConfirmationStatus]=useState();
const options = ['RFID', 'AVCC', 'ATCC'];
const [attachment,setAttachment]=useState();
const [name,setUname]=useState();
const [id,setUid]=useState();

const [s_name,setSession]=useState();

const initialValue={name,id};
let temp=[];

const [datalist,setDatalist]=useState([]);
const [statuslist,setStatusList]=useState(['Complete','NotInScope']);
const [users,setUsers]=useState([]);
const columns = [
    {
      title: 'Ticket',
      dataIndex: 'id',
      key: 'id',
      width:'100px',
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Open Ticket ?">
          <Button type='link' onClick={()=>handleUpdate(record)}>{text}</Button>
          </Tooltip>
          {/* <a onClick={handleUpdate(record)}>{_}</a> */}
        </Space>
      ),


    },
    {
      title:'Description',
      dataIndex:'description',
      key:'description',
      width:'200px',
      ellipsis: true,
    },
    {
      title: 'Created_at',
      dataIndex: 'created_at',
      key: 'created_at',
      ellipsis: true,
    },
    {
      title: 'Product',
      key: 'customer_product',
      dataIndex: 'customer_product',
      width:'90px',
      render:(text)=><div><Tag color='gold' key='product'>{text}</Tag></div>
    },
    {
        title: 'Serial No',
        key: 'serialnumber',
        dataIndex: 'serialnumber',
        ellipsis: true,
      },
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
      ellipsis: true,
      width:'200px',
    },
    {
      title: 'Raised By',
      dataIndex: 'customer',
      key: 'customer',
      ellipsis: true,
      width:'200px',
    },
    {
        title: 'File',
        dataIndex: 'file',
        key: 'file',
        width:'90px',
        render: (text) => <a href={text}>File</a>,
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
  
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
  
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width:'120px',
    //   color='volcano'
    //   color='geekblue'
    //   color='green'       
      render:(text)=><div>{text==="Inprogress" ?
      <Tag icon={<SyncOutlined spin />} color="processing">
        {text}
      </Tag>:
        <Tag color="green" key='product'>{text}</Tag>        
        }</div>
      
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Button color='success' type='link' onClick={()=>handleUpdate(record)}>View Ticket</Button>
          
    //     </Space>
    //   ),
    // },

  ];
  
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

const onSubmit = (data) => 
{
  console.log(data);
  if(data.comment)
  {
    axios.post('http://localhost:8080/savecomment',JSON.stringify({
    ticket_id:ticket_id,
    user_id:user_id,
    // timestamp:new Date().toLocaleString(),
    message:data.comment
  }),{
          headers: {'Content-Type': 'application/json'}   
        })
        .then(function (response) {
            form1.resetFields();
            loadExtraData(response.data);
            
        })
        .catch(function (error) {
          console.log(error);
    });
  }

  if(data.status)
  {
    console.log("hello");
    if(data.status=="reassign")
    {
      Modal.confirm({
        title:'Are you sure,you want to Assign Ticket to Another User?',
        onOk:()=>{setState(false);}
    })
      
    }
    if(data.status=="Complete")
    Modal.confirm({
      title:'Are you sure,you want to Change status to '+data.status+' ?',
      onOk:()=>{
        axios.get(`${'http://localhost:8080'}/createTicketStatusAudit/${ticket_id}/${user_id}/${data.status}`)
          .then((response) => {
              console.log(response);
          }, (error) => {
              console.log(error);
              // toast.error("Somthing went wrong");
          })
      }
  })
    
  }
  if(data.reassign)
  {
    console.log(data.reassign);
    axios.get(`${'http://localhost:8080'}/assignTicketTo/${data.reassign}/${ticket_id}/${username}`)
    .then(function (response) {
      // handle success
      console.log(response);
      if(response.data=="Assigned")
      {
        toast.success(response.data);
      }
      else
      {
        toast.error(response.data);
      }
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }
  form1.resetFields();
  
}
const checkAssigned=(e)=>{
  console.log(e);
  axios.get(`${'http://localhost:8080'}/checkassignTicketTo/${e}/${ticket_id}`)
    .then(function (response) {
      // handle success
      console.log(response);
      if(response.data=="Assigned")
      {
        toast.success("You can Assigned to another user");
      }
      else
      {
        toast.error(response.data);
      }
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}

const loadExtraData=(id)=>{
  fetch(`${'http://localhost:8080'}/getSingleCommentBy/${id}`)
    .then((response) => {
        return response.json();
    }, (error) => {
        console.log(error);
        // toast.error("Somthing went wrong");
    }).then(data => {    
      console.log(data);
        // console.log(listdata);
        const newData=listdata.concat(data);
        setListData(newData);
        setLoading(false);
        // console.log(newData);      
    })
}
const getusers=(n)=>{
  // console.log("eeww");
  fetch(`${'http://localhost:8080'}/findUsers/${n}`)
  .then((response) => {
      return response.json();
  }, (error) => {
      console.log(error);
      // toast.error("Somthing went wrong");
  }).then(data => {          
      console.log(data);
      setDatalist(data);
      
      // setData(data);
      // console.log(datalist);
      // data.map((each)=>{
      //   setUsers(each);
      // })
      // users.map((each)=>console.log(each));

  })
}

const getTickets=(n)=>{
    sessionStorage.getItem('username');
    fetch(`${'http://localhost:8080'}/getTickets/${n}`)
    .then((response) =>{
        return response.json();
    }, (error) => {
        console.log(error);
        // toast.error("Somthing went wrong");
    }).then(data => {       
        setData(data);      
    })
}
const openModal=()=>{
    setModal(true);
}
const handleUpdate = (oldData) => {
    setTicketid(oldData.id);
    setDescription(oldData.description);
    setProducts(<Tag color="cyan" key={oldData.customer_product}>{oldData.customer_product}</Tag>);
    setDate(oldData.created_at);
    setRemark(oldData.remark);
    setAttachment(<a href={oldData.file}>File</a>);    
    openModal();
    loadMoreData(oldData.id);
  }

const statusCompleted=(value)=>{
  Modal.confirm({
    title:'Are you sure,you want to Change status Complete?',
    onOk:()=>{
      fetch(`${'http://localhost:8080'}/setStatusCompleted/${ticket_id}`)
        .then((response) => {
            return response.json();
        }, (error) => {
            console.log(error);
            // toast.error("Somthing went wrong");
        }).then(data => {    
          // setUserId(data.id);
          // setUserName(data.name); 
        })
    }
  })
}  

const statusInprogress=(value)=>{
  Modal.confirm({
    title:'Are you sure,you want to Change status Inprogress?',
    onOk:()=>{
      fetch(`${'http://localhost:8080'}/setStatusInprogress/${ticket_id}`)
        .then((response) => {
            return response.json();
        }, (error) => {
            console.log(error);
            // toast.error("Somthing went wrong");
        }).then(data => {    
          // setUserId(data.id);
          // setUserName(data.name); 
        })
    }
})
} 
const statusNotInScope=()=>{
  Modal.confirm({
    title:'Are you sure,you want to Change status NotInScope?',
    onOk:()=>{
      fetch(`${'http://localhost:8080'}/setStatusInprogress/${ticket_id}/${'NotInScope'}`)
        .then((response) => {
            return response.json();
        }, (error) => {
            console.log(error);
            // toast.error("Somthing went wrong");
        }).then(data => {    
          // setUserId(data.id);
          // setUserName(data.name); 
        })
    }
})
} 
const CancelModal = () => {
  // console.log(appendData);
  listdata.length=0;
  // console.log(appendData);  
  setModal(false);
  getTickets(sessionStorage.getItem('username'));
  form1.resetFields();
    // setListData(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getUserInfo=(n)=>{
    fetch(`${'http://localhost:8080'}/getUserBy/${n}`)
    .then((response) => {
        return response.json();
    }, (error) => {
        console.log(error);
        // toast.error("Somthing went wrong");
    }).then(data => {    
      setUserId(data.id);
      setUserName(data.name); 
    })
  }

  const getComment=()=>{
    fetch(`${'http://localhost:8080'}/getCommentBy/${username}`)
    .then((response) => {
        return response.json();
    }, (error) => {
        console.log(error);
        // toast.error("Somthing went wrong");
    }).then(data => {    
      console.log(data); 
    })
  }

  useEffect(()=>{
    if(sessionStorage.getItem('username'))
        {
            console.log(sessionStorage.getItem('username'));
            setUsername(sessionStorage.getItem('username'));
            getTickets(sessionStorage.getItem('username'));
            getUserInfo(sessionStorage.getItem('username'));
            getusers(sessionStorage.getItem('username'));
        }
        else
        {
          setRedirect(true);
        }
        
  },[])

  const handleMenuClick = (e) => {
    // message.info('Assign to Ravi');
    console.log(e.key+" "+ticket_id);
    axios.get(`${'http://localhost:8080'}/assignTicketTo/${e.key}/${ticket_id}/${username}`)
      .then(function (response) {
        // handle success
        console.log(response);
        if(response.data=="Assigned")
        {
          toast.success(response.data);
        }
        else
        {
          toast.error(response.data);
        }
        
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

  };

  const handleStatusMenuClick=(e)=>{
    
  }

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={datalist}
    />
  );
  const statusmenu = (
    <Menu
    onClick={handleStatusMenuClick}
    items={[
      {
        label: <a>Complete</a>,
        key: 'Complete',
      },
      {
        label: <a>NotInScope</a>,
        key: 'NotInScope',
      },
      {
        type: 'divider',
      },
      {
        label: <a><Tag icon={<SyncOutlined spin />} color="processing">In-Progress</Tag></a>,
        // label:<Tag icon={<SyncOutlined spin />} color="processing">In-Progress</Tag>,
        key: 'In-Progress',
      },
    ]}
  />
  );
  const logout=()=>{
    Modal.confirm({
      title:'Are you sure,you want to logout this session?',
      onOk:()=>{
          // sessionStorage.setItem('username','');
          sessionStorage.clear();
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
    return(
      <div className="dashboard">                    
        <Layout style={{marginBottom:'20px'}}>
          <Layout>
              <Content>
                  <Header style={{position: 'relative',zIndex: 1,width: '100%',backgroundColor:'white'}}>
                    <div className="logo" />
                    <Menu mode='horizontal'>
                              {/* <Menu.SubMenu title="Admin">
                                  <Menu.Item><Link to= "/dashboard/user" onClick={(e)=>{checkLinks(false)}}>Users</Link></Menu.Item>
                                  <Menu.Item><Link to= "/dashboard/customer" onClick={(e)=>{console.log("customer")}}>Customers</Link></Menu.Item>
                                  <Menu.Item><Link to= "/dashboard/product" onClick={(e)=>{console.log("product")}}>Products</Link></Menu.Item>
                              </Menu.SubMenu>                            
                              <Menu.Item><Link to= "/dashboard/userTable" onClick={(e)=>{console.log("1")}} >Tickets</Link></Menu.Item> */}
                              <Menu.Item style={{marginLeft:1030}}><Link onClick={()=>{logout()}}>Sign out</Link></Menu.Item>
                              {/* <Link to= "/dashboard/CustomerTable" style={{marginLeft:850}} onClick={(e)=>{console.log("2")}}>Sign out</Link>                                                       */}
                          </Menu>
                  </Header>
                          
                  <Content className="site-layout" style={{ padding: '0 10px', marginTop:20,position:'relative'}}>                                                                                
                    <div className="site-layout-background" style={{ padding: 24, minHeight:400}}>                                
                      <Row>
                        <Col span={4}><Title level={3} style={{float:'left'}}><Text>UserTicket</Text></Title></Col>
                      </Row>    
                        <div className='content1'>
                          <Table columns={columns} dataSource={userdata} pagination={{ pageSizeOptions: ["5", "10", "15", "15"], pageSize:3,// showSizeChanger:true, 
                            defaultPageSize: 3 }}/>
                        </div>
                          <TicketModal listdata={listdata}
                          isModal={isModal}
                          user_name={user_name}
                          ticket_id={ticket_id}
                          CancelModal={CancelModal}
                          description={description}
                          remark={remark}
                          date={date}
                          products={products}
                          status={status}
                          form1={form1}
                          datalist={datalist}
                          users={users}
                          onSubmit={onSubmit}
                          formItemLayout={formItemLayout}
                          menu={menu}
                          checkAssigned={checkAssigned}
                          state={state}
                          file={attachment}
                          statusmenu={statusmenu}
                          loadMoreData={loadMoreData}
                          statusInprogress={statusInprogress}
                          statusComplete={statusCompleted}
                          />
                    </div>
                  </Content>
              </Content>
          </Layout>
        </Layout>
        <ToastContainer/>                      
      </div>
    );
  }
}
export default UsersTable;