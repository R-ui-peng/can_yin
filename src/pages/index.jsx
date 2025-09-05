// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Input, useToast } from '@/components/ui';
// @ts-ignore;
import { QrCode, Utensils, Sparkles } from 'lucide-react';

export default function IndexPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [tableNumber, setTableNumber] = useState('');
  const handleStartOrder = () => {
    if (!tableNumber.trim()) {
      toast({
        title: "请输入桌号",
        description: "请扫描桌上的二维码或输入桌号",
        variant: "destructive"
      });
      return;
    }
    $w.utils.navigateTo({
      pageId: 'menu',
      params: {
        table: tableNumber
      }
    });
  };
  return <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23f97316%22%20fill-opacity=%220.03%22%3E%3Cpath%20d=%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
            <header className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-purple-500 rounded-2xl mb-4 shadow-lg">
                <Utensils className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent mb-2">
                美味餐厅
              </h1>
              <p className="text-gray-600 text-lg">扫码点餐，美味即刻送达</p>
            </header>

            <div className="max-w-md mx-auto">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl font-bold text-gray-800">开始点餐</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-purple-100 rounded-full mb-4">
                        <QrCode className="h-8 w-8 text-orange-600" />
                      </div>
                      <p className="text-gray-600 mb-4">扫描桌上二维码或输入桌号</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">桌号</label>
                        <Input type="number" placeholder="请输入桌号" value={tableNumber} onChange={e => setTableNumber(e.target.value)} className="text-center text-lg h-12 border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 transition-colors" />
                      </div>
                      
                      <Button className="w-full h-12 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" onClick={handleStartOrder}>
                        <Sparkles className="h-5 w-5 mr-2" />
                        开始点餐
                      </Button>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-gray-500">
                        找不到桌号？请联系服务员
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>;
}