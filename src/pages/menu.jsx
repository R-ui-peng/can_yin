// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardHeader, CardTitle, Input, useToast } from '@/components/ui';
// @ts-ignore;
import { ShoppingCart, Search, Flame, Utensils, Soup, GlassWater, Wheat, ChevronLeft } from 'lucide-react';

import { PromotionCarousel } from '@/components/PromotionCarousel';
import { DishCard } from '@/components/DishCard';
import { CartSheet } from '@/components/CartSheet';
export default function MenuPage(props) {
  const {
    $w
  } = props;
  const tableNumber = props.$w.page.dataset.params.table || 1;
  const {
    toast
  } = useToast();
  const [categories] = useState([{
    id: 'hot',
    name: '热销推荐',
    icon: Flame,
    color: 'from-red-500 to-orange-500'
  }, {
    id: 'staple',
    name: '精品主食',
    icon: Wheat,
    color: 'from-amber-500 to-yellow-500'
  }, {
    id: 'meat',
    name: '特色荤菜',
    icon: Utensils,
    color: 'from-orange-500 to-red-500'
  }, {
    id: 'vegetable',
    name: '清爽素菜',
    icon: Utensils,
    color: 'from-green-500 to-emerald-500'
  }, {
    id: 'soup',
    name: '养生汤品',
    icon: Soup,
    color: 'from-blue-500 to-cyan-500'
  }, {
    id: 'drink',
    name: '饮品小食',
    icon: GlassWater,
    color: 'from-purple-500 to-pink-500'
  }]);
  const [dishes] = useState([{
    id: 1,
    name: '宫保鸡丁',
    price: 28,
    category: 'meat',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400',
    description: '经典川菜，鸡肉嫩滑，花生香脆',
    sales: 156
  }, {
    id: 2,
    name: '麻婆豆腐',
    price: 18,
    category: 'vegetable',
    image: 'https://images.unsplash.com/photo-1582252852999-5b1740c95b5b?w=400',
    description: '麻辣鲜香，豆腐嫩滑',
    sales: 203
  }, {
    id: 3,
    name: '糖醋里脊',
    price: 32,
    category: 'meat',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400',
    description: '外酥内嫩，酸甜可口',
    sales: 89
  }, {
    id: 4,
    name: '番茄鸡蛋面',
    price: 16,
    category: 'staple',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400',
    description: '家常味道，营养丰富',
    sales: 178
  }, {
    id: 5,
    name: '紫菜蛋花汤',
    price: 12,
    category: 'soup',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
    description: '清淡鲜美，营养丰富',
    sales: 145
  }, {
    id: 6,
    name: '可乐',
    price: 5,
    category: 'drink',
    image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400',
    description: '冰爽解渴',
    sales: 312
  }]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('hot');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const filteredDishes = dishes.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'hot' ? true : dish.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const hotDishes = dishes.sort((a, b) => b.sales - a.sales).slice(0, 6);
  const addToCart = dish => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === dish.id);
      if (existingItem) {
        return prevCart.map(item => item.id === dish.id ? {
          ...item,
          quantity: item.quantity + 1
        } : item);
      }
      return [...prevCart, {
        ...dish,
        quantity: 1
      }];
    });
    toast({
      title: '已添加到购物车',
      description: `${dish.name} × 1`,
      className: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
    });
  };
  const updateQuantity = (id, change) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? {
          ...item,
          quantity: newQuantity
        } : null;
      }
      return item;
    }).filter(Boolean));
  };
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-black">
                齐和聚
              </h1>
              <p className="text-sm text-gray-600 flex items-center">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                桌号：{tableNumber}号
              </p>
            </div>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full" onClick={() => $w.utils.navigateBack()}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <PromotionCarousel />

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input placeholder="搜索菜品..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-12 pr-4 py-3 text-base border-2 border-gray-200 rounded-2xl focus:border-orange-400 focus:ring-orange-400 transition-all duration-300 bg-white/80 backdrop-blur-sm" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* 左侧分类导航 */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-5">
              <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center">
                <Utensils className="h-5 w-5 mr-2 text-orange-500" />
                菜品分类
              </h3>
              <div className="space-y-2">
                {categories.map(category => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                return <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${isActive ? `bg-gradient-to-r ${category.color} text-white shadow-md transform scale-105` : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}>
                      <Icon className={`h-5 w-5 ${isActive ? 'text-white' : ''}`} />
                      <span className={`font-medium ${isActive ? 'text-white' : ''}`}>
                        {category.name}
                      </span>
                      {isActive && <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />}
                    </button>;
              })}
              </div>
            </div>
          </div>

          {/* 右侧菜品列表 */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                <Flame className="h-6 w-6 mr-2 text-orange-500" />
                {categories.find(c => c.id === selectedCategory)?.name || '热销推荐'}
              </h2>
              <p className="text-gray-600">
                {selectedCategory === 'hot' ? '本店最受欢迎的人气菜品' : `精选${categories.find(c => c.id === selectedCategory)?.name}`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(selectedCategory === 'hot' ? hotDishes : filteredDishes).map(dish => <DishCard key={dish.id} dish={dish} onAdd={addToCart} />)}
            </div>
          </div>
        </div>
      </div>

      {/* 左侧圆形购物车浮窗 */}
      {cartItemCount > 0 && <div className="fixed left-4 bottom-20 z-50">
          <button onClick={() => setIsCartOpen(true)} className="relative group">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group-hover:rotate-12">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-bounce">
              {cartItemCount}
            </div>
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              ¥{cartTotal}
            </div>
          </button>
        </div>}

      <CartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} onUpdateQuantity={updateQuantity} tableNumber={tableNumber} total={cartTotal} $w={$w} />
    </div>;
}