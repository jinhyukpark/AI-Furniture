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
        {/* Shadow gradient for the navbar - HIDDEN on /chat */}
        {location !== "/chat" && (
          <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-white via-white to-transparent pointer-events-none" />
        )}
        
        {/* Actual Nav Container - HIDDEN on /chat */}
        {location !== "/chat" && (
          <div className="relative bg-white border-t pb-safe pointer-events-auto h-[70px] flex items-end justify-around pb-2 px-2">
            
            <Link href="/">
              <div className={cn("flex flex-col items-center gap-1 w-14 py-2 justify-end transition-colors cursor-pointer", 
                location === "/" ? "text-primary" : "text-slate-400 hover:text-slate-600")}>
                <Home size={22} strokeWidth={location === "/" ? 2.5 : 2} />
                <span className="text-[10px] font-medium mt-0.5">홈</span>
              </div>
            </Link>

            <Link href="/market">
              <div className={cn("flex flex-col items-center gap-1 w-14 py-2 justify-end transition-colors cursor-pointer", 
                location === "/market" ? "text-primary" : "text-slate-400 hover:text-slate-600")}>
                <Store size={22} strokeWidth={location === "/market" ? 2.5 : 2} />
                <span className="text-[10px] font-medium mt-0.5">마켓</span>
              </div>
            </Link>

            {/* 3D AI Button - Floats above */}
            <Link href="/chat">
              <div className="relative -top-2 z-50 flex flex-col items-center group cursor-pointer">
                <div className={cn(
                  "w-14 h-14 rounded-full bg-gradient-to-br from-primary to-rose-600 flex items-center justify-center text-white shadow-lg shadow-primary/40 transition-transform duration-300 group-active:scale-95 border-4 border-white",
                  location === "/chat" ? "ring-2 ring-primary/20 scale-110" : ""
                )}>
                  <Sparkles size={24} strokeWidth={2.5} className="animate-pulse" />
                </div>
                <span className={cn("text-[10px] font-bold mt-1 transition-colors", 
                   location === "/chat" ? "text-primary" : "text-slate-500")}>
                  AI
                </span>
              </div>
            </Link>

            <Link href="/exhibition">
              <div className={cn("flex flex-col items-center gap-1 w-14 py-2 justify-end transition-colors cursor-pointer", 
                location === "/exhibition" ? "text-primary" : "text-slate-400 hover:text-slate-600")}>
                <Gift size={22} strokeWidth={location === "/exhibition" ? 2.5 : 2} />
                <span className="text-[10px] font-medium mt-0.5">기획전</span>
              </div>
            </Link>

            <Link href="/profile">
              <div className={cn("flex flex-col items-center gap-1 w-14 py-2 justify-end transition-colors cursor-pointer", 
                location === "/profile" ? "text-primary" : "text-slate-400 hover:text-slate-600")}>
                <User size={22} strokeWidth={location === "/profile" ? 2.5 : 2} />
                <span className="text-[10px] font-medium mt-0.5">마이</span>
              </div>
            </Link>
            
          </div>
        )}
      </nav>
    </div>
  );
}
