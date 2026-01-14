import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/data";
import { Search, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
        <div className="relative rounded-2xl overflow-hidden bg-primary aspect-[2/1] shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 z-10 p-6 flex flex-col justify-center text-white">
            <Badge className="w-fit mb-2 bg-white/20 hover:bg-white/30 text-white border-none">AI 큐레이터</Badge>
            <h2 className="text-2xl font-bold leading-tight mb-2">김일룸님<br/>오늘 하루도 수고 많으셨어요</h2>
            <p className="text-sm opacity-90 mb-4">아이들을 위한 따뜻한 방, 한번쯤 생각해보지 않으셨나요?<br/>제가 그 상상을 현실로 그려드릴게요.</p>
          </div>
          {/* Abstract circles or pattern */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
          <div className="absolute top-10 right-20 w-20 h-20 bg-accent/30 rounded-full blur-xl"></div>
        </div>

        {/* Featured Products */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">회원님을 위한 추천</h2>
            <button className="text-xs text-primary font-medium">전체보기</button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        
        {/* Editorial Section */}
        <div className="bg-secondary/50 rounded-xl p-6">
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
