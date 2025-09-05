// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { Clock, CheckCircle, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function OrderPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const orderId = props.$w.page.dataset.params.orderId || '2024052001';
  const tableNumber = props.$w.page.dataset.params.tableNumber || '1';
  const items = JSON.parse(props.$w.page.dataset.params.items || '[]');
  const total = parseFloat(props.$w.page.dataset.params.total || '0');
  const [orderDetails, setOrderDetails] = useState({
    id: orderId,
    tableNumber,
    items,
    total,
    createdAt: new Date().toLocaleString('zh-CN'),
    estimatedTime: '15-20分钟'
  });
  const handleBackToMenu = () => {
    $w.utils.navigateBack();
  };
  return <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={handleBackToMenu}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h1 className="text-xl font-bold">订单详情</h1>
                  <p className="text-sm text-gray-600">桌号：{tableNumber}号</p>
                </div>
              </div>
            </div>
          </header>

          <div className="max-w-4xl mx-auto px-4 py-6">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg">订单信息</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">订单号</span>
                    <span className="font-mono">{orderDetails.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">下单时间</span>
                    <span>{orderDetails.createdAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">预计等待</span>
                    <span className="text-orange-500 font-semibold">{orderDetails.estimatedTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg">菜品列表</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {orderDetails.items.map((item, index) => <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-600">¥{item.price} × {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold">¥{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">总计</span>
                    <span className="text-2xl font-bold text-orange-500">¥{orderDetails.total.toFixed(2)}</span>
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600" size="lg" onClick={handleBackToMenu}>
                    返回菜单
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>;
}