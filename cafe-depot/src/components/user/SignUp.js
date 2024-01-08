import { useState } from "react";
import axios from "axios";
import "../../styles/SignUp.css";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend to create a new user
      const response = await axios.post(
        "https://cafe-depot-backend.onrender.com/api/users/sign-up",
        formData
      );

      // Handle successful signup
      console.log("User created successfully:", response.data);
    } catch (error) {
      // Handle signup failure
      console.error("Error creating user:", error.message);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <label>Username:</label>
      <input type="text" name="username" onChange={handleChange} required />

      <label>Password:</label>
      <input type="password" name="password" onChange={handleChange} required />

      <label>Email:</label>
      <input type="email" name="email" onChange={handleChange} required />

      <label>Address:</label>
      <input type="text" name="address" onChange={handleChange} required />

      <button type="submit">Sign Up</button>
    </form>
  );
}
