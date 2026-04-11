import { motion } from "motion/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroCarousel } from "@/components/HeroCarousel";
import { MegaMenu } from "@/components/MegaMenu";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/constants";
import { useState, useMemo } from "react";
import { PageKey, Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, Heart, Star } from "lucide-react";

export default function App() {
  const [page, setPage] = useState<PageKey>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openProduct = (p: Product) => {
    setSelectedProduct(p);
    setPage("product");
    window.scrollTo(0, 0);
  };

  const flashSales = useMemo(() => PRODUCTS.filter(p => p.discount && p.discount >= 30), []);
  const trending = useMemo(() => PRODUCTS.slice(4, 8), []);
  const recommended = useMemo(() => PRODUCTS.slice(0, 8), []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Header onNavigate={setPage} />

      <main className="flex-1">
        {page === "home" && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 mb-12">
              <div className="hidden lg:block">
                <MegaMenu />
              </div>
              <HeroCarousel />
            </div>

            {/* Flash Sales */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-primary p-2 rounded-lg text-white">
                    <Zap className="w-5 h-5 fill-current" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight text-secondary uppercase">Flash Sales</h2>
                  <div className="flex items-center gap-2 ml-4">
                    <span className="text-xs font-bold text-muted-foreground uppercase">Ends in:</span>
                    <div className="flex gap-1">
                      {["08", "42", "15"].map((t, i) => (
                        <div key={i} className="bg-secondary text-white text-xs font-black px-2 py-1 rounded">
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <Button variant="link" className="text-primary font-bold">SEE ALL →</Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {flashSales.map(product => (
                  <ProductCard key={product.id} product={product} onPress={openProduct} />
                ))}
              </div>
            </section>

            {/* Banner */}
            <div className="bg-primary-dark rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
              <div className="relative z-10">
                <Badge className="bg-accent text-secondary mb-4 font-black">LIMITED OFFER</Badge>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                  UP TO 50% OFF ON <br /> SMART HOME APPLIANCES
                </h2>
                <p className="text-white/80 mb-6 max-w-md">
                  Upgrade your living space with the latest smart technology. Fast delivery across Kenya.
                </p>
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold px-8">
                  SHOP NOW
                </Button>
              </div>
              <div className="text-[180px] opacity-10 absolute -right-10 -bottom-10 select-none pointer-events-none">
                🏠
              </div>
            </div>

            {/* Trending */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 p-2 rounded-lg text-white">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight text-secondary uppercase">Trending Now</h2>
                </div>
                <Button variant="link" className="text-primary font-bold">SEE ALL →</Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {trending.map(product => (
                  <ProductCard key={product.id} product={product} onPress={openProduct} />
                ))}
              </div>
            </section>

            {/* Recommended */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-pink-500 p-2 rounded-lg text-white">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight text-secondary uppercase">Recommended For You</h2>
                </div>
                <Button variant="link" className="text-primary font-bold">SEE ALL →</Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {recommended.map(product => (
                  <ProductCard key={product.id} product={product} onPress={openProduct} />
                ))}
              </div>
            </section>
          </div>
        )}

        {page === "product" && selectedProduct && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-8">
                <div className="space-y-4">
                  <div className="aspect-square rounded-xl bg-gray-50 overflow-hidden border border-gray-100">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="aspect-square rounded-lg bg-gray-50 border border-gray-100 cursor-pointer hover:border-primary transition-colors overflow-hidden">
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

                  <div className="bg-gray-50 p-6 rounded-xl mb-8">
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
                    <Button size="lg" className="flex-1 bg-primary hover:bg-primary-dark text-white font-black py-8 text-lg shadow-xl shadow-primary/20">
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
                  <ProductCard key={p.id} product={p} onPress={openProduct} />
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
