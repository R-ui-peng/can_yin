// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Progress, useToast, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui';
// @ts-ignore;
import { CheckCircle, Clock, Cooking, Package, Home, XCircle } from 'lucide-react';

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
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const statusSteps = [{
    key: 'confirmed',
    label: '已确认',
    icon: CheckCircle,
    canCancel: true
  }, {
    key: 'preparing',
    label: '制作中',
    icon: Cooking,
    canCancel: true
  }, {
    key: 'ready',
    label: '待取餐',
    icon: Package,
    canCancel: false
  }, {
    key: 'completed',
    label: '已完成',
    icon: CheckCircle,
    canCancel: false
  }, {
    key: 'cancelled',
    label: '已取消',
    icon: XCircle,
    canCancel: false
  }];
  useEffect(() => {
    // 模拟订单状态更新
    if (orderStatus !== 'cancelled') {
      const timer = setTimeout(() => {
        if (orderStatus === 'confirmed') {
          setOrderStatus('preparing');
          setProgress(50);
        }
      }, 3000);
      const timer2 = setTimeout(() => {
        if (orderStatus === 'preparing') {
          setOrderStatus('ready');
          setProgress(75);
        }
      }, 8000);
      return () => {
        clearTimeout(timer);
        clearTimeout(timer2);
      };
    }
  }, [orderStatus]);
  const getCurrentStepIndex = () => {
    return statusSteps.findIndex(step => step.key === orderStatus);
  };
  const handleCancelOrder = async () => {
    setIsCancelling(true);
    try {
      // 模拟取消订单
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOrderStatus('cancelled');
      setProgress(0);
      toast({
        title: "订单已取消",
        description: "您的订单已成功取消",
        variant: "default"
      });
      setTimeout(() => {
        $w.utils.navigateTo({
          pageId: 'index'
        });
      }, 2000);
    } catch (error) {
      toast({
        title: "取消失败",
        description: "请稍后重试或联系服务员",
        variant: "destructive"
      });
    } finally {
      setIsCancelling(false);
      setShowCancelDialog(false);
    }
  };
  const canCancelOrder = statusSteps.find(step => step.key === orderStatus)?.canCancel || false;
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
                  <div className="flex justify-between">
                    <span className="text-gray-600">订单状态</span>
                    <Badge className={orderStatus === 'cancelled' ? 'bg-red-500' : orderStatus === 'completed' ? 'bg-green-500' : 'bg-orange-500'}>
                      {statusSteps.find(step => step.key === orderStatus)?.label}
                    </Badge>
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
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.key === 'cancelled' ? 'bg-red-500 text-white' : isActive ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className={`text-xs mt-1 ${step.key === 'cancelled' ? 'text-red-500' : isActive ? 'text-orange-500 font-semibold' : 'text-gray-400'}`}>
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
                        <span className={`font-medium ${orderStatus === 'cancelled' ? 'line-through text-gray-400' : ''}`}>
                          {item.name}
                        </span>
                        <span className="text-sm text-gray-600 ml-2">×{item.quantity}</span>
                      </div>
                      <span className={`font-semibold ${orderStatus === 'cancelled' ? 'line-through text-gray-400' : ''}`}>
                        ¥{item.price * item.quantity}
                      </span>
                    </div>)}
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className={`font-bold ${orderStatus === 'cancelled' ? 'line-through text-gray-400' : ''}`}>总计</span>
                      <span className={`text-xl font-bold ${orderStatus === 'cancelled' ? 'line-through text-gray-400' : 'text-orange-500'}`}>
                        ¥{total}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              {orderStatus === 'cancelled' ? <Button className="w-full bg-gray-500 hover:bg-gray-600" onClick={() => $w.utils.navigateTo({
          pageId: 'index'
        })}>
                  返回首页
                </Button> : <>
                  {canCancelOrder && <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                          取消订单
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>确认取消订单？</AlertDialogTitle>
                          <AlertDialogDescription>
                            取消后订单将无法恢复，已支付的金额将原路退回。确定要取消订单吗？
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>再想想</AlertDialogCancel>
                          <AlertDialogAction onClick={handleCancelOrder} disabled={isCancelling} className="bg-red-500 hover:bg-red-600">
                            {isCancelling ? "处理中..." : "确认取消"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>}
                  
                  <Button className="w-full bg-orange-500 hover:bg-orange-600" onClick={() => $w.utils.navigateTo({
            pageId: 'menu',
            params: {
              table: tableNumber
            }
          })} disabled={orderStatus === 'cancelled'}>
                    继续点餐
                  </Button>
                </>}
              
              <Button variant="outline" className="w-full" onClick={() => $w.utils.navigateTo({
          pageId: 'index'
        })}>
                返回首页
              </Button>
            </div>
          </main>
        </div>;
}