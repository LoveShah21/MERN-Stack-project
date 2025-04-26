import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import img1 from "../assets/project_consultancy/image.webp";

const ProjectConsultancy = () => {
  return (
    <>
      <Navbar />
      <div>
        {/* Hero Section */}
        <div className="text-center my-4">
          <h3 className="text-primary">PROJECT CONSULTANCY SERVICE</h3>
          <div className="container mt-3 p-5 rounded-5">
            <img
              src={img1}
              alt="Consultancy"
              className="img-fluid rounded"
            />
          </div>
        </div>

        {/* Content Sections */}
        <div className="container my-5">
          {sections.map((section, index) => (
            <div key={index} className="mb-4">
              <h5 className="fw-bold">{section.title}</h5>
              <p>{section.content}</p>
            </div>
          ))}
        </div>

        {/* Contact Button */}
        <div className="text-center my-5">
          <Link to="/contact-us">
            <button className="btn btn-primary">CONTACT US</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

const sections = [
  {
    title: "PROJECT MANAGEMENT",
    content:
      "At Aqua Overseas, we provide end-to-end project management solutions, ensuring seamless execution from planning to completion. Our expertise includes procurement, logistics, installation, and commissioning of industrial machinery. With a focus on efficiency, cost-effectiveness, and quality, we manage projects of all scales, offering turnkey solutions tailored to client needs. Our dedicated team ensures timely delivery, optimal resource utilization, and compliance with industry standards, making us the preferred partner for industrial solutions worldwide.",
  },
  {
    title: "PROJECT CONSULTANCY",
    content:
      "Aqua Overseas offers expert project consultancy services to help businesses optimize their industrial operations. From feasibility analysis and strategic planning to process optimization and cost reduction, our team provides tailored solutions to enhance efficiency and productivity. We assist in selecting the right machinery, ensuring regulatory compliance, and implementing best industry practices. With our extensive expertise, we guide clients through every stage of their project, ensuring success and long-term sustainability.",
  },
  {
    title: "GREEN-FIELD PROJECT",
    content:
      "Aqua Overseas specializes in Greenfield project management, helping businesses establish new industrial setups from the ground up. Our services cover site selection, feasibility studies, infrastructure planning, machinery procurement, installation, and commissioning. With a focus on innovation, sustainability, and efficiency, we ensure a seamless project lifecycle, from concept to full-scale operations. Our expert team delivers turnkey solutions tailored to industry-specific requirements, ensuring optimal performance and long-term success.",
  },
  {
    title: "BROWN-FIELD PROJECT",
    content:
      "Aqua Overseas provides specialized Brownfield project solutions, helping businesses upgrade, expand, and modernize existing industrial setups. Our expertise includes process optimization, capacity enhancement, machinery retrofitting, and compliance upgrades. We ensure minimal downtime, cost-effective execution, and seamless integration of new technologies into existing infrastructure. With our end-to-end project management approach, we help industries maximize efficiency, improve sustainability, and achieve long-term growth.",
  },
];

export default ProjectConsultancy;
