import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Import your icons (replace with your actual imports)
import doubletick from "../assets/trackorder/doubletick.png";
import user from "../assets/trackorder/user.png";
import location from "../assets/trackorder/location.png";
import tick from "../assets/trackorder/tick.png";
import notes from "../assets/trackorder/notes.png";

const TrackingComponent = () => {
  const { orderId } = useParams(); // Get orderId from the URL
  const [trackingDetails, setTrackingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stages, setStages] = useState({
    "Order Placed": false,
    Packaging: false,
    "On The Road": false,
    Delivered: false,
  });
  const progressBarRef = useRef(null);

  // Fetch tracking details from the backend
  useEffect(() => {
    const fetchTrackingDetails = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get(
          `http://localhost:5000/api/tracking/order/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // If the order is cancelled, prevent tracking
        if (response.data.status === "Cancelled") {
          setTrackingDetails(null); // Clear tracking details
          setLoading(false);
          return;
        }

        setTrackingDetails(response.data);
        updateStages(response.data.status); // Update stages based on the status
      } catch (error) {
        console.error("Error fetching tracking details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingDetails();
  }, [orderId]);

  // Function to handle order cancellation
  const handleCancelOrder = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await axios.put(
        `http://localhost:5000/api/orders/cancel/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Update the tracking details to reflect the cancellation
        setTrackingDetails((prevDetails) => ({
          ...prevDetails,
          status: "Cancelled",
        }));
        updateStages("Cancelled"); // Update stages to reflect cancellation
        alert("Order cancelled successfully!");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Failed to cancel order. Please try again.");
    }
  };

  // Update stages based on the current status
  const updateStages = (status) => {
    const updatedStages = {
      "Order Placed": false,
      Packaging: false,
      "On The Road": false,
      Delivered: false,
    };

    switch (status) {
      case "Pending":
        updatedStages["Order Placed"] = true;
        break;
        case "Quotation generated":
        updatedStages["Order Placed"] = true;
        break;
      case "Shipped":
        updatedStages["Order Placed"] = true;
        updatedStages["Packaging"] = true;
        break;
      case "In Transit":
        updatedStages["Order Placed"] = true;
        updatedStages["Packaging"] = true;
        updatedStages["On The Road"] = true;
        break;
      case "Delivered":
        updatedStages["Order Placed"] = true;
        updatedStages["Packaging"] = true;
        updatedStages["On The Road"] = true;
        updatedStages["Delivered"] = true;
        break;
      case "Cancelled":
        // If the order is cancelled, no stages are completed
        break;
      default:
        break;
    }

    setStages(updatedStages);
    updateProgressBar(updatedStages);
  };

  // Update the progress bar based on the stages
  const updateProgressBar = (stages) => {
    const totalStages = 4;
    const completedStages = Object.values(stages).filter((stage) => stage).length;
    const progress = (completedStages / totalStages) * 100;

    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${progress}%`;
    }
  };

  if (loading) {
    return <p>Loading tracking details...</p>;
  }

  // If the order is cancelled, display a message and prevent tracking
  if (!trackingDetails || trackingDetails.status === "Cancelled") {
    return (
      <div className="container my-5">
        <div className="card" style={{width: '100%'}}>
          <div className="card-body">
            <h1 className="card-title">#{orderId}</h1>
            <div className="alert alert-warning">
              This order has been cancelled and cannot be tracked.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card" style={{width: '100%'}}>
        <div className="card-body">
          <h1 className="card-title">#{trackingDetails.orderId}</h1>
          <h6 className="card-subtitle mb-2 text-muted">
            {trackingDetails.productCount} Products | Order Placed on{" "}
            {new Date(trackingDetails.createdAt).toLocaleString()}
          </h6>
          <p className="card-text">
            Order expected arrival {new Date(trackingDetails.estimatedDelivery).toLocaleDateString()}
          </p>

          {/* Cancel Button */}
          {trackingDetails.status !== "Cancelled" && trackingDetails.status !== "Delivered" && (
            <button
              className="btn btn-danger mb-3"
              onClick={handleCancelOrder}
            >
              Cancel Order
            </button>
          )}

          {/* Display a message if the order is delivered and cannot be cancelled */}
          {trackingDetails.status === "Delivered" && (
            <div className="alert alert-success mb-3">
              This order has been delivered successfully.
            </div>
          )}

          <div className="row">
            <div className="col">
              <div className="progress">
                <div
                  ref={progressBarRef}
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: "0%" }}
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="row mt-2">
                <div className="col d-flex justify-content-end">
                  <input
                    type="checkbox"
                    id="orderPlaced"
                    name="stage"
                    checked={stages["Order Placed"]}
                    readOnly
                  />
                  <label htmlFor="orderPlaced" className="ms-2">
                    Order Placed
                  </label>
                </div>
                <div className="col d-flex justify-content-end">
                  <input
                    type="checkbox"
                    id="packaging"
                    name="stage"
                    checked={stages.Packaging}
                    readOnly
                  />
                  <label htmlFor="packaging" className="ms-2">
                    Packaging
                  </label>
                </div>
                <div className="col d-flex justify-content-end">
                  <input
                    type="checkbox"
                    id="onTheRoad"
                    name="stage"
                    checked={stages["On The Road"]}
                    readOnly
                  />
                  <label htmlFor="onTheRoad" className="ms-2">
                    On The Road
                  </label>
                </div>
                <div className="col d-flex justify-content-end">
                  <input
                    type="checkbox"
                    id="delivered"
                    name="stage"
                    checked={stages.Delivered}
                    readOnly
                  />
                  <label htmlFor="delivered" className="ms-2">
                    Delivered
                  </label>
                </div>
              </div>
            </div>
          </div>

          <ul className="list-unstyled">
            {trackingDetails.updates.map((update, index) => (
              <li key={index} className="mb-3 d-flex">
                <img src={getIconForUpdate(update.updateType)} alt={update.updateType} style={{width: '40px', height: '40px'}}/> 
                <span className="ms-2 align-content-center">{update.message}</span>
                <div className="ms-2 text-muted align-content-center">
                  {new Date(update.timestamp).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

//function to get the appropriate icon for each update type
const getIconForUpdate = (type) => {
  switch (type) {
    case "delivered":
      return doubletick;
    case "pickup":
      return user;
    case "hub":
      return location;
    case "verified":
      return tick;
    case "confirmed":
      return notes;
    default:
      return notes;
  }
};

export default TrackingComponent;