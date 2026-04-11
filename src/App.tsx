import { motion, AnimatePresence } from "motion/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroCarousel } from "@/components/HeroCarousel";
import { MegaMenu } from "@/components/MegaMenu";
import { ProductCard } from "@/components/ProductCard";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { BottomNav } from "@/components/BottomNav";
import { FilterSidebar } from "@/components/FilterSidebar";
import { PRODUCTS, CATEGORY_STRUCTURE } from "@/constants";
import { useState, useMemo, useEffect } from "react";
import { PageKey, Product } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Zap, TrendingUp, Heart, Star, ShoppingCart, X, Filter, ChevronRight, Search as SearchIcon, Trash2, User as UserIcon, Package, MapPin, CreditCard, Settings, Home, Bath, Sparkles, Dumbbell, Tv } from "lucide-react";

const IconMap: Record<string, any> = {
  Star, Home, Bath, Sparkles, Dumbbell, Tv, Heart
};

export default function App() {
  const [page, setPage] = useState<PageKey>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Load recently viewed and cart from localStorage
  useEffect(() => {
    const savedRecently = localStorage.getItem("recentlyViewed");
    if (savedRecently) {
      try {
        const ids = JSON.parse(savedRecently) as number[];
        const products = ids
          .map(id => PRODUCTS.find(p => p.id === id))
          .filter((p): p is Product => !!p);
        setRecentlyViewed(products);
      } catch (e) {
        console.error("Failed to parse recently viewed", e);
      }
    }

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const ids = JSON.parse(savedCart) as number[];
        const products = ids
          .map(id => PRODUCTS.find(p => p.id === id))
          .filter((p): p is Product => !!p);
        setCart(products);
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart.map(p => p.id)));
  }, [cart]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const addToRecentlyViewed = (p: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== p.id);
      const updated = [p, ...filtered].slice(0, 5);
      localStorage.setItem("recentlyViewed", JSON.stringify(updated.map(item => item.id)));
      return updated;
    });
  };

  const openProduct = (p: Product) => {
    setSelectedProduct(p);
    setPage("product");
    addToRecentlyViewed(p);
  };

  const openQuickView = (p: Product) => {
    setQuickViewProduct(p);
  };

  const addToCart = (p: Product) => {
    setCart([...cart, p]);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery && selectedCategories.length === 0 && minDiscount === 0) return PRODUCTS;
    
    return PRODUCTS.filter(p => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchesDiscount = (p.discount || 0) >= minDiscount;
      
      const searchTerms = searchQuery.toLowerCase().split(" ").filter(t => t.length > 0);
      const matchesSearch = searchTerms.length === 0 || searchTerms.every(term => 
        p.name.toLowerCase().includes(term) || 
        p.category.toLowerCase().includes(term) ||
        p.badge?.toLowerCase().includes(term)
      );
      
      return matchesCategory && matchesDiscount && matchesSearch;
    });
  }, [selectedCategories, minDiscount, searchQuery]);

  const flashSales = useMemo(() => PRODUCTS.filter(p => p.discount && p.discount >= 30), []);
  const trending = useMemo(() => PRODUCTS.slice(4, 8), []);
  const recommended = useMemo(() => PRODUCTS.slice(0, 8), []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header 
        currentPage={page}
        onNavigate={setPage} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        cartCount={cart.length}
      />

      <main className="flex-1 pb-20 md:pb-0 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={page + (page === 'home' ? searchQuery + selectedCategories.join(',') : '')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {page === "home" && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start mb-12">
              {/* Sidebar / MegaMenu */}
              <aside className="hidden lg:block">
                <div className="h-[450px]">
                  <MegaMenu onSelectCategory={(cat) => setSelectedCategories([cat])} />
                </div>
              </aside>

              <div className="flex flex-col">
                {selectedCategories.length === 0 && minDiscount === 0 && searchQuery === "" ? (
                  <HeroCarousel />
                ) : (
                  <div className="h-[450px] bg-slate-50 rounded-2xl p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
                    <div className="relative z-10">
                      <Badge className="bg-primary text-white mb-4 font-black">SEARCH RESULTS</Badge>
                      <h2 className="text-3xl md:text-5xl font-black text-secondary uppercase mb-4 leading-tight">
                        Finding your <br /> perfect match
                      </h2>
                      <p className="text-muted-foreground text-lg mb-8 max-w-md">
                        We've filtered our collection to show you exactly what you're looking for.
                      </p>
                      <Button 
                        variant="outline" 
                        className="border-2 border-primary text-primary font-bold px-8 hover:bg-primary hover:text-white transition-all"
                        onClick={() => {
                          setSelectedCategories([]);
                          setMinDiscount(0);
                          setSearchQuery("");
                        }}
                      >
                        CLEAR ALL FILTERS
                      </Button>
                    </div>
                    <div className="absolute right-0 bottom-0 opacity-5 text-[200px] translate-x-1/4 translate-y-1/4 select-none pointer-events-none">
                      🔍
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-12">
              {/* Filter Trigger & Stats */}
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <Sheet>
                  <SheetTrigger render={<Button variant="outline" size="sm" className="gap-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all" />}>
                    <Filter className="w-4 h-4" /> FILTERS
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] p-0">
                    <div className="p-6">
                      <h2 className="text-xl font-black text-secondary mb-6 uppercase">Filters</h2>
                      <FilterSidebar 
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        minDiscount={minDiscount}
                        setMinDiscount={setMinDiscount}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {filteredProducts.length} Products Found
                </span>
              </div>

              {/* Filtered Results or Sections */}
              {(selectedCategories.length > 0 || minDiscount > 0 || searchQuery !== "") ? (
                <section>
                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {filteredProducts.map((product, idx) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <ProductCard product={product} onPress={openProduct} onQuickView={openQuickView} />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-slate-50 rounded-2xl">
                      <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-secondary mb-2">No products found</h3>
                      <p className="text-muted-foreground">Try adjusting your filters or search query</p>
                    </div>
                  )}
                </section>
              ) : (
                  <>
                    {/* Categories Section */}
                    <section>
                      <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-secondary uppercase tracking-tight">Shop by Category</h2>
                        <Button variant="link" className="text-primary font-bold" onClick={() => setPage("categories")}>VIEW ALL</Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {CATEGORY_STRUCTURE.slice(0, 6).map((cat) => {
                          const Icon = IconMap[cat.icon] || Star;
                          return (
                            <div 
                              key={cat.name}
                              onClick={() => setSelectedCategories([cat.name])}
                              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary transition-all cursor-pointer text-center group"
                            >
                              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-light transition-colors">
                                <Icon className="w-6 h-6 text-primary" />
                              </div>
                              <span className="text-sm font-bold text-secondary group-hover:text-primary transition-colors">{cat.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </section>

                    {/* Flash Sales */}
                    <section>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary p-2 rounded-lg text-white">
                            <Zap className="w-5 h-5 fill-current" />
                          </div>
                          <h2 className="text-2xl font-black tracking-tight text-secondary uppercase">Flash Sales</h2>
                        </div>
                        <Button variant="link" className="text-primary font-bold">SEE ALL →</Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {flashSales.map(product => (
                          <ProductCard key={product.id} product={product} onPress={openProduct} onQuickView={openQuickView} />
                        ))}
                      </div>
                    </section>

                    {/* Banner */}
                    <div className="bg-primary-dark rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
                      <div className="relative z-10">
                        <Badge className="bg-accent text-secondary mb-4 font-black">LIMITED OFFER</Badge>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                          UP TO 50% OFF ON <br /> SMART HOME APPLIANCES
                        </h2>
                        <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold px-8">
                          SHOP NOW
                        </Button>
                      </div>
                      <div className="text-[180px] opacity-10 absolute -right-10 -bottom-10 select-none pointer-events-none">
                        🏠
                      </div>
                    </div>

                    {/* Trending */}
                    <section>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-600 p-2 rounded-lg text-white">
                            <TrendingUp className="w-5 h-5" />
                          </div>
                          <h2 className="text-2xl font-black tracking-tight text-secondary uppercase">Trending Now</h2>
                        </div>
                        <Button variant="link" className="text-primary font-bold">SEE ALL →</Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {trending.map(product => (
                          <ProductCard key={product.id} product={product} onPress={openProduct} onQuickView={openQuickView} />
                        ))}
                      </div>
                    </section>

                    {/* Recently Viewed Section */}
                    <RecentlyViewed 
                      products={recentlyViewed} 
                      onProductPress={openProduct} 
                      onQuickView={openQuickView} 
                    />
                  </>
                )}
            </div>
          </div>
        )}

        {page === "search" && (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-black text-secondary mb-4 uppercase tracking-tight">Search</h1>
              <motion.div layoutId="searchBar" className="relative">
                <Input 
                  autoFocus
                  placeholder="What are you looking for?" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-8 rounded-2xl border-2 border-primary/20 focus-visible:ring-primary focus-visible:border-primary text-lg shadow-sm"
                />
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </motion.div>
            </div>

            {searchQuery ? (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                    {filteredProducts.length} Results Found
                  </h2>
                  <Button 
                    variant="link" 
                    className="text-primary font-bold p-0 h-auto"
                    onClick={() => {
                      setPage("home");
                    }}
                  >
                    VIEW ON HOME PAGE →
                  </Button>
                </div>
                
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredProducts.slice(0, 12).map((product, idx) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <ProductCard product={product} onPress={openProduct} onQuickView={openQuickView} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-secondary mb-2">No matches found</h3>
                    <p className="text-muted-foreground">Try different keywords or browse categories</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-12">
                <div>
                  <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">Popular Categories</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {CATEGORY_STRUCTURE.slice(0, 4).map((cat, idx) => (
                      <motion.button 
                        key={cat.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => {
                          setSelectedCategories([cat.name]);
                          setPage("home");
                        }}
                        className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl hover:border-primary hover:shadow-md transition-all text-left group"
                      >
                        <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                          <Star className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-secondary text-sm">{cat.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">Trending Products</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {trending.map((product, idx) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                      >
                        <ProductCard product={product} onPress={openProduct} onQuickView={openQuickView} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {page === "categories" && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-black text-secondary mb-8 uppercase tracking-tight">All Categories</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {CATEGORY_STRUCTURE.map((cat) => {
                const Icon = IconMap[cat.icon] || Star;
                return (
                  <div 
                    key={cat.name} 
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    onClick={() => {
                      setSelectedCategories([cat.name]);
                      setPage("home");
                    }}
                  >
                    <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-black text-secondary mb-2">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground uppercase font-bold">{cat.subcategories.length} Subcategories</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {page === "cart" && (
          <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-black text-secondary mb-8 uppercase tracking-tight">Your Shopping Cart</h1>
            {cart.length > 0 ? (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 border-b last:border-0">
                      <img src={item.image} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="font-bold text-secondary line-clamp-1">{item.name}</h3>
                        <p className="text-primary font-black">{item.price}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="text-red-500" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="bg-secondary text-white p-6 rounded-2xl shadow-xl">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-bold opacity-80 uppercase">Total Amount</span>
                    <span className="text-3xl font-black">KSh {cart.reduce((acc, item) => acc + parseInt(item.price.replace(/\D/g, "")), 0).toLocaleString()}</span>
                  </div>
                  <Button className="w-full bg-white text-secondary hover:bg-gray-100 font-black py-8 text-lg rounded-xl">
                    PROCEED TO CHECKOUT
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-gray-200">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-black text-secondary mb-2 uppercase">Your cart is empty</h2>
                <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
                <Button className="bg-primary hover:bg-primary-dark text-white font-bold px-8" onClick={() => setPage("home")}>
                  START SHOPPING
                </Button>
              </div>
            )}
          </div>
        )}

        {page === "account" && (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-24 h-24 bg-primary-light rounded-full flex items-center justify-center text-primary">
                <UserIcon className="w-12 h-12" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-secondary leading-tight">John Doe</h1>
                <p className="text-muted-foreground font-medium">jkyunger@gmail.com</p>
                <Badge className="mt-2 bg-primary text-white font-bold">PREMIUM MEMBER</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Package, label: "My Orders", desc: "Track, return or buy things again" },
                { icon: MapPin, label: "Addresses", desc: "Edit addresses for orders" },
                { icon: CreditCard, label: "Payments", desc: "Manage payment methods" },
                { icon: Heart, label: "Wishlist", desc: "Your saved items" },
                { icon: Settings, label: "Settings", desc: "Account preferences" },
                { icon: X, label: "Logout", desc: "Sign out of your account", color: "text-red-500" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-4 group">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform", item.color || "bg-slate-50 text-secondary")}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary">{item.label}</h3>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 ml-auto text-gray-300" />
                </div>
              ))}
            </div>
          </div>
        )}

        {page === "product" && selectedProduct && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-8">
                <div className="space-y-4">
                  <div className="aspect-square rounded-xl bg-slate-50 overflow-hidden border border-gray-100">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="aspect-square rounded-lg bg-slate-50 border border-gray-100 cursor-pointer hover:border-primary transition-colors overflow-hidden">
                        <img src={selectedProduct.image} className="w-full h-full object-cover opacity-50 hover:opacity-100" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="mb-6">
                    <Badge className="bg-primary-light text-primary border-none mb-4 font-bold">
                      {selectedProduct.category}
                    </Badge>
                    <h1 className="text-3xl font-black text-secondary leading-tight mb-4">
                      {selectedProduct.name}
                    </h1>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-yellow-500">
                        {[1,2,3,4,5].map(i => (
                          <Star key={i} className={`w-4 h-4 ${i <= Math.floor(selectedProduct.rating || 0) ? "fill-current" : ""}`} />
                        ))}
                        <span className="text-sm font-bold text-secondary ml-1">{selectedProduct.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({selectedProduct.reviews} Verified Reviews)</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl mb-8">
                    <div className="flex items-baseline gap-4 mb-2">
                      <span className="text-4xl font-black text-primary">{selectedProduct.price}</span>
                      {selectedProduct.oldPrice && (
                        <span className="text-xl text-muted-foreground line-through">{selectedProduct.oldPrice}</span>
                      )}
                    </div>
                    {selectedProduct.discount && (
                      <Badge className="bg-green-500 text-white border-none font-bold">
                        SAVE {selectedProduct.discount}%
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                        <Zap className="w-4 h-4 fill-current" />
                      </div>
                      <p><span className="font-bold">Fast Delivery:</span> Get it by tomorrow in Nairobi</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <p><span className="font-bold">Free Returns:</span> Within 7 days of delivery</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-auto">
                    <Button 
                      size="lg" 
                      className="flex-1 bg-primary hover:bg-primary-dark text-white font-black py-8 text-lg shadow-xl shadow-primary/20"
                      onClick={() => addToCart(selectedProduct)}
                    >
                      ADD TO CART
                    </Button>
                    <Button size="lg" variant="outline" className="py-8 px-6 border-2">
                      <Heart className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products */}
            <section className="mt-16">
              <h2 className="text-2xl font-black text-secondary mb-8 uppercase tracking-tight">You May Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {PRODUCTS.slice(0, 4).map(p => (
                  <ProductCard key={p.id} product={p} onPress={openProduct} onQuickView={openQuickView} />
                ))}
              </div>
            </section>

            {/* Recently Viewed Section */}
            <RecentlyViewed 
              products={recentlyViewed.filter(p => p.id !== selectedProduct.id)} 
              onProductPress={openProduct} 
              onQuickView={openQuickView} 
            />
          </div>
        )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      
      <BottomNav currentPage={page} onNavigate={setPage} cartCount={cart.length} />

      {/* Quick View Modal */}
      <Dialog open={!!quickViewProduct} onOpenChange={(open) => !open && setQuickViewProduct(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-2xl border-none shadow-2xl">
          {quickViewProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-square bg-slate-50">
                <img 
                  src={quickViewProduct.image} 
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col">
                <div className="mb-6">
                  <Badge className="bg-primary-light text-primary border-none mb-2 font-bold">
                    {quickViewProduct.category}
                  </Badge>
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-black text-secondary leading-tight text-left">
                      {quickViewProduct.name}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-4 h-4 ${i <= Math.floor(quickViewProduct.rating || 0) ? "fill-current" : ""}`} />
                      ))}
                      <span className="text-sm font-bold text-secondary ml-1">{quickViewProduct.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({quickViewProduct.reviews} reviews)</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl mb-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-primary">{quickViewProduct.price}</span>
                    {quickViewProduct.oldPrice && (
                      <span className="text-lg text-muted-foreground line-through">{quickViewProduct.oldPrice}</span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-8 line-clamp-3">
                  Experience the best of {quickViewProduct.category} with this premium {quickViewProduct.name}. 
                  Designed for performance and style, it's the perfect addition to your collection.
                </p>

                <div className="flex gap-4 mt-auto">
                  <Button 
                    className="flex-1 bg-primary hover:bg-primary-dark text-white font-black py-6 shadow-lg shadow-primary/20 gap-2"
                    onClick={() => addToCart(quickViewProduct)}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    ADD TO CART
                  </Button>
                  <Button variant="outline" className="py-6 px-4 border-2">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
                
                <Button 
                  variant="link" 
                  className="mt-4 text-primary font-bold text-sm"
                  onClick={() => {
                    openProduct(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                >
                  View Full Details →
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
