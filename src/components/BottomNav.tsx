import { Home, Menu, Search, ShoppingCart, User } from "lucide-react";
import { PageKey } from "@/types";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
  cartCount: number;
}

export function BottomNav({ currentPage, onNavigate, cartCount }: BottomNavProps) {
  const navItems = [
    { label: "Home", key: "home" as PageKey, icon: Home },
    { label: "Categories", key: "categories" as PageKey, icon: Menu },
    { label: "Search", key: "search" as PageKey, icon: Search },
    { label: "Cart", key: "cart" as PageKey, icon: ShoppingCart },
    { label: "Account", key: "account" as PageKey, icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex justify-between items-center z-[100] shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.key;
        return (
          <button
            key={item.key}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onNavigate(item.key);
            }}
            className={cn(
              "flex flex-col items-center gap-1 transition-all relative active:scale-95",
              isActive ? "text-primary" : "text-gray-400"
            )}
          >
            <Icon className={cn("w-6 h-6", isActive && "scale-110")} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
            {item.key === "cart" && cartCount > 0 && (
              <span className="absolute -top-1 right-0 bg-primary text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
