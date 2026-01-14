import { MobileLayout } from "@/components/MobileLayout";
import { products } from "@/lib/data";
import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Exhibition() {
  return (
    <MobileLayout>
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-40 px-4 py-3 border-b flex items-center gap-3">
        <Link href="/">
          <ChevronLeft size={24} className="text-slate-800" />
        </Link>
        <h1 className="text-lg font-bold text-slate-900">기획전</h1>
      </div>

      <div className="p-4">
        <Tabs defaultValue="ongoing" className="w-full">
          <TabsList className="w-full mb-6 grid grid-cols-2">
            <TabsTrigger value="ongoing">진행중인 기획전</TabsTrigger>
            <TabsTrigger value="past">지난 기획전</TabsTrigger>
          </TabsList>

          <TabsContent value="ongoing" className="mt-0">
            <div className="grid gap-4">
              {/* Card 1 - Kids Room (from Home.tsx) */}
              <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden h-48 flex flex-col justify-center">
                 {/* Background Image with Gradient Fade */}
                 <div className="absolute top-0 right-0 w-2/3 h-full">
                    <img src={products[2].image} alt="Kids Room" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />
                 </div>
                 
                 <div className="relative z-10">
                   <span className="inline-block px-2 py-1 bg-slate-100/80 backdrop-blur-sm rounded text-[10px] font-medium text-slate-600 mb-3">KIDS ROOM</span>
                   <h4 className="text-lg font-medium text-slate-900 mb-1 leading-snug">
                     내 아이 방 <br/>
                     <span className="font-serif italic font-bold text-2xl">34만원</span>에 완성하기
                   </h4>
                   <div className="h-px w-8 bg-slate-300 my-4 group-hover:w-12 transition-all" />
                   <p className="text-xs text-slate-500 leading-relaxed max-w-[80%]">
                     아이의 꿈을 키워주는 공간, <br/>예산 부담 없이 완벽하게.
                   </p>
                 </div>
              </div>

              {/* Card 2 - Home Office (from Home.tsx) */}
              <div className="bg-slate-900 rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden text-white h-48 flex flex-col justify-center">
                 {/* Background Image with Gradient Fade */}
                 <div className="absolute top-0 right-0 w-2/3 h-full">
                    <img src={products[0].image} alt="Home Office" className="w-full h-full object-cover opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />
                 </div>
                 
                 <div className="relative z-10">
                   <span className="inline-block px-2 py-1 bg-white/10 backdrop-blur-sm rounded text-[10px] font-medium text-slate-200 mb-3">HOME OFFICE</span>
                   <h4 className="text-lg font-medium text-white mb-1 leading-snug">
                     서재 인테리어 <br/>
                     <span className="font-serif italic font-bold text-2xl">50%</span> 혜택 가이드
                   </h4>
                   <div className="h-px w-8 bg-white/30 my-4 group-hover:w-12 transition-all" />
                   <p className="text-xs text-slate-300 leading-relaxed max-w-[80%]">
                     놓치면 후회하는 기간 한정 <br/>스마트 쇼핑 전략.
                   </p>
                 </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-0">
             <div className="grid gap-4">
                <div className="bg-slate-100 rounded-xl h-48 flex items-center justify-center text-slate-400 text-sm font-medium">
                  종료된 기획전입니다
                </div>
                <div className="bg-slate-100 rounded-xl h-48 flex items-center justify-center text-slate-400 text-sm font-medium">
                  종료된 기획전입니다
                </div>
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
}