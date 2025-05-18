import React from "react";

const ProductTable = ({ products = [] }) => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  console.log("Received products:", products); // Debugging log
  

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Picture</th>
          <th>Product Title</th>
          <th>Product Description</th>
          <th>Price</th>
          <th>Created On</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map((product) => (
            <tr key={product.id}>
              <td>{product.image}</td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.date}</td>
              <td>
                <button className="edit">✏</button>
                <button className="delete">🗑</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" style={{ textAlign: "center" }}>No products found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ProductTable;
