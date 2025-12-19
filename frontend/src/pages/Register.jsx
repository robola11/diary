import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { GoLaw } from "react-icons/go";

const Register = () => {
    const navigate =useNavigate();
    const [values, setValues] =useState({
        username:'',
        email:'',
        password:''
    })

    const handleChanges =(e)=>{
          setValues({...values, [e.target.name]:e.target.value});
    }
  const handleSubmit = async (e)=>{
      e.preventDefault();
      try {
        const response =  await axios.post('http://localhost:3000/auth/register', values);
        console.log(response);
        if(response.status ===201) {
            navigate('/login')
        }
      } catch (error) {
        console.log(error.message)
      }
    
    }
  return (
        <div className="login-clean">
          <form onSubmit={handleSubmit}>
            <div className="illustration"><span><GoLaw className='icon' /></span><h4>Register</h4></div>

            <div className="form-group">
              <input className="form-control" type="text" placeholder="Username" name='username' onChange={handleChanges} required />
              </div>
            <div className="form-group">
              <input className="form-control" type="email" placeholder="Email" name='email' onChange={handleChanges} required />
              </div>
            <div className="form-group"><input className="form-control" type="password" name="password" placeholder="Password" onChange={handleChanges} required /></div>
            <div className="form-group"><button className="btn btn-primary btn-block" type="submit">REGISTER</button>
            </div>
        
             <Link to='/' className="forgot">Go To Home Page</Link>
             
             <Link to='/login' className="forgot">Login</Link>
            </form>
    </div>
  )
}

export default Register