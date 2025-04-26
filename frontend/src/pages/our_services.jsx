import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';
import img1 from '../assets/our_services/rectangle.png';
import '../css/our_services.css';

const Our_services = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid p-0"> {/* Use container-fluid and remove padding */}
        <div className="text-center my-5">
          <h1 className="display-4">We’re here to </h1>
          <h1 className="display-4" style={{ color: '#017AFF' }}>offer you the best</h1>
          <hr className='mx-auto border-5' style={{ background: '#D0D5DD', width: '50%' }} />
        </div>

        <div className="row g-0 my-5 rounded-5 p-2 p-md-5 mx-auto" style={{ background: "#7BB5E9", width: '90%', maxWidth: '1200px', transition: 'all 0.6s ease' }}>
          <div className="text-center text-white">
            <h1 className="display-5">You can do it all.</h1>
            <h1 className="display-5">With Aqua Overseas.</h1>
          </div>
          <div className="col-12 col-md-6 mt-3 me-3">
            <div className="card text-white custom1" style={{ background: "#365C81", transition: 'all 0.3s ease', width: '100%' }}>
              <div className="card-body">
                <h5 className="card-title text-white mt-2">E-Commerce</h5>
                <p className="card-text fw-normal" style={{ fontFamily: 'IBM Plex Sans Hebrew' }}>
                  We offer a diverse range of high-quality products sourced from reliable global suppliers. Our portfolio includes industrial machinery, consumer goods, and raw materials, ensuring competitive pricing and timely delivery to meet the varied needs of our international clientele.
                </p>
                <Link to="/products" className="btn btn-primary rounded-pill bg-white text-black" style={{width:'25%'}}>Shop Now &#11106;</Link>
                <img
                  src={img1}
                  alt="login"
                  className="img-fluid mt-3 ms-3"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5 mt-3">
            <div className="card p-3 text-white custom1 mb-3" style={{ background: '#166FC2', transition: 'all 0.3s ease', width: '100%' }}>
              <div className="card-body">
                <h5 className="card-title">General Trading EXIM</h5>
                <p className="card-text fw-normal">
                  General Trading EXIM specializes in the import and export of a wide array of goods, ensuring seamless international transactions. We focus on market research, compliance, logistics, and risk management to provide our clients with competitive and reliable trading solutions.
                </p>
                <a href="/start-with-your-trade" className="btn rounded-pill bg-white text-black">Start with your trade &#11106;</a>
              </div>
            </div>
            <div className="card p-4 custom1" style={{ background: '#B1D8FC', transition: 'all 0.3s ease', width: '100%' }}>
              <div className="card-body">
                <h5 className="card-title">Project Consultancy</h5>
                <p className="card-text fw-normal">
                  Our project consultancy services offer expert guidance in planning, executing, and managing projects across various industries. We provide tailored solutions to optimize resources, ensure regulatory compliance, and achieve project goals efficiently and effectively.
                </p>
                <Link to="/project-consultancy" className="btn btn-primary rounded-pill bg-white text-black" style={{width:'40%'}}>Enquire Now &#11106;</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Our_services;

