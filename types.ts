
export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: 'Women' | 'Men' | 'Kids' | 'Beauty' | 'Home';
  tag?: 'New' | 'Sale' | 'Best Seller';
  sizes?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

export interface Founder {
  name: string;
  role: string;
  phone: string;
}

export interface ShopDetails {
  name: string;
  tagline: string;
  location: string;
  phone: string;
  founders: Founder[];
}

export interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
