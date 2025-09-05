// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { Clock, CheckCircle, ShoppingBag, ArrowLeft, CreditCard, XCircle } from 'lucide-react';

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
  const paymentStatus = props.$w.page.dataset.params.status || 'pending';
  const [orderDetails, setOrderDetails] = useState({
    id: orderId,
    tableNumber,
    items,
    total,
    createdAt: new Date().toLocaleString('zh-CN'),
    estimatedTime: '15-20分钟',
    paymentStatus
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(true);

  // 加载支付记录
  useEffect(() => {
    const loadPaymentRecord = async () => {
      try {
        const result = await $w.cloud.callDataSource({
          dataSourceName: 'payment_records',
          methodName: 'wedaGetItemV2',
          params: {
            filter: {
              where: {
                order_id: {
                  $eq: orderId
                }
              }
            },
            select: {
              $master: true
            }
          }
        });
        if (result) {
          setOrderDetails(prev => ({
            ...prev,
            paymentStatus: result.payment_status,
            items: result.items || items,
            total: result.amount || total,
            createdAt: new Date(result.createdAt).toLocaleString('zh-CN')
          }));
        }
      } catch (error) {
        console.error('加载支付记录失败:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPaymentRecord();
  }, [orderId, items, total]);
  const handleBackToMenu = () => {
    $w.utils.navigateTo({
      pageId: 'menu',
      params: {
        table: tableNumber
      }
    });
  };
  const handleContinuePayment = async () => {
    // 检查当前支付状态
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'payment_records',
        methodName: 'wedaGetItemV2',
        params: {
          filter: {
            where: {
              order_id: {
                $eq: orderId
              }
            }
          },
          select: {
            $master: true
          }
        }
      });
      if (result && result.payment_status === 'pending') {
        $w.utils.navigateTo({
          pageId: 'payment',
          params: {
            tableNumber,
            items: JSON.stringify(result.items || items),
            total: (result.amount || total).toString()
          }
        });
      } else {
        toast({
          title: "订单状态已更新",
          description: "该订单已无法继续支付"
        });
      }
    } catch (error) {
      console.error('检查支付状态失败:', error);
    }
  };
  const handleCancelOrder = async () => {
    setIsProcessing(true);
    try {
      // 更新支付记录状态为已取消
      await $w.cloud.callDataSource({
        dataSourceName: 'payment_records',
        methodName: 'wedaUpdateV2',
        params: {
          data: {
            payment_status: 'cancelled'
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
        title: "订单已取消",
        description: "订单已取消，欢迎下次光临"
      });
      setTimeout(() => {
        $w.utils.navigateTo({
          pageId: 'index'
        });
      }, 1500);
    } catch (error) {
      console.error('取消订单失败:', error);
      toast({
        title: "操作失败",
        description: "请稍后重试或联系服务员",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  const getStatusInfo = () => {
    switch (orderDetails.paymentStatus) {
      case 'paid':
        return {
          icon: CheckCircle,
          color: 'text-green-500',
          bgColor: 'bg-green-50',
          title: '支付成功',
          description: '订单已确认，正在为您准备餐品'
        };
      case 'pending':
        return {
          icon: Clock,
          color: 'text-orange-500',
          bgColor: 'bg-orange-50',
          title: '待支付',
          description: '请在15分钟内完成支付'
        };
      case 'cancelled':
        return {
          icon: XCircle,
          color: 'text-red-500',
          bgColor: 'bg-red-50',
          title: '订单已取消',
          description: '订单已取消，欢迎下次光临'
        };
      default:
        return {
          icon: ShoppingBag,
          color: 'text-gray-500',
          bgColor: 'bg-gray-50',
          title: '订单已提交',
          description: '等待处理中'
        };
    }
  };
  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;
  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">加载订单信息...</p>
            </div>
          </div>;
  }
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
            {/* 支付状态卡片 */}
            <Card className={`mb-4 ${statusInfo.bgColor}`}>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <StatusIcon className={`h-8 w-8 ${statusInfo.color}`} />
                  <div>
                    <h3 className={`text-lg font-semibold ${statusInfo.color}`}>{statusInfo.title}</h3>
                    <p className="text-sm text-gray-600">{statusInfo.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                    <span className="text-gray-600">支付状态</span>
                    <Badge className={orderDetails.paymentStatus === 'paid' ? 'bg-green-500' : orderDetails.paymentStatus === 'pending' ? 'bg-orange-500' : 'bg-red-500'}>
                      {orderDetails.paymentStatus === 'paid' ? '已支付' : orderDetails.paymentStatus === 'pending' ? '待支付' : '已取消'}
                    </Badge>
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
                  
                  {orderDetails.paymentStatus === 'pending' && <div className="space-y-3">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600" size="lg" onClick={handleContinuePayment}>
                        <CreditCard className="h-4 w-4 mr-2" />
                        继续支付
                      </Button>
                      <Button variant="outline" className="w-full text-red-500 border-red-500 hover:bg-red-50" onClick={handleCancelOrder} disabled={isProcessing}>
                        <XCircle className="h-4 w-4 mr-2" />
                        {isProcessing ? '处理中...' : '取消订单'}
                      </Button>
                    </div>}
                  
                  {orderDetails.paymentStatus === 'paid' && <Button className="w-full bg-green-500 hover:bg-green-600" onClick={handleBackToMenu}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      返回菜单
                    </Button>}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>;
}