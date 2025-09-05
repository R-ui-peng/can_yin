// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, RadioGroup, RadioGroupItem, Label } from '@/components/ui';
// @ts-ignore;
import { ShoppingCart, Plus, Minus, Trash2, Ticket, X } from 'lucide-react';

// 将CouponSelector功能内联到CartSheet中，避免组件加载错误
function CouponSelector({
  coupons,
  selectedCoupon,
  onSelect,
  totalAmount
}) {
  const [showSelector, setShowSelector] = useState(false);
  const applicableCoupons = coupons.filter(coupon => totalAmount >= coupon.minSpend);
  const getDiscountAmount = coupon => {
    if (!coupon) return 0;
    if (coupon.type === '满减券') {
      return coupon.discount;
    } else if (coupon.type === '折扣券') {
      return totalAmount * (1 - coupon.discount / 10);
    }
    return 0;
  };
  return <div className="border-t pt-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-800">优惠券</h4>
        <Button variant="ghost" size="sm" onClick={() => setShowSelector(!showSelector)}>
          {showSelector ? <X className="h-4 w-4" /> : '选择'}
        </Button>
      </div>

      {showSelector && <div className="space-y-3">
          <RadioGroup value={selectedCoupon?.id || ''} onValueChange={value => {
        const coupon = coupons.find(c => c.id === value);
        onSelect(coupon);
      }}>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-gray-200 hover:border-orange-300 transition-colors">
                <RadioGroupItem value="" id="no-coupon" />
                <Label htmlFor="no-coupon" className="cursor-pointer">不使用优惠券</Label>
              </div>
              {applicableCoupons.map(coupon => <div key={coupon.id} className="flex items-center space-x-3 p-3 rounded-lg border-2 border-gray-200 hover:border-orange-300 transition-colors">
                  <RadioGroupItem value={coupon.id} id={coupon.id} />
                  <Label htmlFor={coupon.id} className="cursor-pointer flex-1">
                    <div className="font-medium">
                      {coupon.title}
                    </div>
                    <div className="text-sm text-gray-600">
                      {coupon.type === '满减券' ? `满${coupon.minSpend}减${coupon.discount}` : `${coupon.discount}折`}
                    </div>
                  </Label>
                  <div className="text-sm font-bold text-orange-500">
                    -¥{getDiscountAmount(coupon).toFixed(2)}
                  </div>
                </div>)}
            </div>
          </RadioGroup>
        </div>}

      {selectedCoupon && <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg mt-2">
          <div className="flex items-center space-x-2">
            <Ticket className="h-4 w-4 text-orange-500" />
            <span className="font-medium">{selectedCoupon.title}</span>
          </div>
          <span className="font-bold text-orange-500">-¥{getDiscountAmount(selectedCoupon).toFixed(2)}</span>
        </div>}
    </div>;
}
export function CartSheet({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  tableNumber,
  total,
  finalAmount,
  coupons,
  selectedCoupon,
  onSelectCoupon,
  $w
}) {
  const handleCheckout = () => {
    if (cart.length === 0) return;
    $w.utils.navigateTo({
      pageId: 'order',
      params: {
        cart: JSON.stringify(cart),
        table: tableNumber,
        total: total.toString(),
        finalAmount: finalAmount.toString(),
        coupon: selectedCoupon ? JSON.stringify(selectedCoupon) : ''
      }
    });
  };
  const getDiscountAmount = () => {
    if (!selectedCoupon) return 0;
    if (selectedCoupon.type === '满减券') {
      return selectedCoupon.discount;
    } else if (selectedCoupon.type === '折扣券') {
      return total * (1 - selectedCoupon.discount / 10);
    }
    return 0;
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="text-lg font-semibold">购物车</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">购物车是空的</p>
              </div> : <div className="space-y-4">
                {cart.map(item => <Card key={item.id} className="border-0 shadow-sm">
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
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-full text-red-500" onClick={() => onUpdateQuantity(item.id, -item.quantity)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>}

            {/* 优惠券选择区域 - 内联实现 */}
            {cart.length > 0 && <CouponSelector coupons={coupons} selectedCoupon={selectedCoupon} onSelect={onSelectCoupon} totalAmount={total} />}
          </div>

          {cart.length > 0 && <div className="border-t p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>商品金额</span>
                  <span>¥{total.toFixed(2)}</span>
                </div>
                {selectedCoupon && <div className="flex justify-between text-sm text-orange-500">
                    <span>优惠券优惠</span>
                    <span>-¥{getDiscountAmount().toFixed(2)}</span>
                  </div>}
                <div className="flex justify-between text-lg font-bold">
                  <span>实付金额</span>
                  <span className="text-orange-500">¥{finalAmount.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full h-12 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 text-white font-semibold" onClick={handleCheckout}>
                去结算 ({cart.reduce((sum, item) => sum + item.quantity, 0)}件)
              </Button>
            </div>}
        </div>
      </div>
    </div>;
}