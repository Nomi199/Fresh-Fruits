import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Add loading state

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchOrders = async () => {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedOrders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(fetchedOrders);
      setLoading(false); // ✅ Stop loader
    };

    fetchOrders();
  }, []);

  // ✅ Show loader while fetching
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p className="loader-text">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="orders-wrapper">
      <h2>All Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders">No orders yet.</p>
      ) : (
        <div className="table-responsive"> 
        <table className="orders-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Country</th>
              <th>Address</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Order Time</th>
              <th>Items</th>
              <th>Total ($)</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.shipping.name}</td>
                <td>{order.shipping.email}</td>
                <td>{order.shipping.phone}</td>
                <td>{order.shipping.country}</td>
                <td>{order.shipping.address}</td>
                <td>{order.status || "Pending"}</td>
                <td>{order.paymentStatus || "Paid"}</td>
                <td>{order.createdAt?.toDate().toLocaleString()}</td>
                <td>
                  <ul>
                    {order.cart.map((item, i) => (
                      <li key={i}>
                        {item.title} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>${order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
