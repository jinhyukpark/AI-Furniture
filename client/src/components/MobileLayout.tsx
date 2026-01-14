import { Link, useLocation } from "wouter";
import { Home, Store, User, Gift, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-32 font-sans">
      <main className="max-w-md mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto pointer-events-none">
        {/* Shadow gradient for the navbar */}
        <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative h-[100px] w-full">
            {/* Background SVG Curve Construction */}
            <div className="absolute inset-0 flex items-end drop-shadow-sm">
                <div className="flex-1 h-[80px] bg-white border-t border-slate-200"></div>
                <div className="relative w-[100px] h-[80px] -mt-[1px]">
                     {/* 
                       Curve definition:
                       Start at 0,0
                       Curve down to 50,50 (control point) -> end at 100,0
                     */}
                     <svg width="100" height="80" viewBox="0 0 100 80" className="w-full h-full fill-white">
                         <path d="M0,0 Q50,50 100,0 L100,80 L0,80 Z" fill="white" />
                         <path d="M0,0 Q50,50 100,0" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                     </svg>
                     {/* Cover the 1px gap if any overlap issues */}
                     <div className="absolute -left-[1px] top-0 bottom-0 w-[1px] bg-white -z-10"></div>
                     <div className="absolute -right-[1px] top-0 bottom-0 w-[1px] bg-white -z-10"></div>
                </div>
                <div className="flex-1 h-[80px] bg-white border-t border-slate-200"></div>
            </div>
            
            {/* Nav Items */}
            <div className="absolute inset-0 flex items-end justify-around pb-5 px-2 pointer-events-auto">
              
              <Link href="/">
                <a className={cn("flex flex-col items-center gap-1 w-14 py-1 justify-end transition-colors z-10 h-14 mb-1", 
                  location === "/" ? "text-primary" : "text-slate-400 hover:text-slate-600")}>
                  <Home size={24} strokeWidth={location === "/" ? 2.5 : 2} />
                  <span className="text-[11px] font-medium">홈</span>
                </a>
              </Link>

              <Link href="/market">
                <a className={cn("flex flex-col items-center gap-1 w-14 py-1 justify-end transition-colors z-10 h-14 mb-1", 
                  location === "/market" ? "text-primary" : "text-slate-400 hover:text-slate-600")}>
                  <Store size={24} strokeWidth={location === "/market" ? 2.5 : 2} />
                  <span className="text-[11px] font-medium">마켓</span>
                </a>
              </Link>

              {/* 3D AI Button - Structure changed to keep text in footer */}
              <Link href="/chat">
                <a className="relative flex flex-col items-center justify-end w-14 z-20 h-14 mb-1 group">
                    {/* The floating button absolute positioned - moved up to accommodate taller footer */}
                    <div className={cn(
                        "absolute -top-16 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-rose-600 flex items-center justify-center text-white shadow-xl shadow-primary/30 transition-transform duration-300 group-active:scale-95 border-4 border-white",
                        location === "/chat" ? "ring-2 ring-primary/20 scale-105" : ""
                    )}>
                        <Sparkles size={28} strokeWidth={2.5} className="animate-pulse" />
                    </div>
                    
                    {/* The text stays in the flow at the bottom */}
                    <span className={cn("text-[11px] font-bold mt-8 transition-colors", 
                        location === "/chat" ? "text-primary" : "text-slate-500")}>
                        AI
                    </span>
                </a>
              </Link>

              <Link href="/exhibition">
                <a className={cn("flex flex-col items-center gap-1 w-14 py-1 justify-end transition-colors z-10 h-14 mb-1", 
                  location === "/exhibition" ? "text-primary" : "text-slate-400 hover:text-slate-600")}>
                  <Gift size={24} strokeWidth={location === "/exhibition" ? 2.5 : 2} />
                  <span className="text-[11px] font-medium">기획전</span>
                </a>
              </Link>

              <Link href="/profile">
                <a className={cn("flex flex-col items-center gap-1 w-14 py-1 justify-end transition-colors z-10 h-14 mb-1", 
                  location === "/profile" ? "text-primary" : "text-slate-400 hover:text-slate-600")}>
                  <User size={24} strokeWidth={location === "/profile" ? 2.5 : 2} />
                  <span className="text-[11px] font-medium">마이</span>
                </a>
              </Link>
              
            </div>
        </div>
      </nav>
    </div>
  );
}
