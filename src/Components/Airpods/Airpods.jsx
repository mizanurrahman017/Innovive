import React, { useState, useEffect } from "react";

const products = [
  {
    id: 1,
    name: "Apple AirPods Pro 2",
    price: 890,
    oldPrice: 1080,
    discount: "-190৳",
    images: ["/apple.jpg", "/apple.jpg", "/apple.jpg"],
    sold: 5,
  },
  {
    id: 2,
    name: "AirPods Pro (2nd generation)",
    price: 1550,
    oldPrice: 1700,
    discount: "-150৳",
    images: ["/airpods.jpg", "/airpods2.webp", "/airpods3.webp"],
    sold: 2,
  },
  {
    id: 3,
    name: "HOCO W35 Wireless Bluetooth Headphone",
    price: 1000,
    oldPrice: 2250,
    discount: "-1250৳",
    images: ["/hoco.jpg", "/Hoco Headphone2.jpg", "/Hoco Headphone3.jpg"],
    sold: 1,
  },
  {
    id: 4,
    name: "Ultrapods max",
    price: 500,
    oldPrice: 650,
    discount: "-150৳",
    images: ["/ultrapods.jpg", "/Ultrapods 2.png", "/Ultrapods 3.png"],
    sold: 0,
  },
  {
    id: 5,
    name: "HOCO W35 Wireless Bluetooth Headphone",
    price: 1000,
    oldPrice: 2250,
    discount: "-1250৳",
    images: ["/hoco.jpg", "/Hoco Headphone2.jpg", "/Hoco Headphone3.jpg"],
    sold: 0,
  },
];

const Airpods = () => {
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
          AIRPODS
        </h2>
      </div>

      {/* Horizontal Scroll Container */}
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

      {/* Order Form / Image Modal */}
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

export default Airpods;