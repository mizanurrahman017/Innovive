import React, { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [lastCancelled, setLastCancelled] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const handleCancelOrder = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order? ❌")) {
      const cancelledOrder = orders.find((o) => o.id === orderId);
      const updatedOrders = orders.filter((order) => order.id !== orderId);
      setOrders(updatedOrders);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      setLastCancelled(cancelledOrder);
    }
  };

  const handleUndo = () => {
    if (lastCancelled) {
      const updatedOrders = [...orders, lastCancelled];
      setOrders(updatedOrders);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      setLastCancelled(null);
    }
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) => o.status.toLowerCase() === filter);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">📦 Order History</h1>

      {/* Filter */}
      <div className="mb-4 flex gap-3">
        {["all", "pending", "shipped", "delivered"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Undo */}
      {lastCancelled && (
        <div className="mb-4">
          <button
            onClick={handleUndo}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Undo Last Cancelled Order
          </button>
        </div>
      )}

      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 rounded shadow relative"
            >
              <h2 className="font-bold text-lg">{order.product.name}</h2>
              <p>Price: ৳ {order.product.price}</p>
              <p>Name: {order.customer.name}</p>
              <p>Phone: {order.customer.phone}</p>
              <p>Address: {order.customer.address}</p>
              <p>Status: 
                <span
                  className={`ml-2 font-semibold ${
                    order.status.toLowerCase() === "pending"
                      ? "text-yellow-500"
                      : order.status.toLowerCase() === "shipped"
                      ? "text-blue-500"
                      : "text-green-600"
                  }`}
                >
                  {order.status}
                </span>
              </p>
              <p className="text-sm text-gray-500">{order.date}</p>

              <button
                onClick={() => handleCancelOrder(order.id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;