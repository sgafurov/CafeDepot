import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import Loading from "../loading/Loading";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import "../../styles/AdminProfile.css";

import ImagesUpload from "./ImagesUpload";

export default function AdminProfile() {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    imageNames: "",
  });
  const [products, setProducts] = useState([
    {
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      imageNames: "",
      imageNamesArray: [],
    },
  ]);
  const [renderedImages, setRenderedImages] = useState({});

  useEffect(() => {
    console.log("inside useEffect");
    // get all products from db and add to products useState
    const fetchData = async () => {
      console.log("inside fetchData");
      try {
        const response = await fetch(`${BASE_URL}/api/products/all`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("response ", response);
        if (response.ok) {
          const products = await response.json();
          console.log("Products fetched successfully:", products);
          setProducts(products);
        } else {
          const errorData = await response.json();
          throw errorData;
        }
      } catch (error) {
        console.error("Error fetching product:", error.message);
        alert("Error fetching product: " + error.message);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    console.log("item handleChange: " + item.category);
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  // post to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/products/add`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      console.log("response ", response);
      setLoading(false);
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

  const getImageNamesFromChild = (imageNames) => {
    setItem({ ...item, imageNames: imageNames });
    console.log("getImageNamesFromChild: " + imageNames);
  };

  // avoid the "Objects are not valid as a React child" issue.
  useEffect(() => {
    // Fetch image URLs when the component mounts or when products change
    products.forEach((product) => {
      if (product.imageNames) {
        fetchImageUrls(product);
      }
    });
  }, [products]);

  const fetchImageUrls = async (product) => {
    try {
      let imageNamesArray = product.imageNames.split("+");
      let urlArray = [];

      for (let i = 0; i < imageNamesArray.length; i++) {
        let imageName = imageNamesArray[i];
        const imageRef = ref(storage, imageName);
        let downloadUrl = await getDownloadURL(imageRef);
        urlArray.push(downloadUrl);
      }

      // setRenderedImages(
      //   urlArray.map((url, index) => (
      //     <div key={index}>
      //       <img src={url} alt={`Image ${index}`} width={100} />
      //     </div>
      //   ))
      // );

      setRenderedImages((prevRenderedImages) => ({
        ...prevRenderedImages,
        [product.id]: urlArray.map((url, index) => (
          <div key={index}>
            <img src={url} alt={`Image ${index}`} width={100} />
          </div>
        )),
      }));
    } catch (error) {
      console.log("Error getting image URL:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center">Admin Profile</h1>
      {loading ? (
        <Loading />
      ) : (
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

          <label>Category:</label>
          <select name="category" onChange={handleChange}>
            <option value={null}></option>
            <option value="utensils">Utensils</option>
            <option value="cups">Cups</option>
            <option value="plates">Plates</option>
            <option value="espresso machines">Espresso Machines</option>
          </select>

          <ImagesUpload sendImageNamesToParent={getImageNamesFromChild} />

          <button type="submit" disabled={loading}>
            {loading ? "Adding product..." : "Add product"}
          </button>
        </form>
      )}
      <h3>Current Stock</h3>
      <div>
        {products &&
          products.map((product, index) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                border: "1px solid #ddd",
                padding: "10px",
              }}
            >
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ fontWeight: "bold", paddingRight: "10px" }}>
                      Name:
                    </td>
                    <td>{product.name}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ fontWeight: "bold", paddingRight: "10px" }}>
                      Description:
                    </td>
                    <td>{product.description}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ fontWeight: "bold", paddingRight: "10px" }}>
                      Price:
                    </td>
                    <td>${product.price}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold", paddingRight: "10px" }}>
                      Stock:
                    </td>
                    <td>{product.stock}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold", paddingRight: "10px" }}>
                      Category:
                    </td>
                    <td>{product.category}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold", paddingRight: "10px" }}>
                      Image Names:
                    </td>
                    {/* {product.imageNames &&
                      product.imageNames.split("+").map((imageName) => (
                        <>
                          <td>{imageName}</td>
                          <img src={imageName} />
                        </>
                      ))} */}
                    {/* {product.imageNames &&
                      renderProductImages(product.imageNames)} */}
                    {/* {product.imageNames && renderProductImages(product.imageNames)} */}
                    {/* {renderedImages} */}
                    {renderedImages[product.id]}
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
      </div>
    </div>
  );
}
