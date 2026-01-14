import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Package, Search } from "lucide-react";

const CATEGORIES = ["전체", "침실", "거실", "키즈룸", "서재", "주방"];

export default function Market() {
  const [activeCategory, setActiveCategory] = useState("전체");

  return (
    <MobileLayout>
      <div className="p-4 space-y-4">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">마켓</h1>
          <Search className="text-muted-foreground" />
        </header>

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

        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Package size={48} className="mb-4 opacity-20" />
          <p>준비 중인 서비스입니다.</p>
        </div>
      </div>
    </MobileLayout>
  );
}
