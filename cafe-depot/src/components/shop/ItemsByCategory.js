import { useState, useEffect } from "react";
import { BASE_URL } from "../../constants";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import Cart from "./Cart";
import "../../styles/ItemsByCategory.css";

export default function ItemsByCategory() {
  const { category } = useParams();
  const dispatch = useDispatch();

  const [showCart, setShowCart] = useState(false);
  const [quantities, setQuantities] = useState([]);
  const [renderedImages, setRenderedImages] = useState({});
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

  useEffect(() => {
    // Initialize quantities array with default quantity (1) for each product
    setQuantities(new Array(products.length).fill(1));
  }, [category, products]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/products/${category}`, {
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
  }, [category]);

  // avoid the "Objects are not valid as a React child" issue.
  useEffect(() => {
    // Fetch image URLs when the component mounts or when products change
    products.forEach((product) => {
      if (product.imageNames) {
        fetchImageUrls(product);
      }
    });
  }, [category, products]);

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
            <img src={url} alt={`Image ${index}`} width={200} height={200} />
          </div>
        )),
      }));
    } catch (error) {
      console.log("Error getting image URL:", error);
    }
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleAddToCart = (product, quantity) => {
    setShowCart(true);
    if (quantity > product.stock) {
      alert(
        "Quantity requested exceeds stock. Choose less than " + product.stock
      );
    } else {
      dispatch(addToCart({ product, quantity }));
    }
  };

  const increaseQuantity = (index) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] += 1;
      return newQuantities;
    });
  };

  const decreaseQuantity = (index) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      if (newQuantities[index] > 1) {
        newQuantities[index] -= 1;
      }
      return newQuantities;
    });
  };

  return (
    <div className="products-list">
      {showCart && <Cart onClose={toggleCart} showCart={showCart} />}
      <ul className="utensils-list">
        {products &&
          products.map((product, index) => (
            <div key={index}>
              <li className="utensil-item">
                <div>
                  {renderedImages && renderedImages[product.id] && (
                    <div className="image-container">
                      <div className="first-image">
                        {renderedImages[product.id][0]}
                      </div>
                      <div className="second-image">
                        {renderedImages[product.id][1]}
                      </div>
                    </div>
                  )}
                  <div className="details-text">
                    <p className="title">{product.name}</p>
                    <p className="price">{product.description.substring(0, 100)}...</p>
                    <p className="price">${product.price}</p>
                  </div>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(index)}>-</button>
                    <p>{quantities[index]}</p>
                    <button onClick={() => increaseQuantity(index)}>+</button>
                  </div>
                  <button
                    className="add-to-cart"
                    onClick={() => {
                      handleAddToCart(products[index], quantities[index]);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </li>
            </div>
          ))}
      </ul>
    </div>
  );
}
