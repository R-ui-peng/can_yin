// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { ShoppingCart, Minus, Plus } from 'lucide-react';

export function CartSheet({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  tableNumber,
  total,
  $w
}) {
  if (!isOpen) return null;
  const handleCheckout = () => {
    if (cart.length === 0) return;
    $w.utils.navigateTo({
      pageId: 'payment',
      params: {
        tableNumber,
        items: JSON.stringify(cart),
        total: total.toString()
      }
    });
  };
  return <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}>
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">购物车 - {tableNumber}号桌</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4" style={{
        maxHeight: 'calc(80vh - 200px)'
      }}>
          {cart.length === 0 ? <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">购物车是空的</p>
            </div> : <div className="space-y-4">
              {cart.map(item => <Card key={item.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-500">¥{item.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-full" onClick={() => onUpdateQuantity(item.id, -1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-full" onClick={() => onUpdateQuantity(item.id, 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>}
        </div>

        {cart.length > 0 && <div className="border-t p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-700">总计</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
                ¥{total}
              </span>
            </div>
            <Button className="w-full h-12 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300" size="lg" onClick={handleCheckout}>
              去结算
            </Button>
          </div>}
      </div>
    </div>;
}