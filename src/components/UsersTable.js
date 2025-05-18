


import React, { useEffect, useState } from "react";
import { auth } from "../firebase"; // Ensure Firebase is correctly configured
import { onAuthStateChanged } from "firebase/auth";

const UsersTable = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName || "N/A",
          email: user.email,
          uid: user.uid,
          creationTime: new Date(user.metadata.creationTime).toLocaleString(), // Convert to readable format
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <div className="users-table">
      <h2>Registered Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>UID</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {user ? (
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.uid}</td>
              <td>{user.creationTime}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan="4">No User Logged In</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Footer */}
      <div className="pagination-footer">
        <span>Rows per page: 50</span>
        <span>1 – 1 of 1</span>
        <div>
        <button disabled>{"<"}</button>
        <button disabled>{">"}</button>
        </div>
      </div>

      <style>
        {`
          .users-table {
            width: 100%;
            margin: 20px auto;
            text-align: center;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th, td {
            padding: 10px;
            border: 1px solid #ddd;
          }

          th {
           background:rgb(110, 100, 100);
            color: white;
          }

          td {
            background: #fff;
          }

          tr:nth-child(even) {
            background: #f9f9f9;
          }

          .pagination-footer {
            display: flex;
            justify-content: flex-end;
            
            align-items: center;
            padding: 10px;
            background:rgb(110, 100, 100);
            color: white;
            border-top: 2px solid #444;
            font-size: 14px;
          }

          .pagination-footer span{
            margin: 0 40px;

          }


          .pagination-footer button {
            background: none;
            border: none;
            color: white;
            font-size: 16px;
            cursor: pointer;
            margin: 0 10px;
          }

          .pagination-footer button:disabled {
            color: gray;
            cursor: allowed;
          }
        `}
      </style>
    </div>
  );
};

export default UsersTable;
