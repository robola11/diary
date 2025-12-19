import HeroImage from "../../assets/h-img.png";
import { Link, Element } from 'react-scroll';
import { FaArrowRight } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

import "./Hero.css";

const Hero = () => {
  return (
    <Element id="hero">
    <section id="hero" className="hero p-block-4 border-bottom">
      <div className="hero-section flex wrapper gap-4">
        <div className="hero-content">
          <p className="sub-text">Welcome To</p>
          <h2>
            <span>Oroboss Solicitors </span>
          </h2>
          <h4 className="sub-text">Barristers & Solicitors of the Supreme Court of Nigeria</h4>
          <p className="para">
       Mussum Ipsum, cacilds vidis litro abertis. Diuretics paradis num copo é motivis de denguis.Viva Forevis aptent taciti sociosqu ad litora torquent.Cevadis im ampola pa arma uma pindureta.Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis!


          </p>
          <div className="mt-2">

         <Link to="contact" smooth={true} duration={500} className="btn-inverse">CONTACT US &nbsp;<IoMdMail className="arrow" /></Link>
           
          </div>
        </div>
        <div className="hero-image">
          <img src={HeroImage} alt="" />
        </div>
      </div>
    </section>
    </Element>
  );
};

export default Hero;
