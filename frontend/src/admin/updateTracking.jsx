import React, { useState } from 'react';
import axios from 'axios';
import AdminNavbar from "../components/adminNavigation";


const UpdateTracking = () => {
  const [updateType, setUpdateType] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [orderId, setOrderId] = useState('');

  const updateTrackingData = async (orderId, update) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tracking/${orderId}`, // orderId in URL
        update, // Data payload (updateType, status, message)
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // If the request is successful, show a success message
      alert('Update added successfully!');
    } catch (error) {
      console.error('Error:', error.message);
      alert('Failed to update tracking data');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTrackingData(orderId, { updateType, status, message });
    // Clear the form
    setOrderId('');
    setUpdateType('');
    setStatus('');
    setMessage('');
  };

  return (
    <>
    <div className='row'>
      <div className='col-md-2 me-5'>

    <AdminNavbar/>
      </div>
      <div className='col-md-8'>

      
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow" style={{width: '100%'}}>
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Update Tracking Status</h3>
              <form onSubmit={handleSubmit}>
                {/* Order ID Field */}
                <div className="mb-3">
                  <label htmlFor="orderId" className="form-label">
                    Order ID:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="orderId"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                  />
                </div>

                {/* Update Type Field */}
                <div className="mb-3">
                  <label htmlFor="updateType" className="form-label">
                    Update Type:
                  </label>
                  <select
                    className="form-select"
                    id="updateType"
                    value={updateType}
                    onChange={(e) => setUpdateType(e.target.value)}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="verified">Verified</option>
                    <option value="hub">Hub</option>
                    <option value="pickup">Pickup</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>

                {/* Status Field */}
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status:
                  </label>
                  <select
                    className="form-select"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="Pending">Pending</option>
                    <option value="Quotation generated">Quotation generated</option>
                    <option value="Shipped">Shipped</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                {/* Message Field */}
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message:
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn w-25 text-white" style={{ background: "#2c3e50" }}>
                    Add Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

    </div>
    </>
  );
};

export default UpdateTracking;