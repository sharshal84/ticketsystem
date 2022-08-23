
import { UploadOutlined } from '@ant-design/icons';
import { Radio,Space,Table, Tag,Button,Layout,Row,Col,Checkbox,Typography,Modal,Dropdown,Input,Select,Form,Upload,Steps} from 'antd';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import '../componenets/css/styles.css';
const { Title,Text} = Typography;
const { Header, Content, Footer,Sider } = Layout;


const UserTable=({username}) =>
{
const [isModalVisible, setIsModalVisible] = useState(false);
const [isModal,setModal]=useState(false);
const { Option } = Select;
const [form1]= Form.useForm();
const { Step } = Steps;
let newdate=new Date();
let currentdate=newdate.getDate();
const [ticket_id,setTicketid]=useState('1');
const [date,setDate]=useState(newdate.getDate()+"/"+newdate.getMonth()+"/"+newdate.getFullYear());
const [remark,setRemark]=useState('Please fix this issue');
const [description,setDescription]=useState('Reader is not working');
const [products,setProducts]=useState(<div><Tag color='gold' key='product'>AVCC</Tag></div>);
const [status,setStatus]=useState(<div><Tag color='green' key='product'>Open</Tag></div>);

const options = ['RFID', 'AVCC', 'ATCC'];


const { register, handleSubmit, watch, formState: { errors } } = useForm();
const onSubmit = data => console.log(data);

const columns = [
    {
      title: 'Ticket No',
      dataIndex: 'ticket_id',
      key: 'ticket_id',
      render: (text) => <a>{text}</a>,
    },
    {
      title:'Description',
      dataIndex:'description',
      key:'description',
    },
    {
      title: 'Created_at',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Products',
      key: 'products',
      dataIndex: 'products',
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button color='success' onClick={openModal}>View Ticket</Button>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  

const data = [
    {
      key: '1',
      ticket_id:ticket_id,
      description:description,
      date:date,
      products: products,
      remark:remark,
      status:status
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



const showModal = () =>{
    setIsModalVisible(true);
  };

const openModal=()=>{
    setModal(true);
}

const CancelModal = () => {
    setModal(false);
  };
  const onRegister=(values)=>{
    console.log(values);
    setProducts(<Tag color='blue' key='product'>{values.product}</Tag>);
    // setStatus()
    form1.resetFields();

  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };
return(
    <div className="dashboard">           
            <Layout style={{marginBottom:'20px'}}>
                <Layout>
                    <Content>
                    {/* <Header
                        style={{
                            position: 'relative',
                            zIndex: 1,
                            width: '100%',
                            backgroundColor:'white'
                        }}
                        >
                        <div className="logo" />
                        </Header>             */}
                        <Content className="site-layout" style={{ padding: '0 50px', marginTop:80,position:'relative'}}>                                                                                
                            <div className="site-layout-background" style={{ padding: 24, minHeight:400}}>                                
                            <Row>
      <Col span={4}><Title level={3} style={{float:'left'}}><Text>UserTicket</Text></Title></Col>
      <Col span={20}><Button danger style={{float:'right',marginBottom:'10px'}} onClick={showModal}>Add New</Button></Col>
    </Row>    
    <div className='content1'>
        <Table columns={columns} dataSource={data}/>
    </div>
    <Modal title={<Title level={3}><Text  italic>Register</Text></Title>} visible={isModalVisible} footer={null} onCancel={handleCancel}>
            <Form
            className="login-form"
            initialValues={{
                remember: true,
            }}
            size={'large'}
            onFinish={onRegister}
            form={form1}
            {...formItemLayout}
            >                
                <Form.Item label="Select Product" name="product" rules={[{ required: true }]}>
                    <Select
                    allowClear
                    >
                    <Option value="RFID">RFID</Option>
                    <Option value="AVCC">AVCC</Option>
                    <Option value="ATCC">ATCC</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="comment" label="Comment">
                    <Input.TextArea value={remark}/>
                </Form.Item>
                <Form.Item label="Sr No" name="serialnumber">
                    <Input  type="text" value='Amit'/>
                </Form.Item>
                <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    >
                    <Upload name="logo" action="/upload.do" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item name="status" label="Status">
                    <Radio.Group>
                        <Radio value="open" defaultChecked='true'>Open</Radio>
                    </Radio.Group>
                </Form.Item>
                {/* <Steps current={1} status="error">
                    <Step title="Open" description="This is a description" size='small' />
                    <Step title="In Process" description="This is a description" />
                    <Step title="Waiting" description="This is a description" />
                </Steps> */}
                <Form.Item>
                        <Button danger style={{float:'right'}} htmlType="submit" className="login-form-button">
                        Submit
                        </Button>        
                </Form.Item>      
            </Form>
        </Modal>

        <Modal title={<Title level={3}><Text  italic>Register</Text></Title>} visible={isModal} footer={null} onCancel={CancelModal}> 
        <Row>
        <Col span={5}><div><h3><b>Ticket No:</b></h3></div></Col>
        <Col span={19}><h3>{ticket_id}</h3></Col>
        </Row>
        <Row>
        <Col span={5}><div><h3><b>Description:</b></h3></div></Col>
        <Col span={19}><h3>{description}</h3></Col>
        </Row>
        <Row>
        <Col span={5}><div><h3><b>Created_at:</b></h3></div></Col>
        <Col span={19}><h3>{date}</h3></Col>
        </Row>
        <Row>
        <Col span={4}><div><h3><b>Product:</b></h3></div></Col>
        <Col span={20}>{products}</Col>
        </Row>
        <Row>
        <Col span={4}><div><h3><b>Status:</b></h3></div></Col>
        <Col span={20}>{status}</Col>
        </Row>
        <Form
            className="login-form"
            initialValues={{
                remember: true,
            }}
            size={'large'}
            onFinish={onRegister}
            form={form1}
            {...formItemLayout}
            >                
                <Form.Item name="comment" label="Comment">
                    <Input.TextArea value={remark}/>
                </Form.Item>
                <Form.Item>
                        <Button danger style={{float:'right'}} htmlType="submit" className="login-form-button">
                        Submit
                        </Button>        
                </Form.Item>      
            </Form>
        </Modal>
                            </div>
                        </Content>
                    </Content>
                </Layout>
            </Layout>                      
        </div>
);
}

export default UserTable;