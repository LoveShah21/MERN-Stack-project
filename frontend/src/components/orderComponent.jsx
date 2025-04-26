import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderComponent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get(
          "http://localhost:5000/api/orders/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleViewDetails = (orderId) => {
    navigate(`/track/trackorder/${orderId}`);
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  // Function to determine the color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
      case "Shipped":
      case "In transit":
        return "#E0BC00";
      case "Delivered":
        return "green";
      case "Cancelled":
        return "red";
      default:
        return "black";
    }
  };

  return (
    <div
      className="mt-2 mb-2 border rounded-1 overflow-auto"
      style={{ maxHeight: "500px" }}
    >
      <div className="p-3">
        <h2>ORDER HISTORY</h2>
        {orders.length > 0 ? (
          <table className="table table-bordered-none">
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>#{order.orderId}</td>
                  <td style={{ color: getStatusColor(order.status) }}>
                    {order.status}
                  </td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>₹{order.totalPrice}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => handleViewDetails(order.orderId)}
                    >
                      View Details →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="table table-bordered-none">
            <tbody>
              <tr>
                <td colSpan="5">
                  No orders placed yet
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderComponent;
