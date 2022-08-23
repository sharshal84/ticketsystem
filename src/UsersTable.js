
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar,Skeleton,Divider,Tooltip,Radio,Space,Table,List,Menu,Tag,Button,Layout,Row,Col,Checkbox,Typography,Modal,Dropdown,Input,Select,Form,Upload,Steps,message} from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import VirtualList from 'rc-virtual-list';
import InfiniteScroll from 'react-infinite-scroll-component';
import TicketModal from './TicketModal';
import { ToastContainer,toast } from 'react-toastify';
// import '../componenets/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';
const { Title,Text} = Typography;
const { Header, Content, Footer,Sider } = Layout;

const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 50;


const UsersTable=({username}) =>
{
const [loading, setLoading] = useState(false);
const [listdata, setListData] = useState([]);
const [appendData,setAppentData]=useState([]);

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
const [currentTimestamp,setTimestamp]=useState('');
const [remark,setRemark]=useState();
const [description,setDescription]=useState('Reader is not working');
const [products,setProducts]=useState(<div><Tag color='gold' key='product'>AVCC</Tag></div>);
const [status,setStatus]=useState(<div><Tag color='green' key='product'>Open</Tag></div>);
const options = ['RFID', 'AVCC', 'ATCC'];

const [name,setUname]=useState();
const [id,setUid]=useState();

const initialValue={name,id};
let temp=[];

const [datalist,setDatalist]=useState([]);

const columns = [
    {
      title: 'Ticket',
      dataIndex: 'id',
      key: 'id',
      width:'100px',
      // render: (text, record) => (
      //   <Space size="middle">
      //     <Tooltip title="Open Ticket ?">
      //     <Button type='link' onClick={()=>handleUpdate(record)}>{text}</Button>
      //     </Tooltip>
      //     {/* <a onClick={handleUpdate(record)}>{_}</a> */}
      //   </Space>
      // ),


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
        title: 'File',
        dataIndex: 'file',
        key: 'file',
        width:'90px',
        render: (text) => <a href={text}>File</a>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width:'90px',
    //   color='volcano'
    //   color='geekblue'
    //   color='green'
       
      render:(text)=><div><Tag color='green' key='product'>{text}</Tag></div>
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button color='success' type='link' onClick={()=>handleUpdate(record)}>View Ticket</Button>
          
        </Space>
      ),
    },

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
const getusers=()=>{
  fetch(`${'http://localhost:8080'}/findUsers/${username}`)
  .then((response) => {
      return response.json();
  }, (error) => {
      console.log(error);
      // toast.error("Somthing went wrong");
  }).then(data => {          
      // console.log(data);
      setDatalist(data);
      // setData(data);
      // console.log(datalist);

  })
}

const getTickets=()=>{
    fetch(`${'http://localhost:8080'}/getTickets/${username}`)
    .then((response) =>{
        return response.json();
    }, (error) => {
        console.log(error);
        // toast.error("Somthing went wrong");
    }).then(data => {       
        data.map((each)=>{
          if(each.assignby)
          {
            columns.concat([
              {
                title: 'AssignBy',
                dataIndex: 'assign',
                key: 'assign',
                ellipsis: true,
                width:'200px',
              }
            ])
          }
        })
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
    openModal();
    loadMoreData(oldData.id);
  }
const CancelModal = () => {
  // console.log(appendData);
  listdata.length=0;
  // console.log(appendData);  
  setModal(false);
  getTickets();
    // setListData(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getUserInfo=()=>{
    fetch(`${'http://localhost:8080'}/getUserBy/${username}`)
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
    getTickets();
    getUserInfo();
    getusers();
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

  const menu = (
    <Menu
      onClick={handleMenuClick}
      
      items={datalist}
    />
  );
return(
    <div className="dashboard">                    
      <Layout style={{marginBottom:'20px'}}>
        <Layout>
            <Content>
                <Header style={{position: 'relative',zIndex: 1,width: '100%',backgroundColor:'white'}}>
                  <div className="logo" />
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
                        date={date}
                        products={products}
                        status={status}
                        form1={form1}
                        onSubmit={onSubmit}
                        formItemLayout={formItemLayout}
                        menu={menu}
                        loadMoreData={loadMoreData}
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
export default UsersTable;