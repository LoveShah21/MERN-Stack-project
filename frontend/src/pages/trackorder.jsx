import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
// import doubletick from '../assets/trackorder/doubletick.png';
// import details from '../assets/trackorder/details.png';
// import location from '../assets/trackorder/location.png';
// import notes from '../assets/trackorder/notes.png';
// import tick from '../assets/trackorder/tick.png';
// import user from '../assets/trackorder/user.png';
import TrackingComponent from '../components/trackingComponent';

const TrackOrder = () => {
  return (
    <>
      <Navbar />
      <TrackingComponent />
      <Footer />
    </>
  );
};

export default TrackOrder;