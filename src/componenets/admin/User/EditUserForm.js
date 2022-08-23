import React, { useState } from "react";
import { useForm } from "react-hook-form";
import '../../css/styles.css';

import {Checkbox} from 'antd';

const EditUserForm=(data)=>{

    const id = data.theEmployee.id;

    const [name, setName] = useState(data.theEmployee.name);
    const [email, setEmail] = useState(data.theEmployee.email);
    const [role, setRole] = useState(data.theEmployee.role);
    const [product, setProducts] = useState(data.theEmployee.product);

  const {resetField, register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const onSubmit = (data) =>{
    console.log(data);
    resetField("example");
    
  } 
  
  const options = ['RFID', 'AVCC', 'ATCC'];

//   console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("firstName")} placeholder="First name" />
          <select {...register("category")}>
            <option value="">Select...</option>
            <option value="A">Option A</option>
            <option value="B">Option B</option>
          </select>
          <textarea {...register("aboutYou")} placeholder="About you" />
          <input type="submit" />
    </form>
  );
}

export default EditUserForm;






