import React, { useEffect, useState } from "react";
import axios from "axios";

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

import { GoLaw } from "react-icons/go";





function Diary() {
  
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
  const [editItems, setEditItems] = useState(null);
    const [endItems, setEndItems] = useState(null);
  const [search, setSearch]=useState('');
  const [page, setPage]=useState(1) 
  const [totalPages, setTotalPages] =useState(1);
  const [numCases, setNumCases]=useState("");
  const limit = 5;
  

     useEffect(()=>{
      const fetchItems=async ()=>{
      
             try {
           const response = await axios.get('http://localhost:3000/casefile', {
            params: { search, page, limit }
           });
          setItems(response.data.data);
          setTotalPages(response.data.totalPages);
          setNumCases(response.data.numCases);
        

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
              <p>Permanently Delete Case File?</p>
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
const handleClose=()=>{
  setShow(false);
  setEditItems(false);
  setEndItems(false);
  
 
};


 // edit case modal
 const handleEditCase =()=>{
  axios.put(`http://localhost:3000/caseEdit/${editItems.id}`, editItems)
  .then(()=>{
    setItems(items.map((item) => item.id === editItems.id ? editItems : item

    ));
    setEditItems(null);
  })
  .catch((error) => console.error("Error Editing User:", error));
 };

  // endorse case modal
 const handleEndorse =()=>{
  axios.put(`http://localhost:3000/caseEndorse/${endItems.id}`, endItems)
  .then(()=>{
    setItems(items.map((item) => item.id === endItems.id ? endItems : item

    ));
    setEndItems(null);
  })
  .catch((error) => console.error("Error Endorsing Case:", error));
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
                  
                <span className='purple-text overlay-text'>No. of Files: {numCases}</span>
             
                 </div>
              
                         
                          <button onClick={handleShow} className='btn-inverse self-end'>Add File +</button>
           
               <ModalForm show={show} handleClose={handleClose} />
             
            </div>
              <div className="input-container mt-1">
          <input
                type="text"
                  className="input-field"
                placeholder="Search with Suit Number or Parties"
                value={search}
                onChange={handleSearch}
                style={{padding:'10px', marginBottom:'20px', marginTop:'5px'}}
            />
            </div>  
           
      <table> 
  <thead>
    <tr>
 
      <th scope="col">SUIT NUMBER </th>
      <th scope="col">PARTIES</th>
       <th scope="col">LAST UPDATE</th>  
      <th scope="col">ACTION</th>
    </tr>
  </thead>
  <tbody>

    {items.length > 0 ? (
    
      items.map((item) =>(
               
            <tr key={item.id}>       
             <td> {item.suitnumber}</td>
              <td>{item.parties.length > 35 ? (item.parties.slice(0,35) + " ... "):(
              item.parties
            )}
            </td>
            <td>{item.date}</td>
            <td>
              {userData.userType === 1 ? (
                <>
               <RouterLink onClick={() => setEndItems(item)} className='btn-table me-dot5'><FaEdit /></RouterLink>
                <RouterLink to={`/readCase/${item.id}`} className='btn-table me-dot5'><FaSearchPlus /></RouterLink>
               <RouterLink onClick={() => setEditItems(item)} className='btn-table me-dot5'><FaUserEdit /></RouterLink>
             
              {/*} <button className='btn-inverse' onClick={()=>handleDelete(item.id)}><FaTrashAlt /></button>*/}
                  <button className='btn-table' onClick={()=>handleDeleteConfirmation(item.id)}><FaTrashAlt /></button>
             </> ) :(

                <>
               <RouterLink onClick={() => setEndItems(item)} className='btn-table me-dot5' disabled><FaEdit /></RouterLink>
                <RouterLink to={`/readCase/${item.id}`} className='btn-table me-dot5' disabled><FaSearchPlus /></RouterLink>
              {/* <RouterLink onClick={() => setEditItems(item)} className='btn-inverse me-dot5' disabled><FaUserEdit /></RouterLink>*/}
             
              {/* <button className='btn-inverse' onClick={()=>handleDelete(item.id)}><FaTrashAlt /></button>*/}
                 {/*} <button className='btn-inverse' onClick={()=>handleDeleteConfirmation(item.id)} disabled><FaTrashAlt /></button>*/}
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
            <form onSubmit={handleEditCase}>
                <div className="form-group">
                  <p className="flex center purple-text">EDIT CASE</p>
             
              
            </div>
               <div className="form-group ">
                 <label htmlFor="suitnumber">Suit Number</label>
      <input type="text" value={editItems.suitnumber} placeholder="SCN00001" onChange={e =>setEditItems({ ...editItems, suitnumber:e.target.value})} required />
            </div>
                  <div className="form-group">
                 <label htmlFor="parties">Parties</label>
      <input type="text" value={editItems.parties} placeholder="First and Last Names only" onChange={e =>setEditItems({ ...editItems, parties:e.target.value})} required />
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

{/* custom endorse modal */}
{endItems && (

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
            <form onSubmit={handleEndorse}>
                <div className="form-group">
                  <p className="flex center purple-text">ENDORSE CASE</p> 
            </div>
               <div className="form-group ">
                 <label htmlFor="suitnumber">Suit Number</label>
      <input type="text" value={endItems.suitnumber} placeholder="SCN00001" onChange={e =>setEndItems({ ...endItems, suitnumber:e.target.value})} readOnly />
            </div>
                  <div className="form-group">
                 <label htmlFor="parties">Parties</label>
      <input type="text" value={endItems.parties} placeholder="First and Last Names only" onChange={e =>setEndItems({ ...endItems, parties:e.target.value})} readOnly />
            </div>

                 <div className="form-group">
           <label htmlFor="">Endorsement</label>
                    <textarea rows= {5} className='form-control comment-box'
                     placeholder='Endorse File Here e.g. case called, parties absent...adjournment ...' 
                      
                      onChange={e =>setEndItems({ ...endItems, endorsement:e.target.value})} 
                     required >
                    
                     </textarea>
       
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
 

 <ToastContainer 
    position="top-center" 
    autoClose={5000} 
    hideProgressBar={true} 
    closeOnClick 
    // pauseOnHover  
    theme="colored" />

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

export default Diary;