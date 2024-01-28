import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loading from "../loading/Loading";
import "../../styles/SignUp.css";

export default function SignUp() {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/users/sign-up`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setLoading(false);
      if (response.ok) {
        // sign up in firebase
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("user signed up in firebase: ", user);
          })
          .catch((error) => {
            // const errorMessage = error.message;
            throw error;
          });

        const user = await response.json();
        console.log("User created successfully in db: ", user);
        navigate("/log-in");
      } else {
        const errorData = await response.json();
        throw errorData;
      }
    } catch (error) {
      console.error("Error creating user: ", error.message);
      alert("Error creating user: " + error.message);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <form className="signup-form" onSubmit={handleSubmit}>
          <label>First name:</label>
          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            required
          />
          <label>Last name:</label>
          <input type="text" name="lastName" onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" onChange={handleChange} required />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />

          <label>Address:</label>
          <input type="text" name="address" onChange={handleChange} required />

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
      )}
    </div>
  );
}
