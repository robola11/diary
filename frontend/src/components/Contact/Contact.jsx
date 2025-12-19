import "./Contact.css";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiMessageSquare } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm("service_em104qa", "template_ednr4ju", form.current, {
        publicKey: "fcIeoDkNFwDWabzWj",
      })
      .then(
        () => {
          toast.info("Message Sent!", {
            position: "top-center",
         
          });
          console.log("SUCCESS!");
          setIsSubmitting(false);
        },
        (error) => {
           toast.error("Failed To Send!", {
            position: "top-center",
         
          });
          console.log("FAILED...", error.text);
          setIsSubmitting(false);
        }
      );
  };

  return (
  
    <section id="contact">
      <div className="wrapper p-block-5 border-btm">
        <div className="text-center">
          <span className="sub-text overlay-text middle" datatype="Contact Us">
            Contact Us
          </span>
          <h2>
            Contact Us<span className="purple-text"> </span>{" "}
          </h2>
        </div>

        <div className="flex mt-5 gap-5 stretch">
          <form ref={form} onSubmit={sendEmail}>
            <div className="mt-1">
              <div className="input-container mt-1">
                <label htmlFor="email">Your Name*</label>
                <input
                  type="text"
                  className="input-field"
                  name="user_name"
                  id="user_name"
                  placeholder="Enter Name"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="input-container mt-1">
                <label htmlFor="email">Your Email*</label>
                <input
                  type="email"
                  className="input-field"
                  name="user_email"
                  id="user_email"
                  placeholder="Enter Email"
                  required
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="mt-1">
              <label htmlFor="message">Your Message*</label>
              <br />
              <textarea
                className="input-field"
                name="message"
                id="message"
                placeholder="Enter Message"
                rows={7}
                required
              ></textarea>
            </div>
            <div className="mt-1">
              <button
                type="submit"
                value="Send"
                className="btn"
                disabled={isSubmitting}>
                  <FiMessageSquare className='arrow' /> &nbsp;
                {isSubmitting ?   "Sending..." : " Send Message"}
              </button>
            </div>
            <ToastContainer />
          </form>
          <div className="info">
            <div className="detail gap-4">
              <div>
                <h6>Address</h6>
                <p>
                  Udu L.G.A, Delta State,
                  <br /> Nigeria
                </p>
              </div>
              <div>
                <h6>Contact</h6>
                <p>
                  Udu L.G.A, Delta State,
                  <br /> Nigeria
                </p>
              </div>
              <div>
                <h6>Time</h6>
                <p>
                  Udu L.G.A, Delta State,
                  <br /> Nigeria
                </p>
              </div>
            </div>
            <div className="bg-header rounded-b">
              <h5>Stay Connected</h5>
              <div className="flex gap-1 mt-2">
                <a href="" className="icon-container black-inverse">
                  <FaFacebookF />
                </a>
                <a href="" className="icon-container black-inverse">
                  <FaXTwitter />
                </a>
                <a href="" className="icon-container black-inverse">
                  <FaTwitter />
                </a>
                <a href="" className="icon-container black-inverse">
                  <FaPinterestP />
                </a>
                <a href="" className="icon-container black-inverse">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
  );
};

export default Contact;
