
import React, { useState, } from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';

const Register = () => {
    const [formData, setformData] = useState({
      firstName:'',
      lastName:'',
      email:'',
      contact:'',
      password:''
    })
    const {firstName, lastName, email, contact, password} = formData

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = {
      firstName : firstName,
      lastName : lastName,
      email : email,
      contact : contact,
      password : password
    }
    console.log('data:  '+ JSON.stringify(data));
    try {
      const response = await axios.post(
        // Make a POST request to the server
        'https://reactbackend-iaxc.onrender.com/api/auth/register',
        data,
        config
      );
     console.log(response.data)
    }
    
      catch(error:any) {
        console.error('Error:', error);
      };
  };
    
    return (
      <>
    <form onSubmit={(e) => onSubmit(e)}>
    <div className="imgcontainer">
        <img src="/images/login.png" alt="Avatar" className="avatar" />
    </div>
    <div className="container">
    <label htmlFor="firstName"><b>FirstName&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label>
        <input
            type="text"
            id="firstName" 
            value={firstName}
            placeholder="Enter First Name"
            name="firstName"
            onChange={(e) => onChange(e)}
            required />
        <br />
        <label htmlFor="lastName"><b>LastName&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label>
        <input
            type="text"
            id="lastName" 
            value={lastName}
            placeholder="Enter Last Name"
            name="lastName"
            onChange={(e) => onChange(e)}
            required />
        <br />
        <label htmlFor="email"><b>Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label>
        <input
            type="email"
            id="email" 
            value={email}
            placeholder="Enter email"
            name="email"
            onChange={(e) => onChange(e)}
            required />
        <br />
        <label htmlFor="contact"><b>Contact&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label>
        <input
            type="tel"
            id="contact" 
            value={contact}
            placeholder="Enter Contact No."
            name="contact"
            pattern="[+]{1}[0-9]{11,14}"
            onChange={(e) => onChange(e)}
            required />
        <br />
        <label htmlFor="password"><b>Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label>
        <input 
            type="password"
            id="password"
            placeholder="Enter Password" 
            value={password} 
            name="password"
            onChange={(e) => onChange(e)}
            required />
        <br />
        <button type="submit">Register</button>
    </div>
</form>
    <div className='container'>
      <div className='py-3'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </div>
    </div>
  </>
    );
  };
  
  export default Register;