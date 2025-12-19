import axios from "axios";
import { useState, useEffect } from "react"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import default CSS for toastify
import "./ModalUser.css";
import { useNavigate } from "react-router-dom";
import { GoLaw } from "react-icons/go";
import { FaTimes, FaSave } from "react-icons/fa";



const ModalUser = ({ show, handleClose }) => {
    const navigate = useNavigate();
    const [file, setFile] =useState(null);
     const [access, setAccess] =useState('');
    const [scn, setScn] =useState('');
    const[name, setName] = useState('');
      const[lastname, setLastname] = useState('');
     const[email, setEmail] = useState('');
       const[mobile, setMobile] = useState('');
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');

  //useEffect(() =>{
    //axios.get('http://localhost:3000/images')
    //.then(res=>setImages(res.data))
    //.catch(err=>console.error("Error Fetching Images", err));
  //}, []);

 

  const handleFileChange=(e)=>{
    setFile(e.target.files[0]);
    
    
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!file || !name){
      setMessage("Pls Select File");
      return;
    }
    const formData=new FormData();
    formData.append('image', file);
    formData.append('name',name);
    formData.append('email',email);
    formData.append('scn', scn);
    formData.append('access', access);
    formData.append('lastname', lastname);
     formData.append('mobile', mobile);
   
    try {
      const res = await axios.post('http://localhost:3000/upload', formData, {
        headers:{ 'Content-Type': 'multipart/form-data' }
      
      });

      setMessage(res.data.message);
      setImages([...images, { file_path: res.data.imgname }]);
      setFile(null);
      setName('');
      setEmail('');
      setScn('');
      setAccess('');
      setLastname('');
      setMobile('');
      navigate('/users')
      window.location.reload();
    } catch (error) {
      setMessage(error.response?.data?.error || "Error Uploading File");
      
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
                 <label htmlFor="access">Access</label>
      <input type="number" min="0" max="1" value={access} placeholder="0" onChange={(e) => setAccess(e.target.value)} />
            </div>
                  
               <div className="form-group">
                 <label htmlFor="scn">SCN</label>
      <input type="text" value={scn} placeholder="SCN00001" onChange={(e) => setScn(e.target.value)} required />
            </div>
                  <div className="form-group">
                 <label htmlFor="name">First Name</label>
      <input type="text" value={name} placeholder="Enter First Name" onChange={(e) => setName(e.target.value)} required />
            </div>
             <div className="form-group">
                 <label htmlFor="name">Last Name</label>
      <input type="text" value={lastname} placeholder="Enter Last Name" onChange={(e) => setLastname(e.target.value)} required />
            </div>
              <div className="form-group">
                 <label htmlFor="email">Email</label>
      <input type="email" value={email} placeholder="Enter Email Address" onChange={(e) => setEmail(e.target.value)} required />
            </div>
             <div className="form-group">
                 <label htmlFor="mobile">Phone No.</label>
      <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" value={mobile} placeholder="Enter Phone Number" onChange={(e) => setMobile(e.target.value)} required />
            </div>
               <div className="form-group">
                 <label htmlFor="image">Photo</label>
              <input type="file" accept='image/*' onChange={handleFileChange} required />
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

export default ModalUser