// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, RadioGroup, RadioGroupItem, Label, useToast } from '@/components/ui';
// @ts-ignore;
import { CreditCard, Smartphone, Wallet, CheckCircle, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function PaymentPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const tableNumber = props.$w.page.dataset.params.tableNumber || '1';
  const items = JSON.parse(props.$w.page.dataset.params.items || '[]');
  const total = parseFloat(props.$w.page.dataset.params.total || '0');
  const [selectedPayment, setSelectedPayment] = useState('wechat');
  const [isProcessing, setIsProcessing] = useState(false);
  const paymentMethods = [{
    id: 'wechat',
    name: '微信支付',
    icon: Smartphone,
    description: '使用微信扫码支付'
  }, {
    id: 'alipay',
    name: '支付宝',
    icon: Smartphone,
    description: '使用支付宝扫码支付'
  }, {
    id: 'balance',
    name: '余额支付',
    icon: Wallet,
    description: '使用账户余额支付'
  }];
  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // 生成订单号和交易号
      const orderId = `ORD${Date.now()}`;
      const transactionNo = `TXN${Date.now()}`;

      // 创建支付记录
      const paymentRecord = await $w.cloud.callDataSource({
        dataSourceName: 'payment_records',
        methodName: 'wedaCreateV2',
        params: {
          data: {
            order_id: orderId,
            amount: total,
            payment_method: selectedPayment,
            payment_status: 'pending',
            payment_time: new Date(),
            transaction_no: transactionNo,
            table_number: tableNumber,
            items: items
          }
        }
      });

      // 模拟支付过程
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 更新支付状态为已支付
      await $w.cloud.callDataSource({
        dataSourceName: 'payment_records',
        methodName: 'wedaUpdateV2',
        params: {
          data: {
            payment_status: 'paid',
            payment_time: new Date()
          },
          filter: {
            where: {
              order_id: {
                $eq: orderId
              }
            }
          }
        }
      });
      toast({
        title: "支付成功",
        description: "订单已确认，正在为您准备餐品"
      });

      // 跳转到订单详情页
      setTimeout(() => {
        $w.utils.navigateTo({
          pageId: 'order',
          params: {
            orderId,
            tableNumber,
            items: JSON.stringify(items),
            total: total.toString(),
            status: 'paid'
          }
        });
      }, 1500);
    } catch (error) {
      console.error('支付失败:', error);
      toast({
        title: "支付失败",
        description: "请重试或选择其他支付方式",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  return <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={() => $w.utils.navigateBack()}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h1 className="text-xl font-bold">确认支付</h1>
                  <p className="text-sm text-gray-600">桌号：{tableNumber}号</p>
                </div>
              </div>
            </div>
          </header>

          <div className="max-w-4xl mx-auto px-4 py-6">
            {/* 订单摘要 */}
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg">订单摘要</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {items.map((item, index) => <div key={index} className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">×{item.quantity}</p>
                      </div>
                      <span className="font-semibold">¥{(item.price * item.quantity).toFixed(2)}</span>
                    </div>)}
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">总计</span>
                      <span className="text-xl font-bold text-orange-500">¥{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 支付方式选择 */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">选择支付方式</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-3">
                  {paymentMethods.map(method => {
              const Icon = method.icon;
              return <div key={method.id} className={`relative flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedPayment === method.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                        <Icon className="h-6 w-6 text-gray-600" />
                        <div className="flex-1">
                          <Label htmlFor={method.id} className="font-semibold cursor-pointer">
                            {method.name}
                          </Label>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                        {selectedPayment === method.id && <CheckCircle className="h-5 w-5 text-orange-500" />}
                      </div>;
            })}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* 支付按钮 */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-semibold">需支付</span>
                  <span className="text-2xl font-bold text-orange-500">¥{total.toFixed(2)}</span>
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600" size="lg" onClick={handlePayment} disabled={isProcessing}>
                  {isProcessing ? '处理中...' : '立即支付'}
                </Button>
              </div>
            </div>
          </div>
        </div>;
}