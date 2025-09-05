// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card, CardContent, Badge } from '@/components/ui';
// @ts-ignore;
import { Plus, TrendingUp } from 'lucide-react';

export function DishCard({
  dish,
  onAdd
}) {
  return <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="aspect-video relative overflow-hidden">
        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <Badge className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
          <TrendingUp className="h-3 w-3 mr-1" />
          {dish.sales}
        </Badge>
        <div className="absolute bottom-3 left-3">
          <span className="text-white text-sm font-medium">{dish.category}</span>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-1 text-gray-800">{dish.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{dish.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
              ¥{dish.price}
            </span>
          </div>
          <Button size="sm" className="bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 text-white rounded-full px-4 shadow-md hover:shadow-lg transition-all duration-300" onClick={() => onAdd(dish)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>;
}