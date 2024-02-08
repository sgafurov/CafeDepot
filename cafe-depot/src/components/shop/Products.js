import { useState, useEffect } from "react";
import { BASE_URL } from "../../constants";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import Cart from "./Cart";
import Popup from "./Popup";
import "../../styles/Products.css";

export default function Products() {
  const { searchType, product } = useParams();
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  const [quantities, setQuantities] = useState([]); // set in an array with index corresponding to the product state
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
  // these states are for the popup component
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState();
  const [popupIndex, setPopupIndex] = useState(false);

  useEffect(() => {
    // Initialize quantities array with default quantity (1) for each product
    setQuantities(new Array(products.length).fill(1));
  }, [products]);

  useEffect(() => {
    fetchData();
  }, [searchType, product]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        searchType === "category"
          ? `${BASE_URL}/api/products/category/${product}`
          : `${BASE_URL}/api/products/keyword/${product}`, // searching by keyword
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
          <img src={url} alt={`Image ${index}`} key={index} className="product-img"/>
        )),
      }));
    } catch (error) {
      console.log("Error getting image URL:", error);
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

  const handleProductClick = (productId, index) => {
    setSelectedProductId(productId);
    setPopupOpen(!isPopupOpen);
    setPopupIndex(index); // Store the index of the clicked product
  };

  return (
    <div>
      {showCart && <Cart onClose={toggleCart} showCart={showCart} />}
      <ul className="products-ul">
        {products &&
          products.map((product, index) => (
            <div key={index}>
              <li className="product-li">
                <div className="product-container">
                  <div
                    className="product-info"
                    onClick={() => {
                      handleProductClick(product.id, index);
                    }}
                  >
                    {isPopupOpen && (
                      <Popup
                        isOpen={isPopupOpen}
                        onClose={() => setPopupOpen(!isPopupOpen)}
                        productId={selectedProductId}
                        renderedImages={renderedImages[selectedProductId]}
                        quantities={quantities}
                        setQuantities={setQuantities}
                        index={popupIndex}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        handleAddToCart={handleAddToCart}
                        key={selectedProductId}
                      ></Popup>
                    )}

                    {renderedImages && renderedImages[product.id] && (
                      <div className="product-images-container">
                        <div className="first-image">
                          <div className="image-div" key={index}>
                            {renderedImages[product.id][0]}
                          </div>
                        </div>
                        <div className="second-image">
                          <div className="image-div" key={index}>
                            {renderedImages[product.id][1]}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="product-details">
                      <p className="title">{product.name}</p>
                      <p className="price">
                        {product.description.substring(0, 100)}...
                      </p>
                      <p className="price">${product.price}</p>
                    </div>
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
