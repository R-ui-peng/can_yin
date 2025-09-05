// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Input, useToast } from '@/components/ui';
// @ts-ignore;
import { QrCode, Utensils, Sparkles, Ticket } from 'lucide-react';

// 修正组件导入路径 - 使用相对路径
import { CouponCenter } from '../components/CouponCenter';
export default function IndexPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [tableNumber, setTableNumber] = useState('');
  const [showCouponCenter, setShowCouponCenter] = useState(false);
  const [coupons] = useState([{
    id: 1,
    title: '新用户专享券',
    type: '满减券',
    discount: 20,
    minSpend: 100,
    total: 100,
    claimed: 45,
    expiryDate: '2024-12-31'
  }, {
    id: 2,
    title: '午餐特惠券',
    type: '折扣券',
    discount: 8.5,
    minSpend: 50,
    total: 200,
    claimed: 156,
    expiryDate: '2024-12-25'
  }, {
    id: 3,
    title: '周末狂欢券',
    type: '满减券',
    discount: 10,
    minSpend: 50,
    total: 150,
    claimed: 89,
    expiryDate: '2024-12-30'
  }]);
  const [userCoupons, setUserCoupons] = useState([]);
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
        table: tableNumber,
        coupons: JSON.stringify(userCoupons)
      }
    });
  };
  const handleClaimCoupon = couponId => {
    const coupon = coupons.find(c => c.id === couponId);
    if (coupon && coupon.claimed < coupon.total) {
      setUserCoupons(prev => [...prev, coupon]);
      toast({
        title: "领取成功",
        description: `已领取${coupon.title}`,
        className: "bg-green-500 text-white"
      });
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23000%22%20fill-opacity=%220.02%22%3E%3Cpath%20d=%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
            <header className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-600 rounded-2xl mb-4 shadow-lg">
                <Utensils className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-black mb-2">
                齐和聚
              </h1>
              <p className="text-gray-600 text-lg">扫码点餐，美味即刻送达</p>
            </header>

            {/* 领券中心入口 */}
            <div className="max-w-md mx-auto mb-6">
              <Button variant="outline" className="w-full h-12 border-2 border-gray-300 hover:border-orange-400 text-gray-700 hover:text-orange-600 font-semibold rounded-2xl transition-all duration-300" onClick={() => setShowCouponCenter(true)}>
                <Ticket className="h-5 w-5 mr-2" />
                领券中心
                <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  {coupons.length}张可用
                </span>
              </Button>
            </div>

            <div className="max-w-md mx-auto">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl font-bold text-gray-800">开始点餐</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-4">
                        <QrCode className="h-8 w-8 text-gray-700" />
                      </div>
                      <p className="text-gray-600 mb-4">扫描桌上二维码或输入桌号</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">桌号</label>
                        <Input type="number" placeholder="请输入桌号" value={tableNumber} onChange={e => setTableNumber(e.target.value)} className="text-center text-lg h-12 border-2 border-gray-200 rounded-2xl focus:border-gray-400 focus:ring-gray-400 transition-colors" />
                      </div>
                      
                      <Button className="w-full h-12 bg-gradient-to-r from-gray-800 to-gray-600 hover:from-gray-900 hover:to-gray-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" onClick={handleStartOrder}>
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

          <CouponCenter isOpen={showCouponCenter} onClose={() => setShowCouponCenter(false)} coupons={coupons} onClaim={handleClaimCoupon} />
        </div>;
}