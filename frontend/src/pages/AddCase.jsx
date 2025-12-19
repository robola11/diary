import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from '../components/Header'
import { Link as RouterLink, useNavigate } from "react-router-dom";
import '../pages/login.css';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { FaSearchPlus,FaEdit,FaTrashAlt } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode';


function AddCase() {
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

   function tokenCheck (){
  const userToke =sessionStorage.getItem('authToken');
  if(!userToke) {
  navigate('/');
 }
}

  useEffect(() => {
    fetchUserDetails();
    tokenCheck();
  }, []);
  const fetchUserDetails = async () => {
    try {
      // Retrieve token from localStorage or other secure storage
      const token = sessionStorage.getItem("authToken"); // Replace with actual token retrieval
      console.log(token);

       const decodedToken = jwtDecode(token);
              const currentTime =Date.now() / 1000;
      
               if(decodedToken.exp < currentTime) {
                //logout
                logout();
                   navigate('/')
              }

      if (!token) {
        // setError('User is not logged in');
        navigate('/')
        return;
      }

      // Make the API request with the token in the Authorization header
      const response = await axios.get(
        "http://localhost:3000/api/auth/get-userDetails",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      if (response.data.success) {
        console.log(response.data.user);
        setUserData(response.data.user);
        let userInfo={
            isLoggedIn:true,
            userData:response.data.user
        }
        sessionStorage.setItem('userData',JSON.stringify(userInfo));
      } else {
        console.log(response.data.message || "Failed to fetch user details");
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      console.log(err.response?.data?.message || "An error occurred");
    }
  };



    //add case
    const [values, setValues] = useState({
        suitnumber:"",
        parties:"", 
        newDate:""
    
    })

        const handleSubmit =(e) =>{
        e.preventDefault();
        axios.post("http://localhost:3000/createCase", values)
        .then(res=>{
            console.log(res);
            navigate('/diary')
            
        })
        .catch(Error=>console.log(err))
    }


  
   
    


  return ( 
    <div className="">
   
      <Navbar />
        <div className="wrapper p-block-9 border-bottom">
       <div className="flex between gap-4">
                <div>
                    <span className='sub-text overlay-text' datatype='New File'>Add Case</span>
              
             
                 </div>
              
                         
                          <RouterLink to='/addCase' className='btn-inverse self-end'>Add File +</RouterLink>
            </div>
           
             
           <div className="login-clean">
                    <form className="login-form" onSubmit={handleSubmit}>
          <p>Add Case</p>
        <div className="form-group">
          <label>Suit No:</label>
         <input type="text" className='form-control' placeholder='Enter Suit Number ...'
                    onChange={e=>setValues({...values, suitnumber:e.target.value})} />
        
        </div>
        <div className="form-group">
           <label htmlFor="">Parties</label>
                    <input type="text" className='form-control' placeholder='Enter Parties ...' 
                     onChange={e=>setValues({...values, parties:e.target.value})} />
       
        </div>
      
        <button type="submit" className="btn-primary">
          Add Case
        </button>
      </form>
            </div>

    </div>
     <Footer />
    </div>
  
  );
}

export default AddCase;