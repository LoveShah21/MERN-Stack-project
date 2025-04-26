import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    email: "",
    phoneNo: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
        error = value.trim() ? "" : "First name is required";
        break;
      case "lastName":
        error = value.trim() ? "" : "Last name is required";
        break;
      case "address":
        error = value.trim() ? "" : "Address is required";
        break;
      case "city":
        error = value.trim() ? "" : "City is required";
        break;
      case "state":
        error = value.trim() ? "" : "State is required";
        break;
      case "country":
        error = value.trim() ? "" : "Country is required";
        break;
      case "zipcode":
        if (!value.trim()) {
          error = "Zipcode is required";
        } else if (!/^\d+$/.test(value)) {
          error = "Zipcode should contain numbers only";
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        error = value.trim() ? (emailRegex.test(value) ? "" : "Enter a valid email address") : "Email is required";
        break;
      case "phoneNo":
        const phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        error = value.trim() ? (phoneRegex.test(value) ? "" : "Enter a valid phone number (e.g., 123-456-7890)") : "Phone number is required";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    
    // For zipcode field, only allow numeric input
    if (id === "zipcode" && value !== "") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData({
        ...formData,
        [id]: numericValue,
      });
      
      // Validate with the cleaned numeric value
      const error = validateField(id, numericValue);
      setErrors({
        ...errors,
        [id]: error,
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
      
      // Validate the field as it's being changed
      const error = validateField(id, value);
      setErrors({
        ...errors,
        [id]: error,
      });
    }
  };

  const handleBlur = (e) => {
    const { id } = e.target;
    setTouched({
      ...touched,
      [id]: true,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate all fields
    Object.keys(formData).forEach((key) => {
      if (key !== "companyName") { // Company name is optional
        const error = validateField(key, formData[key]);
        if (error) {
          isValid = false;
          newErrors[key] = error;
        }
      }
    });

    setErrors(newErrors);
    // Mark all fields as touched on submit
    const allTouched = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      console.log("Form has errors, please correct them");
      return;
    }

    try {
      const token = localStorage.getItem("auth_token");
      const response = await axios.post(
        "http://localhost:5000/api/address",
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      console.log("Address added/updated:", response.data);
      alert("Address saved successfully!");
      navigate("/cart");
    } catch (error) {
      console.error("Error adding/updating address:", error);
      alert("Failed to save address. Please try again.");
    }
  };

  const getInputClassName = (fieldName) => {
    return `form-control ${touched[fieldName] && errors[fieldName] ? "is-invalid" : ""}`;
  };

  return (
    <>
      <Navbar />
      <div className="my-5">
        <div className="container my-5">
          <div className="row">
            {/* Billing Information Section */}
            <div className="col-md-6" style={{ width: "75%" }}>
              <h3>Billing Information</h3>
              <form onSubmit={handleSubmit} noValidate>
                <div className="row mt-2">
                  <div className="col form-group">
                    <label htmlFor="firstName" className="mb-2 my-2 fw-normal">
                      User name <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex">
                      <div className="me-auto" style={{ width: "200px" }}>
                        <input
                          type="text"
                          className={getInputClassName("firstName")}
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="First Name"
                          required
                        />
                        {touched.firstName && errors.firstName && (
                          <div className="invalid-feedback">{errors.firstName}</div>
                        )}
                      </div>
                      <div style={{ width: "200px" }}>
                        <input
                          type="text"
                          className={getInputClassName("lastName")}
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Last Name"
                          required
                        />
                        {touched.lastName && errors.lastName && (
                          <div className="invalid-feedback">{errors.lastName}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col form-group">
                    <label
                      htmlFor="companyName"
                      className="mb-2 my-2 fw-normal"
                    >
                      Company name (Optional)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="address" className="my-2 fw-normal">
                    Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={getInputClassName("address")}
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {touched.address && errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </div>
                <div className="form-row mt-2">
                  <div className="row">
                    <div
                      className="col form-group col-md-4"
                      style={{ width: "25%" }}
                    >
                      <label htmlFor="country" className="my-2 mb-2 fw-normal">
                        Country <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={getInputClassName("country")}
                        id="country"
                        value={formData.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {touched.country && errors.country && (
                        <div className="invalid-feedback">{errors.country}</div>
                      )}
                    </div>
                    <div
                      className="col form-group col-md-4"
                      style={{ width: "25%" }}
                    >
                      <label htmlFor="state" className="my-2 mb-2 fw-normal">
                        Region/State <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={getInputClassName("state")}
                        id="state"
                        value={formData.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {touched.state && errors.state && (
                        <div className="invalid-feedback">{errors.state}</div>
                      )}
                    </div>
                    <div
                      className="col form-group col-md-4"
                      style={{ width: "25%" }}
                    >
                      <label htmlFor="city" className="my-2 mb-2 fw-normal">
                        City <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={getInputClassName("city")}
                        id="city"
                        value={formData.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {touched.city && errors.city && (
                        <div className="invalid-feedback">{errors.city}</div>
                      )}
                    </div>
                    <div
                      className="col form-group col-md-4"
                      style={{ width: "25%" }}
                    >
                      <label htmlFor="zipcode" className="my-2 mb-2 fw-normal">
                        Zip Code <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={getInputClassName("zipcode")}
                        id="zipcode"
                        value={formData.zipcode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Numbers only"
                        required
                      />
                      {touched.zipcode && errors.zipcode && (
                        <div className="invalid-feedback">{errors.zipcode}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col form-group">
                    <label htmlFor="email" className="my-2 mb-2 fw-normal">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className={getInputClassName("email")}
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {touched.email && errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="col form-group">
                    <label
                      htmlFor="phoneNo"
                      className="my-2 mb-2 fw-normal"
                    >
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      className={getInputClassName("phoneNo")}
                      id="phoneNo"
                      value={formData.phoneNo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="123-456-7890"
                      required
                    />
                    {touched.phoneNo && errors.phoneNo && (
                      <div className="invalid-feedback">{errors.phoneNo}</div>
                    )}
                  </div>
                </div>
                <button type="submit" className="mt-5 btn btn-primary">
                  Save Address
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Address;