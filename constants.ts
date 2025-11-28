import { Product, ShopDetails, Review } from './types';

export const SHOP_DETAILS: ShopDetails = {
  name: "Dress Line",
  tagline: "Simple the best",
  location: "No.83, Trinco Road, Batticaloa",
  phone: "065 222 6332",
  founders: [
    {
      name: "Mr. MM. SABURUDEEN",
      role: "PROPRIETOR",
      phone: "+94 777 113 420"
    },
    {
      name: "Mr. S. YUSREE AHMATH",
      role: "PROPRIETOR",
      phone: "+94 76 86 85 970"
    }
  ]
};

// Replace this URL with your actual logo image URL
export const LOGO_URL = "https://raw.githubusercontent.com/ahmath-musharraf/DressLine/refs/heads/main/DressLineLogo.png"; 
// For dark background (Footer) - utilizing a white text version or CSS filter in component
export const LOGO_URL_WHITE = "https://raw.githubusercontent.com/ahmath-musharraf/DressLine/refs/heads/main/DressLineLogoW.png";

export const NAV_LINKS = [
  { name: "Home" },
  { name: "New Arrivals" },
  { name: "Sale" },
  { name: "Dresses" },
  { name: "Abayas" },
  { name: "Sarees" },
  { name: "Tops" },
  { name: "Shoes & Bags" }
];

const DEFAULT_SIZES = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Work Midi Length Dress",
    brand: "Dress Line Exclusive",
    price: 3500,
    originalPrice: 4500,
    image: "https://raw.githubusercontent.com/ahmath-musharraf/DressLine/refs/heads/main/Image/5.jpg",
    images: [
      "https://raw.githubusercontent.com/ahmath-musharraf/DressLine/refs/heads/main/Image/5.jpg"
    ],
    category: "Women",
    tag: "Sale",
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 2,
    name: "Two Piece Set",
    brand: "Dress Line Exclusive",
    price: 4200,
    image: "https://raw.githubusercontent.com/ahmath-musharraf/DressLine/refs/heads/main/Image/1.jpg",
    images: [
      "https://raw.githubusercontent.com/ahmath-musharraf/DressLine/refs/heads/main/Image/1.jpg"
    ],
    category: "Women",
    tag: "New",
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 3,
    name: "Two Piece Set",
    brand: "Dress Line Exclusive",
    price: 4200,
    image: "https://raw.githubusercontent.com/ahmath-musharraf/DressLine/refs/heads/main/Image/8.jpg",
    images: [
      "https://raw.githubusercontent.com/ahmath-musharraf/DressLine/refs/heads/main/Image/8.jpg"
     
    ],
    category: "Women",
    tag: "Best Seller",
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 4,
    name: "Denim Short",
    brand: "Dress Line Exclusive",
    price: 2800,
    image: "https://raw.githubusercontent.com/ahmath-musharraf/DressLine/refs/heads/main/Image/6.jpg",
    images: [
      "https://raw.githubusercontent.com/ahmath-musharraf/DressLine/refs/heads/main/Image/6.jpg"
      
    ],
    category: "Women",
    tag: "Best Seller",
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 5,
    name: "Long Top",
    brand: "Dress Line Exclusive",
    price: 2700,
    originalPrice: 4000,
    image: "https://raw.githubusercontent.com/ahmath-musharraf/DressLine/refs/heads/main/Image/7.jpg",
    images: [
      "https://raw.githubusercontent.com/ahmath-musharraf/DressLine/refs/heads/main/Image/7.jpg"
      
    ],
    category: "Women",
    tag: "Sale"
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 6,
    name: "Work Midi Length Dress",
    brand: "Dress Line Exclusive",
    price: 3800,
    image: "https://raw.githubusercontent.com/ahmath-musharraf/DressLine/refs/heads/main/Image/10.jpg",
    images: [
      "https://raw.githubusercontent.com/ahmath-musharraf/DressLine/refs/heads/main/Image/10.jpg"
      
    ],
    category: "Women",
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 7,
    name: "Ladies T - Shirt Short Sleeve",
    brand: "Dress Line Exclusive",
    price: 2300,
    image: "https://raw.githubusercontent.com/ahmath-musharraf/DressLine/refs/heads/main/Image/9.jpg",
    images: [
      "https://raw.githubusercontent.com/ahmath-musharraf/DressLine/refs/heads/main/Image/9.jpg"
      
    ],
    category: "Women",
    tag: "New"
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 8,
    name: "Summer Floral Top",
    brand: "Breezy",
    price: 2500,
    originalPrice: 3500,
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Women",
    tag: "Sale",
    sizes: DEFAULT_SIZES
  },
  {
    id: 9,
    name: "Embroidered Chiffon Maxi",
    brand: "Luxe",
    price: 8900,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Women",
    tag: "New",
    sizes: ['M', 'L', 'XL', 'XXL']
  },
  {
    id: 10,
    name: "Cotton Linen Kurti",
    brand: "Ethnic Weave",
    price: 4200,
    image: "https://images.unsplash.com/photo-1583391733958-e02d07e8693d?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1583391733958-e02d07e8693d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1605763240004-7e93b172d754?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Women",
    sizes: DEFAULT_SIZES
  },
  {
    id: 11,
    name: "Classic Beige Heels",
    brand: "Step Up",
    price: 6500,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1518953789413-9598f0909795?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Women",
    tag: "Best Seller",
    sizes: ['36', '37', '38', '39', '40', '41']
  },
  {
    id: 12,
    name: "Floral Jumpsuit",
    brand: "Chic",
    price: 5800,
    originalPrice: 7500,
    image: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Women",
    tag: "Sale",
    sizes: DEFAULT_SIZES
  },
  {
    id: 13,
    name: "Designer Tote Bag",
    brand: "Luxe",
    price: 9500,
    image: "https://images.unsplash.com/photo-1590874103328-3af216886c78?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1590874103328-3af216886c78?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Women"
  },
  {
    id: 14,
    name: "Georgette Party Saree",
    brand: "Elegant",
    price: 14500,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Women"
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    userName: "Fathima S.",
    rating: 5,
    comment: "Absolutely love the abayas from Dress Line! The quality is unmatched in Batticaloa.",
    date: "2 weeks ago"
  },
  {
    id: 2,
    userName: "Dilhani Perera",
    rating: 5,
    comment: "Bought a saree for my cousin's wedding. Stunning collection and great prices.",
    date: "1 month ago"
  },
  {
    id: 3,
    userName: "Aisha M.",
    rating: 4,
    comment: "Very trendy tops. I wish there were more size options, but the staff is very helpful.",
    date: "3 weeks ago"
  },
  {
    id: 4,
    userName: "Zainab R.",
    rating: 5,
    comment: "The best place for modest wear. Their new collection is beautiful.",
    date: "1 week ago"
  },
  {
    id: 5,
    userName: "Mariyam K.",
    rating: 5,
    comment: "Fast delivery within Batticaloa. The material is so soft and comfortable.",
    date: "2 days ago"
  },
  {
    id: 6,
    userName: "Sarah L.",
    rating: 5,
    comment: "I love their handbag collection. Premium quality at affordable prices.",
    date: "5 days ago"
  },
  {
    id: 7,
    userName: "Nusra F.",
    rating: 4,
    comment: "Good collection of heels. Comfortable for daily wear.",
    date: "1 week ago"
  },
  {
    id: 8,
    userName: "Rifka A.",
    rating: 5,
    comment: "The customer service is excellent. They helped me choose the right size.",
    date: "2 weeks ago"
  },
  {
    id: 9,
    userName: "Tharushi J.",
    rating: 5,
    comment: "Highly recommend their casual wear. Stylish and durable.",
    date: "3 weeks ago"
  },
  {
    id: 10,
    userName: "Shazna N.",
    rating: 5,
    comment: "My go-to shop for all fashion needs. Love the ambiance of the store too.",
    date: "1 month ago"
  }
];

export const PRIVACY_POLICY_TEXT = `
**1. Information Collection**
We collect information you provide directly to us, such as when you create an account, make a purchase, or sign up for our newsletter. This includes your name, email address, phone number, and shipping address.

**2. Use of Information**
We use the information we collect to process your transactions, provide customer service, and send you updates and promotional materials.

**3. Information Sharing**
We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in our operations, such as payment processors and shipping partners.

**4. Data Security**
We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.

**5. Contact Us**
If you have any questions about this Privacy Policy, please contact us at the phone numbers provided in the footer.
`;

export const TERMS_OF_SERVICE_TEXT = `
**1. Acceptance of Terms**
By accessing or using our website, you agree to be bound by these Terms of Service.

**2. Product Availability**
All products are subject to availability. We reserve the right to limit the quantity of products we supply.

**3. Pricing**
Prices for our products are subject to change without notice. We are not liable to you or to any third-party for any modification, price change, suspension, or discontinuance of the Service.

**4. Returns and Refunds**
Please review our Return Policy, which is available in the store or upon inquiry via WhatsApp. Generally, items must be returned in original condition within 14 days.

**5. Governing Law**
These Terms shall be governed by and defined following the laws of Sri Lanka. Dress Line and yourself irrevocably consent that the courts of Sri Lanka shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
`;
