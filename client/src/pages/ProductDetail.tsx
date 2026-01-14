import { useState, useEffect } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { products } from "@/lib/data";
import { useRoute, useLocation } from "wouter";
import { ArrowLeft, Share2, Heart, ShoppingBag, Sparkles, Wand2, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetail() {
  const [match, params] = useRoute("/product/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isPicked, setIsPicked] = useState(false);
  
  const product = products.find(p => p.id === Number(params?.id));

  if (!product) return <div>Product not found</div>;

  const handlePick = () => {
    setIsPicked(!isPicked);
    if (!isPicked) {
      toast({
        title: "상품을 Pick 했습니다!",
        description: "이제 AI에게 이 상품에 대해 자세히 물어보거나 비교를 요청할 수 있어요.",
        duration: 3000,
      });
    }
  };

  const handleBuy = () => {
    toast({
      title: "구매하기",
      description: "결제 기능은 준비 중입니다.",
    });
  };

  const handleAskAI = () => {
    // Navigate to chat with context (mock)
    setLocation("/chat");
  };

  return (
    <MobileLayout>
      <div className="relative min-h-screen bg-white pb-24">
        {/* Header (Floating) */}
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 max-w-md mx-auto">
          <button 
            onClick={() => window.history.back()}
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-center text-foreground hover:bg-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-2">
            <button 
              onClick={handlePick}
              className={`w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-center transition-colors ${isPicked ? "text-primary bg-primary/10" : "text-foreground hover:bg-white"}`}
            >
              <Wand2 size={20} className={isPicked ? "text-primary fill-current" : ""} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-center text-foreground hover:bg-white transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[4/5] bg-slate-100">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Container */}
        <div className="relative -mt-6 bg-white rounded-t-2xl px-6 pt-8 pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          {/* Handle bar */}
          <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>

          <div className="mb-6">
            <div className="text-sm text-muted-foreground font-medium mb-1">{product.category}</div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">{product.price.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground">KRW</span>
            </div>
          </div>

          {/* AI Banner */}
          <div 
            onClick={handleAskAI}
            className="mb-8 p-4 rounded-xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-indigo-100 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-primary">
                <Sparkles size={20} />
              </div>
              <div>
                <div className="text-sm font-bold text-indigo-900">AI에게 물어보기</div>
                <div className="text-xs text-indigo-600">이 가구가 우리 집에 어울릴까요?</div>
              </div>
            </div>
            <ChevronRight size={18} className="text-indigo-400" />
          </div>

          {/* Description */}
          <div className="space-y-6">
            <section>
              <h3 className="font-bold mb-3 text-lg">상품 정보</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </section>

            <section>
              <h3 className="font-bold mb-3 text-lg">주요 특징</h3>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
            
            {/* Dummy Specs */}
            <section className="pt-4 border-t">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground block mb-1">소재</span>
                  <span className="font-medium">Premium Wood / Fabric</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">배송</span>
                  <span className="font-medium">일룸 전문 시공 배송</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 pb-safe z-50 max-w-md mx-auto">
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="icon" 
            className={`w-14 h-14 rounded-xl shrink-0 transition-colors ${isPicked ? "border-primary text-primary bg-primary/5" : "border-slate-200"}`}
            onClick={handlePick}
          >
            <Wand2 size={24} className={isPicked ? "fill-current" : ""} />
          </Button>
          <Button 
            className="flex-1 h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20"
            onClick={handleBuy}
          >
            구매하기
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
