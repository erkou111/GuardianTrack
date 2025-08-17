import { useState } from "react";
import { ShoppingCart, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  isHot?: boolean;
}

const products: Product[] = [
  {
    id: "1",
    name: "智能健康手表",
    price: 1299,
    originalPrice: 1599,
    image: "🌟",
    rating: 4.8,
    reviews: 256,
    category: "健康监测",
    isHot: true,
  },
  {
    id: "2",
    name: "机器人充电底座",
    price: 299,
    image: "🔌",
    rating: 4.6,
    reviews: 89,
    category: "配件",
  },
  {
    id: "3",
    name: "语音交互模块",
    price: 899,
    image: "🎤",
    rating: 4.7,
    reviews: 134,
    category: "功能模块",
  },
  {
    id: "4",
    name: "环境传感器套装",
    price: 599,
    image: "🌡️",
    rating: 4.5,
    reviews: 67,
    category: "传感器",
  },
  {
    id: "5",
    name: "机器人清洁套装",
    price: 199,
    image: "🧽",
    rating: 4.4,
    reviews: 43,
    category: "维护",
  },
  {
    id: "6",
    name: "紧急呼叫按钮",
    price: 399,
    image: "🚨",
    rating: 4.9,
    reviews: 178,
    category: "安全",
  },
];

export function ShopPage() {
  const [cartCount, setCartCount] = useState(0);
  
  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-background pb-20 px-4 pt-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">商城</h1>
            <p className="text-muted-foreground text-sm">机器人配套产品</p>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {["全部", "健康监测", "配件", "功能模块", "传感器", "维护", "安全"].map((category) => (
            <Badge
              key={category}
              variant={category === "全部" ? "default" : "secondary"}
              className={cn(
                "whitespace-nowrap cursor-pointer transition-colors",
                category === "全部" && "bg-gradient-primary"
              )}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {products.map((product) => (
            <Card key={product.id} className="bg-gradient-card shadow-card border-0 overflow-hidden">
              <CardContent className="p-3">
                <div className="relative mb-3">
                  <div className="w-full h-24 bg-secondary rounded-lg flex items-center justify-center text-2xl">
                    {product.image}
                  </div>
                  {product.isHot && (
                    <Badge className="absolute -top-1 -right-1 bg-destructive text-xs px-1">
                      热销
                    </Badge>
                  )}
                </div>
                
                <h3 className="font-medium text-sm text-foreground mb-1 line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-3 w-3 fill-warning text-warning" />
                  <span className="text-xs text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-foreground">
                      ¥{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        ¥{product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
                
                <Button
                  onClick={addToCart}
                  size="sm"
                  className="w-full bg-gradient-primary text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  加入购物车
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Shopping Cart FAB */}
      <div className="fixed bottom-20 right-4">
        <Button
          size="lg"
          className="rounded-full w-14 h-14 bg-gradient-primary shadow-glow relative"
        >
          <ShoppingCart className="h-6 w-6" />
          {cartCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-destructive text-xs">
              {cartCount}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  );
}