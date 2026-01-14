import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { ProductCard } from "@/components/ProductCard";
import { products, spaceConcept } from "@/lib/data";
import { Search, Bell, Moon, Star, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function Home() {
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
      <div className="relative aspect-[4/5] w-full">
        <img 
          src={products[0].image} 
          alt="Main Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
        
        {/* Hotspots matching the user's reference */}
        <div className="absolute top-[30%] left-[25%]">
            <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
        </div>
        <div className="absolute top-[50%] left-[50%]">
            <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center animate-pulse delay-75">
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            </div>
        </div>
        <div className="absolute bottom-[30%] right-[25%]">
             <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center animate-pulse delay-150">
                <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
        </div>

        {/* Floating Search/Question Bar */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="bg-white/90 backdrop-blur-md rounded-full shadow-lg p-3 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
             <span className="text-sm text-slate-600 font-medium">궁금한 내용을 물어보세요</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Featured Products */}
        <div>
          <div className="flex items-center justify-between mb-5 mt-2">
            <h2 className="text-lg font-semibold">오늘 이런 상품은 어떠세요?</h2>
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
