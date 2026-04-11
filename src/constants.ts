import { Category, HeroSlide, Product } from "./types";

export const CATEGORY_STRUCTURE: Category[] = [
  {
    name: "Kili Featured",
    icon: "Star",
    subcategories: ["Top Deals", "Clearance Sale", "Trending Now", "Sponsored", "Recommended", "New User Offers", "Flash Sales"]
  },
  {
    name: "Phones & Tablets",
    icon: "Smartphone",
    subcategories: ["Smartphones", "Refurbished Phones", "Tablets", "Phone Cases", "Screen Protectors", "Power Banks", "Chargers & Cables", "Phone Accessories"]
  },
  {
    name: "Electronics",
    icon: "Tv",
    subcategories: ["TVs & Video", "Audio & Music", "Cameras", "Gaming", "Laptops", "Desktop Computers", "Computer Accessories", "Networking", "Smart Home"]
  },
  {
    name: "Fashion",
    icon: "ShoppingBag",
    subcategories: ["Women's Clothing", "Men's Clothing", "Shoes", "Bags", "Watches", "Jewelry", "Accessories", "Traditional Wear", "Activewear"]
  },
  {
    name: "Home & Living",
    icon: "Home",
    subcategories: ["Furniture", "Kitchen & Dining", "Bedding", "Home Decor", "Lighting", "Storage", "Bath", "Garden & Outdoor", "Home Improvement"]
  },
  {
    name: "Health & Beauty",
    icon: "Sparkles",
    subcategories: ["Skincare", "Haircare", "Makeup", "Fragrances", "Personal Care", "Health Care", "Sexual Wellness", "Vitamins & Supplements"]
  },
  {
    name: "Appliances",
    icon: "Refrigerator",
    subcategories: ["Refrigerators", "Cookers & Ovens", "Microwaves", "Washing Machines", "Blenders & Mixers", "Irons", "Water Dispensers", "Vacuum Cleaners"]
  },
  {
    name: "Baby & Kids",
    icon: "Baby",
    subcategories: ["Baby Care", "Feeding", "Diapers", "Strollers", "Toys", "School Supplies", "Baby Clothing", "Nursery", "Kids Furniture"]
  },
  {
    name: "Sports & Outdoor",
    icon: "Dumbbell",
    subcategories: ["Fitness Equipment", "Sports Wear", "Shoes", "Camping & Hiking", "Bikes", "Team Sports", "Water Sports", "Outdoor Gear"]
  },
  {
    name: "Automotive",
    icon: "Car",
    subcategories: ["Car Accessories", "Car Electronics", "Motorcycle", "Tools & Equipment", "Car Care", "Oils & Fluids", "Tyres & Wheels", "Safety"]
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Infinix Note 40 Pro 5G - 256GB + 8GB RAM - 108MP Camera",
    price: "KSh 32,999",
    oldPrice: "KSh 39,999",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop",
    category: "Phones & Tablets",
    badge: "Hot Deal",
    rating: 4.7,
    reviews: 342,
    discount: 18
  },
  {
    id: 2,
    name: "Samsung Galaxy A15 128GB - 6.5\" Super AMOLED Display",
    price: "KSh 19,999",
    oldPrice: "KSh 24,999",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop",
    category: "Phones & Tablets",
    badge: "Bestseller",
    rating: 4.5,
    reviews: 528,
    discount: 20
  },
  {
    id: 3,
    name: "Men's Casual Sneakers - Breathable Walking Shoes Sports Footwear",
    price: "KSh 1,899",
    oldPrice: "KSh 3,499",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    category: "Fashion",
    badge: "Flash Sale",
    rating: 4.3,
    reviews: 892,
    discount: 46
  },
  {
    id: 4,
    name: "Vitron 43\" Smart HD TV - Netflix, YouTube, Free Gifts Included",
    price: "KSh 21,999",
    oldPrice: "KSh 28,999",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=800&auto=format&fit=crop",
    category: "Electronics",
    badge: "Recommended",
    rating: 4.6,
    reviews: 234,
    discount: 24
  },
  {
    id: 5,
    name: "TWS Wireless Bluetooth Earphones - Touch Control, Power Bank Case",
    price: "KSh 999",
    oldPrice: "KSh 2,499",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop",
    category: "Electronics",
    badge: "Top Deal",
    rating: 4.2,
    reviews: 1567,
    discount: 60
  },
  {
    id: 6,
    name: "Women's Fashion Handbag - Genuine Leather Tote Bag Designer Style",
    price: "KSh 2,899",
    oldPrice: "KSh 4,599",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    category: "Fashion",
    badge: "Trending",
    rating: 4.8,
    reviews: 423,
    discount: 37
  },
  {
    id: 7,
    name: "RAMTONS 3.5L Electric Kettle - Stainless Steel, Auto Shut-off",
    price: "KSh 1,499",
    oldPrice: "KSh 2,299",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800&auto=format&fit=crop",
    category: "Appliances",
    rating: 4.4,
    reviews: 678,
    discount: 35
  },
  {
    id: 8,
    name: "SNDWAY Laser Distance Meter 50M - Digital Range Finder",
    price: "KSh 2,499",
    oldPrice: "KSh 3,899",
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=800&auto=format&fit=crop",
    category: "Home & Living",
    badge: "New",
    rating: 4.9,
    reviews: 156,
    discount: 36
  }
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    title: "Big Brand Sale",
    subtitle: "Up to 70% OFF",
    description: "Top electronics and fashion deals",
    bgColor: "#FFE4E1",
    accentColor: "#E53935",
    image: "🎉",
    cta: "Shop Now"
  },
  {
    title: "New Arrivals",
    subtitle: "Latest Tech",
    description: "Discover the newest gadgets and accessories",
    bgColor: "#E8F5E9",
    accentColor: "#4CAF50",
    image: "📱",
    cta: "Explore"
  },
  {
    title: "Free Delivery",
    subtitle: "On Orders Over KSh 2,000",
    description: "Fast shipping to your doorstep",
    bgColor: "#E3F2FD",
    accentColor: "#2196F3",
    image: "🚚",
    cta: "Learn More"
  }
];
