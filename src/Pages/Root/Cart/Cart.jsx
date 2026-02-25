import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const updateCartStorage = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCartStorage(updatedCart);
  };

  const handleQuantityChange = (id, type) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        if (type === "inc") item.quantity += 1;
        if (type === "dec" && item.quantity > 1) item.quantity -= 1;
      }
      return item;
    });

    updateCartStorage(updatedCart);
  };

  const handleClearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    alert("Order Placed Successfully! 🎉");

    localStorage.removeItem("cart");
    setCartItems([]);
    navigate("/");
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">ORDER</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">
          Your cart is empty!
        </p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p>${item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(item.id, "dec")}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => handleQuantityChange(item.id, "inc")}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total + Buttons */}
          <div className="mt-8 text-right space-y-4">
            <h3 className="text-xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </h3>

            <div className="flex justify-end gap-4">
              <button
                onClick={handleClearCart}
                className="px-5 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Clear Cart
              </button>

              <button
                onClick={handleCheckout}
                className="px-5 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;