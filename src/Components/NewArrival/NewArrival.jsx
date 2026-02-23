import React, { useState, useEffect } from "react";

const products = [
  { id: 1, name: "mini massager", price: 300, oldPrice: 350, image: "/mini massager.webp" },
  { id: 2, name: "massage gun", price: 999, oldPrice: 1499, image: "/massage gun.webp" },
  { id: 3, name: "jbl speaker", price: 1800, oldPrice: 2200, image: "/jblspeaker.webp" },
  { id: 4, name: "ultrapods", price: 500, oldPrice: 650, image: "/ultrapods.jpg" },
];

const NewArrival = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "", address: "" });
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const handleOrderSubmit = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert("❌ Please fill all fields");
      return;
    }

    const newOrder = {
      id: Date.now(),
      product: selectedProduct,
      customer: customerInfo,
      date: new Date().toLocaleString(),
      status: "Paid (Demo)",
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    alert("🎉 Payment Successful & Order Placed!");
    setShowForm(false);
    setSelectedProduct(null);
    setCustomerInfo({ name: "", phone: "", address: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <h2 className="text-2xl font-bold mb-8">NEW ARRIVAL</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 cursor-pointer"
            onClick={() => {
              setSelectedProduct(product);
              setShowForm(true);
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-60 object-cover rounded-lg"
            />
            <h4 className="mt-4 font-semibold text-gray-800">{product.name}</h4>
            <div className="mt-2">
              <span className="text-red-500 font-bold text-lg">৳ {product.price}</span>
              <span className="text-gray-400 line-through ml-2">৳ {product.oldPrice}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Order Form Modal */}
      {showForm && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-red-500 text-lg font-bold"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-3">Order - {selectedProduct.name}</h2>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-48 object-contain rounded mb-4"
            />

            <input
              type="text"
              placeholder="Full Name"
              className="border p-2 w-full mb-2"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border p-2 w-full mb-2"
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
            />
            <textarea
              placeholder="Address"
              className="border p-2 w-full mb-3"
              value={customerInfo.address}
              onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
            />
            <button
              onClick={handleOrderSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
            >
              Pay & Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewArrival;