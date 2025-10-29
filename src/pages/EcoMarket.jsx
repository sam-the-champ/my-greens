import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Filter, X } from "lucide-react";

// ✅ Mock Product Fetcher
const fetchMockProducts = async () => {
  return [
    { id: 1, title: "Reusable Water Bottle", price: 15, category: "Lifestyle", image: "https://media.istockphoto.com/id/1789083025/photo/white-gray-and-black-bottles-aluminium-bottle-on-white-background-3d-rendering-mockup-for.jpg?s=612x612&w=0&k=20&c=31yzYd6_536W_JGET3wj7byqXJ777vYoc9XUJsqIb0M=" },
    { id: 2, title: "Organic Cotton T-Shirt", price: 25, category: "Clothing", image: "https://media.istockphoto.com/id/1155684500/photo/t-shirts-di-cut-on-white-background-heather-grey-and-navy-blue-and-white-color-clipping-path.jpg?s=612x612&w=0&k=20&c=kYHSvm7k6VlymoJ6EuRTLojDv3Lx4vLFXhapRlfL7e4=" },
    { id: 3, title: "Solar Powered Charger", price: 40, category: "Tech", image: "https://media.istockphoto.com/id/2161430645/photo/solar-panels-with-sky-reflection-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=D9MoA6KuPECRkL8oD1W8puq6kLykbcrvkl503PyK0qw=" },
    { id: 4, title: "Bamboo Toothbrush", price: 5, category: "Lifestyle", image: "https://media.istockphoto.com/id/1199527201/photo/plastic-toothbrush-vs-eco-friendly-bamboo-toothbrush-comparison-concept-no-plastic-zero-waste.jpg?s=612x612&w=0&k=20&c=As8x6bsar98aNDyiPHCSE0-JVcJtDOIeis6cet5DFA0=" },
    { id: 5, title: "Eco-Friendly Notebook", price: 10, category: "Stationery", image: "https://media.istockphoto.com/id/2236714117/photo/financial-independence-concept-sufficient-personal-wealth-to-cover-living-expenses-without.jpg?s=612x612&w=0&k=20&c=R3ZSvRv1RpVkN4YobKgl_wrny45xt2xf5OXztmjNXYA=" },
  { id: 6, title: "Compost Bin", price: 35, category: "Home", image: "https://media.istockphoto.com/id/1286154207/photo/compost-bin-with-organic-waste.jpg?s=612x612&w=0&k=20&c=fbmVAlZ2eWmkBWzHZvHBjNhgZzKPsy1quwWvYpF2Slc=" },
  { id: 7, title: "Reusable Shopping Bag", price: 12, category: "Lifestyle", image: "https://media.istockphoto.com/id/2168160054/photo/cotton-tote-bag-canvas-eco-friendly-shopping-bag-mockup.jpg?s=612x612&w=0&k=20&c=Wy_gSSFVkIT6R4iwLajP7Gbf2YVhAeQamA_o9dw5dKw=" },
  { id: 8, title: "LED Light Bulb Pack", price: 20, category: "Home", image: "https://media.istockphoto.com/id/503218486/photo/ledare-ikea-e26-led-bulbs-boxes.jpg?s=612x612&w=0&k=20&c=dweawH_2mbsk1h5_uRP_ixph2fK6hcxhWnnXCR1hHdE=" },
  { id: 9, title: "Plant-Based Soap", price: 8, category: "Beauty", image: "https://media.istockphoto.com/id/2203239992/photo/handcrafted-olive-soap-bars-exude-natural-freshness-promoting-gentle-cleansing-and-skincare.jpg?s=612x612&w=0&k=20&c=AqRiCu7FTZcZlgBeCdj1OAtsylgqzqzOPiI19wFzC6o=" },
  { id: 10, title: "Recycled Paper Towels", price: 7, category: "Home", image: "https://media.istockphoto.com/id/871303330/photo/a-isolated-paper-napkins.jpg?s=612x612&w=0&k=20&c=0xPPUkqF69j_CZHaJCyxrHqpSih7umOV3WrJShQuGWU=" },
  { id: 11, title: "Biodegradable Phone Case", price: 18, category: "Tech", image: "https://media.istockphoto.com/id/876467210/photo/prosthetic-hand-holds-cover-for-the-cellphone.jpg?s=612x612&w=0&k=20&c=VeCsmqYpWG4bo2c19eSViz1LIXchUwhy0njIO-Kyj0M=" },
  { id: 12, title: "Organic Coffee Beans", price: 22, category: "Food", image: "https://media.istockphoto.com/id/2176883909/photo/wedding-favor-burlap-jute-gift-bags-with-coffee-beans-thank-you-label-and-dry-flowers.jpg?s=612x612&w=0&k=20&c=PVyy4y_9n0H9m3OoajRIVy_DmwBozaxq7suLvWlfEEU=" },
  { id: 13, title: "Stainless Steel Straw Set", price: 9, category: "Lifestyle", image: "https://media.istockphoto.com/id/1433641576/photo/woman-holding-comparing-reusable-drinking-straws-in-zero-waste-store.jpg?s=612x612&w=0&k=20&c=FbopyMEvIPo_0MfTa_JUSXbG8ZKcUDEkgnumg6PR9r8=" },
  { id: 14, title: "Solar Garden Lights", price: 30, category: "Home", image: "https://media.istockphoto.com/id/173897357/photo/solar-powered-light.jpg?s=612x612&w=0&k=20&c=jOTvZIx-GV8k5VpjIeTjEwl2MTUXoc5WqFje8c6E5y0=" },
  { id: 15, title: "Eco Yoga Mat", price: 45, category: "Fitness", image: "https://media.istockphoto.com/id/1497977384/photo/empty-yoga-studio-interior-with-exercise-mats-pillows-yoga-blocks-and-walled-garden.jpg?s=612x612&w=0&k=20&c=MXzBaR2zE5106Zyk9kfAVnOpBTU98pv3EluUJF7o-rg=" },
  { id: 16, title: "Recycled Sneakers", price: 60, category: "Clothing", image: "https://media.istockphoto.com/id/2029878440/photo/fashionable-leather-shoes-on-top-of-the-cardboard-shoe-box-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=yXObxXLUy3OOHEntK3iaJpSz-62J8CHzNTZamjLAca4=" },
  { id: 17, title: "Beeswax Food Wraps", price: 14, category: "Kitchen", image: "https://media.istockphoto.com/id/1353602624/photo/take-away-sandwich-inside-homemade-beeswax-wraps-wrapping-food-in-handmade-beeswax-wrap-cloth.jpg?s=612x612&w=0&k=20&c=aC-UeQsuspGKHiKOZQTh-7-60DsNXIG7BuiPk_AvCBE=" },
  { id: 18, title: "Wooden Hair Brush", price: 11, category: "Beauty", image: "https://media.istockphoto.com/id/153754011/photo/hairbrush.jpg?s=612x612&w=0&k=20&c=A-Tio3XDvHd6bHOuuJMWeut8hmQgjBQhsGyYPBfA3vk=" },
  { id: 19, title: "Hemp Backpack", price: 55, category: "Accessories", image: "https://media.istockphoto.com/id/2224460335/photo/handbag-with-handle-mockup-brown-eco-hand-bag-mock-up-made-from-jute-hessian-sackcloth-canvas.jpg?s=612x612&w=0&k=20&c=uPfcR1BYiTZZ04x4CMI2kTRRYkFbcu-khEz2_gJPGwk=" },
  { id: 20, title: "Eco Candle Set", price: 28, category: "Home", image: "https://media.istockphoto.com/id/2187822365/photo/first-sunday-of-advent-sustainable-christmas.jpg?s=612x612&w=0&k=20&c=YRLpwAAweqW9emGhbFdQd_uKuZtqga4EWXxb-ONuE3k=" },
  { id: 21, title: "Vegan Leather Wallet", price: 32, category: "Accessories", image: "https://media.istockphoto.com/id/1288029199/photo/brown-leather-purse-laying-on-a-light-brown-background.jpg?s=612x612&w=0&k=20&c=BR4_JripN5gyMAldsR3HEGeRsjQC8miVN-Qp80hlHok=" },
  { id: 22, title: "Organic Tea Sampler", price: 18, category: "Food", image: "https://media.istockphoto.com/id/488914956/photo/assorted-tea-collection.jpg?s=612x612&w=0&k=20&c=z0mBaC1Rdaw0utfxLwrooHKHAfOBLDIiZ0ujpku4m-s=" },
  { id: 23, title: "Reusable Coffee Cup", price: 14, category: "Lifestyle", image: "https://media.istockphoto.com/id/1966264207/photo/white-grey-and-black-thermo-coffee-mug-mockup-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=R5Fox8mZAJfsiZChWNP1LUBUyo76qQzBVcjHM6PsdII=" },
  { id: 24, title: "Natural Deodorant", price: 12, category: "Beauty", image: "https://media.istockphoto.com/id/157505012/photo/natural-cosmetics-against-water-background.jpg?s=612x612&w=0&k=20&c=wUyboBvJG-21mtEXFWCVi642nORIeD5-FDD6QbeiOFc=" },
  ];
};

const EcoMarket = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchMockProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredProducts = products.filter(
    (p) =>
      (filter === "All" || p.category === filter) &&
      p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white flex-col md:flex-row">
  {/* Sidebar */}
  <Sidebar className="hidden md:block" />

  {/* Main Content */}
  <main className="flex-1 md:ml-64 p-4 sm:p-6 space-y-8">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-gray-800 pb-4">
      <h1 className="text-2xl font-semibold text-green-400">Eco Market</h1>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#111] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
        />
        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm"
        >
          <ShoppingCart size={18} /> Cart ({cart.length})
        </button>
      </div>
    </div>

    {/* Filters */}
    <div className="flex flex-wrap gap-2">
      {["All", "Lifestyle", "Clothing", "Tech"].map((cat) => (
        <button
          key={cat}
          onClick={() => setFilter(cat)}
          className={`px-3 py-2 rounded-lg text-sm ${
            filter === cat
              ? "bg-green-600 text-white"
              : "bg-[#111] text-gray-400 hover:bg-[#222]"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>

    {/* Products Grid */}
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {filteredProducts.map((product) => (
        <motion.div
          key={product.id}
          className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:shadow-green-900/30 transition-all"
          whileHover={{ scale: 1.03 }}
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-40 object-cover"
          />
          <div className="p-4 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{product.title}</h3>
              <button onClick={() => toggleFavorite(product.id)}>
                <Heart
                  size={20}
                  className={`${
                    favorites.includes(product.id)
                      ? "text-red-500"
                      : "text-gray-500"
                  } hover:text-red-400 transition`}
                />
              </button>
            </div>
            <p className="text-gray-400 text-sm">{product.category}</p>
            <p className="text-green-400 font-semibold">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg text-sm"
            >
              Add to Cart
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </main>
</div>

  );
};

export default EcoMarket;
