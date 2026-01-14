import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/data";
import { Search, Bell, Moon, ArrowRight, Sparkles, X, MessageCircle, Send, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = products.slice(0, 4).map(p => p.image);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const HOTSPOTS = [
    {
      id: 1,
      top: "22%",
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

      {/* Hero Image Carousel */}
      <div className="relative aspect-[4/5] w-full bg-slate-100 overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentSlide}
            src={heroImages[currentSlide]} 
            alt="Main Hero" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover absolute inset-0"
          />
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        
        <div className="absolute bottom-10 right-6 z-10 pointer-events-none text-right">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-white text-2xl font-serif italic leading-relaxed drop-shadow-md">
              머무는 것만으로도<br />
              영감이 되는<br />
              <span className="font-bold">공간의 미학.</span>
            </h2>
          </motion.div>
        </div>
      </div>
      
      {/* Carousel Controls */}
      <div className="bg-white border-b py-3 flex items-center justify-center gap-6">
        <button onClick={prevSlide} className="text-slate-400 hover:text-slate-800 transition-colors p-1">
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {heroImages.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === idx 
                  ? "w-6 h-1.5 bg-primary" 
                  : "w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
        <button onClick={nextSlide} className="text-slate-400 hover:text-slate-800 transition-colors p-1">
          <ChevronRight size={20} />
        </button>
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
        <div className="mt-12 bg-slate-50 rounded-2xl p-6 border border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-primary fill-current" />
            <h3 className="font-bold text-lg text-slate-800">AI 예산 큐레이터</h3>
          </div>
          <p className="text-sm text-slate-500 mb-5">예산은 아끼고 감성은 채우는 스마트한 제안.</p>
          
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex gap-4 items-center group cursor-pointer hover:border-primary/30 transition-colors">
               <div className="w-16 h-16 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                 <span className="text-2xl">🧸</span>
               </div>
               <div className="flex-1">
                 <h4 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-primary transition-colors">내 아이 방 34만원에 완성하기</h4>
                 <p className="text-xs text-slate-500 line-clamp-1">남부럽지 않은 키즈룸 꾸미기, 가성비 끝판왕 조합.</p>
               </div>
               <ArrowRight size={16} className="text-slate-300 group-hover:text-primary transition-colors" />
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex gap-4 items-center group cursor-pointer hover:border-primary/30 transition-colors">
               <div className="w-16 h-16 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
                 <span className="text-2xl">🏷️</span>
               </div>
               <div className="flex-1">
                 <h4 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-primary transition-colors">서재 꾸미기 50% 할인 꿀팁</h4>
                 <p className="text-xs text-slate-500 line-clamp-1">놓치면 후회하는 기간 한정 이벤트 활용법.</p>
               </div>
               <ArrowRight size={16} className="text-slate-300 group-hover:text-primary transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
