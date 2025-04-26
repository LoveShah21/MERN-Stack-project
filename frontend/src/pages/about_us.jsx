import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import img1 from '../assets/about_us/top_img.png';
import '../css/about.css'; // Import a custom CSS file for media queries

const About = () => {
  return (
    <>
      <Navbar />
      <div className="bg-light">
        <div>
          {/* Header Section */}
          <header className="container mx-auto px-4 py-5 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-dark">We’re here to </h2>
            <h2>
              <span className="text-3xl md:text-4xl lg:text-5xl text-primary py-2 border-bottom border-3 border-secondary">
                guarantee your success
              </span>
            </h2>
          </header>

          {/* Blue Box with Aligned Image */}
          <div className="position-relative mx-auto" style={{ maxWidth: "800px" }}>
            {/* Blue Background */}
            <div className="p-4 bg-primary text-white rounded" style={{ height: '250px' }}>
              <p className="lead text-sm md:text-base lg:text-lg">
                Established in 2022, Aqua provides top-quality industrial machinery, spares, and turnkey solutions, specializing in plastics and packaging projects. With over 20 years of expertise, we ensure efficiency, timely delivery, and 24/7 support through Annual Maintenance Contracts (AMC).
              </p>
            </div>

            {/* Image Aligned to Bottom (conditional positioning) */}
            <div className="image-container">
              <img
                src={img1}
                alt="Our Team"
                className="rounded img-fluid"
                style={{ maxWidth: "600px" }}
              />
            </div>
          </div>

          {/* Spacer for proper layout flow */}
          <div style={{ height: "200px" }}></div>

          {/* Secondary Header */}
          <div className="container mx-auto px-4 py-5 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-dark">We’re here for you</h2>
            <h2>
              <span className="text-3xl md:text-4xl lg:text-5xl text-primary py-2 border-bottom border-3 border-secondary">
                no matter where you are
              </span>
            </h2>
          </div>

          {/* Mission Section */}
          <section className="p-5 bg-light">
            <div className="container mx-auto px-4 py-5">
              <h3 className="text-2xl md:text-3xl lg:text-4xl fw-bold text-dark border-bottom border-3 border-secondary">
                Our <span className="text-primary">Mission</span>
              </h3>
              <div className="mt-4">
                {[
                  "Consistently Delivering Top-Tier Solutions:",
                  "Focus on Cost-Effectiveness:",
                  "Leveraging Expertise and Advanced Technologies:",
                  "Providing Unparalleled Value to Customers:",
                  "Commitment to Understanding Client Needs:",
                  "Exceeding Expectations and Optimizing Investments:",
                  "Continuous Improvement and Customer-Centric Approach:",
                  "Becoming a Trusted Partner in Client Success:"
                ].map((mission, index) => (
                  <div key={index} className="row mt-3">
                    <p className="col-md-6"><strong>{mission}</strong></p>
                    <p className="col-md-6 text-muted">
                      {[
                        "Meeting the highest standards of quality and innovation. Ensuring every solution aligns with customer requirements and industry benchmarks.",
                        "Balancing quality with affordability to maximize value for clients. Optimizing resources to minimize operational and investment costs.",
                        "Utilizing deep industry knowledge to address complex challenges. Implementing cutting-edge technologies to drive efficiency and innovation.",
                        "Customizing solutions to address unique client needs and goals. Enhancing client competitiveness in their respective markets.",
                        "Conducting thorough analysis to identify challenges and opportunities. Designing tailored strategies to meet specific business objectives.",
                        "Delivering solutions that surpass customer expectations. Ensuring high returns on investment through meticulous planning and execution.",
                        "Regularly refining processes and methodologies to stay ahead of industry trends. Focusing on building strong, long-term relationships with clients.",
                        "Collaborating closely to align solutions with customer growth strategies. Providing consistent support to foster sustained business achievements."
                      ][index]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Vision Section */}
          <section className="p-5 bg-light">
            <div className="container mx-auto px-4 py-5">
              <h3 className="text-2xl md:text-3xl lg:text-4xl fw-bold text-dark border-bottom border-3 border-secondary">
                Our <span className="text-primary">Vision</span>
              </h3>
              <div className="mt-4">
                {[
                  "Trusted Partner:",
                  "Innovation:",
                  "Client Focus:",
                  "Value Creation:",
                  "Excellence:",
                  "Sustainability:"
                ].map((vision, index) => (
                  <div key={index} className="row mt-3">
                    <p className="col-md-6"><strong>{vision}</strong></p>
                    <p className="col-md-6 text-muted">
                      {[
                        "Build long-term relationships through reliability and expertise.",
                        "Deliver cutting-edge, tailored technical solutions.",
                        "Understand and align with client goals.",
                        "Enhance efficiency, productivity, and cost-effectiveness.",
                        "Maintain high-quality standards and continuous improvement.",
                        "Promote ethical and eco-friendly practices."
                      ][index]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;