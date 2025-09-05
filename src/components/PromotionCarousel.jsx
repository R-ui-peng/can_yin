// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function PromotionCarousel({
  promotions
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % promotions.length);
  };
  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + promotions.length) % promotions.length);
  };
  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [promotions.length]);
  return <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-orange-400 to-red-500 p-4 mb-6">
      <div className="flex items-center justify-between">
        <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors">
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
        
        <div className="flex transition-transform duration-300 ease-in-out" style={{
        transform: `translateX(-${currentIndex * 100}%)`
      }}>
          {promotions.map((promo, index) => <div key={index} className="w-full flex-shrink-0 px-8">
              <div className="flex items-center space-x-4">
                <img src={promo.image} alt={promo.title} className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-1">{promo.title}</h3>
                  <p className="text-white/90 text-sm mb-2">{promo.description}</p>
                  <span className="inline-block bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                    {promo.tag}
                  </span>
                </div>
              </div>
            </div>)}
        </div>
        
        <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors">
          <ChevronRight className="h-5 w-5 text-white" />
        </button>
      </div>
      
      {/* 指示器 */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {promotions.map((_, index) => <button key={index} onClick={() => setCurrentIndex(index)} className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`} />)}
      </div>
    </div>;
}