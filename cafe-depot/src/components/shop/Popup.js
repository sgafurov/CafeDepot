import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import Loading from "../loading/Loading";
import "../../styles/Popup.css";

const Popup = ({
  isOpen,
  onClose,
  productId,
  renderedImages,
  quantities,
  index,
  increaseQuantity,
  decreaseQuantity,
  handleAddToCart,
  children,
}) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/products/${productId}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
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

  const hanldeIncreaseQuantity = () => {
    increaseQuantity(index);
  };

  const handleDecreaseQuantity = () => {
    decreaseQuantity(index);
  };

  const handleContainerClick = (event) => {
    // Prevent event propagation to parent elements
    // ensure that clicking inside the Popup component doesn't trigger the onClose function
    event.stopPropagation();
  };

  return (
    isOpen && (
      <div className="popup" onClick={handleContainerClick}>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>

        {loading ? (
          <Loading />
        ) : (
          <div>
            {product && (
              <div className="product-data">
                <div className="product-images">
                  {/* <div className="first-image">{renderedImages[0]}</div>
                <div className="second-image">{renderedImages[1]}</div> */}
                  {renderedImages[0]}
                  {renderedImages[1]}
                </div>

                <div className="product-details-div">
                  <div className="product-info">
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                  </div>
                  <div className="quantity-controls">
                    <button
                      onClick={() => {
                        handleDecreaseQuantity();
                      }}
                    >
                      -
                    </button>
                    <p>{quantities[index]}</p>
                    <button
                      onClick={() => {
                        hanldeIncreaseQuantity();
                      }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="add-to-cart"
                    onClick={() => {
                      handleAddToCart(product, quantities[index]);
                      onClose();
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  );
};

export default Popup;
