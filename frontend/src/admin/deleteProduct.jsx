import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../components/adminNavigation";

const ProductList = () => {
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [searchQuery, setSearchQuery] = useState("");
  const currency = "₹"; // Currency symbol

  // Fetch products from the database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products", {
          params: {
            limit: 1000000000000000
          }
        });
        // Ensure the response data is an array
        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          console.error("Expected an array but got:", response.data);
          setProducts([]); // Set to an empty array if the response is not an array
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Set to an empty array in case of an error
      }
    };
    fetchProducts();
  }, []);

  // Delete a product
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId)); // Remove the product from the list
      alert('Product deleted successfully');
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    const lowerCaseProductName = product.name.toLowerCase();
  
    // Check if the product name includes the search query
    const nameMatches = lowerCaseProductName.includes(lowerCaseSearchQuery);
  
    // Check if the product id matches the search query
    const idMatches = product._id.toString().includes(searchQuery);
  
    // Return true if either name or id matches the search query
    return nameMatches || idMatches;
  });

  return (
    <>
      <div className="row">
        <div className="col-md-2 me-5">
          <AdminNavbar />
        </div>
        <div className="col-md-9 my-3">
          <h3 className="mb-2">All Products List</h3>

          {/* Search Bar */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Table for Product List */}
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <img
                          className="img-fluid"
                          src={`http://localhost:5000/public${product.image}`}
                          alt={product.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>
                        {typeof product.category === "object"
                          ? product.category.name
                          : product.category}
                      </td>
                      <td>
                        {currency} {product.price}
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm text-grey"
                          onClick={() => deleteProduct(product._id)}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
