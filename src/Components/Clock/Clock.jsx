import React, { useState, useEffect } from "react";

const products = [
  {
    id: 1,
    name: "Mini Alarm Clock Key Chain",
    price: 420,
    oldPrice: 520,
    discount: "-100৳",
    images: ["/mini clock.jpg", "/public/mini clock2.jpg", "/public/mini clock3.jpg"],
    sold: 17,
    top: false,
  },
  {
    id: 2,
    name: "Smart Clock",
    price: 1200,
    oldPrice: 1400,
    discount: "-200৳",
    images: ["/pokkie clock.jpeg", "/public/pokkie clock2.jpeg", "/public/pokkie clock3.jpeg"],
    sold: 2,
    top: true,
  },
  {
    id: 3,
    name: "Emoji alarm Clock",
    price: 2000,
    oldPrice: 2500,
    discount: "-500৳",
    images: ["/EmojiAlarm.webp", "/public/EmojiAlarm2.webp", "/public/EmojiAlarm3.webp"],
    sold: 47,
    top: true,
  },
  {
    id: 4,
    name: "3D Wall Clock",
    price: 920,
    oldPrice: 1040,
    discount: "-120৳",
    images: ["/SkjeletonClock.webp", "/public/SkjeletonClock2.webp", "/public/SkjeletonClock3.webp"],
    sold: 43,
    top: false,
  },
  {
    id: 5,
    name: "LED Digital Clock",
    price: 420,
    oldPrice: 580,
    discount: "-160৳",
    images: ["/time clock.jpg", "/public/time clock2.jpg", "/public/time clock3.jpg"],
    sold: 329,
    top: true,
  },
];

const Clock = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "", address: "" });
  const [orders, setOrders] = useState([]);

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
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold border-b-2 border-black inline-block">
          CLOCK
        </h2>
      </div>

      {/* Horizontal Scroll */}
      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[250px] bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-4 relative flex-shrink-0 cursor-pointer group"
            onClick={() => {
              setSelectedProduct(product);
              setActiveImage(product.images[0]);
              setShowForm(true);
            }}
          >
            {/* Discount */}
            <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded">
              {product.discount}
            </span>

            {/* Top Sale Badge */}
            {product.top && (
              <span className="absolute bottom-3 left-3 bg-pink-500 text-white text-xs px-2 py-1 rounded">
                🔥 Top Sale
              </span>
            )}

            {/* Heart */}
            <span className="absolute top-3 right-3 text-pink-500 text-xl cursor-pointer">
              ♥
            </span>

            <div className="overflow-hidden rounded">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-52 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <h4 className="mt-4 font-semibold text-gray-800 text-sm">
              {product.name}
            </h4>

            <div className="mt-2">
              <span className="text-pink-600 font-bold text-lg">
                ৳ {product.price}
              </span>
              <span className="text-gray-400 line-through ml-2 text-sm">
                ৳ {product.oldPrice}
              </span>
            </div>

            <div className="text-yellow-500 text-sm mt-2">
              ★ 0/5 (0) • {product.sold} Sold
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Order Form */}
      {showForm && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-red-500 text-lg font-bold"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-3">{selectedProduct.name}</h2>

            <div className="overflow-hidden rounded">
              <img
                src={activeImage}
                alt={selectedProduct.name}
                className="w-full h-48 object-contain transition-transform duration-300 hover:scale-110 rounded"
              />
            </div>

            <div className="flex gap-2 mt-2">
              {selectedProduct.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt=""
                  className={`w-16 h-16 object-contain border cursor-pointer ${
                    img === activeImage ? "border-blue-500" : "border-gray-200"
                  }`}
                  onClick={() => setActiveImage(img)}
                />
              ))}
            </div>

            <input
              type="text"
              placeholder="Full Name"
              className="border p-2 w-full mb-2 mt-3"
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

export default Clock;