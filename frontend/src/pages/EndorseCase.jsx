import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import '../pages/login.css';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import { jwtDecode } from "jwt-decode";
import ModalForm from "../components/ModalForm/ModalForm";


function EndorseCase() {
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

//modal

const [show, setShow]=useState(false);
const handleShow =()=>setShow(true);
const handleClose=()=>{setShow(false);
 
};

    //endorse case
   const {id} = useParams();

 

      const [values, setValues] =useState({
            suitnumber:"",
            parties:"",
            endorsement:"",
            
        })


        useEffect(()=>{
        axios.get('http://localhost:3000/caseread/'+id)
        .then(res=>{console.log(res);
            setValues({...values, suitnumber:res.data[0].suitnumber, parties:res.data[0].parties})
        })
        .catch(err=>console.log(err))

    },[])

   const handleEndorse =(event) =>{
        event.preventDefault();
        axios.post("http://localhost:3000/caseEndorse/"+id, values)
        .then(res=>{
            console.log(res);
           navigate('/diary')
            
        })
        .catch(err=>console.log(err))
    }



  return ( 
    <div className="">
   
      <Navbar />
        <div className="wrapper p-block-5 border-bottom">
  
           
             
            <div className="login-container">
                    <form action="" onSubmit={handleEndorse} >
       
        <div className="form-group">
          <label>Suit Number:</label>
         <input type="text" className='form-control' placeholder='Enter Suit Number ...'
                     onChange={e=>setValues({...values, suitnumber:e.target.value})} value={values.suitnumber.toUpperCase()} readOnly  />
        
        </div>
        <div className="form-group">
           <label htmlFor="">Parties</label>
                    <input type="text" className='form-control' placeholder='Enter Parties ...' 
 onChange={e=>setValues({...values, parties:e.target.value})} value={values.parties} readOnly
                     style={{textTransform:'capitalize'}} />
       
        </div>

        
          <div className="form-group">
           <label htmlFor="">Endorsement</label>
                    <textarea rows= {5} className='form-control comment-box'
                     placeholder='Endorse File Here e.g. case called, parties absent...adjournment ...' 
                     onChange={e=>setValues({...values, endorsement:e.target.value})} value={values.endorsement} required >
                    
                     </textarea>
       
        </div>
      
        <button type="submit" className="login-btn">
          ENDORSE
        </button>
      </form>
            </div>

    </div>
     <Footer />
    </div>
  
  );
}

export default EndorseCase;