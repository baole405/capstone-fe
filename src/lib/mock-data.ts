import { Product, User, Clinic, AIAssessmentResult } from "@/lib/domain-types";

export const mockUser: User = {
  id: "1",
  name: "Linh Nguyen",
  email: "linh.nguyen@example.com",
  location: "District 1, Ho Chi Minh City",
  skinType: "oily",
  allergies: ["Fragrance"],
  skinGoals: ["Reduce acne and oiliness"],
  concerns: ["acne", "oiliness", "pores"],
  role: "user",
};

export const mockAIResult: AIAssessmentResult = {
  acneSeverity: "moderate",
  darkSpots: "low",
  poreVisibility: "high",
  fineLines: "low",
  confidence: 86,
  oiliness: "high",
  hydration: "low",
};

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Blemish Control Cleanser",
    brand: "CeraVe",
    price: 385000,
    stock: 24,
    ingredients: ["Salicylic Acid", "Niacinamide", "Ceramide"],
    concerns: ["acne", "oiliness"],
    routineSlot: "Morning / Evening cleanser",
    image:
      "https://images.unsplash.com/photo-1627811015433-368c148f6c3c?w=400&h=400&fit=crop",
    description:
      "A gentle foaming cleanser that helps clear acne and reduce oiliness while maintaining skin barrier.",
  },
  {
    id: "p2",
    name: "Effaclar Duo+",
    brand: "La Roche-Posay",
    price: 475000,
    stock: 12,
    ingredients: ["Niacinamide", "LHA", "Salicylic Acid"],
    concerns: ["acne", "pores"],
    routineSlot: "Evening treatment",
    image:
      "https://images.unsplash.com/photo-1623143445418-40c192fa3d11?w=400&h=400&fit=crop",
    description:
      "Targeted treatment for acne-prone skin that reduces blemishes and refines pores.",
  },
  {
    id: "p3",
    name: "Niacinamide 10% + Zinc 1%",
    brand: "The Ordinary",
    price: 295000,
    stock: 8,
    ingredients: ["Niacinamide", "Zinc PCA"],
    concerns: ["oiliness", "pores"],
    routineSlot: "Morning serum",
    image:
      "https://images.unsplash.com/photo-1710410815589-dd83514104d0?w=400&h=400&fit=crop",
    description:
      "High-strength serum to reduce excess oil and minimize pore appearance.",
  },
  {
    id: "p4",
    name: "Madagascar Centella Ampoule",
    brand: "Skin1004",
    price: 330000,
    stock: 5,
    ingredients: ["Centella Asiatica"],
    concerns: ["irritation"],
    routineSlot: "Recovery serum",
    image:
      "https://images.unsplash.com/photo-1679394270822-fb37412bb6ee?w=400&h=400&fit=crop",
    description:
      "Soothing ampoule that calms irritation and supports skin recovery.",
  },
  {
    id: "p5",
    name: "Relief Sun",
    brand: "Beauty of Joseon",
    price: 280000,
    stock: 2,
    ingredients: ["Rice Extract", "Probiotics"],
    concerns: [],
    routineSlot: "Morning sunscreen",
    image:
      "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=400&h=400&fit=crop",
    description:
      "Lightweight daily sunscreen with nourishing rice extract for daily protection.",
  },
];

export const mockClinics: Clinic[] = [
  {
    id: "c1",
    name: "Glow Dermatology Partner Clinic",
    district: "District 1",
    address: "123 Nguyen Hue, District 1, Ho Chi Minh City",
    phone: "0900 123 456",
    services: ["Acne treatment", "Skin consultation", "Laser consultation"],
    openingHours: "8:00 AM - 8:00 PM",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop",
  },
  {
    id: "c2",
    name: "Skin Care Center",
    district: "District 3",
    address: "456 Le Van Sy, District 3, Ho Chi Minh City",
    phone: "0900 234 567",
    services: ["Facial treatment", "Chemical peel", "Microneedling"],
    openingHours: "9:00 AM - 7:00 PM",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop",
  },
];

export const activeIngredients = [
  "Retinol",
  "BHA",
  "AHA",
  "Niacinamide",
  "Hyaluronic Acid",
  "Ceramide",
  "Benzoyl Peroxide",
  "Azelaic Acid",
  "Centella Asiatica",
];

export const skinTypeOptions = [
  { value: "oily", label: "Oily" },
  { value: "dry", label: "Dry" },
  { value: "combination", label: "Combination" },
  { value: "sensitive", label: "Sensitive" },
  { value: "normal", label: "Normal" },
  { value: "unknown", label: "I don't know" },
];

export const concernOptions = [
  { value: "acne", label: "Acne" },
  { value: "dark_spots", label: "Dark spots" },
  { value: "oiliness", label: "Oiliness" },
  { value: "dryness", label: "Dryness" },
  { value: "pores", label: "Pores" },
  { value: "fine_lines", label: "Fine lines" },
  { value: "irritation", label: "Irritation" },
];
