import React from 'react';
import UserNavigationCard from '../components/userNavigation';
import UserProfile from '../components/userSettings';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const ProfileSettings = () => {
  return (
    <>
    <Navbar/>
    <div className="container-fluid my-5">
      <div className="row">
        <div className="col-md-3">
          <UserNavigationCard />
        </div>

        <div className="col-md-9 border rounded-1" style={{width: '900px'}}>
            <UserProfile />
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ProfileSettings;
