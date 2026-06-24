export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  stock: number;
  ingredients: string[];
  concerns: string[];
  routineSlot: string;
  rating: number;
  reviewCount: number;
  description: string;
  isNew?: boolean;
  isBestSeller?: boolean;
};

export type ProductCategory = {
  id: string;
  name: string;
  slug: string;
};
