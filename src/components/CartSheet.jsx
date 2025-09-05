// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Sheet, SheetContent, SheetHeader, SheetTitle, Button, Card, CardContent, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { Minus, Plus, Clock } from 'lucide-react';

export default function CartSheet({
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
  const handleSubmitOrder = async () => {
    try {
      // 模拟提交订单
      const orderId = Date.now().toString();
      toast({
        title: "订单提交成功",
        description: `订单号：${orderId}`
      });
      setTimeout(() => {
        $w.utils.navigateTo({
          pageId: 'order',
          params: {
            orderId,
            tableNumber,
            items: JSON.stringify(cart),
            total
          }
        });
      }, 1000);
    } catch (error) {
      toast({
        title: "订单提交失败",
        description: "请重试或联系服务员",
        variant: "destructive"
      });
    }
  };
  return <Sheet open={isOpen} onOpenChange={onClose}>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>购物车 - {tableNumber}号桌</SheetTitle>
            </SheetHeader>
            
            <div className="flex-1 overflow-y-auto py-4">
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

            {cart.length > 0 && <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">总计</span>
                  <span className="text-2xl font-bold text-orange-500">¥{total}</span>
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600" size="lg" onClick={handleSubmitOrder}>
                  提交订单
                </Button>
              </div>}
          </SheetContent>
        </Sheet>;
}