// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, useToast } from '@/components/ui';
// @ts-ignore;
import { ShoppingCart, Search, Plus, Minus, Flame, Utensils, Soup, GlassWater, Wheat } from 'lucide-react';

function CartSheet({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  tableNumber,
  total,
  $w
}) {
  const {
    toast
  } = useToast();
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "购物车为空",
        description: "请先添加商品到购物车",
        variant: "destructive"
      });
      return;
    }

    // 跳转到支付页面
    $w.utils.navigateTo({
      pageId: 'payment',
      params: {
        tableNumber,
        items: JSON.stringify(cart),
        total: total.toString()
      }
    });
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">购物车 - {tableNumber}号桌</h3>
                <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4" style={{
        maxHeight: 'calc(80vh - 200px)'
      }}>
              {cart.length === 0 ? <div className="text-center py-8">
                  <p className="text-gray-500">购物车是空的</p>
                </div> : <div className="space-y-4">
                  {cart.map(item => <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-gray-600">¥{item.price}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline" onClick={() => onUpdateQuantity(item.id, -1)}>
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button size="sm" variant="outline" onClick={() => onUpdateQuantity(item.id, 1)}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>)}
                </div>}
            </div>

            {cart.length > 0 && <div className="border-t p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">总计</span>
                  <span className="text-2xl font-bold text-orange-500">¥{total}</span>
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600" size="lg" onClick={handleCheckout}>
                  去结算
                </Button>
              </div>}
          </div>
        </div>;
}
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
    name: '热销推荐',
    icon: Flame,
    color: 'text-red-500'
  }, {
    id: 'staple',
    name: '精品主食',
    icon: Wheat,
    color: 'text-amber-600'
  }, {
    id: 'meat',
    name: '特色荤菜',
    icon: Utensils,
    color: 'text-orange-600'
  }, {
    id: 'vegetable',
    name: '清爽素菜',
    icon: Utensils,
    color: 'text-green-600'
  }, {
    id: 'soup',
    name: '养生汤品',
    icon: Soup,
    color: 'text-blue-600'
  }, {
    id: 'drink',
    name: '饮品小食',
    icon: GlassWater,
    color: 'text-purple-600'
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
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input placeholder="搜索菜品..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 py-3 text-base" />
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* 左侧分类导航 */}
              <div className="lg:w-64 flex-shrink-0">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="font-semibold text-lg mb-4 text-gray-800">菜品分类</h3>
                  <div className="space-y-2">
                    {categories.map(category => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                return <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${isActive ? 'bg-orange-50 border-orange-200 border' : 'hover:bg-gray-50'}`}>
                          <Icon className={`h-5 w-5 ${isActive ? category.color : 'text-gray-400'}`} />
                          <span className={`font-medium ${isActive ? 'text-orange-600' : 'text-gray-700'}`}>
                            {category.name}
                          </span>
                          {isActive && <div className="ml-auto w-1 h-4 bg-orange-500 rounded-full" />}
                        </button>;
              })}
                  </div>
                </div>
              </div>

              {/* 右侧菜品列表 */}
              <div className="flex-1">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {categories.find(c => c.id === selectedCategory)?.name || '热销推荐'}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {selectedCategory === 'hot' ? '本店最受欢迎的人气菜品' : `精选${categories.find(c => c.id === selectedCategory)?.name}`}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(selectedCategory === 'hot' ? hotDishes : filteredDishes).map(dish => <DishCard key={dish.id} dish={dish} onAdd={addToCart} />)}
                </div>
              </div>
            </div>
          </div>

          {/* 左侧圆形购物车浮窗 */}
          {cartItemCount > 0 && <div className="fixed left-4 bottom-20 z-50">
              <button onClick={() => setIsCartOpen(true)} className="relative group">
                <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
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