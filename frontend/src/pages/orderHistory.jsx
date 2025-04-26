import React from 'react';
import UserNavigationCard from '../components/userNavigation';
import OrderComponent from '../components/orderComponent';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const OrderHistory = () => {
  return (
    <>
    <Navbar/>
    <div className="container-fluid my-5">
      <div className="row">
        <div className="col-md-3">
          <UserNavigationCard />
        </div>

        <div className="col-md-9 border rounded-1" style={{width: '900px'}}>
            <OrderComponent />
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default OrderHistory;
