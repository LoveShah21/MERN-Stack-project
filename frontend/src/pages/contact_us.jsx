import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../css/contact_us.css";
import "../styles/contact.css";
import {
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaApple,
  FaLinkedin,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Contact = () => {
  const message = "Please reach to us";
  const [selectedValue, setSelectedValue] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Form field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Radio button change handler
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    setFormData({
      ...formData,
      subject: event.target.value,
    });

    // Clear subject error
    setErrors({
      ...errors,
      subject: "",
    });
  };

  // Validate form function
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
      isValid = false;
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address";
        isValid = false;
      }
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else {
      // Allow digits, spaces, and common phone number symbols
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = "Please enter a valid phone number";
        isValid = false;
      } else if (formData.phone.replace(/[^0-9]/g, "").length < 10) {
        newErrors.phone = "Phone number should have at least 10 digits";
        isValid = false;
      }
    }

    // Subject validation
    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
      isValid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please correct the errors in the form",
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/contact", {
        ...formData,
      });
      console.log("response sent", response.data);

      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your message has been sent successfully",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Failed to send your message. Please try again later.",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card mx-auto mb-4">
          <div className="card-body shadow-lg rounded-4">
            <div className="row">
              {/* Fix the column layout here */}
              <div className="col-lg-4 contact-info-column text-light rounded-4">
                <h3 className="mt-4">Contact Us</h3>
                <p
                  className="mb-5 fw-normal"
                  style={{
                    fontFamily: "IBM Plex Sans Hebrew",
                    color: "#C9C9C9",
                  }}
                >
                  Any questions or remark? Just write us a message
                </p>
                <div
                  className="mt-5 mb-4 fw-normal"
                  style={{ fontFamily: "IBM Plex Sans Hebrew" }}
                >
                  <p className="mb-5">
                    <FaWhatsapp className="me-2" />
                    <a
                      href={`https://wa.me/+916352274004?text=${message}`}
                      className="text-white text-decoration-none"
                      rel="noreferrer"
                      target="_blank"
                    >
                      +91 63522 74004
                    </a>
                  </p>
                  <p className="mb-5">
                    <FaEnvelope className="me-2" />
                    <a
                      href="mailto:info@aquaoverseas.com"
                      className="text-white text-decoration"
                    >
                      info@aquaoverseas.com
                    </a>
                  </p>
                </div>

                <div className="mb-5">
                  <p>
                    <FaMapMarkerAlt className="me-2" />
                    <a
                      href="https://www.google.com/maps/dir//Krish+Industrial+Park,+F-162,+Phase+IV,+Vatva+GIDC,+Ahmedabad,+Gujarat+382445/@22.9656502,72.5716213,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x395e879ed289d73d:0xb6479bc1767384ae!2m2!1d72.6540229!2d22.9656715?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D"
                      className="text-white text-decoration-none"
                    >
                      F159 & 162, Krish Industrial Park,
                      <br />
                      GIDC Phase 4 Vatva, Ahmedabad,
                      <br />
                      Gujarat, India - 382445
                      <br />
                    </a>
                  </p>
                </div>
                {/* Social Icons */}
                <div
                  className="mb-3 d-flex justify-content-start align-items-end social-icons"
                  style={{ paddingTop: "75px" }}
                >
                  <a
                    href="https://www.linkedin.com/company/aquaoverseas/"
                    className="text-decoration-none mx-2 shadow-lg p-2 rounded-circle"
                    style={{ background: "#0076B2" }}
                  >
                    <FaLinkedin size={32} color="white" />
                  </a>
                </div>
              </div>
              <div className="col-lg-8 form-column">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="firstName" className="form-label">
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.firstName ? "is-invalid" : ""
                        }`}
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter First Name"
                      />
                      {errors.firstName && (
                        <div className="invalid-feedback">
                          {errors.firstName}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="lastName" className="form-label">
                        Last Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.lastName ? "is-invalid" : ""
                        }`}
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter Last Name"
                      />
                      {errors.lastName && (
                        <div className="invalid-feedback">
                          {errors.lastName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Email"
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label">
                        Phone Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        className={`form-control ${
                          errors.phone ? "is-invalid" : ""
                        }`}
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter Phone Number"
                      />
                      {errors.phone && (
                        <div className="invalid-feedback">{errors.phone}</div>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Select Subject <span className="text-danger">*</span>
                    </label>
                    {errors.subject && (
                      <div className="text-danger small mb-2">
                        {errors.subject}
                      </div>
                    )}
                    <div className="row ms-2" style={{ fontSize: 14 }}>
                      {/* General Inquiry */}
                      <div className="col form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="subject"
                          id="generalInquiry"
                          value="General Inquiry"
                          checked={formData.subject === "General Inquiry"}
                          onChange={handleRadioChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="generalInquiry"
                        >
                          General Inquiry
                        </label>
                      </div>

                      {/* Product Inquiry */}
                      <div className="col form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="subject"
                          id="productInquiry"
                          value="Product Inquiry"
                          checked={formData.subject === "Product Inquiry"}
                          onChange={handleRadioChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="productInquiry"
                        >
                          Product Inquiry
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Message <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className={`form-control ${
                        errors.message ? "is-invalid" : ""
                      }`}
                      id="message"
                      name="message"
                      rows="4"
                      placeholder="Write your message"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                    {errors.message && (
                      <div className="invalid-feedback">{errors.message}</div>
                    )}
                  </div>

                  <div className="d-flex justify-content-end rounded">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ width: "175px", height: "50px" }}
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
