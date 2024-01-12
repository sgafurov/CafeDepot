import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants";
import "../../styles/SignUp.css";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    address: "",
  });
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        // "https://cafe-depot-backend.onrender.com/api/users/sign-up",
        `${BASE_URL}/api/users/sign-up`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log("response ", response);
      if (response.ok) {
        const user = await response.json();
        console.log("User created successfully:", user);
        navigate("/log-in");
      } else {
        const errorData = await response.json();
        throw errorData;
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
      alert("Error creating user: " + error.message);
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

      {/* <button type="submit">Sign Up</button> */}
      <button type="submit" disabled={loading}>
        {loading ? "Signing Up..." : "Sign Up"}
      </button>

      <label
        onClick={() => {
          navigate("/log-in");
        }}
        className="redirect-label"
      >
        Returning user? <u>Log in here</u>
      </label>
    </form>
  );
}
