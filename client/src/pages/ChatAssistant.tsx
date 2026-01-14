import { useState, useRef, useEffect } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Send, Sparkles, Image as ImageIcon, FileText, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { spaceConcept } from "@/lib/data";
import { useLocation } from "wouter";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  type?: "text" | "suggestion" | "quotation" | "visual";
  data?: any;
};

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "안녕하세요! 일룸 AI 디자인 어시스턴트입니다. 가구 추천, 공간 시각화, 견적서 발급을 도와드릴 수 있어요. 무엇을 도와드릴까요?",
      type: "text"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
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

      const lowerInput = userMsg.content.toLowerCase();

      // Simple keyword matching for demo purposes
      if (lowerInput.includes("아이") || lowerInput.includes("아들") || lowerInput.includes("우주") || lowerInput.includes("방")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "정말 멋진 아이디어네요! 우주 테마는 아이들의 창의력을 키우는데 아주 좋습니다. '팅클' 시리즈로 구성해볼 수 있는데, 시각화된 이미지를 보시겠어요?",
          type: "suggestion",
          data: {
            action: "visualize_space",
            label: "우주 테마 룸 만들기"
          }
        };
      } else if (lowerInput.includes("견적") || lowerInput.includes("가격") || lowerInput.includes("얼마")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "요청하신 우주 탐험가 룸 컨셉에 대한 예상 견적서입니다.",
          type: "quotation",
          data: spaceConcept
        };
      } else {
        aiResponse.content = "그렇군요. 선호하시는 스타일이 있으신가요? 예를 들어, 모던, 미니멀, 혹은 아이들을 위한 장난기 넘치는 스타일 등 구체적으로 말씀해주시면 좋아요.";
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleAction = (action: string) => {
    if (action === "visualize_space") {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "assistant",
        content: "컨셉 룸을 생성하고 있습니다... 잠시만 기다려주세요.",
        type: "text"
      }]);
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "고객님을 위해 디자인한 '우주 탐험가' 컨셉 룸입니다.",
          type: "visual",
          data: spaceConcept
        }]);
      }, 2000);
    }
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-[calc(100vh-80px)]">
        {/* Header */}
        <div className="px-4 py-3 border-b bg-white flex items-center gap-3 shadow-sm">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
            <Sparkles size={16} />
          </div>
          <div>
            <h1 className="font-bold text-sm">디자인 어시스턴트</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> 온라인
            </p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] rounded-2xl p-3 text-sm shadow-sm ${
                msg.role === "user" 
                  ? "bg-primary text-white rounded-br-none" 
                  : "bg-white text-foreground rounded-bl-none border"
              }`}>
                {msg.content}

                {/* Suggestion Chip */}
                {msg.type === "suggestion" && (
                  <button 
                    onClick={() => handleAction(msg.data.action)}
                    className="mt-3 w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-xl p-2 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Sparkles size={14} />
                    <span className="font-medium">{msg.data.label}</span>
                  </button>
                )}

                {/* Quotation Card */}
                {msg.type === "quotation" && (
                  <div className="mt-3 bg-slate-50 rounded-xl p-3 border">
                    <div className="flex items-center gap-2 mb-2 font-bold text-foreground">
                      <FileText size={14} />
                      예상 견적서
                    </div>
                    <div className="space-y-1 mb-3">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>상품 (2개)</span>
                        <span>{(msg.data.totalPrice - 150000).toLocaleString()}원</span>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>스타일링 비용</span>
                        <span>150,000원</span>
                      </div>
                      <div className="border-t pt-1 mt-1 flex justify-between font-bold text-primary">
                        <span>총 합계</span>
                        <span>{msg.data.totalPrice.toLocaleString()}원</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full text-xs h-8">상세보기</Button>
                  </div>
                )}

                {/* Visual Card */}
                {msg.type === "visual" && (
                  <div className="mt-3 overflow-hidden rounded-xl border bg-slate-50 group cursor-pointer" onClick={() => setLocation("/room/space")}>
                    <div className="aspect-video relative">
                       <img src={msg.data.image} alt="Room" className="object-cover w-full h-full" />
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <div className="bg-white/90 backdrop-blur rounded-full px-3 py-1 text-xs font-bold flex items-center gap-1 shadow-lg">
                            <ImageIcon size={12} /> 룸 구경하기
                          </div>
                       </div>
                    </div>
                    <div className="p-2">
                      <div className="font-bold text-xs">{msg.data.title}</div>
                      <div className="text-[10px] text-muted-foreground line-clamp-1">{msg.data.description}</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-bl-none p-3 shadow-sm border">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="shrink-0 rounded-full h-10 w-10">
              <Plus size={20} className="text-muted-foreground" />
            </Button>
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
              className="flex-1 flex gap-2"
            >
              <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="어떤 방을 꾸미고 싶으신가요?" 
                className="rounded-full bg-slate-100 border-transparent focus:bg-white transition-colors"
              />
              <Button type="submit" size="icon" className="rounded-full shrink-0 h-10 w-10">
                <Send size={18} />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
