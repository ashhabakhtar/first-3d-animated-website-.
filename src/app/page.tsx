'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowDown, ShoppingBag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductBottleScroll from '@/components/ProductBottleScroll';
import { products, Product } from '@/data/products';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProduct = products[currentIndex];

  useEffect(() => {
    // Reset scroll to top on product change
    window.scrollTo(0, 0);
    // Update theme color in CSS variable for smooth background transitions
    document.documentElement.style.setProperty('--theme-color', currentProduct.themeColor);
    document.documentElement.style.setProperty('--product-gradient', currentProduct.gradient);
  }, [currentIndex, currentProduct]);

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const setProduct = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <main className="relative min-h-screen">
      <Navbar />

      {/* Product Arrows Navigation */}
      <div className="fixed inset-y-0 left-6 right-6 flex justify-between items-center z-40 pointer-events-none">
        <button 
          onClick={prevProduct}
          className="w-14 h-14 rounded-full glass-morphism flex items-center justify-center text-white pointer-events-auto hover:bg-white/20 transition-all active:scale-95"
        >
          <ChevronLeft size={32} />
        </button>
        <button 
          onClick={nextProduct}
          className="w-14 h-14 rounded-full glass-morphism flex items-center justify-center text-white pointer-events-auto hover:bg-white/20 transition-all active:scale-95"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Bottom Center Pill Menu */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40">
        <div className="glass-morphism rounded-full px-6 py-3 flex gap-6 items-center shadow-2xl">
          {products.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setProduct(i)}
              className={`text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                currentIndex === i ? 'text-white scale-110' : 'text-white/40 hover:text-white/70'
              }`}
            >
              {p.id}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Section with Scrollytelling */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProduct.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="relative"
        >
          <ProductBottleScroll product={currentProduct} />
        </motion.div>
      </AnimatePresence>

      {/* Content Sections */}
      <section className="relative z-10 bg-white text-gray-900 py-32 px-6 overflow-hidden">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 leading-[0.9]">
                {currentProduct.detailsSection.title}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-12">
                {currentProduct.detailsSection.description}
              </p>
              <div className="flex flex-wrap gap-4">
                {currentProduct.buyNowSection.processingParams.map((param, i) => (
                    <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-sm font-bold uppercase tracking-wider text-gray-700">
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                        {param}
                    </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square bg-gray-50 rounded-[4rem] overflow-hidden flex items-center justify-center group"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img 
                    src={`${currentProduct.folderPath}/100.${currentProduct.imageExtension}`} 
                    alt={currentProduct.detailsSection.imageAlt}
                    className="w-3/4 h-3/4 object-contain transition-transform duration-700 group-hover:scale-110"
                />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Freshness Section */}
      <section className="relative z-10 py-32 px-6 bg-gray-50 overflow-hidden">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 leading-[0.9]">
              {currentProduct.freshnessSection.title}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-12 italic font-medium">
              "{currentProduct.freshnessSection.description}"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Buy Now Section */}
      <section className="relative z-10 bg-gray-950 text-white py-32 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-b border-white/10 pb-20">
            <div>
              <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm block mb-4">Secure your bottle</span>
              <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.8] mb-8">
                Ready to taste<br/>the future?
              </h2>
              <div className="flex items-baseline gap-4">
                <span className="text-4xl md:text-6xl font-black">{currentProduct.buyNowSection.price}</span>
                <span className="text-gray-500 font-medium uppercase tracking-widest">{currentProduct.buyNowSection.unit}</span>
              </div>
            </div>
            
            <div className="max-w-md w-full">
              <p className="text-gray-400 mb-8 leading-relaxed">
                {currentProduct.buyNowSection.deliveryPromise}
              </p>
              <button className="w-full py-6 bg-white text-gray-950 rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all duration-500 flex items-center justify-center gap-4 group">
                Add to Cart <ShoppingBag className="group-hover:translate-y-[-2px] transition-transform" />
              </button>
              <p className="text-center text-xs text-gray-600 mt-6 uppercase tracking-widest font-bold">
                {currentProduct.buyNowSection.returnPolicy}
              </p>
            </div>
          </div>
          
          <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-12">
             <div className="flex gap-12">
                <div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Recyclable</div>
                    <div className="text-2xl font-black">100%</div>
                </div>
                <div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Solar Powered</div>
                    <div className="text-2xl font-black">75%</div>
                </div>
                <div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Organic</div>
                    <div className="text-2xl font-black">98%</div>
                </div>
             </div>
             
             <button 
                onClick={nextProduct}
                className="group flex items-center gap-6 text-2xl font-black uppercase tracking-widest hover:text-orange-500 transition-colors"
             >
                Next Flavor <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                    <ChevronRight size={32} />
                </div>
             </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
