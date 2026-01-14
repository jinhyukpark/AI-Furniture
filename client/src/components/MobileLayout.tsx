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
        
        {/* Navbar Container - Increased height to ensure nothing is cut off */}
        <div className="relative h-[80px] w-full mt-auto">
            
            {/* Background SVG Curve Construction - Single continuous shape approach */}
            <div className="absolute inset-0 flex items-end drop-shadow-[0_-5px_10px_rgba(0,0,0,0.03)]">
                {/* Left Side */}
                <div className="flex-1 h-[60px] bg-white rounded-tl-2xl border-t border-slate-100"></div>
                
                {/* Center Notch */}
                <div className="relative w-[120px] h-[60px] -mt-[1px] -mx-[0.5px]">
                     <svg width="120" height="60" viewBox="0 0 120 60" className="w-full h-full fill-white" preserveAspectRatio="none">
                         {/* 
                            Smoother Notch Curve:
                            Starts flat, gently curves down, flat at bottom, curves up.
                         */}
                         <path 
                           d="M0,0 
                              C20,0 30,0 35,5 
                              C45,15 40,40 60,40 
                              C80,40 75,15 85,5 
                              C90,0 100,0 120,0 
                              L120,60 L0,60 Z" 
                           fill="white" 
                         />
                         {/* Optional border stroke to match the rest if needed, but simple shadow is often cleaner */}
                     </svg>
                     {/* Masking lines to fix gaps */}
                     <div className="absolute -left-1 top-0 bottom-0 w-2 bg-white -z-10"></div>
                     <div className="absolute -right-1 top-0 bottom-0 w-2 bg-white -z-10"></div>
                </div>

                {/* Right Side */}
                <div className="flex-1 h-[60px] bg-white rounded-tr-2xl border-t border-slate-100"></div>
            </div>
            
            {/* Nav Items Container */}
            <div className="absolute inset-0 flex items-end justify-between px-6 pb-2 pointer-events-auto">
              
              {/* Group Left */}
              <div className="flex gap-8 mb-1">
                <Link href="/">
                  <a className={cn("flex flex-col items-center gap-1 w-12 py-1 justify-end transition-colors z-10", 
                    location === "/" ? "text-primary" : "text-slate-400 hover:text-slate-600")}>
                    <Home size={24} strokeWidth={location === "/" ? 2.5 : 2} />
                    <span className="text-[11px] font-medium">홈</span>
                  </a>
                </Link>

                <Link href="/market">
                  <a className={cn("flex flex-col items-center gap-1 w-12 py-1 justify-end transition-colors z-10", 
                    location === "/market" ? "text-primary" : "text-slate-400 hover:text-slate-600")}>
                    <Store size={24} strokeWidth={location === "/market" ? 2.5 : 2} />
                    <span className="text-[11px] font-medium">마켓</span>
                  </a>
                </Link>
              </div>

              {/* Center AI Button */}
              <div className="relative w-14 flex flex-col items-center justify-end z-20 mb-1 group">
                 <Link href="/chat">
                  <a className="flex flex-col items-center">
                      {/* Floating Button */}
                      <div className={cn(
                          "absolute -top-12 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-rose-600 flex items-center justify-center text-white shadow-lg shadow-primary/30 transition-transform duration-300 group-active:scale-95 border-[3px] border-white ring-1 ring-black/5",
                          location === "/chat" ? "scale-105 shadow-xl shadow-primary/40" : ""
                      )}>
                          <Sparkles size={26} strokeWidth={2.5} className="animate-pulse" />
                      </div>
                      
                      {/* Text Label */}
                      <span className={cn("text-[11px] font-bold mt-8 transition-colors", 
                          location === "/chat" ? "text-primary" : "text-slate-500")}>
                          AI
                      </span>
                  </a>
                 </Link>
              </div>

              {/* Group Right */}
              <div className="flex gap-8 mb-1">
                <Link href="/exhibition">
                  <a className={cn("flex flex-col items-center gap-1 w-12 py-1 justify-end transition-colors z-10", 
                    location === "/exhibition" ? "text-primary" : "text-slate-400 hover:text-slate-600")}>
                    <Gift size={24} strokeWidth={location === "/exhibition" ? 2.5 : 2} />
                    <span className="text-[11px] font-medium">기획전</span>
                  </a>
                </Link>

                <Link href="/profile">
                  <a className={cn("flex flex-col items-center gap-1 w-12 py-1 justify-end transition-colors z-10", 
                    location === "/profile" ? "text-primary" : "text-slate-400 hover:text-slate-600")}>
                    <User size={24} strokeWidth={location === "/profile" ? 2.5 : 2} />
                    <span className="text-[11px] font-medium">마이</span>
                  </a>
                </Link>
              </div>
              
            </div>
        </div>
      </nav>
    </div>
  );
}
