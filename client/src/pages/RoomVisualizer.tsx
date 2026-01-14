import { MobileLayout } from "@/components/MobileLayout";
import { spaceConcept, products } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Share2, Heart, ShoppingBag, Sparkles, MessageCircle, Send, X, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

export default function RoomVisualizer() {
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

  // Interactive items coordinates (percentages)
  const interactiveItems = [
    { id: 1, name: "로이 모션 데스크", x: 55, y: 55, questions: ["높이 조절 범위는?", "상판 재질은 무엇인가요?", "설치 서비스가 포함되나요?"] },
    { id: 4, name: "올리버 메쉬 의자", x: 32, y: 65, questions: ["장시간 앉아도 편한가요?", "헤드레스트 조절 되나요?", "바퀴 소음은 없나요?"] },
    { id: 5, name: "루미 스마트 램프", x: 28, y: 38, questions: ["스마트폰 연동 되나요?", "수명은 얼마나 되나요?", "눈부심 방지 기능이 있나요?"] },
  ];

  return (
    <MobileLayout>
      <div className="relative h-screen bg-white pb-20 overflow-y-auto">
        {/* Header Image Area */}
        <div className="relative h-[55vh] w-full bg-slate-100">
          <img 
            src={spaceConcept.image} 
            alt={spaceConcept.title} 
            className="w-full h-full object-cover"
          />
          
          {/* Interactive Hotspots */}
          {interactiveItems.map((item) => (
            <Popover key={item.id} open={openPopoverId === item.id} onOpenChange={(open) => setOpenPopoverId(open ? item.id : null)}>
              <PopoverTrigger asChild>
                <button
                  className="absolute w-10 h-10 -ml-5 -mt-5 rounded-full bg-white/20 backdrop-blur-md border border-white/60 flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,255,255,0.5)] z-20 hover:scale-110 transition-transform cursor-pointer group"
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                >
                  <Sparkles size={18} className="fill-white animate-pulse" />
                  <div className="absolute inset-0 rounded-full bg-white/30 animate-ping duration-[2000ms]" />
                </button>
              </PopoverTrigger>
              <PopoverContent 
                className="w-[280px] p-0 bg-white/95 backdrop-blur-xl border-none shadow-2xl rounded-2xl overflow-hidden z-50 animate-in zoom-in-95 duration-200" 
                side="bottom"
                sideOffset={10}
                align="center"
              >
                <div className="relative">
                  {/* Header */}
                  <div className="px-4 py-3 bg-gradient-to-r from-primary/10 to-transparent border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} className="text-primary fill-current" />
                      <span className="font-bold text-sm text-primary">AI 큐레이터</span>
                    </div>
                    <button onClick={() => setOpenPopoverId(null)} className="text-slate-400 hover:text-slate-600">
                      <X size={16} />
                    </button>
                  </div>
                  
                  {/* Body */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-base flex items-center gap-1 cursor-pointer hover:text-primary transition-colors group">
                        {item.name}
                        <ChevronRight size={16} className="text-slate-400 group-hover:text-primary" />
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">이 제품에 대해 무엇이든 물어보세요.</p>
                    
                    <div className="space-y-2 mb-4">
                      {item.questions.map((q, idx) => (
                        <button 
                          key={idx}
                          className="w-full text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs text-slate-700 transition-colors flex items-center justify-between group"
                        >
                          <span>{q}</span>
                          <MessageCircle size={12} className="text-slate-300 group-hover:text-primary transition-colors" />
                        </button>
                      ))}
                    </div>

                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="직접 질문 입력하기..." 
                        className="w-full pl-3 pr-9 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-primary/50 transition-colors"
                      />
                      <button className="absolute right-1 top-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary/90 transition-colors">
                        <Send size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ))}

          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10">
            <Link href="/chat">
              <a className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <ArrowLeft size={20} />
              </a>
            </Link>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <Share2 size={20} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <Heart size={20} />
              </button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-20 text-white pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider mb-2">
                <SparklesIcon className="w-3 h-3" /> AI 생성됨
              </div>
              <h1 className="text-3xl font-bold mb-1 drop-shadow-md">{spaceConcept.title}</h1>
              <p className="text-white/90 text-sm line-clamp-2 drop-shadow-sm">{spaceConcept.description}</p>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 -mt-6 bg-white rounded-t-3xl relative z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
          <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>
          
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-lg font-bold">포함된 상품</h2>
              <p className="text-muted-foreground text-xs">3개 아이템 선택됨</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground decoration-slate-400">총 견적가</div>
              <div className="font-bold text-xl text-primary">{(spaceConcept.totalPrice).toLocaleString()} <span className="text-sm text-muted-foreground font-normal">원</span></div>
            </div>
          </div>

          <div className="space-y-4">
            {spaceConcept.products.map((productId) => {
              const product = products.find(p => p.id === productId);
              if (!product) return null;

              return (
                <div key={product.id} className="flex gap-4 p-3 rounded-2xl border border-slate-100 shadow-sm bg-white hover:border-primary/20 transition-colors">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs text-muted-foreground">{product.category}</div>
                        <h3 className="font-bold text-sm truncate">{product.name}</h3>
                      </div>
                      <Checkbox defaultChecked id={`item-${product.id}`} />
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="font-bold text-sm">{product.price.toLocaleString()} 원</div>
                      <button className="text-xs underline text-muted-foreground">상세보기</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Features */}
          <div className="mt-8">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-primary" />
              AI 제안
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto py-3 px-4 flex flex-col items-start gap-1 bg-slate-50 border-slate-200 hover:bg-slate-100 rounded-xl">
                <span className="font-bold text-xs">색상 변경</span>
                <span className="text-[10px] text-muted-foreground text-left leading-tight">더 따뜻한 톤으로</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 px-4 flex flex-col items-start gap-1 bg-slate-50 border-slate-200 hover:bg-slate-100 rounded-xl">
                <span className="font-bold text-xs">예산 맞춤</span>
                <span className="text-[10px] text-muted-foreground text-left leading-tight">비슷한 저렴한 상품</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Action Button for Checkout */}
      <div className="fixed bottom-24 left-4 right-4 z-40">
        <Button className="w-full h-14 rounded-2xl shadow-xl text-base font-bold bg-primary hover:bg-primary/90 flex items-center justify-between px-6">
          <span className="flex items-center gap-2"><ShoppingBag className="h-5 w-5" /> 일괄 구매하기</span>
          <span className="text-white/80 text-sm font-normal">3개 상품</span>
        </Button>
      </div>
    </MobileLayout>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}
