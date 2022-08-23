import { Space, Table, Tag,Button,Row,Col,Checkbox,Typography,Modal,Card,Input,Select,Form} from 'antd';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { DeleteOutlined, DeleteRowOutlined, EditOutlined } from '@ant-design/icons';
import { faL } from '@fortawesome/free-solid-svg-icons';
import EditUserForm from './EditUserForm';
import FormDialog from './dialog';



const initialValue = { name: "", email: "", role: "", enrollProduct: "",password:""}
const { Title,Text} = Typography;

const url=`http://localhost:8080`;

const User=({checkLinks}) =>
{
const [isModalVisible, setIsModalVisible] = useState(false);
const { Option } = Select;
const [form]=Form.useForm();
const [form1]= Form.useForm();
const [userdata,setData]=useState([]);
const [name,setName]=useState('');
const [email,setEmail]=useState('');
const [role,setRole]=useState('');
const [enrollProduct,setProduct]=useState([]);
const [ping,setPing]=useState(0);
const [isEditing,setIsEditing]=useState(false);
const [editingUser,setEditingUser]=useState(null);
const [option,setOption]=useState('');
const [password,setPassword]=useState('');
// const [isChecked,setIsChecked]=useState();
const initialValue = {name,email,enrollProduct,role,password}

//-------------------------------------------------------------------------------


const [open, setOpen] = React.useState(false);
const [Data, setFormData] = useState(initialValue)


const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
  setFormData(initialValue)
};

const onProducts=(list)=>{
  // setPro(list);
  setOption('true');
  // setProducts(list);
  console.log(option);
}

const onChange = (e) => {

  const { value, id} = e.target
  if(id==="role")
  {
    // console.log("*********");
  }
  // console.log("Values   "+value);
  // prev => ({ ...prev, [e.target.name]: e.target.value })
  setFormData(prev=>({...prev, ...Data, [id]: value }))
}

const handleFormSubmit = () => {
  console.log(Data);
  const formData=new FormData();
  formData.append("name",Data.name);
  formData.append("email",Data.email);
  formData.append("password",Data.password);
  formData.append("role",Data.role);
  formData.append("product",Data.product);
  if (Data.id) {
    //updating a user 
    const confirm = window.confirm("Are you sure, you want to update this row ?")
    
    confirm && fetch(url + `/edituser/${Data.id}`, {
      method: "PUT", body: JSON.stringify(Data), headers: {
        'content-type': "application/json"
      }
    }).then((response) => {
      return response.json();
      }, (error) => {
      console.log(error);
      // toast.error("Somthing went wrong");
      }).then(data => {       
      handleClose();
      getUsers();
      console.log(data); 
    })
  } else {
    // adding new user
    // console.log(formData.name+" "+formData.role);
    console.log(JSON.stringify(formData));
    axios.post('http://localhost:8080/usersignup',formData,{
          headers: {'Content-Type': 'application/json'}    
        })
        .then(function (response) {
          // console.log(response);
          handleClose();
          getUsers();
        })
        .catch(function (error) {
          console.log(error);
        });   
  }
}

const changeName=()=>{
  setName('');
}


const handleUpdate = (oldData) => {
  // setName(oldData.name);
  setFormData(oldData)
  // console.log(oldData.name);
  handleClickOpen()
}

//-----------------------------------------------------------------------------------
const options = ['RFID', 'AVCC', 'ATCC'];

useEffect(()=>{
    getUsers();
},[ping]);

const onDelete=(record)=>{
    Modal.confirm({
        title:'Are you sure,you want to delete this User recod?',
        onOk:()=>{
            fetch(`${'http://localhost:8080'}/delete/`+record.id,{
                method:'DELETE'
                }).then((response)=>{
                    // console.log(response);
                    getUsers();
                    // history.push('/user');
                })
        }
    })
}
const getUsers=()=>{

    fetch(`${'http://localhost:8080'}/getUsers`)
    .then((response) => {
        return response.json();
    }, (error) => {
        console.log(error);
        // toast.error("Somthing went wrong");
    }).then(data => {       
        setData(data);
        // console.log(data); 
    })
}  

  const resetEditing=()=>{
    setIsEditing(false);
    setEditingUser(null);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Products',
      key: 'enrollProduct',
      dataIndex: 'enrollProduct',
      render: (_, { enrollProduct }) => (
        <>
          {enrollProduct.map((tag) => {
            // console.log(tag);
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag.id}>
                {tag.product.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
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
      <Col span={4}><Title level={3} style={{float:'left'}}><Text>User</Text></Title></Col>
      <Col span={20}><Button danger style={{float:'right',marginBottom:'10px'}} onClick={handleClickOpen}>Add New</Button></Col>
    </Row>    
    <div className='content1'>
        <Table columns={columns} dataSource={userdata}
        pagination={{ pageSizeOptions: ["5", "10", "15", "15"], pageSize:3,
        // showSizeChanger:true, 
        defaultPageSize: 3 }}
        />
        <FormDialog open={open} handleClose={handleClose}
        data={Data} onChange={onChange} handleFormSubmit={handleFormSubmit} changeName={changeName} />
    </div>
</div>
);
}

export default User;