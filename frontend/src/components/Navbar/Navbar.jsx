import React, { useState, useEffect } from 'react';
import { GoLaw } from "react-icons/go";
import { Link as ScrollLink, Element } from "react-scroll";
import { RiMoonFill } from "react-icons/ri";
import { FiSun, FiMessageSquare } from "react-icons/fi";
import { AiOutlineBars } from "react-icons/ai";
import { FaXmark } from "react-icons/fa6";
import { IoMdLogIn, IoMdLogOut, IoMdMail } from "react-icons/io";
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import profileImg from '../../assets/img1.png';
import { FaCaretDown } from "react-icons/fa6";

import "./Navbar.css";

import ModalUser from '../ModalUser/ModalUser';
import ModalPwd from '../ModalPwd/ModalPwd';

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] =useState(false);
  
     //const [theme, setTheme] = useState("light");
       const [theme, setTheme] = useState(()=>{
         return localStorage.getItem('theme') || 'light';
       });
     
       useEffect(() => {
         localStorage.setItem('theme', theme);
         document.documentElement.setAttribute("data-theme", theme);
       }, [theme]);
  
    const toggleTheme = () => {
      setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
   

const navItems =[
    {name: "Home Page", href: "/"},
    {name: "Case Files", href:"/diary"},
    {name: "Users Details", href:"/users"},

     
];
const navigate = useNavigate();
function moveToLogin(){
navigate('/login')
}

const location = useLocation(); // Get the current location
  const [userData, setUserData] = useState(null);

  
  useEffect(() => {
    setTimeout(()=>{
      getData();
      
    },200)
   
  }, [location]);

  const getData=async()=>{
    const data = await JSON.parse(sessionStorage.getItem('userData'));
    console.log('useeffct run');
    
    if (data && data.isLoggedIn) {
      setUserData(data.userData);
    }
  }
//modal 
const [show, setShow]=useState(false);
const handleShow =()=>setShow(true);
const handleClose=()=>{
  setShow(false); 
};

const [pwdShow, setPwdShow]=useState(false);
const handlePwdShow =()=>setPwdShow(true);
const handlePwdClose=()=>{
  setPwdShow(false); 
};



  const logout=()=>{
    sessionStorage.clear();
    setUserData('');
    navigate('/');

  }


  return (
         <header id="header" className="header">
              
            <nav className="flex between wrapper navbar">
              <a href="" className="logo">
                <span>
                  <GoLaw />
                </span>
                OROBOSS.
              </a>
                 <ModalUser show={show} handleClose={handleClose} />
         <ModalPwd show={pwdShow} handleClose={handlePwdClose} />
              {/* Desktop Menu */}
              <div className='flex gap-2 desktop-menu link'>
              {navItems.map((item, index) => {
               return (

                 
                <a key={index} href={item.href} className="link">{item.name}</a>
         )
                
            })}
            </div>
                   <div className="flex gap-2 nav-action">
                        <ScrollLink
                          to="#"
                          smooth={true}
                          duration={500}
                          className="icon-container border-inverse"
                          onClick={toggleTheme}
                        >
                          {theme === "light" ? <RiMoonFill /> : <FiSun />}
                        </ScrollLink>

                      {userData ? (
                        <>
                            <div className="dropdown desktop-menu">
        <span> <img src={profileImg} 
              alt="Profile" 
              className="profile-photo-circle arrow" 
            />
        {userData.name} <FaCaretDown /></span>
        <div className="dropdown-content">
        <RouterLink to='/diary'>Diary</RouterLink>

          {userData.userType > 0 ? (
               <>
                  <RouterLink onClick={handleShow}>Add User</RouterLink>
                   <RouterLink onClick={handlePwdShow}>Password</RouterLink>
                </>
               
          ):(
              <RouterLink onClick={handlePwdShow}>Password</RouterLink>
          )}
      
         <RouterLink to='/' onClick={logout}>Logout</RouterLink>
       </div>
     
      </div>                     
      
       </>
                      ) :
                    (
                       <button onClick={moveToLogin} className="btn-inverse desktop-menu">
                          <IoMdLogIn className="arrow" />
                          &nbsp; Login
                        </button>
                    )  
                    }
            
                        {/* Hamburger */}
                        <ScrollLink
                          to="#"
                          smooth={true}
                          duration={500}
                          className="hamburger"
                          onClick={toggleMenu}
                        >
                          {isMenuOpen ? <FaXmark /> : <AiOutlineBars />}
                        </ScrollLink>
                      </div>
                      <div  className={`mobile-menu ${
              isMenuOpen ? `mobile-menu-active` : null
            }`}>
                        
            {navItems.map((item, index) => {
               return <a key={index} href={item.href} className="link" 
               onClick={() => {
                setIsMenuOpen(false)
               }}>{item.name}</a>
             
            })}

            {userData ? (

                     <>
                            <div className="dropdown">
        <span> <img src={profileImg} 
              alt="Profile" 
              className="profile-photo-circle arrow" 
            />
        {userData.name} <FaCaretDown /></span>
        <div className="dropdown-content">
        <RouterLink to='/diary'>Diary</RouterLink>

          {userData.userType > 0 ? (
           <>
                         <RouterLink onClick={handleShow}>Add User</RouterLink>
                         <RouterLink onClick={handlePwdShow}>Password</RouterLink>
                         </>
          ):(
                <RouterLink onClick={handlePwdShow}>Password</RouterLink>
          )}
      
         <RouterLink to='/' onClick={()=>{
                 logout();
               setIsMenuOpen(false)
               }}>Logout</RouterLink>
       </div>
      </div>                     
      
       </>

            ):(

               <button onClick={()=>{
                              moveToLogin();
                              setIsMenuOpen(false);
                            }
                             } className="btn-inverse">
                                        <IoMdLogIn className="arrow" />
                                        &nbsp; Login
                                      </button>
            )}
             

                      </div>
    
              
            </nav>
          
          </header>
  )
}

export default Navbar