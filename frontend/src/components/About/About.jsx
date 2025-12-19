import React from 'react';
import "./About.css";
import AboutImage from '../../assets/he-img.png';
import CV from '../../assets/KYC.pdf';
import { Element } from 'react-scroll';

const About = () => {
  return (
          <Element id='about'>
           <section id='about'>
            <div className="wrapper p-block-5 border-bottom ">
             <div className="text-center">
               <span className="sub-text overlay-text middle" datatype="About Us">
                 Who We Are
               </span>
               <h2>About <span className="green-text"> Us</span></h2>
             </div>
       
             <div className="flex gap-5">
                <div className="about-image">
                   <img src={AboutImage} alt="" />
                   </div>
       
                      <div className="about-content">
                                 
                                   <h2>Who <span className='green-text'>We Are</span></h2>
                                   <p className='para'>Mussum Ipsum, cacilds vidis litro abertis. Tá deprimidis, 
                                       eu conheço uma cachacis que pode alegrar sua vidis.Sapien in monti palavris
                                        qui num significa nadis. 
                                      </p>
                   
                                      <div className='flex gap-2 m-block-3'>
                                       <div>
                                           <h6>6000+</h6>
                                           <p>Projects Completed</p>
                                       </div>
                                        <div>
                                           <h6>20+</h6>
                                           <p>Industry Covered </p>
                                       </div>
                                        <div>
                                           <h6>06+</h6>
                                           <p>Years of Experience</p>
                                       </div>
                   
                                      </div>
                                        <a href={CV} download="My CV" className='btn'>Download CV</a>
                               </div>
       
             </div>
             
             </div>
    </section>
    </Element>

  )
}

export default About