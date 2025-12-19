import axios from "axios";
import { useState, useEffect } from "react"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import default CSS for toastify
import "./ModalPwd.css";
import { useNavigate } from "react-router-dom";
import { GoLaw } from "react-icons/go";
import { FaTimes, FaSave } from "react-icons/fa";



const ModalPwd = ({ show, handleClose }) => {
         const [userData, setUserData] = useState('');
        const [password, setPassword] =useState('');
         const [newPassword, setNewPassword] =useState('');
        const [message, setMessage] = useState('');
    
      
      useEffect(() => {
        setTimeout(()=>{
          getData();
          
        },200)
       
      }, [location]);
    
      const getData=async()=>{
        const data = await JSON.parse(sessionStorage.getItem('userData'));
        console.log(data.userData)
       
        
        if (data && data.isLoggedIn) {
          setUserData(data.userData);
         
        }
     
      }
   
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if (password !== newPassword) {
        setMessage("Passwords Do Not Match");
        return;
    }

    if(password.length < 6){
      setMessage("Password must be more than 6")
      return
    }
  
    try {
        const userId = userData.id;
       const res =  await axios.post("http://localhost:3000/change-password", {
                password, newPassword, userId
            });

      setMessage(res.data.message);
      setPassword('');
      setNewPassword('');
      window.location.reload();
    } catch (error) {
      setMessage(error.response?.data?.error || "Error Changing Password");
      
    }

  };

    if(!show) return null;
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
          
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <p className="flex center purple-text">CHANGE PASSWORD</p>
            </div>
                   {message && 
                <small className="error-message flex center">{message}</small> }
                  
              
               <div className="form-group">
             
                 <label htmlFor="password">New Password</label>
      <input type="text" value={password} placeholder="" onChange={(e) => setPassword(e.target.value)} required />
            </div>
                  
               <div className="form-group">
                 <label htmlFor="new password">Confirm Password</label>
      <input type="text" value={newPassword} placeholder="" onChange={(e) => setNewPassword(e.target.value)} required />
            </div>
                  
                <div className="form-group between flex">
                    <button type="submit" className="submit-button"><FaSave /></button>
                     <button type="submit" className="cancel-button" onClick={handleClose}> <FaTimes /></button>
                     </div>
            </form>
      
        </div>
        
          </div>

            
    )
}

export default ModalPwd