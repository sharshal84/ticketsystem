
import { UploadOutlined } from '@ant-design/icons';
import { Radio,Space,Table, Tag,Button,Layout,Row,Col,Checkbox,Typography,Modal,Dropdown,Input,Select,Form,Upload,Steps,message} from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import '../componenets/css/styles.css';
const { Title,Text} = Typography;
const { Header, Content, Footer,Sider } = Layout;

const CustomerTable=() =>
{
const [isModalVisible, setIsModalVisible] = useState(false);
const [isModal,setModal]=useState(false);
const { Option } = Select;
const [form1]= Form.useForm();
const { Step } = Steps;
let newdate=new Date();
let currentdate=newdate.getDate();
const [userdata,setData]=useState([]);
const [ticket_id,setTicketid]=useState('1');
const [date,setDate]=useState();
const [remark,setRemark]=useState('Please fix this issue');
const [description,setDescription]=useState('Reader is not working');
const [products,setProducts]=useState(<div><Tag color='gold' key='product'>AVCC</Tag></div>);
const [serialnumber,setSerialnumber]=useState('E2000WSX');
const [status,setStatus]=useState(<div><Tag color='green' key='product'>Open</Tag></div>);
const [file,setFile]=useState();
const options = ['RFID', 'AVCC', 'ATCC'];


const {resetField,register, handleSubmit, watch, formState: { errors } } = useForm();
const onSubmit = (data) => 
{
    console.log(data);
    console.log(file);
}
const columns = [
    {
      title: 'Ticket',
      dataIndex: 'id',
      key: 'id',
      width:'100px',
      render: (text) => <a>{text}</a>,
    //   render: (text, record) => (
    //     <Space size="middle">
    //       {/* <Button color='success' onClick={openModal}>View Ticket</Button> */}
    //       {/* <a onClick={handleUpdate(record)}>{_}</a> */}
    //     </Space>
    //   ),


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
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Button color='success' onClick={()=>handleUpdate(record)}>View Ticket</Button>
    //       {/* <a onClick={onDelete}>Delete</a> */}
    //     </Space>
    //   ),
    // },
  ];
  

const data = [
    {
      key: '1',
      ticket_id:ticket_id,
      description:description,
      date:date,
      products: products,
      serialnumber:serialnumber,
      remark:remark,
      status:status
    },
    {
        key: '2',
        ticket_id:"2",
        description:"Handle problem",
        date:"8/5/2022",
        products: "RC8500",
        serialnumber:"12EDC34",
        remark:"Please solve this issue",
        status:"Close"
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

const getTickets=()=>{
    fetch(`${'http://localhost:8080'}/getTickets`)
    .then((response) => {
        return response.json();
    }, (error) => {
        console.log(error);
        // toast.error("Somthing went wrong");
    }).then(data => {       
        setData(data);
        data.map((each)=>{
            console.log(each.id);    
        })
         
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
    // // setFormData(oldData)
    // // console.log(oldData.name);
    // // handleClickOpen()
    openModal();
    // showModal();
  }
const CancelModal = () => {
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
            handleCancel();
            getTickets();
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

  useEffect(()=>{
    getTickets();
  },[])

return(
  <div>
  <Row>
      {/* <Button onClick={getUsers}>GetUsers</Button> */}
    <Col span={4}><Title level={3} style={{float:'left'}}><Text>Customer</Text></Title></Col>
    {/* <Col span={20}><Button danger style={{float:'right',marginBottom:'10px'}} onClick={handleClickOpen}>Add New</Button></Col> */}
  </Row>    
  <div className='content1'>
      <Table columns={columns} dataSource={userdata}
      pagination={{ pageSizeOptions: ["5", "10", "15", "15"], pageSize:3,
      // showSizeChanger:true, 
      defaultPageSize: 3 }}
      />
  </div>
</div>
);
}

export default CustomerTable;