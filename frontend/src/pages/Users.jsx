import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from '../components/Header'
import { Link as RouterLink, useNavigate } from "react-router-dom";
import '../pages/login.css';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { FaSearchPlus,FaTrashAlt,FaTimes, FaSave, FaUserEdit, FaEdit } from "react-icons/fa";
import ModalForm from "../components/ModalForm/ModalForm";
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import default CSS for toastify
import '../components/ModalForm/ModalForm.css';

  import { confirmAlert } from 'react-confirm-alert'; // Import
  import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { TiTick } from "react-icons/ti";
import { GoLaw } from "react-icons/go";


function Users() {

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


  const fetchUserDetails = async (show, handleCloseUser) => {
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
  const [editItems, setEditItems] = useState(null);


  const [search, setSearch]=useState('');
  const [page, setPage]=useState(1) 
  const [totalPages, setTotalPages] =useState(1);
  const [numUsers, setNumUsers]=useState("");
  const limit = 5;


     useEffect(()=>{
      const fetchItems=async ()=>{
      
             try {
           const response = await axios.get('http://localhost:3000/userList', {
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
              <p>Permanently Delete User?</p>
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
      
            axios.delete('http://localhost:3000/userDelete/'+id)
            .then(res=>{
                location.reload();
            })
        .catch(err =>console.log(err));
    }


//modal 
const [show, setShow]=useState(false);
const handleShow =()=>setShow(true);
const handleClose=()=>{
  setShow(false);
  setEditItems(false)
  
};

//modal password
const [showPwd, setShowPwd] = useState(false);



  const logout=()=>{
    sessionStorage.clear();
    setUserData('');
    navigate('/');

  }



 // update user modal
 const handleSave =()=>{
  axios.put(`http://localhost:3000/userList/${editItems.id}`, editItems)
  .then(()=>{
    setItems(items.map((item) => item.id === editItems.id ? editItems : item

    ));
    setEditItems(null);
  })
  .catch((error) => console.error("Error Editing User:", error));
 };


  const handleFileChange=(e)=>{
    setFile(e.target.files[0]);
    
    
  }
   
  return ( 
    <div className="">
   
      <Navbar />
        <div className="wrapper p-block-9 border-bottom border-top">
       <div className="flex between gap-4">
                <div>
                  
                <span className='purple-text overlay-text'>No. of Users: {numUsers}</span>
             
                 </div> 
                          <button onClick={handleShow} className='btn-inverse self-end'>Add File +</button>
           
               <ModalForm show={show} handleClose={handleClose} />
             
            </div>
              <div className="input-container mt-1">
          <input
                type="text"
                  className="input-field"
                placeholder="Search with SCN, First or Last Names"
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
      <th scope="col">PHOTO</th>
       <th scope="col">SCN</th>
      <th scope="col">NAME </th>
       <th scope="col">CONTACT </th>
  
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>

    {items.length > 0 ? (
    
      items.map((item) =>(
               
            <tr key={item.id}>       
          
             <td> <img className="userImg"
                 key={item.id}
                 src={item.imgname}
              /> </td>
                 <td>{item.scn}</td>
                   <td>{item.name + ",  " + item.lastname}</td>
                        <td>{item.mobile + " :: "+ item.email}</td>
                   
                  
             <td>
                 {userData.userType > 0 ? (
                  <>
              <RouterLink to={`/readUser/${item.id}`} className='btn-table me-dot5'><FaSearchPlus /></RouterLink>
              <RouterLink onClick={() => setEditItems(item)} className='btn-table me-dot5'><FaEdit /></RouterLink>
          
              {/*} <button className='btn-inverse' onClick={()=>handleDelete(item.id)}><FaTrashAlt /></button>*/}
                  <button className='btn-table' onClick={()=>handleDeleteConfirmation(item.id)}><FaTrashAlt /></button>
             </>) 
             : (
               <>
                 <RouterLink to={`/readUser/${item.id}`} className='btn-table me-dot5'><FaSearchPlus /></RouterLink>
                  </>
             )}
           
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
 
{/* custom edit modal */}
{editItems && (

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
            <form onSubmit={handleSave}>
                <div className="form-group flex between">
                  <p className="purple-text">EDIT USER</p>
              <img className="formImg" key={editItems.id} src={editItems.imgname} alt="picture" />
              
            </div>
             <div className="form-group ">
              <label for="quantity">Access (0 or 1):</label> 

               
            <input type="number"  min="0" max="1" value={editItems.userType} onChange={e =>setEditItems({ ...editItems, userType:e.target.value})} />
            </div>
               <div className="form-group ">
                 <label htmlFor="scn">SCN</label>
      <input type="text" value={editItems.scn.toUpperCase()} placeholder="SCN00001" onChange={e =>setEditItems({ ...editItems, scn:e.target.value})} required />
            </div>
                  <div className="form-group">
                 <label htmlFor="name">First Name</label>
      <input type="text" value={editItems.name} placeholder="First Name" onChange={e =>setEditItems({ ...editItems, name:e.target.value})} required />
            </div>
                <div className="form-group">
                 <label htmlFor="lname">Last Name</label>
      <input type="text" value={editItems.lastname} placeholder="Last Name" onChange={e =>setEditItems({ ...editItems, lastname:e.target.value})} required />
            </div>
              <div className="form-group">
                 <label htmlFor="email">Email</label>
      <input type="email" value={editItems.email} placeholder="Email Address" onChange={e =>setEditItems({ ...editItems, email:e.target.value})} required />
            </div>
            <div className="form-group">
                 <label htmlFor="mobile">Mobile</label>
      <input type="text" value={editItems.mobile} placeholder="Phone Number" onChange={e =>setEditItems({ ...editItems, mobile:e.target.value})} required />
            </div>
             
           
                <div className="form-group between flex">
                    <button type="submit" className="submit-button">
                      <FaSave />
               </button>
                     <button type="submit" className="cancel-button" onClick={handleClose}> <FaTimes /></button>
                     </div>
            </form>
        </div>
        
          </div>
)}
 





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