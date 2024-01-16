import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants";
import "../../styles/SignUp.css";

export default function LogIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
        // "https://cafe-depot-backend.onrender.com/api/users/log-in",
        `${BASE_URL}/api/users/log-in`,
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
        // cache token
        console.log("User logged in successfully:", user);
        if (user.username === "dev") {
          navigate("/admin-profile");
        } else {
          navigate("/profile");
        }
      } else {
        const errorData = await response.json();
        throw errorData;
      }
    } catch (error) {
      console.error("Error logging in user:", error.message);
      alert("Error logging in user: " + error.message);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <label>Username:</label>
      <input type="text" name="username" onChange={handleChange} required />

      <label>Password:</label>
      <input type="password" name="password" onChange={handleChange} required />

      {/* <button type="submit">Sign Up</button> */}
      <button type="submit" disabled={loading}>
        {loading ? "Logging In..." : "Log In"}
      </button>

      <label
        onClick={() => {
          navigate("/sign-up");
        }}
        className="redirect-label"
      >
        New user? <u>Sign up here</u>
      </label>
    </form>
  );
}
