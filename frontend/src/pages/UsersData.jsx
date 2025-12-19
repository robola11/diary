import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from '../components/Header'
import { Link as RouterLink, useNavigate } from "react-router-dom";
import '../pages/login.css';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { FaSearchPlus,FaEdit,FaTrashAlt,FaTimes } from "react-icons/fa";
import ModalForm from "../components/ModalForm/ModalForm";
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import default CSS for toastify
import '../components/ModalForm/ModalForm.css';

  import { confirmAlert } from 'react-confirm-alert'; // Import
  import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { TiTick } from "react-icons/ti";
import { GoLaw } from "react-icons/go";
import { FaUserEdit } from "react-icons/fa";




function Users() {
   const [file, setFile] =useState(null);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
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

    //search paginate
  const [items, setItems] =useState([]);
  const [search, setSearch]=useState('');
  const [page, setPage]=useState(1) 
  const [totalPages, setTotalPages] =useState(1);
  const [numUsers, setNumUsers]=useState("");
  const limit = 5;
  


     useEffect(()=>{
      const fetchItems=async ()=>{
      
             try {
           const response = await axios.get('http://localhost:3000/userfile', {
            params: { search, page, limit }
           });
          setItems(response.data.data);
          setTotalPages(response.data.totalPages);
          setNumUsers(response.data.numUsers); 

        } catch (error) {
          console.error("Error Fetching Data")
        }
     
      };
      fetchItems();
     }, [search, page]);

     //handle search input change
     const handleSearch =(e) =>{
      setSearch(e.target.value);
      setPage(1);
     };

    //handle page navigation
    const handlePageChange = (newPage) => {
 if (newPage >= 1 && newPage <= totalPages) {
    setPage(newPage);}
    }
   
   
  const totalCases = limit * page;
 
    //confirm alart

    const handleDeleteConfirmation = (id) => {
        confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                     <a href="" className="logo">
                         <span>
                            <GoLaw />
                          </span>
                              OROBOSS.
                             </a>
            </div>
             <div className="modal-body">
              <p>Permanently Delete Case User?</p>
              </div>
                <div className=" between flex">
              <button className="submit-button" onClick={onClose}>  <FaTimes /></button>
              <button className="cancel-button"
                onClick={() => {
                 handleDelete(id),
                  onClose();
                }}
              >
              <FaTrashAlt />
              </button>
              </div>
            </div>
            </div>
          );
        },
      });
    };

// delete function
       const handleDelete =(id)=>{
      
            axios.delete('http://localhost:3000/caseDelete/'+id)
            .then(res=>{
                location.reload();
            })
        .catch(err =>console.log(err));
    }

    


//modal 
const [show, setShow]=useState(false);
const handleShow =()=>setShow(true);
const handleClose=()=>{setShow(false);
 
};


  const logout=()=>{
    sessionStorage.clear();
    setUserData('');
    navigate('/');

  }

     
  return ( 
    <div className="">
   
      <Navbar />
        <div className="wrapper p-block-9 border-bottom border-top">
       <div className="flex between gap-4">
                <div>
                  
                <span className='purple-text overlay-text' datatype='Cases'>No. of Files: {numUsers}</span>
             
                 </div>
              
                         
                          <button onClick={handleShow} className='btn-inverse self-end'>Add File +</button>
           
               <ModalForm show={show} handleClose={handleClose} />
             
            </div>
              <div className="input-container mt-1">
          <input
                type="text"
                  className="input-field"
                placeholder="Search with Parties"
                value={search}
                onChange={handleSearch}
                style={{padding:'10px', marginBottom:'20px', marginTop:'5px'}}
            />
            </div>  
              <ToastContainer 
        position="top-center" 
        autoClose={1000} 
        hideProgressBar={true} 
        closeOnClick 
        // pauseOnHover  
        theme="colored" />
      <table> 
  <thead>
    <tr>
 
      <th scope="col">USERNAME </th>
      <th scope="col">EMAIL</th>
      <th scope="col">MOBILE</th>  
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>

    {items.length > 0 ? (
    
      items.map((item) =>(
               
            <tr key={item.id}>       
             <td>{item.name}</td>
                <td>{item.email}</td>
                   <td>{item.mobile}</td>
    
             <td>
               <RouterLink to={`/endorseCase/${item.id}`} className='btn-inverse me-dot5'><FaEdit /></RouterLink>
               <RouterLink to={`/editCase/${item.id}`} className='btn-inverse me-dot5'><FaUserEdit /></RouterLink>
              <RouterLink to={`/readCase/${item.id}`} className='btn-inverse me-dot5'><FaSearchPlus /></RouterLink>
              {/*} <button className='btn-inverse' onClick={()=>handleDelete(item.id)}><FaTrashAlt /></button>*/}
                  <button className='btn-inverse' onClick={()=>handleDeleteConfirmation(item.id)}><FaTrashAlt /></button>
             
           
               </td>
                </tr>
      )
    ))
  :(
    <tr>
      <td colSpan='3'> No data</td>
    </tr>
  )}
                

  </tbody>
</table>



 <div className="pagination">
 <button onClick={()=>handlePageChange(page - 1)} disabled={page===1}><FaCaretLeft className="arrow" /></button>
<span>{page} of {totalPages}</span>
<button onClick={()=>handlePageChange(page + 1)} disabled={page===totalPages}><FaCaretRight className="arrow" /></button>
  
    </div>
    </div>
     <Footer />
    </div>
  
  );
}

export default Users;