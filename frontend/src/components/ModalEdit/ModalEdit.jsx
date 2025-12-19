import axios from "axios";
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import default CSS for toastify
import "./ModalEdit.css";
import { useNavigate } from "react-router-dom";
import { GoLaw } from "react-icons/go";
import { FaTimes, FaSave } from "react-icons/fa";



const ModalEdit = ({ show, handleClose }) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] =useState('');
    const [password, setPassword] =useState('');

    //modal 
   

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const response =  await axios.post("http://localhost:3000/user", {
                name, email, mobile, password
            });

           // alert(response.data.message);
            setName('');
            setEmail('');
            setMobile('');
            setPassword('');
            handleClose();
            location.reload();
            navigate('/diary');
            toast.success("User Entered Successfully");
        } catch (error) {
            console.error('Error Inserting User:', error);
            alert('Failed to Insert User');
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
                    <label htmlFor="suitnumber">User Name</label>
                    <input type="text" 
                    placeholder="Enter Name" id="name" value={name} onChange={(e) =>setName(e.target.value)}
                    required />
                </div>
                   <div className="form-group">
                    <label htmlFor="parties">Email</label>
                    <input type="email" 
                    placeholder="Enter Email" id="email" value={email} onChange={(e) =>setEmail(e.target.value)}
                    required />
                </div>
                 <div className="form-group">
                    <label htmlFor="suitnumber">Phone</label>
                    <input type="text" 
                    placeholder="Enter Mobile" id="mobile" value={mobile} onChange={(e) =>setMobile(e.target.value)}
                    required />
                </div>
              <div className="form-group">
                    <label htmlFor="suitnumber">Password</label>
                    <input type="password" 
                    placeholder="Enter Password" id="password" value={password} onChange={(e) =>setPassword(e.target.value)}
                    required />
                </div>
                <div className="form-group between flex">
                    <button type="submit" className="submit-button"><FaSave /></button>
                     <button type="submit" className="cancel-button" onClick={handleClose}> <FaTimes /></button>
                     </div>
            </form>
        </div>
          <ToastContainer 
                  position="top-center" 
                  autoClose={1000} 
                  hideProgressBar={true} 
                  closeOnClick 
                  // pauseOnHover  
                  theme="colored" />
          </div>

            
    )
}

export default ModalEdit