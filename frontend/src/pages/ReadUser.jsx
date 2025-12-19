import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from '../components/Header'
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import '../pages/login.css';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { FaSearchPlus,FaEdit,FaTrashAlt } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";



function ReadUser() {
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



    //read case
    const {id} =useParams();
    const [cases, setCases] = useState([]);
       const [page, setPage] = useState(1);
          const [totalPages, setTotalPages] = useState(1);

          useEffect(() => {
            axios.get(`http://localhost:3000/readUser/+${id}?page=${page}&limit=5`)
            .then(res => {
                setCases(res.data.data);
                setTotalPages(res.data.totalPages);
            })
            .catch(err => console.log(err));
          }, [page]);


  return ( 
    <div className="">
   
      <Navbar />
        <div className="wrapper p-block-9 border-bottom">
      <div className="flex between">
                <div>
                    <span className='sub-text overlay-text' datatype='Users'>Details</span>
        
             
                 </div>
 
            </div>
                    <div className="card-container">
          
                    {cases.map((u) =>(
           
    <div className="card flex gap-1"  key={u.id}>
        <div className="cards-content">
            <img className="userImage"
                 key={u.id}
                 src={u.imgname}
              />
   </div>
  
    <div className="cards-content">
      <p style={{textTransform:'uppercase'}}>SCN: {u.scn}</p>
       <p style={{textTransform:'capitalize'}}>Name: {u.name + " " + u.lastname}</p>
       <p>Phone Number: {u.mobile}</p>
        <p>Email: {u.email}</p>
    </div>
       
  </div>


                    ))}
              </div>
                <div>
                     <div className="pagination">
                    <button disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)} >
                    <FaCaretLeft className="arrow" />
                </button>
                <span>{page} of {totalPages}</span>
                <button disabled={page === totalPages} onClick={() =>setPage((prev) => prev + 1)}>
                    <FaCaretRight className="arrow" />
                </button>
                </div>
                </div>
        
    </div>
     <Footer />
    </div>
  
  );
}

export default ReadUser;