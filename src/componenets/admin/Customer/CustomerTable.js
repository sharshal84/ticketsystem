
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Radio,Space,Table,Tooltip,Menu,Tag,Button,Layout,Row,Col,Checkbox,Typography,Modal,Dropdown,Input,Select,Form,Upload,Steps,message} from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import CustomerTicketModal from '../../../CustomerTicketModal';
import TicketModal from '../../../TicketModal';
// import '../componenets/css/styles.css';
const { Title,Text} = Typography;
const { Header, Content, Footer,Sider } = Layout;

const CustomerTable=({cust_name}) =>
{
let history=useHistory();
const [isModalVisible, setIsModalVisible] = useState(false);
const [isModal,setModal]=useState(false);
const { Option } = Select;
const [form1]= Form.useForm();
const { Step } = Steps;
const [redirect,setRedirect]=useState(false);
const [userdata,setData]=useState([]);
const [user_name,setUserName]=useState();
const [customer_id,setCustomerId]=useState();
const [ticket_id,setTicketid]=useState('1');
const [date,setDate]=useState();
const [remark,setRemark]=useState('Please fix this issue');
const [description,setDescription]=useState('Reader is not working');
const [products,setProducts]=useState(<div><Tag color='gold' key='product'>AVCC</Tag></div>);
const [serialnumber,setSerialnumber]=useState('E2000WSX');
const [status,setStatus]=useState(<div><Tag color='green' key='product'>Open</Tag></div>);
const [file,setFile]=useState();
const options = ['RFID', 'AVCC', 'ATCC'];
const [loading, setLoading] = useState(false);
const [listdata, setListData] = useState([]);
const [currentTimestamp,setTimestamp]=useState(new Date().toLocaleString());
// var tempDate = new Date().toLocaleString;
// var current_date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
  console.log(currentTimestamp);

const {resetField,register, handleSubmit, watch, formState: { errors } } = useForm();

const onSubmit = (data) => 
{
  axios.post('http://localhost:8080/savecomment',JSON.stringify({
    ticket_id:ticket_id,
    customer_id:customer_id,
    // timestamp:currentTimestamp,
    message:data.comment
  }),{
          headers: {'Content-Type': 'application/json'}
          // headers: {'Content-Type': 'multipart/form-data'}    
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
        console.log("Listdata "+listdata);
        const newData=listdata.concat(data);
        setListData(newData);
        // setLoading(false);
        // console.log(newData);      
    })
}
const columns = [
    {
      title: 'Ticket',
      dataIndex: 'id',
      key: 'id',
      width:'100px',
      // render: (text) => <Button type='link'>{text}</Button>,
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
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      ellipsis: true,
      width:'100px',
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
      ellipsis:true,
      render: (_, record) => (
        <Space size="middle">
          {/* <Button type='link' onClick={()=>handleUpdate(record)}>View Ticket</Button> */}
          <Tooltip title="Delete Ticket ?">
          <DeleteOutlined onClick={()=>{
            onDelete(record);
            }}
            style={{color:'red',marginLeft:'10px'}}/>
          </Tooltip>
          
        </Space>
      ),
    },
  ];
  
  const loadMoreData = (id) => {
    // if (loading) {
    //   return;
    // }
    // setLoading(true);
    // fetch(`${'http://localhost:8080'}/getCommentBy/${id}`)
    //   .then((res) => res.json())
    //   .then((body) => {
    //     setListData([...listdata, ...body]);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });
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

const getTickets=(id)=>{
    // fetch(`${'http://localhost:8080'}/getTickets`)
    fetch(`${'http://localhost:8080'}/getCustomerTickets/${id}`)
    .then((response) => {
        return response.json();
    }, (error) => {
        console.log(error);
        // toast.error("Somthing went wrong");
    }).then(data => {  
        console.log(data);     
        setData(data);         
    })
}

const onDelete=(record)=>{
    Modal.confirm({
        title:'Are you sure,you want to delete this User recod?',
        onOk:()=>{
            fetch(`${'http://localhost:8080'}/deleteticket/`+record.id,{
                method:'DELETE'
                }).then((response)=>{
                    // console.log(response);
                    CancelModal();
                    getTickets();
                    // history.push('/user');
                })
        }
    })
}
const showModal = () =>{
    setIsModalVisible(true);
  };

const openModal=()=>{
    setModal(true);
}
const handleUpdate = (oldData) => {
    console.log(oldData);
    setTicketid(oldData.id);
    setDescription(oldData.description);
    setProducts(<Tag color="cyan" key={oldData.customer_product}>{oldData.customer_product}</Tag>);
    setDate(oldData.created_at);
    setRemark(oldData.remark);
    setFile(oldData.file);    
    // // setFormData(oldData)
    // // console.log(oldData.name);
    // // handleClickOpen()
    openModal();
    loadMoreData(oldData.id);
    // showModal();
  }
const CancelModal = () => {
    listdata.length=0;
    setModal(false);
  };
  const onRegister=(data)=>{
    
    // console.log(data);
    const formData=new FormData();
      formData.append("description",data.description);
      formData.append("product",data.product);
      formData.append("remark",data.remark);
      formData.append("status","Open");
      formData.append("serialnumber",data.serialnumber);
      formData.append("file",data.file[0]);
      formData.append("cust_name",cust_name);
      formData.append("location",data.location);
    
      axios.post('http://localhost:8080/saveTicket',formData,{
        //   headers: {'Content-Type': 'application/json'}
          headers: {'Content-Type': 'multipart/form-data'}    
        })
        .then(function (response) {
          console.log(response);
            resetField("remark");
            resetField("serialnumber");
            resetField("description");
            resetField("product");
            resetField("file");
            resetField("location");
            handleCancel();
            getTickets(sessionStorage.getItem('username'));
        })
        .catch(function (error) {
          console.log(error);
    });
    

  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const props = {
    name: 'upload',
    // action: '#',
    headers: {
      authorization: 'authorization-text',
    },
  
    onChange(info) {
        info.file.status='done';

      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
  
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const normFile = (e) => {
    console.log('Upload event:', e);
  
    if (Array.isArray(e)) {
      return e;
    }
  
    return e?.fileList;
  };
  const getCustomerInfo=(id)=>{
        fetch(`${'http://localhost:8080'}/getCustomerBy/${id}`)
        .then((response) => {
            return response.json();
        }, (error) => {
            console.log(error);
            // toast.error("Somthing went wrong");
        }).then(data => {
          setCustomerId(data.id);    
          setUserName(data.name); 
        })
      }
  useEffect(()=>{
    if(sessionStorage.getItem('username'))
        {
            console.log(sessionStorage.getItem('username'));
            getTickets(sessionStorage.getItem('username'));
            getCustomerInfo(sessionStorage.getItem('username'));
        }
        else
        {
          setRedirect(true);
        }
    // getTickets();
    
  },[])

  const logout=()=>{
    Modal.confirm({
      title:'Are you sure,you want to logout this session?',
      onOk:()=>{
        // sessionStorage.removeItem('username');
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
            <Col span={4}><Title level={3} style={{float:'left'}}><Text>CustomerTicket</Text></Title></Col>
            <Col span={20}><Button danger style={{float:'right',marginBottom:'10px'}} onClick={showModal}>Add New</Button></Col>
          </Row>    
          <div className='content1'>
              <Table columns={columns} dataSource={userdata}
              pagination={{ pageSizeOptions: ["5", "10", "15", "15"], pageSize:3,
              // showSizeChanger:true, 
              defaultPageSize: 3 }}/>
          </div>
          <Modal title={<Title level={3}><Text  italic>Add new Ticket</Text></Title>} visible={isModalVisible} footer={null} onCancel={handleCancel}>
              <form onSubmit={handleSubmit(onRegister)}>
              <select {...register("product")}>
                      <option value="">Select...</option>
                      <option value="RFID">RFID</option>
      //              <option value="AVCC">AVCC</option>
      //              <option value="ATCC">ATCC</option>
              </select>
              <textarea style={{marginTop:'10px'}} {...register("description")} placeholder="Enter Description"/>
              {/* <input type="textarea" {...register("description")} /> */}
              <input {...register("serialnumber")} style={{marginTop:'10px'}} placeholder="Enter Sr.no" />
              <input {...register("remark")} style={{marginTop:'10px'}} placeholder="Enter Remark"/>
              <input {...register("location")} style={{marginTop:'10px'}} placeholder="Enter Location"/>
              
              <input style={{border:'1px solid',marginTop:'10px'}}  name="file" type="file" ref={register} {...register("file")} />
              {/* <input {...register("status", { required: true })} type="radio" value="Open" placeholder='Status'/> */}
              
              <input style={{marginTop:'10px'}} type="submit" />
              </form>
              </Modal>
              <CustomerTicketModal listdata={listdata}
                              isModal={isModal}
                              user_name={user_name}
                              ticket_id={ticket_id}
                              CancelModal={CancelModal}
                              description={description}
                              date={date}
                              file={file}
                              remark={remark}
                              products={products}
                              status={status}
                              form1={form1}
                              onSubmit={onSubmit}
                              formItemLayout={formItemLayout}
                              loadMoreData={loadMoreData}
                              onDelete={onDelete}
                              />
                                  </div>
                              </Content>
                          </Content>
                      </Layout>
                  </Layout>                      
              </div>
        );
  }
}

export default CustomerTable;