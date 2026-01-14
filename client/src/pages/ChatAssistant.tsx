import { useState, useRef, useEffect } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Send, Bot, Sparkles, Image as ImageIcon, FileText, ChevronRight, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
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
      content: "Hello! I'm your iloom design assistant. I can help you find furniture, visualize your room, or get a quotation. How can I help you today?",
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
        content: "I can definitely help with that.",
        type: "text"
      };

      const lowerInput = userMsg.content.toLowerCase();

      if (lowerInput.includes("kids") || lowerInput.includes("boy") || lowerInput.includes("space")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "That sounds exciting! A space-themed room is great for fostering creativity. I can create a layout using our 'Tinkle' series. Would you like to see a visualization?",
          type: "suggestion",
          data: {
            action: "visualize_space",
            label: "Create Space Room Concept"
          }
        };
      } else if (lowerInput.includes("quote") || lowerInput.includes("price") || lowerInput.includes("estimate")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I've prepared a quotation for the Space Explorer's Room concept based on your preferences.",
          type: "quotation",
          data: spaceConcept
        };
      } else {
        aiResponse.content = "I see. Could you tell me more about the style you prefer? For example: Modern, Minimalist, or maybe something playful for kids?";
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
        content: "Generating your concept room... This might take a moment.",
        type: "text"
      }]);
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Here is the 'Space Explorer' concept room I designed for you.",
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
            <h1 className="font-bold text-sm">Design Assistant</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
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
                      Estimate
                    </div>
                    <div className="space-y-1 mb-3">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Items (2)</span>
                        <span>{(msg.data.totalPrice - 150000).toLocaleString()} KRW</span>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Styling</span>
                        <span>150,000 KRW</span>
                      </div>
                      <div className="border-t pt-1 mt-1 flex justify-between font-bold text-primary">
                        <span>Total</span>
                        <span>{msg.data.totalPrice.toLocaleString()} KRW</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full text-xs h-8">View Details</Button>
                  </div>
                )}

                {/* Visual Card */}
                {msg.type === "visual" && (
                  <div className="mt-3 overflow-hidden rounded-xl border bg-slate-50 group cursor-pointer" onClick={() => setLocation("/room/space")}>
                    <div className="aspect-video relative">
                       <img src={msg.data.image} alt="Room" className="object-cover w-full h-full" />
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <div className="bg-white/90 backdrop-blur rounded-full px-3 py-1 text-xs font-bold flex items-center gap-1 shadow-lg">
                            <ImageIcon size={12} /> View Room
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
                placeholder="Ask for a room design..." 
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
