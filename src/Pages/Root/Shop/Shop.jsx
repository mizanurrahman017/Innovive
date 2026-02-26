// src/Pages/Root/Shop/Shop.jsx
import React, { useState, useEffect } from "react";

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showOrdersList, setShowOrdersList] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const categories = ["All Categories","New Arrival","Airpods","Clock","Fan","Watch"];

  const products = [
    { id: 1, name: "Apple AirPods Pro 2", price: 890, category: "Airpods", images: ["/airpods.jpg","/airpods2.webp","/airpods3.webp"], description: "High-quality wireless earbuds with active noise cancellation." },
    { id: 2, name: "Mini Massager", price: 300, category: "New Arrival", images: ["/mini massager.webp","/mini massager2.jpg","/mini massager3.jpeg"], description: "Portable mini massager to relieve muscle tension anytime." },
    { id: 3, name: "JBL 6 Speaker", price: 1800, category: "New Arrival", images: ["/jblspeaker.webp","/jblspeaker2.jpg","/jblspeaker3.webp"], description: "Portable JBL Bluetooth speaker with deep bass." },
    { id: 4, name: "Smart Watch", price: 2650, category: "Watch", images: ["/watch.jpeg","/watch2.jpeg","/watch3.jpeg"], description: "Smartwatch with fitness tracking and notifications." },
    { id: 5, name: "Massage Gun", price: 999, category: "New Arrival", images: ["/massage gun.webp","/massgae gun 2.jpeg","/massage gun 3.jpeg"], description: "Deep tissue massage gun for muscle recovery." },
    { id: 6, name: "Ultrapods Max", price: 500, category: "Airpods", images: ["/ultrapods.jpg","/Ultrapods 2.png","/Ultrapods 3.png"], description: "Premium earbuds with ultra bass." },
    { id: 7, name: "Emoji Alarm Clock", price: 1200, category: "Clock", images: ["/EmojiAlarm.webp","/emojclock2.jpeg","/emojialarm 3.webp"], description: "Cute emoji clock to wake you up happily." },
    { id: 8, name: "BINBOND watch", price: 800, category: "Watch", images: ["/binbond.jpeg","/binbond 2.avif","/BINBOND 3.png"], description: "Stylish lamp for bedroom or office." },
    { id: 9, name: "Apple airpods", price: 2650, category: "Airpods", images: ["/apple.jpg","/apple.jpg","/apple.jpg"], description: "Second-gen smartwatch with health tracking." },
    { id: 10, name: "Skeleton Clock", price: 1400, category: "Clock", images: ["/SkjeletonClock.webp","/Skeleton Clock2.webp","/Skeleton Clock3.webp"], description: "Elegant skeleton clock for home decor." },
    { id: 11, name: "Time Clock", price: 1600, category: "Clock", images: ["/time clock.jpg","/Time Clock2.webp","/Time Clock3.avif"], description: "Classic time clock for office/home." },
    { id: 12, name: "Hoco Headphone", price: 3000, category: "Airpods", images: ["/hoco.jpg","/Hoco Headphone2.jpg","/Hoco Headphone3.jpg"], description: "Over-ear headphones with premium sound." },
    { id: 13, name: "Poadagar 613", price: 2700, category: "Watch", images: ["/poedagar613.webp","/Poadagar 613 2.webp","/Poadagar 613 3.jpg"], description: "Stylish gadget with multi-features." },
    { id: 14, name: "Poadagar 930", price: 800, category: "Watch", images: ["/poadagar 930.png","/Poadagar 930 2.webp","/poedagar 930 3.webp"], description: "Compact gadget for everyday use." },
    { id: 15, name: "Arabic Aura Watch", price: 1950, category: "Watch", images: ["/arabic.jpg","/Arabic2.png","/Arabic3.webp"], description: "Luxury Arabic style watch." },
    { id: 16, name: "Pokkie Clock", price: 2300, category: "Clock", images: ["/pokkie clock.jpeg","/pokkie clock 2.jpeg","/pokkie clock 3.jpeg"], description: "Modern clock with fun design." },
    { id: 17, name: "Mini Clock", price: 2600, category: "Clock", images: ["/mini clock.jpg","/miniclock2.jpeg","/mini clock 3.jpeg"], description: "Compact clock with sleek design." },
    { id: 18, name: "Mini UPS", price: 1100, category: "New Arrival", images: ["/MiniUPS.jpg","/public/Mini UPS 3.webp","/public/Mini UPS 2.webp"], description: "Portable UPS for emergency backup." },
    { id: 19, name: "Rolex Style Watch", price: 1750, category: "Watch", images: ["/Rolex.jpg","/Rolex2.webp","/Rolex3.webp"], description: "Classic Rolex style watch replica." },
    { id: 20, name: "Mini fan", price: 350, category: "Fan", images: ["/fan.jpeg","/fan2.jpeg","/fan3.jpeg"], description: "Professional mini fan for deep tissue." },
  ];

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const filteredProducts = selectedCategory === "All Categories"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  // Add to Cart
  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === selectedProduct.id);
    if (existingItem) existingItem.quantity += 1;
    else cart.push({ id: selectedProduct.id, name: selectedProduct.name, price: selectedProduct.price, image: selectedProduct.images[0], quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("🛒 Added to Cart!");
    setShowOrderForm(false);
  };

  // Order Submit
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
    setShowOrderForm(false);
    setSelectedProduct(null);
    setCustomerInfo({ name: "", phone: "", address: "" });
  };

  // Cancel Order
  const handleCancelOrder = (id) => {
    const updatedOrders = orders.filter(order => order.id !== id);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen flex flex-col md:flex-row gap-6 relative">

      {/* Categories */}
      <div className="w-full md:w-64 bg-white p-4 rounded shadow flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-2 py-1 rounded whitespace-nowrap ${selectedCategory === cat ? "bg-pink-500 text-white" : "hover:bg-pink-500 hover:text-white"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6">

        {/* Orders List */}
        {showOrdersList ? (
          <div>
            <h1 className="text-3xl font-bold mb-4">Orders ({orders.length})</h1>
            {orders.length === 0 ? (
              <p>No orders yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white p-4 rounded shadow flex flex-col">
                    <img src={order.product.images[0]} alt={order.product.name} className="w-full h-48 object-contain mb-2" />
                    <h2 className="font-semibold">{order.product.name}</h2>
                    <p>৳ {order.product.price}</p>
                    <p>Status: {order.status}</p>
                    <p>Date: {order.date}</p>
                    <p>Customer: {order.customer.name}</p>
                    <button onClick={() => handleCancelOrder(order.id)} className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                      Cancel Order
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => setShowOrdersList(false)} className="mt-4 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700">
              Back to Shop
            </button>
          </div>
        ) : (
          // Products Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded shadow">
                <img src={product.images[0]} alt={product.name} className="w-full h-48 object-contain cursor-pointer"
                  onClick={() => { setSelectedProduct(product); setActiveImage(product.images[0]); setShowImageModal(true); }}
                />
                <h2 className="mt-2 font-semibold">{product.name}</h2>
                <p className="text-red-500 font-bold">৳ {product.price}</p>
                <button onClick={() => { setSelectedProduct(product); setActiveImage(product.images[0]); setShowOrderForm(true); }}
                  className="mt-2 bg-green-600 text-white px-4 py-1 rounded w-full hover:bg-green-700">
                  Order Now
                </button>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Orders Counter */}
      <h1 className="text-2xl font-bold absolute top-4 right-4 cursor-pointer z-50"
          onClick={() => setShowOrdersList(true)}>
        🛍️ Orders: {orders.length}
      </h1>

      {/* Order Form Modal */}
      {showOrderForm && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
            <button onClick={() => setShowOrderForm(false)} className="absolute top-2 right-2 text-red-500 text-xl">✕</button>
            <h2 className="text-xl font-bold mb-3">Checkout - {selectedProduct.name}</h2>
            <img src={activeImage} alt="" className="w-full h-48 object-contain mb-3" />
            <input type="text" placeholder="Full Name" className="border p-2 w-full mb-2" value={customerInfo.name} onChange={(e)=>setCustomerInfo({...customerInfo,name:e.target.value})} />
            <input type="text" placeholder="Phone Number" className="border p-2 w-full mb-2" value={customerInfo.phone} onChange={(e)=>setCustomerInfo({...customerInfo,phone:e.target.value})} />
            <textarea placeholder="Address" className="border p-2 w-full mb-3" value={customerInfo.address} onChange={(e)=>setCustomerInfo({...customerInfo,address:e.target.value})} />
            <div className="flex gap-3">
              <button onClick={handleAddToCart} className="bg-green-600 text-white px-4 py-2 rounded w-1/2 hover:bg-green-700">Add to Cart</button>
              <button onClick={handleOrderSubmit} className="bg-blue-600 text-white px-4 py-2 rounded w-1/2 hover:bg-blue-700">Pay & Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4">
          <div className="relative w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1 flex justify-center items-center">
              <img src={activeImage} alt={selectedProduct.name} className="max-h-[80vh] object-contain rounded-lg" />
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <button onClick={()=>setShowImageModal(false)} className="text-red-600 text-2xl font-bold hover:text-red-800">✕</button>
              </div>
              <p className="text-gray-700 text-lg">{selectedProduct.description}</p>
              <p className="text-red-500 font-bold text-xl">৳ {selectedProduct.price}</p>
              <div className="flex gap-3 mt-4">
                {selectedProduct.images.slice(0,3).map((img,i)=>(
                  <img key={i} src={img} alt={`Thumbnail ${i+1}`} className={`w-24 h-24 object-contain border rounded cursor-pointer hover:border-pink-500 ${activeImage===img?"border-pink-600 border-2":"border-gray-300"}`} onClick={()=>setActiveImage(img)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Shop;