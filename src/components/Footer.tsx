'use client';

import React from 'react';
import { Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white py-20 px-6 relative z-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
              <Zap className="text-white fill-white" size={18} />
            </div>
            <span className="text-xl font-black text-gradient">
              Raw Mango
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            The future of freshness. Cold-pressed, nutrient-dense, and ethically sourced. We're redefining what juice can be.
          </p>
          <div className="flex gap-4">
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-200">Shop</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer transition-colors">All Juices</li>
            <li className="hover:text-white cursor-pointer transition-colors">Bundles</li>
            <li className="hover:text-white cursor-pointer transition-colors">Subscriptions</li>
            <li className="hover:text-white cursor-pointer transition-colors">Merchandise</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-200">Support</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer transition-colors">FAQ</li>
            <li className="hover:text-white cursor-pointer transition-colors">Shipping</li>
            <li className="hover:text-white cursor-pointer transition-colors">Returns</li>
            <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-200">Newsletter</h4>
          <p className="text-gray-400 text-sm mb-6">Join the revolution. Get fresh updates and exclusive offers.</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full bg-gray-900 border border-gray-800 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-orange-500 transition-colors"
            />
            <button className="absolute right-2 top-2 bottom-2 px-4 rounded-full bg-orange-500 text-white text-xs font-bold uppercase">
              Join
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto mt-20 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 uppercase tracking-widest">
        <p>© 2024 Raw Mango. All rights reserved.</p>
        <div className="flex gap-8">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
