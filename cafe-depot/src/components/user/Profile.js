import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../constants";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import Loading from "../loading/Loading";

export default function Profile() {
  const userId = useSelector((state) => state.userSlice.userId);
  const firstName = useSelector((state) => state.userSlice.firstName);
  const lastName = useSelector((state) => state.userSlice.lastName);

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([{}]);
  const [renderedImages, setRenderedImages] = useState({});

  const getOrdersByUserId = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/orders/${userId}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      if (response.ok) {
        const orders = await response.json();
        console.log("Orders fetched successfully: ", orders);
        setOrders(orders);
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
    if (userId) {
      getOrdersByUserId(userId);
    }
  }, [userId]);

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
          <td key={index}>
            <img src={url} alt={`Image ${index}`} width={100} />
          </td>
        )),
      }));
    } catch (error) {
      console.log("Error getting image URL:", error);
    }
  };

  useEffect(() => {
    // Fetch image URLs when the component mounts or when products change
    orders.forEach((order) => {
      order.orderItems &&
        order.orderItems.forEach((orderItem) => {
          fetchImageUrls(orderItem.product);
        });
    });
  }, [orders]);

  return (
    <div>
      <h1>Hello, {firstName} {lastName}</h1> {/* Display user's first and last name */}
      My orders
      {loading ? (
        <Loading />
      ) : (
        <div className="product-container">
          {orders &&
            orders.map((order, index) => (
              <div key={index}>
                <table className="product-table">
                  <tbody>
                    <tr>
                      <td>Total:</td>
                      <td>${order.total}</td>
                    </tr>
                    <tr>
                      <td>Date placed:</td>
                      <td>{order.orderDate}</td>
                    </tr>
                    <tr>
                      <td>Order items:</td>
                      <tr>
                        {order.orderItems &&
                          order.orderItems.map((orderItem, index) => (
                            <tr>
                              <td>{orderItem.product.name}</td>
                              {renderedImages[orderItem.product.id]}
                            </tr>
                          ))}
                      </tr>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
