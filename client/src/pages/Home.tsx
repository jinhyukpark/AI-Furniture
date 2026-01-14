import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/data";
import { Search, Bell, Moon, Star, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

const CATEGORIES = ["전체", "침실", "거실", "키즈룸", "서재", "주방"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("전체");

  return (
    <MobileLayout>
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-40 px-4 py-3 border-b">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold tracking-tight text-primary">iloom<span className="text-foreground text-lg font-normal">.ai</span></h1>
          <div className="flex gap-3 text-muted-foreground">
            <Search size={22} />
            <Bell size={22} />
          </div>
        </div>
        
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat 
                  ? "bg-primary text-white shadow-md shadow-primary/20" 
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 space-y-8">
        {/* Hero / Promo */}
        <Link href="/chat">
          <div className="block relative rounded-lg overflow-hidden bg-primary aspect-[2/1] shadow-lg group cursor-pointer transition-transform active:scale-[0.98]">
            {/* Deep Evening Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#4c0519] to-primary z-0"></div>
            
            {/* Stars */}
            <div className="absolute top-4 right-10 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: "0s" }}></div>
            <div className="absolute top-10 right-20 w-0.5 h-0.5 bg-white/80 rounded-full animate-twinkle" style={{ animationDelay: "1s" }}></div>
            <div className="absolute bottom-10 left-1/2 w-0.5 h-0.5 bg-white/60 rounded-full animate-twinkle" style={{ animationDelay: "2s" }}></div>
            <div className="absolute top-8 right-1/3 w-0.5 h-0.5 bg-white/70 rounded-full animate-twinkle" style={{ animationDelay: "1.5s" }}></div>
            <div className="absolute top-1/2 right-4 w-1 h-1 bg-white/90 rounded-full animate-twinkle" style={{ animationDelay: "0.5s" }}></div>

            {/* Shooting Star */}
            <div className="absolute top-[-10px] right-[20px] w-20 h-[1px] bg-gradient-to-l from-transparent via-white to-transparent animate-shooting-star opacity-0 rotate-[-45deg]"></div>
            
            {/* Content */}
            <div className="relative z-10 p-6 flex flex-col justify-center text-white h-full">
              <Badge className="w-fit mb-2 bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm flex items-center gap-1">
                <Moon size={10} className="fill-current" /> AI 큐레이터
              </Badge>
              <h2 className="text-2xl font-bold leading-tight mb-2 drop-shadow-md">박진혁님<br/>오늘 하루도 수고 많으셨어요</h2>
              <p className="text-sm text-white/90 mb-4 drop-shadow-sm">아이들을 위한 따뜻한 방, 한번쯤 생각해보지 않으셨나요?<br/>제가 그 상상을 현실로 그려드릴게요.</p>
              
              {/* Shortcut Arrow */}
              <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white/30 transition-colors">
                <ArrowRight size={16} />
              </div>
            </div>
            
            {/* Abstract circles or pattern - Updated for evening vibe */}
            <div className="absolute -right-4 -bottom-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl"></div>
            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
          </div>
        </Link>

        {/* Featured Products */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">오늘 이런 상품은 어떠세요?</h2>
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
