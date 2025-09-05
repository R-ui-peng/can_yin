// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Progress, useToast } from '@/components/ui';
// @ts-ignore;
import { CheckCircle, Clock, Cooking, Package, Home } from 'lucide-react';

export default function OrderPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const orderId = props.$w.page.dataset.params.orderId || '20240905001';
  const tableNumber = props.$w.page.dataset.params.tableNumber || 1;
  const items = JSON.parse(props.$w.page.dataset.params.items || '[]');
  const total = parseFloat(props.$w.page.dataset.params.total || 0);
  const [orderStatus, setOrderStatus] = useState('confirmed');
  const [progress, setProgress] = useState(25);
  const statusSteps = [{
    key: 'confirmed',
    label: '已确认',
    icon: CheckCircle
  }, {
    key: 'preparing',
    label: '制作中',
    icon: Cooking
  }, {
    key: 'ready',
    label: '待取餐',
    icon: Package
  }, {
    key: 'completed',
    label: '已完成',
    icon: CheckCircle
  }];
  useEffect(() => {
    // 模拟订单状态更新
    const timer = setTimeout(() => {
      setOrderStatus('preparing');
      setProgress(50);
    }, 3000);
    const timer2 = setTimeout(() => {
      setOrderStatus('ready');
      setProgress(75);
    }, 8000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);
  const getCurrentStepIndex = () => {
    return statusSteps.findIndex(step => step.key === orderStatus);
  };
  return <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <h1 className="text-xl font-bold text-center">订单跟踪</h1>
            </div>
          </header>

          <main className="max-w-4xl mx-auto px-4 py-6">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>订单详情</span>
                  <Badge variant="outline">#{orderId}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">桌号</span>
                    <span className="font-semibold">{tableNumber}号桌</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">订单时间</span>
                    <span className="font-semibold">
                      {new Date().toLocaleString('zh-CN')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>订单状态</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={progress} className="w-full" />
                  
                  <div className="flex justify-between">
                    {statusSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index <= getCurrentStepIndex();
                const isCurrent = index === getCurrentStepIndex();
                return <div key={step.key} className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isActive ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className={`text-xs mt-1 ${isActive ? 'text-orange-500 font-semibold' : 'text-gray-400'}`}>
                            {step.label}
                          </span>
                        </div>;
              })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>订单内容</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {items.map(item => <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-gray-600 ml-2">×{item.quantity}</span>
                      </div>
                      <span className="font-semibold">¥{item.price * item.quantity}</span>
                    </div>)}
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">总计</span>
                      <span className="text-xl font-bold text-orange-500">¥{total}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button className="w-full bg-orange-500 hover:bg-orange-600" onClick={() => $w.utils.navigateTo({
          pageId: 'menu',
          params: {
            table: tableNumber
          }
        })}>
                <Home className="h-4 w-4 mr-2" />
                继续点餐
              </Button>
              
              <Button variant="outline" className="w-full" onClick={() => $w.utils.navigateTo({
          pageId: 'index'
        })}>
                返回首页
              </Button>
            </div>
          </main>
        </div>;
}