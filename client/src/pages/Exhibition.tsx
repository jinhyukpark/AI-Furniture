import { MobileLayout } from "@/components/MobileLayout";
import { Gift, Search, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { spaceConcept } from "@/lib/data";

export default function Exhibition() {
  return (
    <MobileLayout>
      <div className="p-4 pb-24">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">기획전</h1>
          <Search className="text-muted-foreground" />
        </header>

        {/* Featured Room */}
        <Link href="/room/1">
          <div className="relative aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden shadow-lg cursor-pointer group mb-12">
            <img 
              src={spaceConcept.image} 
              alt={spaceConcept.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="inline-block px-2 py-1 bg-primary text-white text-[10px] font-bold rounded-full w-fit mb-2">NEW</span>
              <h2 className="text-white text-xl font-bold mb-1">{spaceConcept.title}</h2>
              <div className="flex items-center text-white/90 text-sm font-medium">
                구경하러 가기 <ArrowRight size={16} className="ml-1" />
              </div>
            </div>
          </div>
        </Link>

        <div className="space-y-4">
          <h3 className="font-bold text-lg">지난 기획전</h3>
          {[1, 2].map((i) => (
            <div key={i} className="aspect-[2/1] bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-sm">
              종료된 기획전입니다
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
