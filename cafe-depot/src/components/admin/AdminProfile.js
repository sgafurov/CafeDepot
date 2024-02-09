import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import ImagesUpload from "./ImagesUpload";
import "../../styles/AdminProfile.css";

export default function AdminProfile() {
  let navigate = useNavigate();

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
    },
  ]);
  const [renderedImages, setRenderedImages] = useState({});
  const [imagesUploaded, setImagesUploaded] = useState(false);

  useEffect(() => {
    console.log("inside useEffect");
    // get all products from db and add to products useState
    const fetchData = async () => {
      console.log("inside fetchData");
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/products/all`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setLoading(false);
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
      setLoading(false);
      if (response.ok) {
        const product = await response.json();
        console.log("Product added successfully:", product);
      } else {
        const errorData = await response.json();
        throw errorData;
      }
      setImagesUploaded(false); //set it back to false because the form will clear yet the state will remain 'true' from the ImagesUpload component
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

  const handleDeleteProduct = async (productId) => {
    console.log("inside handleDeleteProduct with productId = " + productId);
    try {
      const response = await fetch(
        `${BASE_URL}/api/products/delete/${productId}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response ", response);
      if (response.ok) {
        alert("Product removed successfully");
      } else {
        alert("Failed to remove product");
        const errorData = await response.json();
        throw errorData;
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
      alert("Error deleting product: " + error.message);
    }
  };

  return (
    <div>
      <button onClick={()=>{navigate("/profile")}}>Go to profile</button>
      <h1 className="text-center">Add Product</h1>
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

          <ImagesUpload
            sendImageNamesToParent={getImageNamesFromChild}
            setImagesUploaded={setImagesUploaded}
          />

          {imagesUploaded && (
            <button type="submit" disabled={loading}>
              {loading ? "Adding product..." : "Add product"}
            </button>
          )}
        </form>
      )}
      <h3>Current Stock</h3>
      <div className="product-container">
        {loading ? (
          <Loading />
        ) : (
          // {products &&
          products.map((product, index) => (
            <div key={index}>
              <table className="product-table">
                <tbody>
                  <tr>
                    <td>Name:</td>
                    <td>{product.name}</td>
                  </tr>
                  <tr>
                    <td>Description:</td>
                    <td>{product.description}</td>
                  </tr>
                  <tr>
                    <td>Price:</td>
                    <td>${product.price}</td>
                  </tr>
                  <tr>
                    <td>Stock:</td>
                    <td>{product.stock}</td>
                  </tr>
                  <tr>
                    <td>Category:</td>
                    <td>{product.category}</td>
                  </tr>
                  <tr>
                    <td>Images:</td>
                    <div style={{ display: "flex" }}>
                      {renderedImages[product.id]}
                    </div>
                    <button
                      onClick={() => {
                        handleDeleteProduct(product.id);
                      }}
                    >
                      Delete
                    </button>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
          // }
        )}
      </div>
    </div>
  );
}
