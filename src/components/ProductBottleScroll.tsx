'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion, AnimatePresence, useSpring } from 'framer-motion';
import { Product } from '@/data/products';
import ProductTextOverlays from './ProductTextOverlays';

interface ProductBottleScrollProps {
  product: Product;
}

const ProductBottleScroll: React.FC<ProductBottleScrollProps> = ({ product }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Create a smoothed version of scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    mass: 0.5,
    restDelta: 0.001
  });

  const handleAutoScroll = () => {
    if (!containerRef.current || isAutoScrolling) return;
    
    setIsAutoScrolling(true);
    const container = containerRef.current;
    const start = window.scrollY;
    const end = container.offsetTop + container.offsetHeight - window.innerHeight;
    const duration = 8000; // 8 seconds for the whole experience
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeInOutQuad)
      const ease = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(0, start + (end - start) * ease);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        setIsAutoScrolling(false);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  // Map scroll progress to image index
  const frameIndex = useTransform(
    smoothProgress,
    [0, 1],
    [3, product.frameCount]
  );

  // Preload images
  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    const preloadImages = () => {
      for (let i = 1; i <= product.frameCount; i++) {
        const img = new Image();
        img.src = `${product.folderPath}/${i}.${product.imageExtension}`;
        img.onload = () => {
          count++;
          if (count === product.frameCount && isMounted) {
            setImages(loadedImages);
            setImagesLoaded(true);
          }
        };
        loadedImages[i] = img;
      }
    };

    preloadImages();

    return () => {
      isMounted = false;
    };
  }, [product]);

  // Handle Canvas Resizing and Initial Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const { clientWidth, clientHeight } = parent;
      canvas.width = clientWidth * window.devicePixelRatio;
      canvas.height = clientHeight * window.devicePixelRatio;
      canvas.style.width = `${clientWidth}px`;
      canvas.style.height = `${clientHeight}px`;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.scale(window.devicePixelRatio, window.devicePixelRatio);
        drawFrame(Math.floor(frameIndex.get()));
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [imagesLoaded]);

  // Draw Frame to Canvas
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context || !images[index]) return;

    const img = images[index];
    const { width, height } = canvas;
    
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate aspect ratio for "cover" fit
    const imgRatio = img.width / img.height;
    const canvasRatio = (canvas.width / window.devicePixelRatio) / (canvas.height / window.devicePixelRatio);
    
    let drawWidth, drawHeight, x, y;

    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height / window.devicePixelRatio;
      drawWidth = drawHeight * imgRatio;
      x = ((canvas.width / window.devicePixelRatio) - drawWidth) / 2;
      y = 0;
    } else {
      drawWidth = canvas.width / window.devicePixelRatio;
      drawHeight = drawWidth / imgRatio;
      x = 0;
      y = ((canvas.height / window.devicePixelRatio) - drawHeight) / 2;
    }

    context.drawImage(img, x, y, drawWidth, drawHeight);
  };

  // Update canvas on scroll
  useEffect(() => {
    return frameIndex.onChange((v) => {
      requestAnimationFrame(() => drawFrame(Math.floor(v)));
    });
  }, [images, imagesLoaded, frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[250vh] w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">
        {/* Auto-scroll trigger */}
        <AnimatePresence>
          {imagesLoaded && !isAutoScrolling && scrollYProgress.get() < 0.05 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={handleAutoScroll}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 glass-morphism px-8 py-3 rounded-full text-white font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-white/20 transition-all pointer-events-auto"
            >
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              Watch Story
            </motion.button>
          )}
        </AnimatePresence>

        {/* Progress indicator */}
        <div className="absolute left-8 h-1/2 w-[2px] bg-white/10 hidden md:block z-30">
           <motion.div 
             style={{ scaleY: scrollYProgress }} 
             className="w-full h-full bg-white origin-top"
           />
        </div>

        <div className="relative w-screen h-screen flex items-center justify-center">
            <canvas 
                ref={canvasRef} 
                className="z-10 w-full h-full object-cover"
                style={{ 
                  opacity: imagesLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease-out'
                }}
            />
            
            {!imagesLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20">
                    <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                    <span className="text-white font-bold tracking-widest text-xs uppercase">Loading Experience</span>
                </div>
            )}

            <ProductTextOverlays product={product} containerRef={containerRef} />
        </div>
      </div>
    </div>
  );
};

export default ProductBottleScroll;
