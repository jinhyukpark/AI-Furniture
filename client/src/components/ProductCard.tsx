import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useLocation } from "wouter";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
  };
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const [, setLocation] = useLocation();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setLocation(`/product/${product.id}`);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-card rounded-lg overflow-hidden shadow-sm border border-border/50 cursor-pointer"
      onClick={handleClick}
    >
      <div className="aspect-square relative overflow-hidden bg-muted">
        <img 
          src={product.image} 
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <button className="absolute bottom-3 right-3 h-8 w-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm text-primary hover:bg-primary hover:text-white transition-colors z-10">
          <Plus size={18} />
        </button>
      </div>
      <div className="p-4">
        <div className="text-xs text-muted-foreground font-medium mb-1">{product.category}</div>
        <h3 className="font-normal text-foreground truncate">{product.name}</h3>
        <div className="mt-2 font-bold text-lg">
          {product.price.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">KRW</span>
        </div>
      </div>
    </motion.div>
  );
}
