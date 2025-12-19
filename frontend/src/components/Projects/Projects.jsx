import "./Projects.css";
import Project1 from '../../assets/lawbg1.jpg';
import Project2 from '../../assets/lawbg4.jpg';
import Project3 from '../../assets/lawbg6.webp';
import { FaArrowRight } from "react-icons/fa";

const Projects = () => {

 const renderProjectsData = projectsData.map((project)=>{
        return <div className='card flex gap-5 project' key={project.id}>
            <div className="project-image">
                <img src={project.image} />
            
            </div>
            <div className="project-content">
                <ul className="flex gap-1">
                    {project.tech.map((technology)=>{
                        return(
                            <li key={technology.id} className="list">{technology.list}</li>
                        )

                    })}
                </ul>
                <h3 className="mt-2">{project.title}</h3>
                <p className="para">{project.description}</p>
                <a href="#" className="icon-container border-inverse rotate"><FaArrowRight /></a>
            </div>
          
        </div>

    })

  return (
    <section id="project">
        <div className="wrapper p-block-7 border-bottom">
             <div className="flex between gap-4">
                <div>
                    <span className='sub-text overlay-text' datatype='Portfolio'>Our Portfolio</span>
                <h2><span className='green-text'>Portfolio</span></h2></div>
                  <a href="" className='btn self-end'>View All Projects</a>
            </div>
            <div className="flex column gap-2 mt-5">
                {renderProjectsData}
            </div>
        </div>
    </section>
  )
}

export default Projects;

 

const projectsData =[
    {
        id:1,
        title:" Tá deprimidis, eu conheço uma cachacis que pode",
        description: "Sapien in monti palavris qui num significa nadis i pareci latim.Quem num gosta di mim que vai caçá sua turmis!Interagi no mé",
        image: Project1,
        tech: [
            {
                 id:1, list: "React",
            },
              {
                 id:2, list: "Express",
            },
              {
                 id:3, list: "Nextjs",
            },
        ]
    },
       {
         id:2,
        title:" Sapien in monti palavris qui num significa nadis",
        description: "Sapien in monti palavris qui num significa nadis i pareci latim.Quem num gosta di mim que vai caçá sua turmis!Interagi no mé",
        image: Project2,
        tech: [
            {
                 id:1, list: "Node js",
            },
              {
                 id:2, list: "Express",
            },
              {
                 id:3, list: "MySql",
            },
        ]
    },
       {
         id:3,
        title:" Quem num gosta di mim que vai caçá sua turmis!Interagi",
        description: "Sapien in monti palavris qui num significa nadis i pareci latim.Quem num gosta di mim que vai caçá sua turmis!Interagi no mé",
        image: Project3,
        tech: [
            {
                 id:1, list: "Python",
            },
              {
                 id:2, list: "Github",
            },
              {
                 id:3, list: "CoreFTP",
            },
        ]
    },
]