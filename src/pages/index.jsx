// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, useToast } from '@/components/ui';
// @ts-ignore;
import { QrCode, Utensils, Clock, Star } from 'lucide-react';

export default function HomePage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [loading, setLoading] = useState(false);
  const handleScan = async () => {
    setLoading(true);
    try {
      // 模拟扫码获取桌号
      const tableNumber = Math.floor(Math.random() * 20) + 1;
      toast({
        title: "扫码成功",
        description: `已识别到${tableNumber}号桌`
      });
      setTimeout(() => {
        $w.utils.navigateTo({
          pageId: 'menu',
          params: {
            table: tableNumber
          }
        });
      }, 1000);
    } catch (error) {
      toast({
        title: "扫码失败",
        description: "请重试或联系服务员",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col">
          <header className="bg-white shadow-sm">
            <div className="max-w-4xl mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Utensils className="h-8 w-8 text-orange-500" />
                  <h1 className="text-2xl font-bold text-gray-800">美味餐厅</h1>
                </div>
                <div className="text-sm text-gray-600">
                  扫码点餐 · 便捷高效
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 flex items-center justify-center px-4">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <div className="w-32 h-32 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-orange-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                  扫码点餐
                </h2>
                <p className="text-gray-600 max-w-md">
                  扫描餐桌上的二维码，即可开始点餐。无需等待服务员，点餐更便捷。
                </p>
              </div>

              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-full shadow-lg" onClick={handleScan} disabled={loading}>
                {loading ? "识别中..." : "开始扫码"}
              </Button>

              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <Card className="bg-white/80 backdrop-blur">
                  <CardContent className="p-4 text-center">
                    <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">快速点餐</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/80 backdrop-blur">
                  <CardContent className="p-4 text-center">
                    <Star className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">菜品推荐</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/80 backdrop-blur">
                  <CardContent className="p-4 text-center">
                    <Utensils className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">实时订单</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>

          <footer className="bg-white border-t">
            <div className="max-w-4xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
              请扫描餐桌二维码开始点餐
            </div>
          </footer>
        </div>;
}