import { Home, Menu, Search, ShoppingCart, User } from "lucide-react";
import { PageKey } from "@/types";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface BottomNavProps {
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
  cartCount: number;
}

export function BottomNav({ currentPage, onNavigate, cartCount }: BottomNavProps) {
  const navItems = [
    { label: "Home", page: "home" as PageKey, icon: Home },
    { label: "Categories", page: "categories" as PageKey, icon: Menu },
    { label: "Search", page: "search" as PageKey, icon: Search },
    { label: "Cart", page: "cart" as PageKey, icon: ShoppingCart },
    { label: "Account", page: "account" as PageKey, icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex justify-between items-center z-[100] shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.page;
        return (
          <button
            key={item.label}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onNavigate(item.page);
            }}
            className={cn(
              "flex flex-col items-center gap-1 transition-all relative",
              isActive ? "text-primary" : "text-gray-400"
            )}
          >
            <motion.div
              animate={isActive ? { scale: 1.2, y: -2 } : { scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Icon className="w-6 h-6" />
            </motion.div>
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-tighter transition-all",
              isActive ? "opacity-100" : "opacity-70"
            )}>
              {item.label}
            </span>
            {item.page === "cart" && cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 right-0 bg-primary text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white"
              >
                {cartCount}
              </motion.span>
            )}
            {isActive && (
              <motion.div 
                layoutId="activeTab"
                className="absolute -bottom-3 w-1 h-1 bg-primary rounded-full"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
