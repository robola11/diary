import "./Education.css";
import { FaGraduationCap } from "react-icons/fa6";
import { FaSuitcase } from "react-icons/fa";
import { Link, Element } from 'react-scroll';

const Education = () => {

  const Card =(props)=>{
    return (
      <div className="card design ">
        <div className="flex gap-1">
          <div className="icon-container green-inverse">
              {props.icon}
          </div>
          <h3>{props.title}</h3>
        </div>
        <div className="mt-2">
          {props.item.map(education => {

            return(
              <div className="flex between mt-2" key={education.id}>
                <div>
                  <span className="sub-text">{education.institute}</span>
                  <p>{education.subtitle}</p>
                </div>
                <div className="list">{education.date}</div>
              </div>
            )
          })}
        </div>
      </div>
    )


  }

  return (
     <Element name="education">
    <section  id="education">
     <div className="wrapper p-block-7 border-bottom">
      <div className="text-center">
        <span className="sub-text overlay-text middle" datatype="Education & Work">
          Education & Work
        </span>
        <h2>My <span className="green-text">Academic & <br />Professional</span> Journey</h2>
      </div>
      <div className="flex gap-5 mt-5">
      <Card item={education} title="Education" icon ={<FaGraduationCap />}/>
      <Card item={workExperience} title="Work Experience" icon ={<FaSuitcase />}/>
      </div>
     </div>
    </section>
    </Element>
  )
}

export default Education;

const education =[
  {id: 1,
    institute: "DSC THS",
    subtitle: "Faculty of Arts",
    date:"20-12-2023",
  },

   {id: 2,
    institute: "DELSU",
    subtitle: "Faculty of Law",
    date:"20-12-2023",
  },

   {id: 3,
    institute: "UNIBEN",
    subtitle: "Faculty of Law",
    date:"20-12-2023",
  },

]
const workExperience =[
  {id: 1,
    institute: "DSC THS",
    subtitle: "Faculty of Arts",
    date:"20-12-2023",
  },

   {id: 2,
    institute: "DELSU",
    subtitle: "Faculty of Law",
    date:"20-12-2023",
  },

   {id: 3,
    institute: "UNIBEN",
    subtitle: "Faculty of Law",
    date:"20-12-2023",
  },

]