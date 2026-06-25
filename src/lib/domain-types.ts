export type SkinType =
  | "oily"
  | "dry"
  | "combination"
  | "sensitive"
  | "normal"
  | "unknown";

export type SkinConcern =
  | "acne"
  | "dark_spots"
  | "oiliness"
  | "dryness"
  | "pores"
  | "fine_lines"
  | "irritation";

export type UserRole = "user" | "admin" | "staff" | "expert";

export interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  skinType: SkinType;
  allergies: string[];
  skinGoals: string[];
  concerns: SkinConcern[];
  role: UserRole;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  ingredients: string[];
  concerns: SkinConcern[];
  routineSlot: string;
  image: string;
  description: string;
}

export interface AIAssessmentResult {
  acneSeverity: "low" | "moderate" | "high";
  oiliness: "low" | "moderate" | "high";
  hydration: "low" | "moderate" | "high";
  darkSpots: "low" | "moderate" | "high";
  poreVisibility: "low" | "moderate" | "high";
  fineLines: "low" | "moderate" | "high";
  confidence: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status:
    | "created"
    | "confirmed"
    | "packed"
    | "shipping"
    | "delivered"
    | "completed";
  deliveryProvider: "GHN" | "GHTK";
  trackingCode: string;
  createdAt: Date;
  estimatedDelivery: Date;
}

export interface Routine {
  id: string;
  userId: string;
  products: { product: Product; time: "morning" | "evening"; step: number }[];
  startDate: Date;
  endDate: Date;
  completionRate: number;
}

export interface Consultation {
  id: string;
  userId: string;
  type: "staff" | "expert";
  expertId?: string;
  expertName?: string;
  fee: number;
  status: "pending" | "confirmed" | "completed";
  scheduledAt: Date;
  notes: string;
}

export interface Clinic {
  id: string;
  name: string;
  district: string;
  address: string;
  phone: string;
  services: string[];
  openingHours: string;
  image: string;
}

export interface TreatmentPlan {
  id: string;
  userId: string;
  expertId: string;
  ingredients: string[];
  recommendedProducts: Product[];
  notes: string;
  createdAt: Date;
}
