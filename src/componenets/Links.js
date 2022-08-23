import { BrowserRouter as Router,Route,Routes,Switch,Link} from 'react-router-dom';

import CustomerTable from './CustomerTable';
import Home from './Home';

import Customer from './admin/Customer/Customer';

import Product from './admin/Product/Product';
import User from './admin/User/User';
import Login from './Login';
import { useEffect } from 'react';
import Users from '../Users'

const Links=({login})=>{
    
    return(
        <div>
            <Route path="/dashboard/CustomerTable" component={CustomerTable}/>
            <Route path='/dashboard/userTable' component={Users}/>
             
            <Route path='/dashboard/customer' component={Customer}/>
            <Route path='/dashboard/product' component={Product}/>
            <Route path='/dashboard/user' component={User}/>
            <Route path='/dashboard/home' component={Home}/>

        </div>
    )
}
export default Links;

// <Form
//             className="login-form"
//             initialValues={{
//                 remember: true,
//             }}
//             size={'large'}
//             onFinish={onRegister}
//             form={form1}
//             {...formItemLayout}
//             >                
//                 <Form.Item label="Select Product" name="product" rules={[{ required: true }]}>
//                     <Select
//                     allowClear
//                     >
//                     <Option value="RFID">RFID</Option>
//                     <Option value="AVCC">AVCC</Option>
//                     <Option value="ATCC">ATCC</Option>
//                     </Select>
//                 </Form.Item>
//                 <Form.Item name="description" label="Discription">
//                     <Input.TextArea value={remark}/>
//                 </Form.Item>
//                 <Form.Item label="Sr No" name="serialnumber">
//                     <Input  type="text" value='Amit'/>
//                 </Form.Item>
//                 <Form.Item label="Remark" name="remark">
//                     <Input  type="text"/>
//                 </Form.Item>
//                 <Form.Item
//                     name="upload"
//                     label="Upload"
//                     valuePropName="fileList"
//                     getValueFromEvent={normFile}
//                     >
//                         {/* <Input style={{border:'1px solid'}} name="upload" type="file"/>     */}
//                     <Upload {...props} name='logo'>
//                         <Button icon={<UploadOutlined />} onChange={(e)=>{e.target.upload}}>Click to upload</Button>
//                     </Upload>
//                 </Form.Item>
//                 <Form.Item name="status" label="Status">
//                     <Radio.Group>
//                         <Radio value="open" Checked>Open</Radio>
//                     </Radio.Group>
//                 </Form.Item>
//                 {/* <Steps current={1} status="error">
//                     <Step title="Open" description="This is a description" size='small' />
//                     <Step title="In Process" description="This is a description" />
//                     <Step title="Waiting" description="This is a description" />
//                 </Steps> */}
//                 <Form.Item>
//                         <Button danger style={{float:'right'}} htmlType="submit" className="login-form-button">
//                         Submit
//                         </Button>        
//                 </Form.Item>      
//             </Form>