import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import AddressForm from '../components/addressComponent';
import UserNavigationCard from '../components/userNavigation';

const DisplayAddress = () => {
  return (
    <>
      <Navbar/>
    <div className="container-fluid my-5">
      <div className="row">
        <div className="col-md-3">
          <UserNavigationCard />
        </div>

        <div className="col-md-9 border rounded-1" style={{width: '900px'}}>
            <AddressForm />
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default DisplayAddress;
