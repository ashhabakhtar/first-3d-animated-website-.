'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Menu, Zap } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-4 glass-morphism border-b' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
            <Zap className="text-white fill-white" size={24} />
          </div>
          <span className="text-2xl font-black text-gradient">
            Raw Mango
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-white/80">
          <a href="#" className="hover:text-white transition-colors">Juices</a>
          <a href="#" className="hover:text-white transition-colors">Our Story</a>
          <a href="#" className="hover:text-white transition-colors">Sustainability</a>
          <a href="#" className="hover:text-white transition-colors">Stockists</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-white/80 hover:text-white transition-colors">
            <ShoppingCart size={24} />
          </button>
          <button className="px-6 py-2 rounded-full bg-white text-orange-600 font-bold text-sm uppercase tracking-wider glow-hover hidden sm:block">
            Order Now
          </button>
          <button className="p-2 text-white/80 hover:text-white md:hidden">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
