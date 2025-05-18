import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { database, ref, set, auth } from "../firebase"; // ✅ Correct Import
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // Firebase Authentication: Create User
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data in Firebase Realtime Database
      await set(ref(database, `users/${user.uid}`), {
        username,
        email,
        createdAt: new Date().toISOString(),
      });

      toast.success("Successfully Registered!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);

      // Reset form fields
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      toast.error("You already have an account!", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <p>Already have an Account? <Link to="/login">Login</Link></p>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label htmlFor="username">Name:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
