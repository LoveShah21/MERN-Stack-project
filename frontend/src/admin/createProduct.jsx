import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../components/adminNavigation";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [bestSelling, setBestSelling] = useState(false); // State for the checkbox

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let categoryId = category;

    // If a new category is provided, create it
    if (newCategory) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/category",
          {
            name: newCategory,
            description: "New category description", // You can add a field for description if needed
          }
        );
        categoryId = response.data._id; // Use the newly created category ID
      } catch (error) {
        console.error("Error creating category:", error);
        return;
      }
    }

    // Create the product
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("category", categoryId); // Use the selected or newly created category ID
    formData.append("bestSelling", bestSelling); // Append the bestSelling value

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Product created:", response.data);
    } catch (error) {
      console.error("Error creating product:", error);
    }

    // Show success alert
    setShowAlert(true);

    // Reset form fields
    setName("");
    setDescription("");
    setPrice("");
    setImage(null);
    setCategory("");
    setNewCategory("");
    setBestSelling(false); // Reset the checkbox

    // Hide the alert after 5 seconds (optional)
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-2 me-5">
          <AdminNavbar />
        </div>
        <div className="col-md-8">
          <form onSubmit={handleSubmit} className="container mt-4">
            {/* Show the alert if `showAlert` is true */}
            {showAlert && (
              <div
                className="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                Product created successfully!
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowAlert(false)}
                ></button>
              </div>
            )}
            <div className="mb-3">
              <h3>Create a New Product</h3>
              <label htmlFor="productName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="productName"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="productDescription" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="productDescription"
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="productPrice" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="productPrice"
                placeholder="Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="productImage" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="productImage"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="existingCategory" className="form-label">
                Select an existing category
              </label>
              <select
                className="form-select"
                id="existingCategory"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select an existing category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="newCategory" className="form-label">
                Or create a new category
              </label>
              <input
                type="text"
                className="form-control"
                id="newCategory"
                placeholder="New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </div>

            {/* Add Best Seller Checkbox */}
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="bestSelling"
                checked={bestSelling}
                onChange={(e) => setBestSelling(e.target.checked)}
              />
              <label htmlFor="bestSelling" className="form-check-label">
                Add to Best Seller
              </label>
            </div>

            <button type="submit" className="btn text-white" style={{ background: "#2c3e50" }}>
              Create Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;