import "./Plans.css";
import { FaArrowRight } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

const Plans = () => {
  const renderPlansData = pricingData.map((plan) => {
    return (
      <div className="card" key={plan.id}>
        <div className="bg-header flex between">
          <div>
            <strong>{plan.title}</strong>
            <h5 className="mt-1">
              {plan.price}
              <small>/{plan.unit}</small>
            </h5>
          </div>
          <a href="#" className="icon-container black-inverse rotate self-start">
            <FaArrowRight />
          </a>
        </div>

        <ul>
            {plan.features.map(list=>{
                return(
                      <li className="feature flex gap-1 mt-1"
                      style={{opacity:list.included ? 1 : 0.15}} key={list.id}>
                        <span className="check"><FaCheck /></span>
                        {list.label}
                      </li>
            )
            })}
          
        </ul>
      </div>
    );
  });



  return (
    <section id="plans">
      <div className="wrapper p-block-7 border-bottom">
        <div className="flex between gap-4">
          <div>
            <span className="sub-text overlay-text" datatype="Pricing">
              Pricing Table
            </span>
            <h2>
              My <span className="green-text">Pricing Model</span>
            </h2>
          </div>
          <a href="" className="btn self-end">
            Get Started
          </a>
        </div>
        <div className=" flex mt-5 gap-5">{renderPlansData}</div>
      </div>
    </section>
  );
};

export default Plans;

const pricingData = [
  {
    id: 1,
    title: "Hourly",
    price: "$50",
    unit: "Hour",
    highlighted: true,
    features: [
      { id: 1, label: "lorem ipsum dolor sit amet", included: true },
      { id: 2, label: "lorem ipsum dolor sit amet", included: true },
      { id: 3, label: "lorem ipsum dolor sit amet", included: true },
      { id: 4, label: "lorem ipsum dolor sit amet", included: true },
      { id: 5, label: "lorem ipsum dolor sit amet", included: false },
      { id: 6, label: "lorem ipsum dolor sit amet", included: false },
      { id: 7, label: "lorem ipsum dolor sit amet", included: false },
      { id: 8, label: "lorem ipsum dolor sit amet", included: false },
    ],
  },

  {
    id: 2,
    title: "Monthly",
    price: "$950",
    unit: "Month",
    highlighted: true,
    features: [
      { id: 1, label: "lorem ipsum dolor sit amet", included: true },
      { id: 2, label: "lorem ipsum dolor sit amet", included: true },
      { id: 3, label: "lorem ipsum dolor sit amet", included: true },
      { id: 4, label: "lorem ipsum dolor sit amet", included: true },
      { id: 5, label: "lorem ipsum dolor sit amet", included: true },
      { id: 6, label: "lorem ipsum dolor sit amet", included: true },
      { id: 7, label: "lorem ipsum dolor sit amet", included: false },
      { id: 8, label: "lorem ipsum dolor sit amet", included: false },
    ],
  },

  {
    id: 3,
    title: "Quarterly",
    price: "$2050",
    unit: "Qtr",
    highlighted: true,
    features: [
      { id: 1, label: "lorem ipsum dolor sit amet", included: true },
      { id: 2, label: "lorem ipsum dolor sit amet", included: true },
      { id: 3, label: "lorem ipsum dolor sit amet", included: true },
      { id: 4, label: "lorem ipsum dolor sit amet", included: true },
      { id: 5, label: "lorem ipsum dolor sit amet", included: true },
      { id: 6, label: "lorem ipsum dolor sit amet", included: true },
      { id: 7, label: "lorem ipsum dolor sit amet", included: true },
      { id: 8, label: "lorem ipsum dolor sit amet", included: true },
    ],
  },
];
