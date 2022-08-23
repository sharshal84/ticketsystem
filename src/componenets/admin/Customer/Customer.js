import { Space, Table, Tag,Button,Row,Col,Checkbox,Typography,Modal,Card,Input,Select,Form} from 'antd';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { DeleteOutlined, DeleteRowOutlined, EditOutlined } from '@ant-design/icons';
import FormDialog from './customer_dialog';


const initialValue = { name: "", email: "", password: "", company: "", designation:""}
const { Title,Text} = Typography;

const url=`http://localhost:8080`;

const Customer=({checkLinks}) =>
{
const [userdata,setData]=useState([]);
const [name,setName]=useState('');
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [company,setCompany]=useState('');
const [designation,setDesignation]=useState('');
const initialValue = {name,email,password,company,designation}

//-------------------------------------------------------------------------------


const [open, setOpen] = React.useState(false);
const [formData, setFormData] = useState(initialValue)


const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
  setFormData(initialValue)
};

const onChange = (e) => {

  const { value, id} = e.target
  setFormData(prev=>({...prev, ...formData, [id]: value }))
}

const handleFormSubmit = () => {
  console.log(formData);
  if (formData.id) {
    //updating a user 
    const confirm = window.confirm("Are you sure, you want to update this row ?")
    
    confirm && fetch(url + `/editcustomer/${formData.id}`, {
      method: "PUT", body: JSON.stringify(formData), headers: {
        'content-type': "application/json"
      }
    }).then((response) => {
      return response.json();
      }, (error) => {
      console.log(error);
      // toast.error("Somthing went wrong");
      }).then(data => {       
      handleClose();
      getCustomers();
      console.log(data); 
    })
  } else {
    // adding new user
    // console.log(formData.name+" "+formData.role);
    console.log(JSON.stringify(formData));
    axios.post('http://localhost:8080/customersignup',formData,{
          headers: {'Content-Type': 'application/json'}    
        })
        .then(function (response) {
          console.log(response);
          handleClose();
          getCustomers();
        })
        .catch(function (error) {
          console.log(error);
        });   
  }
}
const handleUpdate = (oldData) => {
  // setName(oldData.name);
  setFormData(oldData)
  // console.log(oldData.name);
  handleClickOpen()
}

const onDelete=(record)=>{
  Modal.confirm({
      title:'Are you sure,you want to delete this User recod?',
      onOk:()=>{
          fetch(`${'http://localhost:8080'}/deletecustomer/`+record.id,{
              method:'DELETE'
              }).then((response)=>{
                  console.log(response);
                  getCustomers();
                  // history.push('/user');
              })
      }
  })
}
useEffect(()=>{
    getCustomers();
},[]);

const getCustomers=()=>{

    fetch(`${'http://localhost:8080'}/getCustomers`)
    .then((response) => {
        return response.json();
    }, (error) => {
        console.log(error);
        // toast.error("Somthing went wrong");
    }).then(data => {       
        setData(data);
        console.log(data); 
    })
}  
const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Designation',
      key: 'designation',
      dataIndex: 'designation',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
            <EditOutlined type='link' onClick={()=>{
              handleUpdate(record);
            // onEdit(record);
            }}/>
            <DeleteOutlined onClick={()=>{
            onDelete(record);
            }}
            style={{color:'red',marginLeft:'10px'}}/>
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
return(
    <div>
    <Row>
        {/* <Button onClick={getUsers}>GetUsers</Button> */}
      <Col span={4}><Title level={3} style={{float:'left'}}><Text>Customer</Text></Title></Col>
      <Col span={20}><Button danger style={{float:'right',marginBottom:'10px'}} onClick={handleClickOpen}>Add New</Button></Col>
    </Row>    
    <div className='content1'>
        <Table columns={columns} dataSource={userdata}
        pagination={{ pageSizeOptions: ["5", "10", "15", "15"], pageSize:3,
        // showSizeChanger:true, 
        defaultPageSize: 3 }}
        />
        <FormDialog open={open} handleClose={handleClose}
        data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
    </div>
</div>
);
}

export default Customer;