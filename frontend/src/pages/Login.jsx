import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import default CSS for toastify
import { GoLaw } from "react-icons/go";
import './Login.css'

const Login = () => {
 const navigate =useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  
 function loginCheck (){
const userToke =sessionStorage.getItem('authToken');
  if(userToke) {
  navigate('/');
 }
}

  useEffect(() => {
     loginCheck();
  
  }, []);
  // Validation function for email and password
  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API request to login
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        console.log(response);
        
        toast.success("Login successful!");
        // Redirect or save token as needed
        const token = response.data.token;
        console.log(token);
        
        sessionStorage.setItem("authToken", token);
          fetchUserDetails();
          navigate('/diary')
      
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error.response.data.message || "Something went wrong. Please try again later.");
    }
  };



  const fetchUserDetails = async () => {
    try {
      // Retrieve token from localStorage or other secure storage
      const token = sessionStorage.getItem('authToken'); // Replace with actual token retrieval
      console.log(token);
      if(token){
        navigate('/')
      }
      if (!token) {
        // setError('User is not logged in');
        return;
      }
      // Make the API request with the token in the Authorization header
      const response = await axios.get('http://localhost:3000/api/auth/get-userDetails', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response);
      
      if (response.data.success) {
        console.log(response.data.user);
      } else {
        console.log(response.data.message || 'Failed to fetch user details');
      }
    } catch (err) {
      console.error('Error fetching user details:', err);
      console.log(err.response?.data?.message || 'An error occurred');
    }
  };


  return (
    <div className='login-page'>
    <div className="login-clean">
    
          <form onSubmit={handleSubmit}>
               <div className="illustration">
               <a href="" className="formlogo">
                                   <span>
                                     <GoLaw />
                                   </span>
                                   OROBOSS.
                                 </a>
                               
            </div>
                <div className="form-group">
                     <p className="flex center purple-text">Sign In</p> 
                </div>
             
           

            <div className="form-group">
              <input className="form-control" type="email" placeholder="Email"  value={email}
            onChange={(e) => setEmail(e.target.value)} required />
              </div>
            <div className="form-group">
              <input className="form-control" type="password" name="password" placeholder="Password" 
              value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          required />
          {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
            <div className="form-group"><button className="btn btn-primary btn-block" type="submit">Log In</button>
            </div>
        
             <Link to='/' className="forgot">Go To Home Page</Link>
           
            </form>
              <ToastContainer 
                      position="top-center" 
                      autoClose={5000} 
                      hideProgressBar={true} 
                      closeOnClick 
                      // pauseOnHover  
                      theme="colored" />
    </div>
    </div>
  )
}

export default Login