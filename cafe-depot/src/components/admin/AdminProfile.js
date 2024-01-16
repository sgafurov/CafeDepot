import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";

export default function AdminProfile() {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const [products, setProducts] = useState([
    {
      name: "",
      description: "",
      price: "",
      stock: "",
    },
  ]);

  //   useEffect(async () => {
  //     // get all products from db and add to products useState
  //     console.log("inside AdminProfile useEffect");
  //     try {
  //       const response = await fetch(`${BASE_URL}/api/products/all`, {
  //         method: "GET",
  //         mode: "cors",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       console.log("response ", response);
  //       if (response.ok) {
  //         const products = await response.json();
  //         console.log("Products fetched successfully:", products);
  //         setProducts(products);
  //       } else {
  //         const errorData = await response.json();
  //         throw errorData;
  //       }
  //     } catch (error) {
  //       console.error("Error fetching product:", error.message);
  //       alert("Error fetching product: " + error.message);
  //     }
  //   }, []);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  // post to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/products/add-product`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      console.log("response ", response);
      if (response.ok) {
        const product = await response.json();
        console.log("Product added successfully:", product);
      } else {
        const errorData = await response.json();
        throw errorData;
      }
    } catch (error) {
      console.error("Error adding product:", error.message);
      alert("Error adding product: " + error.message);
    }
  };

  return (
    <div>
      <h1 className="text-center">Admin Profile</h1>
      <form className="product-form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" onChange={handleChange} required />

        <label>Description:</label>
        <input
          type="text"
          name="description"
          onChange={handleChange}
          required
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          min="0"
          step="0.01"
          onChange={handleChange}
          required
        />

        <label>Stock:</label>
        <input
          type="number"
          name="stock"
          min="0"
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding product..." : "Add product"}
        </button>
      </form>

      <h3>current stock displayed here</h3>
      <div>
        {products &&
          products.map((product, index) => (
            <div key={index}>
              <p>Name: {product.name}</p>
              <p>Desc: {product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
