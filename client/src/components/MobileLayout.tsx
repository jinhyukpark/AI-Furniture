import { Link, useLocation } from "wouter";
import { Home, MessageSquare, User, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20 font-sans">
      <main className="max-w-md mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-50 max-w-md mx-auto">
        <div className="flex justify-around items-center h-16">
          <Link href="/">
            <a className={cn("flex flex-col items-center gap-1 w-full h-full justify-center text-xs font-medium transition-colors", 
              location === "/" ? "text-primary" : "text-muted-foreground hover:text-primary/70")}>
              <Home size={24} strokeWidth={location === "/" ? 2.5 : 2} />
              <span>홈</span>
            </a>
          </Link>
          <Link href="/chat">
            <a className={cn("flex flex-col items-center gap-1 w-full h-full justify-center text-xs font-medium transition-colors", 
              location === "/chat" ? "text-primary" : "text-muted-foreground hover:text-primary/70")}>
              <div className="relative">
                <MessageSquare size={24} strokeWidth={location === "/chat" ? 2.5 : 2} />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
              </div>
              <span>AI 채팅</span>
            </a>
          </Link>
          <Link href="/cart">
            <a className={cn("flex flex-col items-center gap-1 w-full h-full justify-center text-xs font-medium transition-colors", 
              location === "/cart" ? "text-primary" : "text-muted-foreground hover:text-primary/70")}>
              <ShoppingCart size={24} strokeWidth={location === "/cart" ? 2.5 : 2} />
              <span>장바구니</span>
            </a>
          </Link>
          <Link href="/profile">
            <a className={cn("flex flex-col items-center gap-1 w-full h-full justify-center text-xs font-medium transition-colors", 
              location === "/profile" ? "text-primary" : "text-muted-foreground hover:text-primary/70")}>
              <User size={24} strokeWidth={location === "/profile" ? 2.5 : 2} />
              <span>마이</span>
            </a>
          </Link>
        </div>
      </nav>
    </div>
  );
}
