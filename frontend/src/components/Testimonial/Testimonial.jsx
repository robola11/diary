import "./Testimonial.css";
import { FaStar } from "react-icons/fa";
import Profile1 from "../../assets/profile1.jpg";
import Profile2 from "../../assets/profile2.jpg";
import Profile3 from "../../assets/profile3.jpg";
import Profile4 from "../../assets/profile4.jpg";
import Profile5 from "../../assets/profile5.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Element } from "react-scroll";

const Testimonial = () => {
  const renderTestimonialsData = testimonialsData.map((review) => {
    return (
      <div className="card" key={review.id}>
        <div className="flex gap-2"> 
          <div className="profile">
            <img src={review.image} alt="" />
          </div>
      <div>
        <h4>{review.name}</h4>
        <p>{review.title}</p>
        <span>{Array.from({ length: review.rating }, (_,i) => 
              <FaStar key={i} className="rating-star" />
        
          
        )}</span>
       
        </div>
      </div>

      <div>
        <p className="para">{review.text} </p>
        </div>
        </div>
    );
  });

  return (
    <Element id="testimony">
    <section id="testimony border-bottom">
      <div className="wrapper p-block-4  mt-5 border-bottom">
        <div className="text-center">
          <span className="sub-text overlay-text middle" datatype="Testimonial">
            Clients Testimonials
          </span>
          <h2>
            Testimonials<span className="green-text"></span>{" "}
          </h2>
        </div>
       <Slider {...settings} className="mt-5 mb-3">
            {renderTestimonialsData}
       </Slider>
      </div>
    </section>
    </Element>
  );
};

export default Testimonial;

const testimonialsData = [
  {
    id: 1,
    name: "John James",
    title: "Head of Art",
    image: Profile1,
    rating: 4,
    text: "Sapien in monti palavris qui num signicaçá sua turmis!Interagi no mé",
  },

  {
    id: 2,
    name: "Ken Jacobs",
    title: "Head of Web",
    image: Profile2,
    rating: 3,
    text: "Sapien in monti palavris qui num signicaçá sua turmis!Interagi no mé",
  },

  {
    id: 3,
    name: "Kane Cobbs",
    title: "Head of Design",
    image: Profile3,
    rating: 5,
    text: "Sapien in monti palavris qui num signicaçá sua turmis!Interagi no mé",
  },

  {
    id: 4,
    name: "Hicks Gibbs",
    title: "Head of Design",
    image: Profile4,
    rating: 3,
    text: "Sapien in monti palavris qui num signicaçá sua turmis!Interagi no mé",
  },
  {
    id: 5,
    name: "Michael Smith",
    title: "Head of Design",
    image: Profile5,
    rating: 5,
    text: "Sapien in monti palavris qui num signicaçá sua turmis!Interagi no mé",
  },
];


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    
    responsive:[
        {
            breakpoint:790,
            settings:{
                slidesToShow:1,
            }
        }
    ]
  };
