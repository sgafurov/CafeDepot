// Popup.js
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import "../../styles/Popup.css";

const Popup = ({ isOpen, onClose, productId, renderedImages, children }) => {
  const [product, setProduct] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/products/${productId}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const product = await response.json();
        console.log("specific product fetched successfully:", product);
        setProduct(product);
      } else {
        const errorData = await response.json();
        throw errorData;
      }
    } catch (error) {
      console.error("Error fetching product:", error.message);
      alert("Error fetching product: " + error.message);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchData();
    }
  }, [productId]);

  return (
    isOpen && (
      <div className="popup">
        <div className="popup-content">
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
          {/* content that is placed between the opening and closing tags  */}
          {/* {children} */}
          {product ? (
            <>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div>
                <div>{renderedImages[0]}</div>
                <div>{renderedImages[1]}</div>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    )
  );
};

export default Popup;
