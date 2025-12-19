import axios from "axios";
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import default CSS for toastify
import "./ModalForm.css";
import { useNavigate } from "react-router-dom";
import { GoLaw } from "react-icons/go";
import { FaTimes, FaSave } from "react-icons/fa";



const ModalForm = ({ show, handleClose }) => {
    const navigate = useNavigate();
    const [suitnumber, setSuitnumber] = useState('');
    const [parties, setParties] = useState('');
    const [endorsement, setEndorsement] =useState('');
    const [message, setMessage] = useState('');

    //modal 
   

    const handleSubmit = async(e) =>{
        e.preventDefault();
         if (suitnumber =='' || parties =='' || endorsement =='') {
        setMessage("All Fields Are Required");
        return;
    }
        try {
            const response =  await axios.post("http://localhost:3000/createCase", {
                suitnumber, parties, endorsement
            });
            toast.success("Case Entered Successfully");
            setSuitnumber('');
            setParties('');
            setEndorsement('');
            handleClose();
            location.reload();
            navigate('/diary');
           
        } catch (error) {
            console.error('Error Inserting Case:', error);
            alert('Failed to Insert Case');
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
                  <p className="flex center purple-text">ADD CASE FILE</p> 
              {message && <small className="flex center error-message">{message}</small>}
               
                <div className="form-group">
                    <label htmlFor="suitnumber">Suit Number</label>
                    <input type="text" 
                    placeholder="Enter Suit Number" id="suitnumber" value={suitnumber} onChange={(e) =>setSuitnumber(e.target.value)}
                    required />
                </div>
                   <div className="form-group">
                    <label htmlFor="parties">Parties</label>
                    <input type="text" 
                    placeholder="Enter Name of Parties" id="parties" value={parties} onChange={(e) =>setParties(e.target.value)}
                    required />
                </div>
                 <div className="form-group">
                     <label htmlFor="">Endorsement</label>
                    <textarea rows= {5} className='form-control comment-box'
                     placeholder='Endorse File Here e.g. case called, parties absent...adjournment ...' 
                     onChange={(e)=>setEndorsement(e.target.value)} value={endorsement} id="endorsement" required >
                    
                     </textarea>
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

export default ModalForm