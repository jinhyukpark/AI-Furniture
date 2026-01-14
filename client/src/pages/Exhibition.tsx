import { MobileLayout } from "@/components/MobileLayout";
import { Gift, Search } from "lucide-react";

export default function Exhibition() {
  return (
    <MobileLayout>
      <div className="p-4 space-y-4">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">기획전</h1>
          <Search className="text-muted-foreground" />
        </header>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-[2/1] bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Gift size={48} className="mb-4 opacity-20" />
          <p>진행 중인 기획전이 준비 중입니다.</p>
        </div>
      </div>
    </MobileLayout>
  );
}
