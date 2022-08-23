import React, { useState } from "react";
import { Avatar,Skeleton,Divider,Radio,Space,Table,List,Menu,Tag,Button,Layout,Row,Col,Checkbox,Typography,Modal,Dropdown,Input,Select,Form,Upload,Steps,message} from 'antd';
import { UserOutlined,DownOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
const { Title,Text} = Typography;

const TicketModal=({listdata,isModal,user_name,
    CancelModal,ticket_id,description,
    date,products,status,
    form1,onSubmit,formItemLayout,menu,loadMoreData,onDelete,handleButtonClick})=>
    {
        const [role,setRole]=useState();
        var url='https://joeschmoe.io/api/v1/random';
    return(
        <Modal width={1000} title={<Title level={3}><Text  italic>TicketInfo of {user_name}</Text></Title>} visible={isModal} footer={null} onCancel={CancelModal}> 
            <Row gutter={[8, 24]}>
                <Col span={12}>
                    <Row>
                        <Col span={10}><div><h3><b>Ticket No:</b></h3></div></Col>
                        <Col span={14}><h3>{ticket_id}</h3></Col>
                    </Row>
                    <Row>
                        <Col span={10}><div><h3><b>Description:</b></h3></div></Col>
                        <Col span={14}><h3>{description}</h3></Col>
                    </Row>
                    <Row>
                        <Col span={10}><div><h3><b>Created_at:</b></h3></div></Col>
                        <Col span={14}><h3>{date}</h3></Col>
                    </Row>
                    <Row>
                        <Col span={10}><div><h3><b>Product:</b></h3></div></Col>
                        <Col span={14}>{products}</Col>
                    </Row>
                    <Row>
                        <Col span={10}><div><h3><b>Status:</b></h3></div></Col>
                        <Col span={14}>{status}</Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                        <Form
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            size={'large'}
                            form={form1}
                            onFinish={onSubmit}
                            // style={{marginRight:'90px'}}
                            {...formItemLayout}
                            >                
                                <Form.Item rules={[{ required: true,message: 'Please Enter Comment!',},]} name="comment" label={<b>Comment</b>}>
                                    <Input.TextArea rows={3}/>
                                </Form.Item>
                                <Form.Item>
                                    <Space>
                                    <Dropdown overlay={menu}>
                                        <Button>
                                            <Space>
                                            Re-assign
                                                <DownOutlined />
                                            </Space>
                                        </Button>
                                        </Dropdown>
                                        <Button className="login-form-button">
                                            Close
                                        </Button>
                                        <Button danger type='primary' htmlType='submit' className="login-form-button">
                                        Submit
                                        </Button>
                                    </Space>        
                                </Form.Item>      
                            </Form>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                <div id="scrollableDiv" style={{height: 400,width:'Auto',overflow: 'auto',padding: '0 16px',border: '1px solid rgba(140, 140, 140, 0.35)',}}>
                        <InfiniteScroll dataLength={listdata.length} next={loadMoreData} hasMore={listdata.length < 50} loader={
                            <Skeleton avatar paragraph={{rows: 1,}}active/>}
                        endMessage={<Divider plain>It is all, nothing more🤐</Divider>}
                        scrollableTarget="scrollableDiv"
                        >
                        <List
                            itemLayout="vertical"
                            dataSource={listdata}
                            renderItem={(item) => (

                            <List.Item key={item.id}>

                                <List.Item.Meta
                                avatar={<Avatar
                                    style={{
                                        color: '#f56a00',
                                        backgroundColor: '#fde3cf',
                                      }}
                                    gap={4}  
                                >{item.role}</Avatar>}
                                title={<a href="#">{item.role}</a>}
                                description=
                                // {item.message}
                                {item.timestamp}
                                />
                                {item.message}
                                {/* <div style={{marginLeft:'5px'}}>
                                    {/* {item.timestamp} */}
                                    {/* {item.message} */}
                                {/* </div> */}
                            </List.Item>
                            )}
                        />
                        </InfiniteScroll>
                    </div>
                </Col>
            </Row>
        </Modal>
    )
}
export default TicketModal;



// const getCustomerInfo=()=>{
//     fetch(`${'http://localhost:8080'}/getCustomerBy/${cust_name}`)
//     .then((response) => {
//         return response.json();
//     }, (error) => {
//         console.log(error);
//         // toast.error("Somthing went wrong");
//     }).then(data => {    
//       setUserName(data.name); 
//     })
//   }