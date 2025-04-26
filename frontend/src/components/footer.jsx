import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"; // Import icons from react-icons
import { Link } from "react-router-dom";
import img1 from "../assets/logo/preview.png";
import img2 from "../assets/footer/catalogue-qr.jpeg";

const Footer = () => {
  return (
    <footer className="text-white py-5" style={{ background: "black" }}>
      <div className="container" style={{ width: "100%" }}>
        <div className="text-center mb-4">
          <img
            src={img1} // Replace with your image URL
            alt="logo"
            className="image-fluid"
            style={{ maxWidth: "250px", height: "" }}
          />
        </div>
        <hr style={{ width: "90%", color: "white" }}></hr>
        <div className="row " style={{ width: "100%" }}>
          {/* Reach Us Section */}
          <div className="col me-5">
            <h5 className="mb-3">Reach us</h5>
            <h4 className="mb-3">AquaOverseas Solutions LLP</h4>
            <ul className="list-unstyled">
              <li className="mb-2">
                <FaPhone className="me-2" />
                <a
                  href="tel:+916352274004"
                  className="text-white text-decoration-none"
                >
                  +91 63522 74004
                </a>
              </li>
              <li className="mb-2">
                <FaEnvelope className="me-2" />
                <a
                  href="mailto:info@aquaoverseas.com"
                  className="text-white text-decoration-none"
                >
                  info@aquaoverseas.com
                </a>
              </li>
              <li className="mb-2">
                <FaMapMarkerAlt className="me-2" />
                <span>
                <a
                  href="https://www.google.com/maps/dir//Krish+Industrial+Park,+F-162,+Phase+IV,+Vatva+GIDC,+Ahmedabad,+Gujarat+382445/@22.9656502,72.5716213,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x395e879ed289d73d:0xb6479bc1767384ae!2m2!1d72.6540229!2d22.9656715?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D"
                  className="text-white text-decoration-none"
                >
                  F159 & 162, Krish Industrial Park, GIDC Phase 4 Vatva,
                  Ahmedabad, Gujarat, India - 382445
                </a>
                </span>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="col me-2">
            <h5 className="mb-3">Company</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to="/about-us"
                  className="text-white text-decoration-none"
                >
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/contact-us"
                  className="text-white text-decoration-none"
                >
                  Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/our-services"
                  className="text-white text-decoration-none"
                >
                  Our Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="col me-2">
            <h5 className="mb-3">Legal</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="/privacy-policy"
                  className="text-white text-decoration-none"
                >
                  Privacy Policy
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/terms-and-services"
                  className="text-white text-decoration-none"
                >
                  Terms & Services
                </a>
              </li>
            </ul>
          </div>
          <div className="col me-5">
          <h5 className="mb-3">Check Our Product Range</h5>
            <img
              src={img2} // Replace with your image URL
              alt="catalogue-qr"
              className="image-fluid rounded-5"
              style={{ maxWidth: "250px", height: "" }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
