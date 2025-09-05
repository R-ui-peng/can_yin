// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Tabs, TabsContent, TabsList, TabsTrigger, useToast } from '@/components/ui';
// @ts-ignore;
import { ShoppingCart, Search, Plus, Minus, Clock, Flame, Utensils } from 'lucide-react';

import CartSheet from '@/components/CartSheet';
function DishCard({
  dish,
  onAdd
}) {
  return <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-video relative">
            <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
            <Badge className="absolute top-2 right-2 bg-orange-500">
              月销{dish.sales}
            </Badge>
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-1">{dish.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{dish.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-orange-500">¥{dish.price}</span>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600" onClick={() => onAdd(dish)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>;
}
export default function MenuPage(props) {
  const {
    $w
  } = props;
  const tableNumber = props.$w.page.dataset.params.table || 1;
  const {
    toast
  } = useToast();
  const [categories, setCategories] = useState([{
    id: 'hot',
    name: '热销',
    icon: Flame
  }, {
    id: 'staple',
    name: '主食',
    icon: Utensils
  }, {
    id: 'meat',
    name: '荤菜',
    icon: Utensils
  }, {
    id: 'vegetable',
    name: '素菜',
    icon: Utensils
  }, {
    id: 'soup',
    name: '汤品',
    icon: Utensils
  }, {
    id: 'drink',
    name: '饮品',
    icon: Utensils
  }]);
  const [dishes, setDishes] = useState([{
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
      title: "已添加到购物车",
      description: `${dish.name} × 1`
    });
  };
  const updateQuantity = (id, change) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? {
            ...item,
            quantity: newQuantity
          } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  return <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm sticky top-0 z-40">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-gray-800">美味餐厅</h1>
                  <p className="text-sm text-gray-600">桌号：{tableNumber}号</p>
                </div>
                <Button variant="outline" size="icon" onClick={() => $w.utils.navigateBack()}>
                  ←
                </Button>
              </div>
            </div>
          </header>

          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="搜索菜品..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
            </div>

            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-4">
                {categories.map(category => <TabsTrigger key={category.id} value={category.id} className="text-sm">
                    {category.name}
                  </TabsTrigger>)}
              </TabsList>

              <TabsContent value="hot">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(searchTerm ? filteredDishes : hotDishes).map(dish => <DishCard key={dish.id} dish={dish} onAdd={addToCart} />)}
                </div>
              </TabsContent>

              <TabsContent value={selectedCategory}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredDishes.map(dish => <DishCard key={dish.id} dish={dish} onAdd={addToCart} />)}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {cartItemCount > 0 && <div className="fixed bottom-4 left-4 right-4 z-50">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 rounded-full shadow-lg" onClick={() => setIsCartOpen(true)}>
                <div className="flex items-center justify-between w-full">
                  <span>查看购物车</span>
                  <div className="flex items-center space-x-2">
                    <span>{cartItemCount}件</span>
                    <span>¥{cartTotal}</span>
                  </div>
                </div>
              </Button>
            </div>}

          <CartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} onUpdateQuantity={updateQuantity} tableNumber={tableNumber} total={cartTotal} $w={$w} />
        </div>;
}