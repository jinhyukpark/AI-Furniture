import { Link, useLocation } from "wouter";
import { Home, Store, User, Gift, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-24 font-sans">
      <main className="max-w-md mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto pointer-events-none">
        {/* Shadow gradient for the navbar */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative h-[80px] w-full">
            {/* Background SVG Curve Construction */}
            <div className="absolute inset-0 flex items-end">
                <div className="flex-1 h-[60px] bg-white border-t border-slate-200"></div>
                <div className="relative w-[90px] h-[60px] -mt-[1px]">
                     <svg width="90" height="60" viewBox="0 0 90 60" className="w-full h-full fill-white">
                         <path d="M0,0 Q45,45 90,0 L90,60 L0,60 Z" fill="white" />
                         <path d="M0,0 Q45,45 90,0" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                     </svg>
                     {/* Cover the 1px gap if any overlap issues */}
                     <div className="absolute -left-[1px] top-0 bottom-0 w-[1px] bg-white -z-10"></div>
                     <div className="absolute -right-[1px] top-0 bottom-0 w-[1px] bg-white -z-10"></div>
                </div>
                <div className="flex-1 h-[60px] bg-white border-t border-slate-200"></div>
            </div>
            
            {/* Nav Items */}
            <div className="absolute inset-0 flex items-end justify-around pb-3 px-2 pointer-events-auto">
              
              <Link href="/">
                <a className={cn("flex flex-col items-center gap-1 w-14 py-1 justify-end transition-colors z-10", 
                  location === "/" ? "text-primary" : "text-slate-400 hover:text-slate-600")}>
                  <Home size={22} strokeWidth={location === "/" ? 2.5 : 2} />
                  <span className="text-[10px] font-medium mt-0.5">홈</span>
                </a>
              </Link>

              <Link href="/market">
                <a className={cn("flex flex-col items-center gap-1 w-14 py-1 justify-end transition-colors z-10", 
                  location === "/market" ? "text-primary" : "text-slate-400 hover:text-slate-600")}>
                  <Store size={22} strokeWidth={location === "/market" ? 2.5 : 2} />
                  <span className="text-[10px] font-medium mt-0.5">마켓</span>
                </a>
              </Link>

              {/* 3D AI Button */}
              <Link href="/chat">
                <a className="relative -top-8 flex flex-col items-center group z-20">
                  <div className={cn(
                    "w-14 h-14 rounded-full bg-gradient-to-br from-primary to-rose-600 flex items-center justify-center text-white shadow-xl shadow-primary/30 transition-transform duration-300 group-active:scale-95 border-2 border-white",
                    location === "/chat" ? "ring-2 ring-primary/20 scale-105" : ""
                  )}>
                    <Sparkles size={24} strokeWidth={2.5} className="animate-pulse" />
                  </div>
                  <span className={cn("text-[10px] font-bold mt-1 transition-colors relative top-1", 
                     location === "/chat" ? "text-primary" : "text-slate-500")}>
                    AI
                  </span>
                </a>
              </Link>

              <Link href="/exhibition">
                <a className={cn("flex flex-col items-center gap-1 w-14 py-1 justify-end transition-colors z-10", 
                  location === "/exhibition" ? "text-primary" : "text-slate-400 hover:text-slate-600")}>
                  <Gift size={22} strokeWidth={location === "/exhibition" ? 2.5 : 2} />
                  <span className="text-[10px] font-medium mt-0.5">기획전</span>
                </a>
              </Link>

              <Link href="/profile">
                <a className={cn("flex flex-col items-center gap-1 w-14 py-1 justify-end transition-colors z-10", 
                  location === "/profile" ? "text-primary" : "text-slate-400 hover:text-slate-600")}>
                  <User size={22} strokeWidth={location === "/profile" ? 2.5 : 2} />
                  <span className="text-[10px] font-medium mt-0.5">마이</span>
                </a>
              </Link>
              
            </div>
        </div>
      </nav>
    </div>
  );
}
