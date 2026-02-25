import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Shop = () => {
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const categories = [
    "All Categories",
    "New Arrival",
    "Airpods",
    "Clock",
    "Lamp",
    "Watch",
  ];

  const products = [
    { id: 1, name: "Apple AirPods Pro 2", price: 890, category: "Airpods", images: ["/airpods.jpg"] },
    { id: 2, name: "Mini Massager", price: 300, category: "New Arrival", images: ["/mini massager.webp"] },
    { id: 3, name: "JBL Speaker", price: 1800, category: "New Arrival", images: ["/jblspeaker.webp"] },
    { id: 4, name: "Smart Watch", price: 2650, category: "Watch", images: ["/watch.jpeg"] },
    { id: 5, name: "Massage Gun", price: 999, category: "New Arrival", images: ["/massage gun.webp", "/massage_gun2.jpg", "/massage_gun3.jpg"] },
     { id: 6, name: "JBL Speaker", price: 1800, category: "New Arrival", images: ["/jblspeaker.webp", "/jbl2.jpg", "/jbl3.jpg"] },
  { id: 7, name: "Ultrapods Max", price: 500, category: "New Arrival", images: ["/ultrapods.jpg", "/ultrapods2.jpg", "/ultrapods3.jpg"] },
   { id: 8, name: "Emoji alarm clock", price: 1200, category: "Clock", images: ["/EmojiAlarm.webp", "/clock2.jpg", "/clock3.jpg"] }, 
   { id: 9, name: "BINBOND watch", price: 800, category: "Lamp", images: ["/binbond.jpeg", "/lamp2.jpg", "/lamp3.jpg"] }, 
   { id: 10, name: "Smart Watch", price: 2650, category: "Watch", images: ["/watch.jpeg", "/watch2.jpeg", "/watch3.jpeg"] },
    { id: 11, name: "Skeleton Clock", price: 1400, category: "Clock", images: ["/SkjeletonClock.webp", "/SkjeletonClock2.webp", "/SkjeletonClock3.webp"] }, 
    { id: 12, name: "Time Clock", price: 1600, category: "Clock", images: ["/time clock.jpg", "/time clock2.jpg", "/time clock3.jpg"] }, 
    { id: 13, name: "Hoco Headphone", price: 3000, category: "Airpods", images: ["/hoco.jpg", "/hoco2.jpg", "/hoco3.jpg"] },
    { id: 14, name: "poadagar 613", price: 2700, category: "New Arrival", images: ["/poedagar613.webp", "/jblspeaker2.webp", "/jblspeaker3.webp"] },
    { id: 15, name: "poadagar 930", price: 800, category: "New Arrival", images: ["/poadagar 930.png", "/massage gun2.webp", "/massage gun3.webp"] }, 
    { id: 16, name: "Arabic aura watch", price: 1950, category: "New Arrival", images: ["/arabic.jpg", "/mini massager2.webp", "/mini massager3.webp"] },
   { id: 17, name: "Pokkie clock", price: 2300, category: "Airpods", images: ["/pokkie clock.jpeg", "/ultrapods2.jpg", "/ultrapods3.jpg"] },
    { id: 18, name: "Mini clock", price: 2600, category: "Watch", images: ["/mini clock.jpg", "/watch2.jpeg", "/watch3.jpeg"] },
     { id: 19, name: "Mini UPS", price: 1100, category: "New Arrival", images: ["/MiniUPS.jpg", "/MiniUPS2.jpg", "/MiniUPS3.jpg"] }, 
     { id: 20, name: "Rolex Style Watch", price: 1750, category: "Watch", images: ["/Rolex.jpg", "/Rolex2.jpg", "/Rolex3.jpg"] }, 
    ];
  

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const filteredProducts =
    selectedCategory === "All Categories"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // 🔥 ADD TO CART FUNCTION
  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(
      (item) => item.id === selectedProduct.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        image: selectedProduct.images[0],
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("🛒 Added to Cart!");
    setShowForm(false);
  };

  // 🔥 ORDER CONFIRM FUNCTION
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
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen flex flex-col md:flex-row gap-6">

      {/* Categories */}
      <div className="w-full md:w-64 bg-white p-4 rounded shadow flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-2 py-1 rounded whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-pink-500 text-white"
                : "hover:bg-pink-500 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded shadow"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-contain"
            />
            <h2 className="mt-2 font-semibold">{product.name}</h2>
            <p className="text-red-500 font-bold">৳ {product.price}</p>

            <button
              onClick={() => {
                setSelectedProduct(product);
                setActiveImage(product.images[0]);
                setShowForm(true);
              }}
              className="mt-2 bg-green-600 text-white px-4 py-1 rounded w-full hover:bg-green-700"
            >
              Order Now
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showForm && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-red-500"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-3">
              Checkout - {selectedProduct.name}
            </h2>

            <img
              src={activeImage}
              alt=""
              className="w-full h-48 object-contain mb-3"
            />

            <input
              type="text"
              placeholder="Full Name"
              className="border p-2 w-full mb-2"
              value={customerInfo.name}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border p-2 w-full mb-2"
              value={customerInfo.phone}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, phone: e.target.value })
              }
            />
            <textarea
              placeholder="Address"
              className="border p-2 w-full mb-3"
              value={customerInfo.address}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, address: e.target.value })
              }
            />

            {/* BUTTONS */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="bg-green-600 text-white px-4 py-2 rounded w-1/2 hover:bg-green-700"
              >
                Add to Cart
              </button>

              <button
                onClick={handleOrderSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded w-1/2 hover:bg-blue-700"
              >
                Pay & Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Orders Counter */}
      <h1
        className="text-2xl font-bold absolute top-4 right-4 cursor-pointer"
        onClick={() => navigate("/orders")}
      >
        🛍️ Orders: {orders.length}
      </h1>
    </div>
  );
};

export default Shop;