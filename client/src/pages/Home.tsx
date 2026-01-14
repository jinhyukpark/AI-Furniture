import { useState, useEffect, useCallback } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/data";
import { Search, Bell, Moon, ArrowRight, Sparkles, X, MessageCircle, Send, ChevronLeft, ChevronRight, Gift, Heart, User, Star } from "lucide-react";
import bedroomImage from '@assets/stock_images/cozy_bedroom_with_be_4819121e.jpg';
import livingImage from '@assets/stock_images/modern_living_room_w_32e2ad7a.jpg';
import diningImage from '@assets/stock_images/white_dining_room_wi_e1e8f705.jpg';
import shelfImage from '@assets/stock_images/modern_black_metal_d_a0872bda.jpg';
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from 'embla-carousel-react';

export default function Home() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPromoBanner, setShowPromoBanner] = useState(true);
  
  // Embla Carousel for iloom Life
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect(); // Set initial state
  }, [emblaApi, onSelect]);

  const heroImages = products.slice(0, 4).map(p => p.image);
  
  const iloomLifeItems = [
    {
      id: 1,
      image: bedroomImage,
      user: "민주님의 일룸생활",
      desc: "나에게 침실은 언제부턴가 그 기능을 잃어가고 있었다. 아늑하고 간결한 침실을 원했지만 커다란 테이블...",
      product: { name: "시그니처 미디엄...", price: "2,990,000원", img: products[0].image, likes: 9 }
    },
    {
      id: 2,
      image: livingImage,
      user: "여진님의 일룸생활",
      desc: "일룸 밴쿠버 소파를 사용한지 한달이 넘어간다. 소파 사이즈나 색감, 활용도에 대한 문의가 있어서...",
      product: { name: "4인 아쿠아발수...", price: "1,990,000원", img: products[5].image, likes: 85 }
    },
    {
      id: 3,
      image: diningImage,
      user: "서현님의 일룸생활",
      desc: "일룸 업모션 테이블을 들이고 싶었고 들이게 된 가장 큰 이유는 바로 '높은 활용도' 때문이에요. 높이 조절...",
      product: { name: "타원 테이블 160...", price: "1,390,000원", img: products[1].image, likes: 70 }
    },
    {
      id: 4,
      image: shelfImage,
      user: "숙경님의 일룸생활",
      desc: "설치 후 첫 느낌은 깔끔하고 심플한 디자인과 블랙컬러의 조화가 그려봤던 느낌보다 훨씬 인테리어와...",
      product: { name: "2단 디스플레이...", price: "319,000원", img: products[4].image, likes: 24 }
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const HOTSPOTS = [
    {
      id: 1,
      top: "22%",
      left: "35%",
      label: "모니터 조명",
      questions: ["장시간 앉아도 편한가요?", "헤드레스트 조절 되나요?", "바퀴 소음은 없나요?"]
    },
    {
      id: 2,
      top: "55%",
      left: "50%",
      label: "모션 데스크",
      questions: ["높이 조절 범위는?", "상판 사이즈 변경 가능한가요?", "배송 얼마나 걸려요?"]
    },
    {
      id: 3,
      top: "70%",
      left: "25%",
      label: "메쉬 의자",
      questions: ["허리 지지대 있나요?", "색상 옵션 보여줘", "AS 기간은 어떻게 되나요?"]
    }
  ];

  return (
    <MobileLayout>
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-40 px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-primary">iloom<span className="text-foreground text-lg font-normal">.ai</span></h1>
          <div className="flex gap-3 text-muted-foreground">
            <Search size={22} />
            <Bell size={22} />
          </div>
        </div>
      </header>

      {/* Hero Image Carousel */}
      <div className="relative aspect-[4/5] w-full bg-slate-100 overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentSlide}
            src={heroImages[currentSlide]} 
            alt="Main Hero" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover absolute inset-0"
          />
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        
        {/* Carousel Controls Overlay */}
        <div className="absolute bottom-3 left-0 right-0 z-20 flex items-center justify-center px-4">
          <div className="flex gap-1.5 items-center">
            {heroImages.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full shadow-sm ${
                  currentSlide === idx 
                    ? "w-6 h-1 bg-white" 
                    : "w-1 h-1 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-14 right-6 z-10 pointer-events-none text-right">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-white text-2xl font-serif italic leading-relaxed drop-shadow-md">
              머무는 것만으로도<br />
              영감이 되는<br />
              <span className="font-bold">공간의 미학.</span>
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 pt-6">
        {/* AI Curator Promo Banner */}
        <AnimatePresence>
          {showPromoBanner && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 32 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative group/banner">
                <button 
                  onClick={() => window.location.href='/chat'}
                  className="w-full bg-gradient-to-br from-[#E33B4E] to-[#FF6B6B] rounded-xl flex items-center justify-between px-6 py-5 shadow-[0_8px_30px_rgb(227,59,78,0.15)] hover:shadow-[0_8px_30px_rgb(227,59,78,0.25)] transition-all duration-300 relative overflow-hidden h-28 text-white border border-white/10"
                >
                  {/* Subtle noise texture overlay */}
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
                  
                  <div className="relative z-10 text-left flex flex-col justify-center h-full">
                     <div className="text-xl leading-snug mb-2 font-serif tracking-tight">
                       <span className="font-bold border-b border-white/30 pb-0.5">박진혁</span>님을 위한<br/>
                       프리미엄 큐레이션
                     </div>
                     <div className="text-xs font-light opacity-90 flex items-center gap-1 mt-1 tracking-wide">
                       취향이 깃든 공간을 발견해보세요 <ChevronRight size={12} />
                     </div>
                  </div>
                  
                  <div className="relative z-10 opacity-90 transform group-hover/banner:scale-110 transition-transform duration-500">
                    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
                      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
                      <path d="M18 2L19 5L22 6L19 7L18 10L17 7L14 6L17 5L18 2Z" fill="currentColor" fillOpacity="0.7" transform="scale(0.7) translate(8, 0)" />
                      <path d="M6 4L7 7L10 8L7 9L6 12L5 9L2 8L5 7L6 4Z" fill="currentColor" fillOpacity="0.7" transform="scale(0.7) translate(-3, 3)" />
                    </svg>
                  </div>
                  
                  {/* Decorative abstract shapes */}
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                  <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-rose-900/10 rounded-full blur-3xl" />
                </button>
                
                {/* Close Button - Appears on hover */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPromoBanner(false);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/10 hover:bg-black/20 text-white/80 hover:text-white transition-all duration-200 opacity-0 group-hover/banner:opacity-100 z-20 backdrop-blur-sm"
                  aria-label="닫기"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Featured Products */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-medium text-foreground">오늘 이런 상품은 어떠세요?</h2>
            <button className="text-xs text-primary font-medium">전체보기</button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        
        {/* Editorial Section - Redesigned */}
        <div className="mt-12 px-2">
          <div className="flex items-center justify-between mb-6">
             <div>
                <div className="flex items-center gap-1.5 mb-1">
                   <Gift size={14} className="text-primary" />
                   <span className="text-xs font-bold text-primary uppercase tracking-wider">기획전</span>
                </div>
                <h3 className="font-serif text-xl text-slate-800">합리적인 취향의 발견</h3>
             </div>
          </div>
          
          <div className="grid gap-4">
            {/* Card 1 */}
            <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden h-48 flex flex-col justify-center">
               {/* Background Image with Gradient Fade */}
               <div className="absolute top-0 right-0 w-2/3 h-full">
                  <img src={products[2].image} alt="Kids Room" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />
               </div>
               
               <div className="relative z-10">
                 <span className="inline-block px-2 py-1 bg-slate-100/80 backdrop-blur-sm rounded text-[10px] font-medium text-slate-600 mb-3">KIDS ROOM</span>
                 <h4 className="text-lg font-medium text-slate-900 mb-1 leading-snug">
                   내 아이 방 <br/>
                   <span className="font-serif italic font-bold text-2xl">34만원</span>에 완성하기
                 </h4>
                 <div className="h-px w-8 bg-slate-300 my-4 group-hover:w-12 transition-all" />
                 <p className="text-xs text-slate-500 leading-relaxed max-w-[80%]">
                   아이의 꿈을 키워주는 공간, <br/>예산 부담 없이 완벽하게.
                 </p>
               </div>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-900 rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden text-white h-48 flex flex-col justify-center">
               {/* Background Image with Gradient Fade */}
               <div className="absolute top-0 right-0 w-2/3 h-full">
                  <img src={products[0].image} alt="Home Office" className="w-full h-full object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />
               </div>
               
               <div className="relative z-10">
                 <span className="inline-block px-2 py-1 bg-white/10 backdrop-blur-sm rounded text-[10px] font-medium text-slate-200 mb-3">HOME OFFICE</span>
                 <h4 className="text-lg font-medium text-white mb-1 leading-snug">
                   서재 인테리어 <br/>
                   <span className="font-serif italic font-bold text-2xl">50%</span> 혜택 가이드
                 </h4>
                 <div className="h-px w-8 bg-white/30 my-4 group-hover:w-12 transition-all" />
                 <p className="text-xs text-slate-300 leading-relaxed max-w-[80%]">
                   놓치면 후회하는 기간 한정 <br/>스마트 쇼핑 전략.
                 </p>
               </div>
            </div>
          </div>
        </div>
        
        {/* iloom Life Section */}
        <div className="mt-12 mb-8">
          <div className="flex items-center justify-between mb-6 px-2">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <User size={14} className="text-primary" />
                <span className="text-xs font-bold text-primary tracking-wider">일룸 라이프</span>
              </div>
              <h3 className="font-serif text-xl text-slate-800">모두의 일룸생활</h3>
            </div>
            <button className="text-xs text-slate-400 font-medium">더보기</button>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 px-4 mb-4">
              {iloomLifeItems.map((item) => (
                <div key={item.id} className="min-w-[280px] flex-[0_0_85%] bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden group">
                  {/* Main Image */}
                  <div className="aspect-square relative overflow-hidden">
                    <img src={item.image} alt={item.user} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full">
                       <div className="w-3 h-3 border border-slate-400 rounded-sm relative shadow-sm" style={{ boxShadow: "1px 1px 0px rgba(0,0,0,0.1)" }} />
                    </div>
                  </div>
                  
                  <div className="p-4">
                    {/* Rating & User */}
                    <div className="flex items-center gap-0.5 mb-2">
                      {[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-[#E33B4E] fill-[#E33B4E]" />)}
                    </div>
                    <h4 className="font-bold text-sm mb-1">{item.user}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4 min-h-[2.5em]">
                      {item.desc}
                    </p>
                    
                    {/* Product Link */}
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                      <img src={item.product.img} alt={item.product.name} className="w-10 h-10 rounded-md object-cover bg-slate-50" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-slate-500 mb-0.5 truncate">{item.product.name}</div>
                        <div className="text-xs font-bold">{item.product.price}</div>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <Heart size={10} /> {item.product.likes}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Dots */}
          <div className="flex justify-center gap-1.5 pb-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex ? "bg-[#E33B4E] w-4" : "bg-slate-200 w-1.5"
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
