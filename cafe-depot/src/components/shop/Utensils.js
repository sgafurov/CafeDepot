import { useState, useEffect } from "react";
import utensilsImage from "../../assets/products/utensils.jpg";
import { BASE_URL } from "../../constants";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import "../../styles/Utensils.css";

export default function Utensils() {
  const [quantities, setQuantities] = useState([]);
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

  useEffect(() => {
    // Initialize quantities array with default quantity (1) for each product
    setQuantities(new Array(products.length).fill(1));
  }, [products]);

  useEffect(() => {
    console.log("inside useEffect");
    // get all products from db and add to products useState
    const fetchData = async () => {
      console.log("inside fetchData");
      try {
        const response = await fetch(`${BASE_URL}/api/products/utensils`, {
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

  // const increaseQuantity = () => {
  //   setQuantity(quantity + 1);
  // };

  // const decreaseQuantity = () => {
  //   if (quantity > 1) {
  //     setQuantity(quantity - 1);
  //   }
  // };

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

  // get all utensils from DB where category == utensils, and map out the utensils in boxes
  // map through each utensil, create a li element with an onClick event that calls addToCart(utensil) passing it the current utensil
  return (
    <div className="products-list">
      {/* <ul className="utensils-list">
        <li className="utensil-item">
          <div>
            <img src={utensilsImage} width={200} alt={"utensils"} />
            <div className="details-text">
              <p className="title">Metal utensils</p>
              <p className="price">pack (50 forks, 50 spoons, 50 knives)</p>
              <p className="price">$10</p>
            </div>
            <div className="quantity-controls">
              <button onClick={decreaseQuantity}>-</button>
              <p>{quantity}</p>
              <button onClick={increaseQuantity}>+</button>
            </div>

            <button className="add-to-cart">Add to Cart</button>
          </div>
        </li>
      </ul> */}

      <ul className="utensils-list">
        {products &&
          products.map((product, index) => (
            <div key={index}>
              <li className="utensil-item">
                <div>
                  {renderedImages[product.id]}
                  <div className="details-text">
                    <p className="title">{product.name}</p>
                    <p className="price">{product.description}</p>
                    <p className="price">${product.price}</p>
                  </div>
                  <div className="quantity-controls">
                    {/* <button onClick={decreaseQuantity}>-</button>
                    <p>{quantity}</p>
                    <button onClick={increaseQuantity}>+</button> */}
                    <button onClick={() => decreaseQuantity(index)}>-</button>
                    <p>{quantities[index]}</p>
                    <button onClick={() => increaseQuantity(index)}>+</button>
                  </div>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              </li>
            </div>
          ))}
      </ul>
    </div>
  );
}
