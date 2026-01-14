import { MobileLayout } from "@/components/MobileLayout";
import { spaceConcept, products } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, Heart, ShoppingBag } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function RoomVisualizer() {
  return (
    <MobileLayout>
      <div className="relative h-screen bg-white pb-20 overflow-y-auto">
        {/* Header Image Area */}
        <div className="relative h-[45vh] w-full">
          <img 
            src={spaceConcept.image} 
            alt={spaceConcept.title} 
            className="w-full h-full object-cover"
          />
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
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-20 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider mb-2">
                <SparklesIcon className="w-3 h-3" /> AI 생성됨
              </div>
              <h1 className="text-3xl font-bold mb-1">{spaceConcept.title}</h1>
              <p className="text-white/80 text-sm line-clamp-2">{spaceConcept.description}</p>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 -mt-6 bg-white rounded-t-3xl relative z-20">
          <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>
          
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-lg font-bold">포함된 상품</h2>
              <p className="text-muted-foreground text-xs">2개 아이템 선택됨</p>
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
                <div key={product.id} className="flex gap-4 p-3 rounded-2xl border border-slate-100 shadow-sm bg-white">
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
              <Button variant="outline" className="h-auto py-3 px-4 flex flex-col items-start gap-1 bg-slate-50 border-slate-200 hover:bg-slate-100">
                <span className="font-bold text-xs">색상 변경</span>
                <span className="text-[10px] text-muted-foreground text-left leading-tight">더 따뜻한 톤으로</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 px-4 flex flex-col items-start gap-1 bg-slate-50 border-slate-200 hover:bg-slate-100">
                <span className="font-bold text-xs">예산 맞춤</span>
                <span className="text-[10px] text-muted-foreground text-left leading-tight">비슷한 저렴한 상품</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Action Button for Checkout */}
      <div className="fixed bottom-20 left-4 right-4 z-40">
        <Button className="w-full h-12 rounded-full shadow-xl text-base font-bold bg-primary hover:bg-primary/90">
          <ShoppingBag className="mr-2 h-5 w-5" />
          일괄 구매하기
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
