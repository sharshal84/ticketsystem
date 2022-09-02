import React, { useEffect, useState } from "react";
import { Card,Avatar,Skeleton,Divider,Radio,Space,notification,Table,List,Menu,Tag,Button,Layout,Row,Col,Checkbox,Typography,Modal,Dropdown,Input,Select,Form,Upload,Steps,message} from 'antd';
import { UserOutlined,DownOutlined, SyncOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { height } from "@mui/system";
const { Title,Text,Paragraph} = Typography;
const { Option } = Select;
const CustomerTicketModal=({listdata,isModal,user_name,
    CancelModal,ticket_id,description,file,setConfirmStatus,statuscreatedBy,setStatusCreated,
    date,products,status,remark,users,datalist,state,checkAssigned,statuspresent,
    form1,onSubmit,formItemLayout,menu,statusmenu,loadMoreData,onDelete,handleButtonClick,statusInprogress,statusComplete})=>
    {
        const [role,setRole]=useState();
        const [ellipsis, setEllipsis] = useState(true);
        const [statusUser,setStatusUser]=useState(true);
        var url='https://joeschmoe.io/api/v1/random';
        
        // if(statuscreatedBy)
        // {
        //     setStatusUser(false);
        // }
        
        const openNotification = () => {
            const key = `open${Date.now()}`;
            const btn = (
              <Space>
                <Button type="link" value="cancle" onClick={(e)=>{notification.close(key);statusInprogress();setStatusCreated()}}>Cancle</Button>
                <Button type="link" value="confirm" size="small" onClick={(e) => {statusComplete();notification.close(key);setStatusCreated()}}>
                    Confirm
                </Button>
              </Space>  
              
            );
            notification.open({
              message: 'Close Ticket',
              description:
                statusUser+' wants to close this ticket',
              btn,
              key,
              onClose: close,
            });
          };
          const close = () => {
            console.log(
              'Notification was closed. Either the close button was clicked or duration time elapsed.',
            );
          };
    return(
        
        // <a href="#">
        //     <Badge count={5}>
        //     <Avatar shape="square" size="large" />
        //     </Badge>
        // </a>

        <Modal width={1300} title={<Title level={3}><Text  italic>TicketInfo of {user_name}</Text></Title>} visible={isModal} footer={null} onCancel={CancelModal}> 
        
        <div className="site-card-wrapper">
            {
                statuscreatedBy!=null?<Button type="link" style={{marginBottom:'5px'}}  onClick={openNotification}>
                Notification
            </Button>:<Button>Hello</Button>
            }
            
            <Row gutter={16}>
            <Col span={8}>
                <Card title={<h4 style={{color:'red',textAlign:'center'}}>Ticket Information</h4>} bordered={true} style={{backgroundColor:'white'}}>
                <Space direction="horizontal" size="large" style={{display: 'flex',}}>
                    <span><Text strong>Ticket No :</Text></span>
                    <span>{ticket_id}</span>
                </Space>
                <Divider style={{marginTop:'2px'}}/>
                <Space direction="horizontal" size="small" style={{display: 'flex',}}>
                    <span><Text strong>Description</Text></span>
                    <span><Text
                        style={
                        ellipsis
                            ? {
                                width: 250,
                            }
                            : undefined
                        }
                        ellipsis={
                        ellipsis
                            ? {
                                tooltip: 'I am ellipsis now!',
                            }
                            : false
                        }
                    >
                    {description}
                </Text></span>
                </Space>
                <Divider style={{marginBottom:'10px'}}/>
                <Space direction="horizontal" size="large" style={{display: 'flex',}}>
                    <span><Text strong>Created_at :</Text></span>
                    <span>{date}</span>
                </Space>
                <Divider style={{marginTop:'10px'}}/>
                <Space direction="horizontal" size="large" style={{display: 'flex',}}>
                    <span><Text strong>Product :</Text></span>
                    <span>{products}</span>
                </Space>
                <Divider style={{marginTop:'10px'}}/>
                <Space direction="horizontal" size="large" style={{display: 'flex',}}>
                    <span><Text strong>Remark :</Text></span>
                    <span>{remark}</span>
                </Space>
                <Divider style={{marginTop:'10px'}}/>
                <Space direction="horizontal" size="large" style={{display: 'flex',}}>
                    <span><Text strong>Status :</Text></span>
                    <span>{status}</span>
                    <span><Text strong>File :</Text></span>
                    <span>{file}</span>
                </Space>
                </Card>
            </Col>
            <Col span={8}>
                <Card title={<h4 style={{color:'red',textAlign:'center'}}>Comment/Assign</h4>} bordered={true} style={{backgroundColor:'white'}}>
                <Form
                            layout='horizontal'
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            size={'large'}
                            form={form1}
                            onFinish={onSubmit}
                            // style={{marginRight:'90px'}}
                            // {...formItemLayout}
                            >                
                                <Form.Item rules={[{ required: true,message: 'Please Enter Comment!',},]} name="comment">
                                    <Input.TextArea rows={3} placeholder="Comment"/>
                                </Form.Item>
                                <Form.Item
                                    name="status"
                                    hasFeedback
                                >
                                    <Select placeholder={status} size="middle">
                                        <Option value="Complete">Complete</Option>
                                        <Option value="NotInScope">NotInScope</Option>
                                        <Option value='In-progress'>In-Progress</Option>
                                        <Option value='reassign'>Re-assign</Option>
                                    </Select>
                                    {/* <Select options={datalist} placeholder="Re-assign"></Select> */}
                                </Form.Item>
                                <Form.Item
                                    name="reassign"
                                    hasFeedback>
                                    <Select disabled={state} onChange={(e)=>checkAssigned(e)}  options={datalist} placeholder="Re-assign"></Select>
                                </Form.Item>
                                <Form.Item>
                                    <Space>
                                        <Button danger type='primary' style={{marginLeft:60}} htmlType='submit' className="login-form-button">
                                        Submit
                                        </Button>
                                    </Space>        
                                </Form.Item>      
                            </Form>
                </Card>
            </Col>
            <Col span={8}>
                {/* <Card title="Card title" bordered={true}> */}
                <div id="scrollableDiv" style={{
                    height: 400,
                    width:'auto',
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                    backgroundColor:'white'
                    }}>
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
                {/* </Card> */}
            </Col>
            </Row>
        </div>

        
        </Modal>
    )
}
export default CustomerTicketModal;



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





// <Row gutter={[8, 24]}>
//                 <Col span={12}>
//                     <Row>
//                         <Col span={10}><div><h3><b>Ticket No:</b></h3></div></Col>
//                         <Col span={14}><h3>{ticket_id}</h3></Col>
//                     </Row>
//                     <Row>
//                         <Col span={10}><div><h3><b>Description:</b></h3></div></Col>
//                         <Col span={14}><h3>{description}</h3></Col>
//                     </Row>
//                     <Row>
//                         <Col span={10}><div><h3><b>Created_at:</b></h3></div></Col>
//                         <Col span={14}><h3>{date}</h3></Col>
//                     </Row>
//                     <Row>
//                         <Col span={10}><div><h3><b>Product:</b></h3></div></Col>
//                         <Col span={14}>{products}</Col>
//                     </Row>
//                     <Row>
//                         <Col span={10}><div><h3><b>Status:</b></h3></div></Col>
//                         <Col span={14}>{status}</Col>
//                     </Row>
//                     <Row>
//                         <Col span={24}>
//                         <Form
//                             layout="inline"
//                             className="login-form"
//                             initialValues={{
//                                 remember: true,
//                             }}
//                             size={'large'}
//                             form={form1}
//                             onFinish={onSubmit}
//                             // style={{marginRight:'90px'}}
//                             {...formItemLayout}
//                             >                
//                                 <Form.Item rules={[{ required: true,message: 'Please Enter Comment!',},]} name="comment" label={<b>Comment</b>}>
//                                     <Input.TextArea rows={3}/>
//                                 </Form.Item>
//                                 <Form.Item
//                                     name="status"
//                                     hasFeedback
//                                 >
//                                     <Select placeholder={status} size="middle">
//                                         <Option value="Complete">Complete</Option>
//                                         <Option value="NotInScope">NotInScope</Option>
//                                         <Option value='In-progress'>In-Progress</Option>
//                                     </Select>
//                                     {/* <Select options={datalist} placeholder="Re-assign"></Select> */}
//                                 </Form.Item>
//                                 <Form.Item
//                                     name="re-assign"
//                                     hasFeedback>
//                                     <Select options={datalist} placeholder="Re-assign"></Select>
//                                 </Form.Item>
//                                 <Form.Item>
//                                     <Space>
//                                         <Button danger type='primary' style={{marginLeft:60}} htmlType='submit' className="login-form-button">
//                                         Submit
//                                         </Button>
//                                     </Space>        
//                                 </Form.Item>      
//                             </Form>
//                         </Col>
//                     </Row>
//                 </Col>
//                 <Col span={12}>
//                 <div id="scrollableDiv" style={{height: 400,width:'Auto',overflow: 'auto',padding: '0 16px',border: '1px solid rgba(140, 140, 140, 0.35)',}}>
//                         <InfiniteScroll dataLength={listdata.length} next={loadMoreData} hasMore={listdata.length < 50} loader={
//                             <Skeleton avatar paragraph={{rows: 1,}}active/>}
//                         endMessage={<Divider plain>It is all, nothing more🤐</Divider>}
//                         scrollableTarget="scrollableDiv"
//                         >
//                         <List
//                             itemLayout="vertical"
//                             dataSource={listdata}
//                             renderItem={(item) => (

//                             <List.Item key={item.id}>

//                                 <List.Item.Meta
//                                 avatar={<Avatar
//                                     style={{
//                                         color: '#f56a00',
//                                         backgroundColor: '#fde3cf',
//                                       }}
//                                     gap={4}  
//                                 >{item.role}</Avatar>}
//                                 title={<a href="#">{item.role}</a>}
//                                 description=
//                                 // {item.message}
//                                 {item.timestamp}
//                                 />
//                                 {item.message}
//                                 {/* <div style={{marginLeft:'5px'}}>
//                                     {/* {item.timestamp} */}
//                                     {/* {item.message} */}
//                                 {/* </div> */}
//                             </List.Item>
//                             )}
//                         />
//                         </InfiniteScroll>
//                     </div>
//                 </Col>
//             </Row>