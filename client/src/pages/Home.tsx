import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/data";
import { Search, Bell, Moon, ArrowRight, Sparkles, X, MessageCircle, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const HOTSPOTS = [
    {
      id: 1,
      top: "30%",
      left: "35%",
      label: "모니터 조명",
      questions: ["장시간 앉아도 편한가요?", "헤드레스트 조절 되나요?", "바퀴 소음은 없나요?"]
    },
    {
      id: 2,
      top: "55%",
      left: "50%",
      label: "모션 데스크",
      questions: ["높이 조절 범위는?", "상판 사이즈 변경 가능한가요?", "배송 얼마나 걸려요?"]
    },
    {
      id: 3,
      top: "70%",
      left: "25%",
      label: "메쉬 의자",
      questions: ["허리 지지대 있나요?", "색상 옵션 보여줘", "AS 기간은 어떻게 되나요?"]
    }
  ];

  return (
    <MobileLayout>
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-40 px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-primary">iloom<span className="text-foreground text-lg font-normal">.ai</span></h1>
          <div className="flex gap-3 text-muted-foreground">
            <Search size={22} />
            <Bell size={22} />
          </div>
        </div>
      </header>

      {/* Hero Image (Main Product Image) - Full Width */}
      <div className="relative aspect-[4/5] w-full bg-slate-100 overflow-hidden">
        <img 
          src={products[0].image} 
          alt="Main Hero" 
          className="w-full h-full object-cover"
          onClick={() => setActiveHotspot(null)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        
        <div className="absolute bottom-10 right-6 z-10 pointer-events-none text-right">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-white text-2xl font-light leading-relaxed drop-shadow-md">
              <span className="font-serif italic opacity-90">편안함</span>과 <br />
              영원한 <span className="font-serif italic opacity-90">감성</span>을<br />
              <span className="font-bold">선물합니다.</span>
            </h2>
          </motion.div>
        </div>
        
        {/* Hotspots */}
        {HOTSPOTS.map((hotspot) => (
          <div 
            key={hotspot.id}
            className="absolute z-10"
            style={{ top: hotspot.top, left: hotspot.left }}
          >
            {/* The Hotspot Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id);
              }}
              className={`relative group flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                activeHotspot === hotspot.id 
                  ? "bg-white text-primary shadow-lg scale-110" 
                  : "bg-white/20 backdrop-blur-md border border-white/60 text-white hover:bg-white/40 hover:scale-105"
              }`}
            >
              {activeHotspot === hotspot.id ? (
                 <X size={14} />
              ) : (
                 <Sparkles size={14} className={activeHotspot === null ? "animate-pulse" : ""} />
              )}
              
              {/* Ping animation ring */}
              {activeHotspot !== hotspot.id && (
                <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-30 animate-ping duration-1000"></span>
              )}
            </button>

            {/* Popover / Dialog for Questions */}
            <AnimatePresence>
              {activeHotspot === hotspot.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-3 w-[280px] bg-white rounded-[20px] shadow-2xl p-5 z-50 origin-top text-left"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-1.5 text-primary font-bold">
                       <Sparkles size={16} className="fill-current" /> AI 큐레이터
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setActiveHotspot(null); }}>
                        <X size={18} className="text-slate-400" />
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1">{hotspot.label}</h3>
                  <p className="text-xs text-slate-500 mb-4">이 제품에 대해 궁금한 점을 알려주세요.</p>

                  <div className="space-y-2 mb-4">
                    {hotspot.questions.map((q, idx) => (
                      <Link key={idx} href={`/chat?q=${encodeURIComponent(q)}`}>
                        <button className="w-full text-left bg-slate-50 hover:bg-slate-100 p-3 rounded-xl text-sm text-slate-700 flex justify-between items-center transition-colors group">
                          {q}
                          <MessageCircle size={14} className="text-slate-300 group-hover:text-primary transition-colors" />
                        </button>
                      </Link>
                    ))}
                  </div>

                  <div className="relative">
                     <input 
                        className="w-full bg-slate-50 rounded-full py-2.5 pl-4 pr-10 text-sm border-none focus:ring-1 focus:ring-primary placeholder:text-slate-400" 
                        placeholder="직접 질문 입력하기..." 
                        onClick={(e) => e.stopPropagation()}
                     />
                     <button className="absolute right-1 top-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                        <Send size={14} />
                     </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="p-4 pt-8">
        {/* Featured Products */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-medium text-foreground">오늘 이런 상품은 어떠세요?</h2>
            <button className="text-xs text-primary font-medium">전체보기</button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        
        {/* Editorial Section */}
        <div className="bg-secondary/50 rounded-lg p-6">
          <h3 className="font-serif text-xl font-medium mb-2">에디터의 픽</h3>
          <p className="text-sm text-muted-foreground mb-4">모던 미니멀리스트 홈을 위한 엄선된 컬렉션.</p>
          <div className="h-32 bg-white rounded-xl flex items-center justify-center text-muted-foreground text-sm border border-dashed">
            에디토리얼 콘텐츠 영역
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
