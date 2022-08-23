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
 const {id,name}=data
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{id?"Update Product":"Create new Product"}</DialogTitle>
        <DialogContent>
        <form>
             <TextField id="name" 
                value={name}
                onChange={e=>onChange(e)} 
                placeholder="Enter name" label="Name" variant="outlined" margin="dense" fullWidth />
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
