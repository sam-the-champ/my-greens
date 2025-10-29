import React from "react";
import { motion } from "framer-motion";
import { PenSquare, Clock, Tag } from "lucide-react";
import Sidebar from "../components/Sidebar";

const Blog = () => {
  // 🌿 Mocked blog posts
  const blogPosts = [
    {
      id: 1,
      title: "5 Easy Ways to Reduce Your Carbon Footprint",
      author: "Olalekan Samson Ogundimu",
      date: "October 20, 2025",
      category: "Sustainability",
      excerpt:
        "Learn practical steps to make a positive impact on the planet — starting from your daily routines at home and work.",
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      title: "Why Electric Vehicles Are the Future of Transportation",
      author: "EcoNews Team",
      date: "October 15, 2025",
      category: "Green Tech",
      excerpt:
        "Electric mobility is rapidly changing how we think about commuting and sustainability.",
      image:
        "https://media.istockphoto.com/id/2154399160/photo/electric-car-charging.jpg?s=612x612&w=0&k=20&c=3ipwhtRizvK6QM_7LsFvRKf4-yEezKn-jzYzmhoddHQ=",
    },
    {
      id: 3,
      title: "EcoMarket Spotlight: The Rise of Sustainable Products",
      author: "SM Groups",
      date: "October 10, 2025",
      category: "EcoMarket",
      excerpt:
        "Discover how eco-conscious startups are reshaping consumer behavior and green product innovation across Africa.",
      image:
        "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 4,
      title: "Top 10 Eco-Friendly Gadgets You Need in 2025",
      author: "EcoTech Digest",
      date: "October 5, 2025",
      category: "Innovation",
      excerpt:
        "From solar-powered chargers to biodegradable accessories, these gadgets redefine sustainable living.",
      image:
        "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 5,
      title: "Sustainable Fashion: A New Era of Conscious Clothing",
      author: "Green Trends Africa",
      date: "September 29, 2025",
      category: "Lifestyle",
      excerpt:
        "The fashion world is evolving — discover brands championing sustainability and ethical production.",
      image:
        "https://media.istockphoto.com/id/2146355850/photo/young-asian-woman-chooses-clothes-at-rack-in-shopping-mall.jpg?s=612x612&w=0&k=20&c=r4L0IEfqphjXES3At_uMWWn3oL-V6LzzflcByQFFOUk=",
    },
    {
      id: 6,
      title: "Recycling Myths: What You Need to Stop Believing",
      author: "EcoVision Team",
      date: "September 20, 2025",
      category: "Environment",
      excerpt:
        "Not everything recyclable is recycled — here’s the truth about global recycling practices.",
      image:
        "https://media.istockphoto.com/id/2229746916/photo/recycling.jpg?s=612x612&w=0&k=20&c=sVU7vsCaj0vUdDXDmuMhHsWiktdRIC7nK0KlHZ-_RXk=",
    },
    {
      id: 7,
      title: "The Future of Solar Energy in Africa",
      author: "Olalekan Samson Ogundimu",
      date: "September 10, 2025",
      category: "Renewable Energy",
      excerpt:
        "Africa holds massive potential for solar expansion — here’s what it means for sustainable development.",
      image:
        "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 8,
      title: "Eco-Friendly Homes: Living Green from the Ground Up",
      author: "EcoBuilds",
      date: "August 30, 2025",
      category: "Architecture",
      excerpt:
        "From design to materials, learn how to create energy-efficient, environmentally friendly living spaces.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 9,
      title: "Water Conservation Hacks You Can Start Today",
      author: "Planet Care",
      date: "August 25, 2025",
      category: "Climate Action",
      excerpt:
        "Small daily habits make a big difference — here are effective ways to save water effortlessly.",
      image:
        "https://media.istockphoto.com/id/1208096044/photo/please-save-water.jpg?s=612x612&w=0&k=20&c=CgLwj_lO4saGuGbBbsiP_h12grohCnVjTlMyqUYe3PM=",
    },
    {
      id: 10,
      title: "How AI Is Helping Solve Climate Change",
      author: "Tech for Earth",
      date: "August 15, 2025",
      category: "Technology",
      excerpt:
        "From predictive models to smart grids, AI plays a vital role in the global climate fight.",
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 11,
      title: "Community Gardens: Growing Change Locally",
      author: "Urban Green Africa",
      date: "July 28, 2025",
      category: "Community",
      excerpt:
        "Empowering local communities through gardening is reshaping food security and social bonds.",
      image:
        "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 12,
      title: "How to Host a Zero-Waste Event",
      author: "Eco Events Hub",
      date: "July 20, 2025",
      category: "Lifestyle",
      excerpt:
        "Learn how to reduce waste and host sustainable gatherings — whether small meetups or big conferences.",
      image:
        "https://media.istockphoto.com/id/1253930990/photo/zero-waste-party-concept-eco-ffriendly-tableware-craft-bags-and-monstera-leaves-on-gray.jpg?s=612x612&w=0&k=20&c=7sMyXEcX7dvOR6Au2SQ6QGkeTEKNB1WVKQEFc5hkqJg=",
    },
  ];

  return (
    <div className="flex bg-[#0a0a0a] text-gray-100 min-h-screen sm:p-6 md:p-8 md:ml-64 w-full overflow-y-auto ">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold flex items-center gap-2 text-green-400">
            <PenSquare size={26} /> Eco Blog
          </h2>
          <p className="italic text-gray-400">✨ Discover — Learn — Act</p>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#111] rounded-2xl overflow-hidden border border-gray-800 hover:border-green-400 hover:shadow-green-500/20 hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-6 flex flex-col justify-between h-[260px]">
                <div>
                  <div className="flex items-center justify-between mb-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Tag size={14} /> {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {post.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-green-400 hover:text-green-300 transition line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 text-sm mt-3 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-4 italic">
                  — {post.author}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-14">
          🌿 Stay tuned for more sustainability stories and eco-innovation updates.
        </p>
      </main>
    </div>
  );
};

export default Blog;
