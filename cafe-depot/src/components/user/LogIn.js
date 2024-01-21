import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants";
import Loading from "../loading/Loading";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../../styles/SignUp.css";

export default function LogIn() {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    // username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   setLoading(true);
    //   const response = await fetch(`${BASE_URL}/api/users/log-in`, {
    //     method: "POST",
    //     mode: "cors",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //   console.log("response ", response);
    //   setLoading(false);
    //   if (response.ok) {
    //     const user = await response.json();
    //     // cache token
    //     console.log("User logged in successfully:", user);
    //     if (user.username === "dev") {
    //       navigate("/admin-profile");
    //     } else {
    //       navigate("/profile");
    //     }
    //   } else {
    //     const errorData = await response.json();
    //     throw errorData;
    //   }
    // } catch (error) {
    //   console.error("Error logging in user:", error.message);
    //   alert("Error logging in user: " + error.message);
    // }

    // FIREBASE AUTH
    setLoading(true);
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        setLoading(false);
        const user = userCredential.user;
        console.log("user logged in: ", user);
        if (user.email === "dev@gmail.com") {
          navigate("/admin-profile");
        } else {
          navigate("/profile");
        }
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <form className="signup-form" onSubmit={handleSubmit}>
          {/* <label>Username:</label>
          <input type="text" name="username" onChange={handleChange} required /> */}
          <label>Email:</label>
          <input type="email" name="email" onChange={handleChange} required />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />

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
      )}
    </div>
  );
}
