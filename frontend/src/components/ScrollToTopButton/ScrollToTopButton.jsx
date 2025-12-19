import "./ScrollToTopButton.css";
import { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";

const ScrollToTopButton = () => {
      const [isVisible, setIsVisible] = useState(false);

      // Show button when page is scrolled down
      const toggleVisibility = () => {
        if (window.pageYOffset > 300) { // Adjust 300 to your desired scroll threshold
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };

      // Scroll to top on button click
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // For smooth scrolling
        });
      };

      useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
          window.removeEventListener('scroll', toggleVisibility);
        };
      }, []);

      return (
          <div className="scroll-to-top">
          {isVisible && (
            <button onClick={scrollToTop} className="scroll-button">
             <IoIosArrowUp />
            </button>
          )}
        </div>
      );
    };

    export default ScrollToTopButton;