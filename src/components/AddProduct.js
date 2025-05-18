



import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { supabase } from "../supabase"; // ✅ Supabase import

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [newProduct, setNewProduct] = useState({
    image: "",
    title: "",
    description: "",
    price: "",
    category: "",
    date: Timestamp.now(),
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "documents"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setNewProduct({
      image: "",
      title: "",
      description: "",
      price: "",
      category: "",
      date: Timestamp.now(),
    });
    setImageFile(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product.id);
    setNewProduct(product);
    setImageFile(null);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSaveProduct = async () => {
    if (!newProduct.title || !newProduct.description || !newProduct.price) {
      alert("Please fill all fields!");
      return;
    }

    let imageUrl = newProduct.image;

    // ✅ Upload to Supabase Storage if new image is selected
    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from("product-images")
        .upload(fileName, imageFile);

      if (error) {
        console.error("Supabase upload error:", error);
        alert("Image upload failed!");
        return;
      }

      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);
      imageUrl = urlData.publicUrl;
    }

    const productData = { ...newProduct, image: imageUrl };

    if (editingProduct) {
      const productRef = doc(db, "documents", editingProduct);
      await updateDoc(productRef, productData);
      setProducts(
        products.map((p) =>
          p.id === editingProduct ? { ...productData, id: editingProduct } : p
        )
      );
    } else {
      const docRef = await addDoc(collection(db, "documents"), productData);
      setProducts([...products, { ...productData, id: docRef.id }]);
    }

    setShowModal(false);
  };

  const handleDeleteConfirmation = (id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteProduct = async () => {
    if (productToDelete) {
      await deleteDoc(doc(db, "documents", productToDelete));
      setProducts(products.filter((product) => product.id !== productToDelete));
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const handleCloseModal = () => setShowModal(false);
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="addProduct">
      <div className="header-row">
        <h1>All Products</h1>
        <div className="AddProduct2">
          <input
            type="text"
            placeholder="Search here..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-bar"
          />
          <button className="add-product" onClick={handleAddProduct}>
            + Add Product
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>

            <label>Product Title:</label>
            <input
              type="text"
              name="title"
              value={newProduct.title}
              onChange={handleInputChange}
            />

            <label>Category:</label>
            <select
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              <option value="Pome Fruit">Pome Fruit</option>
              <option value="Tropical Fruit">Tropical Fruit</option>
              <option value="Citrus Fruit">Citrus Fruit</option>
              <option value="Sports">Sports</option>
              <option value="Melon">Melon</option>
              <option value="Stone Fruit">Stone Fruit</option>
              <option value="Nut/Tropical">Nut/Tropical</option>
              <option value="Multiple Fruit">Multiple Fruit</option>
            </select>

            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: Math.max(0, Number(e.target.value)),
                })
              }
              min="0"
            />

            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
            />

            <label>Upload Picture:</label>
            <input type="file" onChange={handleFileChange} />
            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="image-preview"
              />
            )}
            {!imageFile && newProduct.image && (
              <img
                src={newProduct.image}
                alt="Existing"
                className="image-preview"
              />
            )}

            <div className="modal-buttons">
              <button className="save" onClick={handleSaveProduct}>
                Save Product
              </button>
              <button className="cancel" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Delete Confirmation</h2>
            <p>Are you sure you want to delete this Product?</p>
            <div className="modal-buttons">
              <button className="cancel1" onClick={handleCloseDeleteModal}>
                Cancel
              </button>
              <button className="delete1" onClick={confirmDeleteProduct}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="product-table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Product Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Created On</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <div className="product-image">
                  {product.image && (
                    <img src={product.image} alt="Product" height="60" />
                  )}
                </div>
              </td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>
                {product.date.seconds
                  ? new Date(product.date.seconds * 1000).toDateString()
                  : product.date}
              </td>
              <td>
                <button
                  className="edit"
                  onClick={() => handleEditProduct(product)}
                >
                  <img src="Edit-icon.png" alt="Edit" height="10px" />
                </button>
                <button
                  className="delete"
                  onClick={() => handleDeleteConfirmation(product.id)}
                >
                  <img src="delete-icon.png" alt="Delete" height="10px" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddProduct;
