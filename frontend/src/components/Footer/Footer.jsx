import "./Footer.css";
import { GoLaw } from "react-icons/go";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaInstagram,
  FaPaperPlane,
  FaArrowUp,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";



const Footer = () => {

  
  
  return (
    <footer>
      <div className="wrapper">
      

        <div className=" flex p-block-4 flex-start gap-4">
          <div className="footer-wrapper">
            <a href="" className="logo">
              <span><GoLaw />
              </span>OROBOSS.
            </a>
            <p>
              Mussum Ipsum, cacilds vidis litro abertis. Posuere libero varius.
              Nullam a nisl ut ante blandit hendrerit.
            </p>

            <div className="flex gap-1 mt-2">
              <a href="" className="icon-container green-inverse">
                <FaFacebookF />
              </a>
              <a href="" className="icon-container green-inverse">
                <FaXTwitter />
              </a>
              <a href="" className="icon-container green-inverse">
                <FaTwitter />
              </a>
              <a href="" className="icon-container green-inverse">
                <FaPinterestP />
              </a>
              <a href="" className="icon-container green-inverse">
                <FaInstagram />
              </a>
            </div>
          </div>

    

          <ul className="footer-wrapper">
            <li>
              <h6>Contact</h6>
            </li>
            <li className="mt-1">
              <a href="" className="link">
                +2349060422440
              </a>
            </li>
            <li className="mt-1">
              <a href="" className="link">
                www.example.com
              </a>
            </li>
            <li className="mt-1">
              <a href="" className="link">
                example@gmail.com
              </a>
            </li>
            <li className="mt-1">
              <a href="" className="link">
                Udu L.G.A, Delta State, Nigeria
              </a>
            </li>
          </ul>

          <div className="footer-wrapper">
            <h6>Get Latest Information</h6>
            <div className="footer-input mt-2 flex stretch">
                <input type="email" name="email" id="email" placeholder="Email Here" autoComplete="off" className="email-field" />
                <button className="input-btn">
                    <FaPaperPlane />
                </button>
            </div>
          </div>
        </div>

    

      </div>

      <div className="copyright">
        <div className="wrapper flex between">
          <p>Copyright &copy; Oroboss.All Rights Reserved</p>
          <p>User Terms and Conditions | Privacy Policy</p>
        
        </div>
      </div>
      
     
    </footer>
  );
};

export default Footer;
