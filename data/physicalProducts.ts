export interface PhysicalProduct {
    id: number;
    name: string;
    category: string;
    price: number;
    originalPrice: number | null;
    rating: number;
    sold: number;
    badge: string;
    image: string;
  }
  
  export const PHYSICAL_PRODUCTS: PhysicalProduct[] = [
    {
      id: 1,
      name: "Wireless Earbuds Pro",
      category: "Electronics",
      price: 249000,
      originalPrice: 329000,
      rating: 4.8,
      sold: 1240,
      badge: "BEST SELLER",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      name: "Smartwatch Active S",
      category: "Electronics",
      price: 399000,
      originalPrice: 499000,
      rating: 4.7,
      sold: 860,
      badge: "SALE",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      name: "Mechanical Keyboard 68 Keys",
      category: "Computer Accessories",
      price: 459000,
      originalPrice: 599000,
      rating: 4.9,
      sold: 620,
      badge: "POPULAR",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 4,
      name: "Wireless Mouse Silent",
      category: "Computer Accessories",
      price: 129000,
      originalPrice: 169000,
      rating: 4.6,
      sold: 970,
      badge: "SALE",
      image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 5,
      name: "Premium Phone Case",
      category: "Phone Accessories",
      price: 59000,
      originalPrice: null,
      rating: 4.5,
      sold: 540,
      badge: "NEW",
      image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 6,
      name: "Fast Charging Adapter 33W",
      category: "Phone Accessories",
      price: 89000,
      originalPrice: 119000,
      rating: 4.7,
      sold: 1100,
      badge: "SALE",
      image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 7,
      name: "Minimalist Backpack",
      category: "Fashion",
      price: 279000,
      originalPrice: 349000,
      rating: 4.8,
      sold: 730,
      badge: "BEST SELLER",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 8,
      name: "Classic Canvas Sneakers",
      category: "Fashion",
      price: 319000,
      originalPrice: 399000,
      rating: 4.6,
      sold: 480,
      badge: "SALE",
      image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 9,
      name: "Everyday Cotton T-Shirt",
      category: "Fashion",
      price: 99000,
      originalPrice: 129000,
      rating: 4.7,
      sold: 1500,
      badge: "POPULAR",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 10,
      name: "Classic Baseball Cap",
      category: "Fashion",
      price: 79000,
      originalPrice: null,
      rating: 4.5,
      sold: 390,
      badge: "NEW",
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 11,
      name: "Stainless Steel Bottle",
      category: "Lifestyle",
      price: 119000,
      originalPrice: 149000,
      rating: 4.8,
      sold: 920,
      badge: "SALE",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 12,
      name: "Premium Desk Lamp",
      category: "Home & Office",
      price: 189000,
      originalPrice: 239000,
      rating: 4.7,
      sold: 340,
      badge: "POPULAR",
      image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 13,
      name: "Ceramic Coffee Mug Set",
      category: "Home & Living",
      price: 149000,
      originalPrice: null,
      rating: 4.9,
      sold: 410,
      badge: "NEW",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 14,
      name: "Aroma Diffuser Mini",
      category: "Home & Living",
      price: 169000,
      originalPrice: 219000,
      rating: 4.6,
      sold: 580,
      badge: "SALE",
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 15,
      name: "Soft Throw Pillow",
      category: "Home Decor",
      price: 89000,
      originalPrice: null,
      rating: 4.5,
      sold: 260,
      badge: "PICK",
      image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 16,
      name: "Minimalist Wall Clock",
      category: "Home Decor",
      price: 159000,
      originalPrice: 199000,
      rating: 4.7,
      sold: 310,
      badge: "SALE",
      image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 17,
      name: "Portable Bluetooth Speaker",
      category: "Electronics",
      price: 229000,
      originalPrice: 299000,
      rating: 4.8,
      sold: 840,
      badge: "BEST SELLER",
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 18,
      name: "Compact Power Bank 10000mAh",
      category: "Phone Accessories",
      price: 199000,
      originalPrice: 249000,
      rating: 4.7,
      sold: 1050,
      badge: "SALE",
      image: "https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 19,
      name: "Everyday Crossbody Bag",
      category: "Fashion",
      price: 179000,
      originalPrice: 229000,
      rating: 4.6,
      sold: 670,
      badge: "POPULAR",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 20,
      name: "Premium Notebook Set",
      category: "Stationery",
      price: 69000,
      originalPrice: null,
      rating: 4.8,
      sold: 290,
      badge: "NEW",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=80"
    }
  ];