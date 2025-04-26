import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import AdminNavbar from "../components/adminNavigation";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { usePDF } from 'react-to-pdf';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("all");

  const { toPDF, targetRef } = usePDF({ filename: 'orders.pdf' });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
      case "Shipped":
      case "In transit":
      case "Quotation generated":
        return "#E0BC00";
      case "Delivered":
        return "green";
      case "Cancelled":
        return "red";
      default:
        return "black";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearchTerm = order.orderId
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatusFilter =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearchTerm && matchesStatusFilter;
  });

  const sortOrders = (orders, sortBy) => {
    const now = new Date();
    switch (sortBy) {
      case "lastWeek":
        return orders.filter(
          (order) => now - new Date(order.createdAt) <= 7 * 24 * 60 * 60 * 1000
        );
      case "lastMonth":
        return orders.filter(
          (order) => now - new Date(order.createdAt) <= 30 * 24 * 60 * 60 * 1000
        );
      case "lastQuarter":
        return orders.filter(
          (order) =>
            now - new Date(order.createdAt) <= 90 * 24 * 60 * 60 * 1000
        );
      case "halfYearly":
        return orders.filter(
          (order) =>
            now - new Date(order.createdAt) <= 182 * 24 * 60 * 60 * 1000
        );
      case "yearly":
        return orders.filter(
          (order) =>
            now - new Date(order.createdAt) <= 365 * 24 * 60 * 60 * 1000
        );
      default:
        return orders;
    }
  };

  const sortedOrders = sortOrders(filteredOrders, sortBy);

  const handleExport = (format) => {
    const data = sortedOrders.map((order) => ({
      "Order ID": order.orderId,
      "Total Price": `${order.totalPrice}`,
      Status: order.status,
      "Created At": new Date(order.createdAt).toLocaleString(),
      Products: order.products
        .map(
          (product) =>
            `Product ID: ${product.productId}, Quantity: ${product.quantity}, Price: ₹${product.price}`
        )
        .join("; "),
      "Order Notes": order.orderNotes,
      Address: `${order.address.firstName} ${order.address.lastName}, ${order.address.address}, ${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`,
    }));

    if (format === "csv") {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
      XLSX.writeFile(workbook, "orders.csv");
    } else if (format === "excel") {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
      XLSX.writeFile(workbook, "orders.xlsx");
    } else if (format === "pdf") {
      toPDF();
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-2 me-5">
          <AdminNavbar />
        </div>
        <div className="col-md-9">
          <div className="mt-2">
            <h1>Orders</h1>

            {/* Search, Filter, and Sort Controls */}
            <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
              <input
                type="text"
                placeholder="Search by Order ID"
                className="rounded-2 border p-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: "8px", width: "200px" }}
              />
              <select
                className="rounded-2 border p-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ padding: "8px" }}
              >
                <option value="all">Status</option>
                <option value="Pending">Pending</option>
                <option value="Quotation generated">Quotation generated</option>
                <option value="Shipped">Shipped</option>
                <option value="In transit">In transit</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <select
                className="rounded-2 border p-2"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: "8px" }}
              >
                <option value="all">Sort by</option>
                <option value="lastWeek">Last Week</option>
                <option value="lastMonth">Last Month</option>
                <option value="lastQuarter">Last Quarter</option>
                <option value="halfYearly">Half-Yearly</option>
                <option value="yearly">Yearly</option>
              </select>
              <div className="dropdown" style={{ marginLeft: "auto", position: "relative" }}>
                <button
                  className="rounded-2 border p-2 dropdown-toggle"
                  type="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                  style={{ padding: "8px" }}
                >
                  Export
                </button>
                <div
                  className="dropdown-menu"
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: "0",
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    zIndex: 1000,
                  }}
                >
                  <div
                  className="dropdown-item"
                    style={{ padding: "8px", cursor: "pointer" }}
                    onClick={() => handleExport("csv")}
                  >
                    Export as CSV
                  </div>
                  <div
                  className="dropdown-item"
                    style={{ padding: "8px", cursor: "pointer" }}
                    onClick={() => handleExport("excel")}
                  >
                    Export as Excel
                  </div>
                  <div
                  className="dropdown-item"
                    style={{ padding: "8px", cursor: "pointer" }}
                    onClick={() => handleExport("pdf")}
                  >
                    Export as PDF
                  </div>
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div ref={targetRef}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#f2f2f2" }}>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                      Order ID
                    </th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                      Total Price
                    </th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                      Status
                    </th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                      Created At
                    </th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                      Products
                    </th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                      Order Notes
                    </th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                      Address
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedOrders.length > 0 ? (
                    sortedOrders.map((order) => (
                      <tr
                        key={order.orderId}
                        style={{ borderBottom: "1px solid #ddd" }}
                      >
                        <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                          {order.orderId}
                        </td>
                        <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                          {order.totalPrice}
                        </td>
                        <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                          <span style={{ color: getStatusColor(order.status) }}>
                            {order.status}
                          </span>
                        </td>
                        <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                          {new Date(order.createdAt).toLocaleString()}
                        </td>
                        <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                          <ul
                            style={{ listStyleType: "none", margin: 0, padding: 0 }}
                          >
                            {order.products.map((product, index) => (
                              <li key={index}>
                                Product ID: {product.productId}, Quantity:{" "}
                                {product.quantity}, 
                                {/* Price: ₹{product.price} */}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                          {order.orderNotes}
                        </td>
                        <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                          {order.address.firstName} {order.address.lastName},{" "}
                          {order.address.address}, {order.address.city},{" "}
                          {order.address.state}, {order.address.country},{" "}
                          {order.address.zipcode}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center", padding: "10px" }}>
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;