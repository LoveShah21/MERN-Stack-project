import React, { useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/adminNavigation";

const NotificationForm = () => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("email");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/notifications/send", {
        message,
        type,
      });
      alert("Notification sent successfully to all users");
    } catch (error) {
      console.error(error);
      alert("Failed to send notification");
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-2 me-5">
          <AdminNavbar />
        </div>
        <div className="container col-md-8 mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-lg" style={{width: '100%'}}>
                <div
                  className="card-header text-white"
                  style={{ background: "#2c3e50" }}
                >
                  <h3 className="card-title">Send Notification</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">
                        Message:
                      </label>
                      <textarea
                        id="message"
                        className="form-control"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows="5"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="type" className="form-label">
                        Notification Type:
                      </label>
                      <select
                        id="type"
                        className="form-select"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option value="email">Email</option>
                        <option value="sms">SMS</option>
                      </select>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn w-25 text-white"
                        style={{ background: "#2c3e50" }}
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationForm;
