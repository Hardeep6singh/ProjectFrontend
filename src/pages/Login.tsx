import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext, { AuthContextType } from '../context/AuthContext';
import axios from 'axios';


const Login = () => {
  const auth = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

      const data = {
        email: email,
        password: password,
      };

    // Make a POST request to the server
   
      try {
        const response = await axios.post(
          'https://reactbackend-iaxc.onrender.com/api/auth/login', 
          data,
          config
        );
        localStorage.setItem('token', response.headers.authorization);
        auth.login();
        navigate('/Savednews')
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
    <div className="containerlogin">
        <label htmlFor="email"><b>Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label>
        <input
            type="email"
            id="email" 
            value={email}
            placeholder="Enter Email"
            name="email"
            onChange={(e) => onChange(e)}
            required />
        <br />
        <label htmlFor="password"><b>Password</b>&nbsp;&nbsp;</label>
        <input 
            type="password"
            id="password"
            placeholder="Enter Password" 
            value={password} 
            name="password"
            onChange={(e) => onChange(e)}
            required />
        <br />
        <button className='button' type="submit">Login</button>
    </div>
    </form>
</>
    );
};
   
  export default Login;