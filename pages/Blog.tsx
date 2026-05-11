import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { ArrowRight, Calendar } from "lucide-react";

import blog1 from "@/assets/blog/blog-1.jpg";
import blog2 from "@/assets/blog/blog-2.jpg";
import blog3 from "@/assets/blog/blog-3.jpg";
import blog4 from "@/assets/blog/blog-4.jpg";
import blog5 from "@/assets/blog/blog-5.jpg";
import blog6 from "@/assets/blog/blog-6.jpg";
import blog7 from "@/assets/blog/blog-7.jpg";
import blog8 from "@/assets/blog/blog-8.jpg";
import blog9 from "@/assets/blog/blog-9.jpg";
import blog10 from "@/assets/blog/blog-10.jpg";
import blog11 from "@/assets/blog/blog-11.jpg";
import blog12 from "@/assets/blog/blog-12.jpg";

const blogPosts = [
  { id: 1, title: "Safety First: How Pynklyme Protects Its Community", excerpt: "Learn about our multi-layer verification process and safety protocols that keep everyone secure.", date: "Feb 10, 2026", category: "Safety", image: blog1 },
  { id: 2, title: "Building a Successful Sexworker Profile", excerpt: "Tips and tricks to make your profile stand out and attract quality clients.", date: "Feb 7, 2026", category: "Sexworkers", image: blog2 },
  { id: 3, title: "The Future of Premium Companionship", excerpt: "How technology is changing the way people connect and why platforms like Pynklyme matter.", date: "Feb 3, 2026", category: "Industry", image: blog3 },
  { id: 4, title: "Why Verification Matters", excerpt: "Understanding the importance of ID verification for both clients and sexworkers.", date: "Jan 28, 2026", category: "Trust", image: blog4 },
  { id: 5, title: "Empowerment Through Independence", excerpt: "How Pynklyme helps sexworkers take control of their careers on their own terms.", date: "Jan 22, 2026", category: "Sexworkers", image: blog5 },
  { id: 6, title: "Top Date Night Spots in 2026", excerpt: "Curated guide to the most impressive venues for unforgettable evenings.", date: "Jan 18, 2026", category: "Lifestyle", image: blog6 },
  { id: 7, title: "Our New App Features Explained", excerpt: "A walkthrough of the latest updates including smart matching and instant booking.", date: "Jan 14, 2026", category: "Product", image: blog7 },
  { id: 8, title: "Community Spotlight: January Edition", excerpt: "Celebrating our top sexworkers and the connections that make Pynklyme special.", date: "Jan 10, 2026", category: "Community", image: blog8 },
  { id: 9, title: "Maximizing Your Earnings as a Sexworker", excerpt: "Proven strategies for setting rates, managing bookings, and growing your clientele.", date: "Jan 6, 2026", category: "Finance", image: blog9 },
  { id: 10, title: "The Art of the Perfect Profile Photo", excerpt: "Professional photography tips that will make your profile irresistible.", date: "Jan 2, 2026", category: "Tips", image: blog10 },
  { id: 11, title: "Travel Companions: A Growing Trend", excerpt: "Why more people are booking travel dates and how to get started.", date: "Dec 28, 2025", category: "Travel", image: blog11 },
  { id: 12, title: "Self-Care for Sexworkers: Mind & Body", excerpt: "Essential wellness practices to stay energized, confident, and at your best.", date: "Dec 22, 2025", category: "Wellness", image: blog12 },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20 max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
            The <span className="gradient-text">Pynklyme</span> Blog
          </h1>
          <p className="text-muted-foreground text-lg mb-12">Insights, guides, and community stories.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all group cursor-pointer overflow-hidden flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium gradient-brand text-primary-foreground px-3 py-1 rounded-full">{post.category}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar className="h-3 w-3" />{post.date}</span>
                </div>
                <h2 className="text-lg font-display font-bold mb-2 group-hover:text-primary transition-colors leading-snug">{post.title}</h2>
                <p className="text-muted-foreground text-sm mb-4 flex-1">{post.excerpt}</p>
                <span className="text-primary text-sm font-medium flex items-center gap-1">
                  Read more <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <footer className="border-t border-border py-8 bg-card">
        <p className="text-center text-sm text-muted-foreground">© 2026 Pynklyme. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Blog;
