import React from 'react';
import "./Services.css";
import { FaPencilRuler } from "react-icons/fa";
import { FaPenNib, FaLaptop, FaArrowRight } from "react-icons/fa";

const Services = () => {

    const renderServicesData = servicesData.map((service)=>{
        return <div className='card design' key={service.id}>
            <span className='service-icon'>{service.icon}</span>
            <h4 className='m-block-1'>{service.title}</h4>
            <p className='m-block-1 hide-text'>{service.description}</p>
            <a href="" className='link'>Learn More &nbsp; <FaArrowRight className='arrow green-text' /></a>
        </div>

    })
  return (
    <section id='service'>
        <div className='wrapper p-block-5 border-bottom'>
            <div className="flex between gap-4">
                <div>
                    <span className='sub-text overlay-text' datatype='Services'>Our Specialization</span>
                <h2><span className='green-text'>Our </span>Services  </h2></div>
                  <a href="" className='btn self-end'>View All Services</a>
            </div>
          <div className="flex gap-2 stretch mt-5">
            {renderServicesData}
          </div>
        </div>
    </section>
  )
}

export default Services;

const servicesData=[
{
    id:1,
    title: "UI/UX Design",
    description: "Mussum Ipsum, cacilds vidis litro abertis. Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.Sapien in monti palavris qui num significa nadis i pareci latim.Admodum accumsan disputationi eu sit. Vide electram sadipscing et per.A ordem dos tratores não altera o pão duris.",
    icon:<FaPencilRuler />,

},
{
    id:2,
    title: "Application Design",
    description: "Mussum Ipsum, cacilds vidis litro abertis. Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.Sapien in monti palavris qui num significa nadis i pareci latim.Admodum accumsan disputationi eu sit. Vide electram sadipscing et per.A ordem dos tratores não altera o pão duris.",
    icon:<FaPenNib />,
},
{
    id:3,
    title: "Website Design",
    description: "Mussum Ipsum, cacilds vidis litro abertis. Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.Sapien in monti palavris qui num significa nadis i pareci latim.Admodum accumsan disputationi eu sit. Vide electram sadipscing et per.A ordem dos tratores não altera o pão duris.",
    icon:<FaLaptop />,

},
]