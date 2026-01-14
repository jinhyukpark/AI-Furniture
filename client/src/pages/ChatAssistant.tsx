import { useState, useRef, useEffect } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Send, Sparkles, Image as ImageIcon, FileText, Plus, X, Bookmark, ArrowRight, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { spaceConcept, products } from "@/lib/data";
import { useLocation } from "wouter";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  type?: "text" | "suggestion" | "quotation" | "visual";
  data?: any;
};

// Mock picked items
const pickedItems = products.slice(0, 4);

// Suggested questions based on picked items
const suggestedQuestions = [
  "이 제품들로 방을 꾸미면 어떤 느낌일까요?",
  "총 견적이 얼마나 나올까요?",
  "이 가구들과 어울리는 벽지 색상은?",
  "가구 배치는 어떻게 하면 좋을까요?"
];

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "안녕하세요! 일룸 AI 디자인 어시스턴트입니다. 픽(Pick)하신 가구들을 바탕으로 상담을 도와드릴까요?",
      type: "text"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();
  const [showPickedItems, setShowPickedItems] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI Logic
    setTimeout(() => {
      let aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "네, 알겠습니다.",
        type: "text"
      };

      const lowerInput = text.toLowerCase();

      // Simple keyword matching for demo purposes
      if (lowerInput.includes("느낌") || lowerInput.includes("시각화") || lowerInput.includes("보여줘")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "네! 선택하신 가구들로 구성된 모던 홈 오피스 공간을 시각화해 보았습니다. 따뜻한 조명과 화이트 톤의 가구가 잘 어우러지네요.",
          type: "visual",
          data: spaceConcept
        };
      } else if (lowerInput.includes("견적") || lowerInput.includes("가격") || lowerInput.includes("얼마")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "선택하신 4개 품목에 대한 예상 견적서입니다.",
          type: "quotation",
          data: spaceConcept
        };
      } else if (lowerInput.includes("벽지") || lowerInput.includes("색상")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "화이트 톤 가구에는 웜그레이나 베이지 계열의 벽지를 추천드려요. 공간이 더 넓고 아늑해 보일 거예요.",
          type: "text"
        };
      } else if (lowerInput.includes("배치")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "창문을 등지기보다는 측면에 책상을 배치하면 눈의 피로를 줄일 수 있어요. 침대는 문에서 대각선 방향이 가장 안정적입니다.",
          type: "text"
        };
      } else {
        aiResponse.content = "좋은 질문이네요! 더 구체적으로 말씀해주시면 제가 3D 시뮬레이션이나 상세 견적을 도와드릴 수 있어요.";
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-screen bg-slate-50">
        {/* Header */}
        <div className="px-4 py-3 bg-white border-b flex items-center gap-3 shadow-sm z-10">
          <button onClick={() => setLocation("/")} className="text-slate-500 hover:text-slate-800">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-sm flex items-center gap-2">
              <Sparkles size={14} className="text-primary fill-current" />
              AI 디자인 어시스턴트
            </h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Picked Items Bar (Collapsible) */}
        <AnimatePresence>
          {showPickedItems && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white border-b overflow-hidden shadow-sm z-10"
            >
              <div className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                    <Bookmark size={12} className="text-primary fill-current" />
                    내가 픽한 상품 ({pickedItems.length})
                  </span>
                  <button onClick={() => setShowPickedItems(false)} className="text-slate-400">
                    <X size={14} />
                  </button>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {pickedItems.map((item) => (
                    <div key={item.id} className="relative shrink-0 w-16 group">
                      <div className="aspect-square rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-[10px] mt-1 truncate text-center text-slate-600">{item.name}</div>
                      <button className="absolute -top-1 -right-1 w-4 h-4 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <X size={8} />
                      </button>
                    </div>
                  ))}
                  <button className="shrink-0 w-16 aspect-square rounded-lg border border-dashed border-slate-300 flex flex-col items-center justify-center gap-1 text-slate-400 hover:bg-slate-50 transition-colors">
                    <Plus size={16} />
                    <span className="text-[10px]">추가</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show/Hide Toggle for Picked Items */}
        {!showPickedItems && (
          <button 
            onClick={() => setShowPickedItems(true)}
            className="absolute top-[60px] left-1/2 -translate-x-1/2 bg-white border shadow-sm rounded-b-lg px-3 py-1 text-[10px] text-slate-500 z-10 flex items-center gap-1"
          >
            <Bookmark size={10} /> 픽한 상품 보기
          </button>
        )}

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${
                msg.role === "user" 
                  ? "bg-primary text-white rounded-br-sm" 
                  : "bg-white text-slate-800 rounded-bl-sm border border-slate-100"
              }`}>
                {msg.content}

                {/* Suggestion Chips in Chat */}
                {msg.type === "suggestion" && (
                  <button 
                    className="mt-3 w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-xl p-2 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Sparkles size={14} />
                    <span className="font-medium">{msg.data.label}</span>
                  </button>
                )}

                {/* Quotation Card */}
                {msg.type === "quotation" && (
                  <div className="mt-3 bg-slate-50 rounded-xl p-3 border border-slate-200">
                    <div className="flex items-center gap-2 mb-3 font-bold text-slate-800 border-b border-slate-200 pb-2">
                      <FileText size={14} className="text-primary" />
                      예상 견적서
                    </div>
                    <div className="space-y-2 mb-3">
                      {products.slice(0, 3).map((p) => (
                        <div key={p.id} className="flex justify-between text-xs text-slate-600">
                          <span className="truncate max-w-[120px]">{p.name}</span>
                          <span>{p.price.toLocaleString()}원</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-xs text-slate-500 pt-1">
                        <span>배송/설치비</span>
                        <span>무료</span>
                      </div>
                      <div className="border-t border-slate-200 pt-2 mt-1 flex justify-between font-bold text-primary text-sm">
                        <span>총 합계</span>
                        <span>{(products.slice(0, 3).reduce((acc, p) => acc + p.price, 0)).toLocaleString()}원</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full text-xs h-9 rounded-lg font-bold" onClick={() => setLocation("/market")}>
                      장바구니 담기
                    </Button>
                  </div>
                )}

                {/* Visual Card */}
                {msg.type === "visual" && (
                  <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 group cursor-pointer" onClick={() => setLocation("/room/1")}>
                    <div className="aspect-video relative">
                       <img src={msg.data.image} alt="Room" className="object-cover w-full h-full" />
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <div className="bg-white/90 backdrop-blur-md rounded-full px-3 py-1.5 text-xs font-bold flex items-center gap-1.5 shadow-lg text-primary">
                            <ImageIcon size={12} /> 3D 룸 구경하기 <ArrowRight size={10} />
                          </div>
                       </div>
                    </div>
                    <div className="p-3 bg-white">
                      <div className="font-bold text-xs text-slate-800 mb-1">{msg.data.title}</div>
                      <div className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">{msg.data.description}</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-bl-sm p-3 shadow-sm border border-slate-100">
                <div className="flex gap-1.5 px-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions (Horizontal Scroll) */}
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="shrink-0 bg-white border border-slate-200 rounded-full px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 hover:border-primary/30 hover:text-primary transition-colors whitespace-nowrap shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t safe-area-pb">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
            className="flex gap-2 items-center"
          >
            <Button variant="outline" size="icon" className="shrink-0 rounded-full h-10 w-10 border-slate-200">
              <Plus size={20} className="text-slate-400" />
            </Button>
            <div className="flex-1 relative">
              <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="궁금한 점을 물어보세요..." 
                className="w-full rounded-full bg-slate-100 border-transparent focus:bg-white focus:border-primary/20 pr-10 transition-all h-10"
              />
            </div>
            <Button 
              type="submit" 
              size="icon" 
              className={`rounded-full shrink-0 h-10 w-10 transition-all ${input.trim() ? "bg-primary hover:bg-primary/90" : "bg-slate-200 hover:bg-slate-300"}`}
              disabled={!input.trim()}
            >
              <Send size={18} className="text-white" />
            </Button>
          </form>
        </div>
      </div>
    </MobileLayout>
  );
}
