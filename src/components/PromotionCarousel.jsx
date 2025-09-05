// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { ChevronLeft, ChevronRight, Star, Clock } from 'lucide-react';

export function PromotionCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const promotions = [{
    title: "新品上市",
    description: "招牌麻辣小龙虾，限时8折优惠",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
    tag: "限时优惠",
    bgColor: "from-purple-500 to-pink-500"
  }, {
    title: "今日特价",
    description: "宫保鸡丁套餐，仅需25元",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400",
    tag: "今日特价",
    bgColor: "from-orange-500 to-red-500"
  }, {
    title: "会员专享",
    description: "注册会员享9折优惠，首次下单立减5元",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
    tag: "会员福利",
    bgColor: "from-green-500 to-teal-500"
  }];
  const nextSlide = () => setCurrentIndex(prev => (prev + 1) % promotions.length);
  const prevSlide = () => setCurrentIndex(prev => (prev - 1 + promotions.length) % promotions.length);
  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, []);
  return <div className="relative w-full overflow-hidden rounded-2xl shadow-lg mb-6">
      <div className="flex transition-transform duration-500 ease-in-out" style={{
      transform: `translateX(-${currentIndex * 100}%)`
    }}>
        {promotions.map((promo, index) => <div key={index} className={`w-full flex-shrink-0 bg-gradient-to-r ${promo.bgColor} p-6`}>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img src={promo.image} alt={promo.title} className="w-24 h-24 rounded-2xl object-cover shadow-lg" />
                <div className="absolute -top-2 -right-2 bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <Star className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-xl mb-2">{promo.title}</h3>
                <p className="text-white/90 text-base mb-3">{promo.description}</p>
                <span className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full">
                  <Clock className="h-4 w-4 mr-2" />
                  {promo.tag}
                </span>
              </div>
            </div>
          </div>)}
      </div>

      {/* 导航按钮 */}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300 hover:scale-110">
        <ChevronLeft className="h-5 w-5 text-white" />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300 hover:scale-110">
        <ChevronRight className="h-5 w-5 text-white" />
      </button>

      {/* 指示器 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {promotions.map((_, index) => <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'}`} />)}
      </div>
    </div>;
}