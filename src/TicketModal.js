import React, { useEffect, useState } from "react";
import { Card,Avatar,Skeleton,Divider,Radio,Space,Table,List,Menu,Tag,Button,Layout,Row,Col,Checkbox,Typography,Modal,Dropdown,Input,Select,Form,Upload,Steps,message} from 'antd';
import { UserOutlined,DownOutlined, SyncOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { height } from "@mui/system";
const { Title,Text,Paragraph} = Typography;
const { Option } = Select;
const TicketModal=({listdata,isModal,user_name,
    CancelModal,ticket_id,description,file,
    date,products,status,remark,users,datalist,state,checkAssigned,
    form1,onSubmit,formItemLayout,menu,statusmenu,loadMoreData,onDelete,handleButtonClick,statusInprogress,statusComplete})=>
    {
        const [role,setRole]=useState();
        const [ellipsis, setEllipsis] = useState(true);
        var url='https://joeschmoe.io/api/v1/random';
    return(
        <Modal width={1300} title={<Title level={3}><Text  italic>TicketInfo of {user_name}</Text></Title>} visible={isModal} footer={null} onCancel={CancelModal}> 
        {/* <div
            id="scrollableDiv"
            style={{
                height: 460,
                overflow: 'auto',
                // padding: '0 1px',
                // border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
        >
      <InfiniteScroll
        dataLength={200}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List>
            
        </List>
      </InfiniteScroll>
    </div> */}
<div className="site-card-wrapper">
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
                <Card title="Card title" bordered={state} style={{backgroundColor:'white'}}>
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
                                        <Option value='reassign'>Test</Option>
                                        
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