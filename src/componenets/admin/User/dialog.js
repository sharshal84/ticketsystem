import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField,FormControl,InputLabel,MenuItem, FormControlLabel, FormGroup} from '@mui/material';
import { Checkbox,Col,Row,Select} from 'antd';

export default function FormDialog({open,handleClose,data,onChange,handleFormSubmit,onProducts}) {
 const {id,name,email,enrollProduct,role,password}=data
 const optionsss = ['RFID', 'AVCC', 'ATCC'];
 
 const options = [
  // {
  //   label: 'RFID',
  //   value: 'RFID',
  // },
  // {
  //   label: 'AVCC',
  //   value: 'AVCC',
  // },
  // {
  //   label: 'ATCC',
  //   value: 'ATCC',
  // },
];
// console.log(enrollProduct);

 let temp=[];
 const [products,setProducts]=useState([]);
 const [productvalue,setProductvalue]=useState([]);
 const { Option } = Select;


 enrollProduct.map((each)=>{
        products.push(each.product);
        // console.log(JSON.stringify(products));
        // setProducts(each.product);
  //       temp.push(each.product);
      })
 useEffect(()=>{
    getProducts();
    // setFirstName(userData);
    // enrollProduct.map((each)=>{
    //   productvalue.push(each.product);
    //   temp.push(each.product);
    // })
 },[data])

 const getProducts=()=>{

  fetch(`${'http://localhost:8080'}/getProductsByname`)
  .then((response) => {
      return response.json();
  }, (error) => {
      console.log(error);
  }).then(data => {
      data.map((each)=>{
        options.push(each);
      })
      console.log(JSON.stringify(options));      
  })
}  
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{id?"Update user":"Create new user"}</DialogTitle>
        <DialogContent>
        <form>
          {/* <TextField>Enter name</TextField> */}
             <TextField id="name" 
             value={name}
              onChange={e=>onChange(e)} 
              placeholder="Enter name" label="Name" variant="outlined" margin="dense" fullWidth />
             <TextField id="email" value={email} onChange={e=>onChange(e)} placeholder="Enter email" label="Email" variant="outlined" margin="dense" fullWidth />
             
             <select style={{width:'80%',padding:'12px',marginTop:'8px',marginRight:'500px'}} placeholder="Select Role" id="role" value={role} onChange={(e)=>onChange(e)}>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="customer">Customer</option>
             </select>
             <TextField id="password" value={password} onChange={e=>onChange(e)} placeholder="Enter password" label="Password" variant="outlined" margin="dense" fullWidth />
             
             <Row style={{marginTop:'12px'}}>
              {/* <Col span={4} style={{padding:'8px'}}><label><h3>Products</h3></label></Col> */}
              
              <Col span={20} style={{padding:'0px'}}>
              <Checkbox.Group  options={options} defaultValue={products}  style={{marginTop:'10px'}}
              onChange={date => onChange({ target: { value: date, id: 'product' } })}
              // onChange={(e)=>onChange(e)}
              />
              </Col>
             </Row>
             {<div>{productvalue}</div>}                                     
         </form>
        
        
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handleClose();products.length=0}} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button  color="primary" onClick={()=>handleFormSubmit()} variant="contained">
            {id?"Update":"Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

{/* <form onSubmit={handleSubmit((data) => 
          {
            console.log(data);
            changeName();
          }
          )}>
          <input name="firstname" defaultValue={name} {...register("firstname")} placeholder="First name" />
          <select {...register("category")}>
            <option value="">Select...</option>
            <option value="A">Option A</option>
            <option value="B">Option B</option>
          </select>
          <textarea {...register("aboutYou")} placeholder="About you" />
          {/* <p>{data}</p> */}
          // <input type="submit" />
        // </form> */}