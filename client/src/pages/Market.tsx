import { MobileLayout } from "@/components/MobileLayout";
import { Package, Search } from "lucide-react";

export default function Market() {
  return (
    <MobileLayout>
      <div className="p-4 space-y-4">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">마켓</h1>
          <Search className="text-muted-foreground" />
        </header>
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
