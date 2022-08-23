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
import Password from 'antd/lib/input/Password';

export default function FormDialog({open,handleClose,data,onChange,handleFormSubmit}) {
 const {id,name,email,company,designation,password}=data
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{id?"Update Customer":"Create new Customer"}</DialogTitle>
        <DialogContent>
        <form>
          {/* <TextField>Enter name</TextField> */}
             <TextField id="name" 
                value={name}
                onChange={e=>onChange(e)} 
                placeholder="Enter name" label="Name" variant="outlined" margin="dense" fullWidth />
             <TextField id="email" 
                value={email} 
                onChange={e=>onChange(e)} 
                placeholder="Enter email" label="Email" variant="outlined" margin="dense" fullWidth />
             <TextField 
                id="company" 
                value={company} 
                onChange={e=>onChange(e)} placeholder="Enter company" label="Company" variant="outlined" margin="dense" fullWidth />
             <TextField 
                id="designation" 
                value={designation} 
                onChange={e=>onChange(e)} placeholder="Enter designation" label="Designation" variant="outlined" margin="dense" fullWidth />                                                              
            <TextField id="password" 
                value={password} 
                onChange={e=>onChange(e)} 
                placeholder="Enter Password" label="Password" variant="outlined" margin="dense" fullWidth />
 
         </form>        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
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
