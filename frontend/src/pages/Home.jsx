import Topnav from '../components/Topnav/Topnav';
import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import About from "../components/About/About";
import Projects from "../components/Projects/Projects";
import Plans from "../components/Plans/Plans";
import Testimonial from "../components/Testimonial/Testimonial";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton/ScrollToTopButton";

const Home = () => {
  return (
      <div>
       <Topnav />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Plans />
      <Testimonial />
      <Contact />
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}

export default Home