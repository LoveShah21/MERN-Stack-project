import React from 'react';
import tickmark from '../assets/checkout/CheckCircle.png';
import stack from '../assets/checkout/Stack.png';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

const SuccessMessage = () => {
  return (
    <>
    <Navbar />
    
    <div className="container text-center my-5">
      <img src={tickmark} alt='success' className='img-fluid' />
      <h2 className="mb-4">Your Inquiry is generated Successfully</h2>
      <p className="mb-4">
        Track your order by clicking on the view order
        <br />
       Or directly to your Order History section in the dashboard
      </p>
      <div className="d-flex justify-content-center gap-3">
        <Link to='/' className='btn btn-outline-danger'>
          <img src={stack} alt='stack'/>&nbsp;
          GO TO DASHBOARD</Link>
          <Link to="/profile/dashboard/orderHistory">
        <button className='btn btn-danger'>VIEW ORDER →</button></Link>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default SuccessMessage;