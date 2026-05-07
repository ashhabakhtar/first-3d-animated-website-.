'use client';

import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Product } from '@/data/products';

interface ProductTextOverlaysProps {
  product: Product;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const ProductTextOverlays: React.FC<ProductTextOverlaysProps> = ({ product, containerRef }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    mass: 0.5,
    restDelta: 0.001
  });

  // Section 1: Intro (0.0 to 0.2)
  const opacity1 = useTransform(smoothProgress, [0, 0.1, 0.15, 0.2], [1, 1, 0, 0]);
  const y1 = useTransform(smoothProgress, [0, 0.2], [0, -100]);

  // Section 2: Details (0.25 to 0.45)
  const opacity2 = useTransform(smoothProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const x2 = useTransform(smoothProgress, [0.2, 0.3, 0.4, 0.5], [-100, 0, 0, 100]);

  // Section 3: Benefits (0.55 to 0.75)
  const opacity3 = useTransform(smoothProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const x3 = useTransform(smoothProgress, [0.5, 0.6, 0.7, 0.8], [100, 0, 0, -100]);

  // Section 4: Pure (0.8 to 1.0)
  const opacity4 = useTransform(smoothProgress, [0.8, 0.9, 1], [0, 1, 1]);
  const scale4 = useTransform(smoothProgress, [0.8, 1], [0.5, 1]);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center">
      {/* Section 1 */}
      <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute text-center px-6">
        <h2 className="text-7xl md:text-9xl font-black text-white mb-4 uppercase leading-none">
          {product.section1.title}
        </h2>
        <p className="text-2xl md:text-3xl text-white/70 font-medium tracking-widest uppercase italic">
          {product.section1.subtitle}
        </p>
      </motion.div>

      {/* Section 2 */}
      <motion.div style={{ opacity: opacity2, x: x2 }} className="absolute left-8 md:left-24 max-w-xl px-6">
        <h3 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase">
          {product.section2.title}
        </h3>
        <p className="text-xl text-white/60 leading-relaxed font-medium">
          {product.section2.subtitle}
        </p>
      </motion.div>

      {/* Section 3 */}
      <motion.div style={{ opacity: opacity3, x: x3 }} className="absolute right-8 md:right-24 text-right max-w-xl px-6">
        <h3 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase">
          {product.section3.title}
        </h3>
        <p className="text-xl text-white/60 leading-relaxed font-medium">
          {product.section3.subtitle}
        </p>
      </motion.div>

      {/* Section 4 */}
      <motion.div style={{ opacity: opacity4, scale: scale4 }} className="absolute bottom-24 text-center px-6">
        <h4 className="text-5xl md:text-7xl font-black text-white mb-4 uppercase">
          {product.section4.title}
        </h4>
        <div className="flex gap-4 justify-center">
          {product.features.map((feature, i) => (
            <span key={i} className="px-4 py-1 rounded-full border border-white/20 bg-white/5 text-white/80 text-xs font-bold uppercase tracking-widest">
              {feature}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Stats Overlay */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-12 md:gap-24">
        {product.stats.map((stat, i) => {
            const statOpacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
            return (
                <motion.div key={i} style={{ opacity: statOpacity }} className="text-center">
                    <div className="text-3xl md:text-5xl font-black text-white">{stat.val}</div>
                    <div className="text-[10px] md:text-xs font-bold text-white/50 uppercase tracking-[0.2em]">{stat.label}</div>
                </motion.div>
            );
        })}
      </div>
    </div>
  );
};

export default ProductTextOverlays;
