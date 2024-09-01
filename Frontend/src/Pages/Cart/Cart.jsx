import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./Cart.css"; // Add CSS as needed
import { UserContext } from "../../contexts/UserContext";

export default function Cart() {
  const { loggedUser } = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (
        loggedUser &&
        loggedUser.data &&
        loggedUser.data.user &&
        loggedUser.data.user._id
      ) {
        try {
          const response = await fetch(
            `http://localhost:3026/api/v1/cart/${loggedUser.data.user._id}`
          );
          const data = await response.json();

          // Check API response structure
          console.log("API Response Data:", data);

          // Ensure data.products exists and is an array
          if (response.ok && Array.isArray(data.products)) {
            setCart(data.products); // Adjust based on actual API response structure
          } else {
            console.error(
              "Failed to fetch cart items:",
              data.message || "No message provided"
            );
            setCart([]);
          }
        } catch (error) {
          console.error("Error fetching cart items:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("User is not logged in or data is not available.");
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [loggedUser]);

  const handleRemoveFromCart = async (productId, quantity) => {
    try {
      const response = await fetch(`http://localhost:3026/api/v1/cart/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: loggedUser.data.user._id,
          productId,
          quantity: quantity || 1, // Default to 1 if quantity is not provided
        }),
      });

      if (response.ok) {
        setCart(cart.filter((item) => item.productId._id !== productId));
      } else {
        const errorData = await response.json();
        console.error(
          "Failed to remove item from cart:",
          errorData.message || "No message provided"
        );
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    const qty = parseInt(quantity, 10);

    if (isNaN(qty) || qty <= 0) {
      console.error("Invalid quantity value");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3026/api/v1/cart/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: loggedUser.data.user._id,
          productId,
          quantity: qty,
        }),
      });

      if (response.ok) {
        setCart(
          cart.map((item) =>
            item.productId._id === productId ? { ...item, quantity: qty } : item
          )
        ); // Update state after successful update
      } else {
        const errorData = await response.json();
        console.error(
          "Failed to update item quantity:",
          errorData.message || "No message provided"
        );
      }
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.productId.Mrp * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2>Your Cart</h2>
        {loading ? (
          <p>Loading...</p>
        ) : cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="list-group mb-3">
              {cart.map((item) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={item.productId._id}
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={item.productId.photo || "/path/to/default/image.jpg"}
                      alt={item.productId.description || "Product Image"}
                      className="img-thumbnail"
                      style={{ width: "50px", marginRight: "10px" }}
                    />
                    <span>
                      {item.productId.description || "No description"}
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        handleUpdateQuantity(item.productId._id, e.target.value)
                      }
                      style={{ width: "60px", marginRight: "10px" }}
                    />
                    <span>₹{item.productId.Mrp * item.quantity}</span>
                    <button
                      className="btn btn-danger btn-sm ml-2"
                      onClick={() =>
                        handleRemoveFromCart(item.productId._id, item.quantity)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between">
              <h4>Total Price: ₹{subtotal}</h4>
              <button
                className="btn btn-success"
                onClick={() => (window.location.href = "/checkout")}
              >
                Proceed to Payment
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
