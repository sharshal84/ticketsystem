import { HomeFilled, SyncOutlined,CheckCircleOutlined } from '@ant-design/icons';
import { Space, Table, Tag,Button,Row,Col,Typography,Card } from 'antd';
import React, { useEffect, useState } from 'react';
const { Title,Text} = Typography;
const Home=({checkLinks}) =>{

  const [totalTickets,setTotalTickets]=useState();
  const [complete,setCompleted]=useState();
  const [inprogress,setInprogress]=useState();
  const getTotalTickets=()=>{
    fetch(`${'http://localhost:8080'}/countTickets`)
    .then((response) => {
        return response.json();
    }, (error) => {
        console.log(error);
        // toast.error("Somthing went wrong");
    }).then(data => {
        setTotalTickets(data);    
      // setUserId(data.id);
      // setUserName(data.name); 
    })
  }
const getStatusComplete=()=>{
  fetch(`${'http://localhost:8080'}/countByCompleted`)
    .then((response) => {
        return response.json();
    }, (error) => {
        console.log(error);
        // toast.error("Somthing went wrong");
    }).then(data => {
        setCompleted(data);    
      // setUserId(data.id);
      // setUserName(data.name); 
    })
}

const getStatusInprogress=()=>{
  fetch(`${'http://localhost:8080'}/countByInprogress`)
    .then((response) => {
        return response.json();
    }, (error) => {
        console.log(error);
        // toast.error("Somthing went wrong");
    }).then(data => {
        setInprogress(data);    
      // setUserId(data.id);
      // setUserName(data.name); 
    })
}
useEffect(()=>{
        getTotalTickets();
        getStatusComplete();
        getStatusInprogress();
    })
return(
  <div className="site-card-wrapper" style={{marginTop:'80px'}}>
    <Row gutter={16}>
      <Col span={8}>
        <Card title={<Text type='secondary'>Total Tickets</Text>} bordered={false}>
          {totalTickets}
        </Card>
      </Col>
      <Col span={8}>
        <Card title={<Text type='warning'>Pending <SyncOutlined spin /></Text>} bordered={false}>
          {inprogress}
        </Card>
      </Col>
      <Col span={8}>
        <Card title={<Text type='success'>Completed <CheckCircleOutlined /></Text>} bordered={false}>
          {complete}
        </Card>
      </Col>
    </Row>
  </div>
);
}
export default Home;