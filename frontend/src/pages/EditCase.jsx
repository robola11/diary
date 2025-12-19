import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import '../pages/login.css';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { GoLaw } from "react-icons/go";
import { jwtDecode } from "jwt-decode";



function EditCase() {
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

    //edit case
  const {id} = useParams();
    const [values, setValues] =useState({
            suitnumber:"",
            parties:""
        })


          useEffect(()=>{
        axios.get('http://localhost:3000/caseread/'+id)
        .then(res=>{console.log(res);
            setValues({...values, suitnumber:res.data[0].suitnumber, parties:res.data[0].parties})
        })
        .catch(err=>console.log(err))

    },[])

   const handleEdit =(event) =>{
        event.preventDefault();
        axios.put("http://localhost:3000/editCase/"+id, values)
        .then(res=>{
            console.log(res);
            navigate('/diary')
            
        })
        .catch(Error=>console.log(err))
    }


  return ( 
    <div className="">
   
      <Navbar />
        <div className="wrapper p-block-5 border-bottom">
  
           
             
            <div className="login-container">
                  <a href="" className="formlogo">
                                                   <span>
                                                     <GoLaw />
                                                   </span>
                                                   OROBOSS.
                                                 </a>
            <form action="" onSubmit={handleEdit} >
              
                <div className="form-group">
                    <label htmlFor="">Suit No</label>
                    <input type="text" className='form-control' placeholder='Edit Suit number ...'
                    onChange={e=>setValues({...values, suitnumber:e.target.value})} value={values.suitnumber.toUpperCase()} />
                </div>
               <div className="form-group">
                    <label htmlFor="">Parties</label>
                    <input type="text" className='form-control' placeholder='Edit parties ...' 
                     onChange={e=>setValues({...values, parties:e.target.value})} value={values.parties}
                     style={{textTransform:'capitalize'}}/>
                </div>
                <button className='login-btn'>EDIT</button>
            </form>
            </div>

    </div>
     <Footer />
    </div>
  
  );
}

export default EditCase;