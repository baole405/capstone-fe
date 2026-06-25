"use client";

import { useState } from "react";
import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";
import { GlowButton } from "@/components/glow/button";
import { GlowInput } from "@/components/glow/input";
import { useGlowToast } from "@/components/glow/toast";
import { mockProducts } from "@/lib/mock-data";
import {
  Search,
  Plus,
  Edit,
  Copy,
  Archive,
  Star,
  AlertTriangle,
  TrendingUp,
  Package,
  DollarSign,
  BarChart3,
  X,
  ChevronDown,
  Filter,
  Eye,
  EyeOff,
  RefreshCw,
  Tag,
  Award,
} from "lucide-react";

type ProductStatus = "active" | "draft" | "archived" | "pending";

interface ProductWithMetrics {
  id: string;
  name: string;
  brand: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  status: ProductStatus;
  rating: number;
  aiScore: number;
  lastUpdated: string;
  salesCount: number;
  revenue: number;
  satisfaction: number;
  aiRecommendations: number;
  ingredients: string[];
}

const FIXED_METRICS = [
  {
    rating: 4.8,
    aiScore: 92,
    salesCount: 430,
    revMul: 430,
    satisfaction: 4.9,
    aiRec: 210,
    status: "active" as ProductStatus,
  },
  {
    rating: 4.5,
    aiScore: 85,
    salesCount: 310,
    revMul: 310,
    satisfaction: 4.6,
    aiRec: 175,
    status: "active" as ProductStatus,
  },
  {
    rating: 4.2,
    aiScore: 78,
    salesCount: 220,
    revMul: 220,
    satisfaction: 4.3,
    aiRec: 140,
    status: "pending" as ProductStatus,
  },
  {
    rating: 4.6,
    aiScore: 88,
    salesCount: 380,
    revMul: 380,
    satisfaction: 4.7,
    aiRec: 190,
    status: "active" as ProductStatus,
  },
  {
    rating: 4.3,
    aiScore: 80,
    salesCount: 150,
    revMul: 150,
    satisfaction: 4.1,
    aiRec: 90,
    status: "active" as ProductStatus,
  },
  {
    rating: 4.0,
    aiScore: 75,
    salesCount: 120,
    revMul: 120,
    satisfaction: 4.0,
    aiRec: 70,
    status: "draft" as ProductStatus,
  },
  {
    rating: 4.7,
    aiScore: 91,
    salesCount: 450,
    revMul: 450,
    satisfaction: 4.8,
    aiRec: 220,
    status: "active" as ProductStatus,
  },
];

export default function AdminProductsPage() {
  const { showToast } = useGlowToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] =
    useState<ProductWithMetrics | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const productsWithMetrics: ProductWithMetrics[] = mockProducts.map((p, i) => {
    const m = FIXED_METRICS[i % FIXED_METRICS.length];
    return {
      ...p,
      sku: `SKU-${p.id}-DEMO${i + 1}`,
      category: p.routineSlot,
      status: p.stock === 0 ? "archived" : m.status,
      rating: m.rating,
      aiScore: m.aiScore,
      lastUpdated: `May ${10 + i}, 2026`,
      salesCount: m.salesCount,
      revenue: p.price * m.revMul,
      satisfaction: m.satisfaction,
      aiRecommendations: m.aiRec,
    };
  });

  const totalActive = productsWithMetrics.filter(
    (p) => p.status === "active",
  ).length;
  const lowStock = productsWithMetrics.filter(
    (p) => p.stock > 0 && p.stock <= 5,
  ).length;
  const outOfStock = productsWithMetrics.filter((p) => p.stock === 0).length;
  const bestSellers = productsWithMetrics.filter(
    (p) => p.salesCount > 300,
  ).length;
  const pendingApproval = productsWithMetrics.filter(
    (p) => p.status === "pending",
  ).length;
  const totalRevenue = productsWithMetrics.reduce(
    (sum, p) => sum + p.revenue,
    0,
  );

  const filteredProducts = productsWithMetrics.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;
    let matchesStock = true;
    if (stockFilter === "in-stock") matchesStock = product.stock > 5;
    if (stockFilter === "low-stock")
      matchesStock = product.stock > 0 && product.stock <= 5;
    if (stockFilter === "out-of-stock") matchesStock = product.stock === 0;
    return matchesSearch && matchesCategory && matchesStatus && matchesStock;
  });

  const handleAction = (action: string, product: ProductWithMetrics) => {
    showToast(`${action}: ${product.name}`, "success");
  };

  const getStatusVariant = (status: ProductStatus) => {
    if (status === "active") return "success" as const;
    if (status === "pending") return "warning" as const;
    return undefined;
  };

  const categories = [
    "Cleanser",
    "Serum",
    "Moisturizer",
    "Sunscreen",
    "Treatment",
  ];

  return (
    <div>
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Product Management</h1>
            <p className="text-muted-foreground">
              Enterprise product catalog and inventory control
            </p>
          </div>
          <GlowButton
            onClick={() => showToast("Create Product modal (mock)", "info")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Product
          </GlowButton>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <GlowCard variant="sky">
          <div className="mb-1 flex items-center gap-2">
            <Package className="h-4 w-4 text-blue-600" />
            <p className="text-muted-foreground text-xs">Active Products</p>
          </div>
          <p className="text-2xl font-bold">{totalActive}</p>
        </GlowCard>
        <GlowCard variant="yellow">
          <div className="mb-1 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <p className="text-muted-foreground text-xs">Low Stock</p>
          </div>
          <p className="text-2xl font-bold">{lowStock}</p>
        </GlowCard>
        <GlowCard variant="peach">
          <div className="mb-1 flex items-center gap-2">
            <Archive className="h-4 w-4 text-orange-600" />
            <p className="text-muted-foreground text-xs">Out of Stock</p>
          </div>
          <p className="text-2xl font-bold">{outOfStock}</p>
        </GlowCard>
        <GlowCard variant="mint">
          <div className="mb-1 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <p className="text-muted-foreground text-xs">Best Sellers</p>
          </div>
          <p className="text-2xl font-bold">{bestSellers}</p>
        </GlowCard>
        <GlowCard variant="lavender">
          <div className="mb-1 flex items-center gap-2">
            <Award className="h-4 w-4 text-purple-600" />
            <p className="text-muted-foreground text-xs">Pending Approval</p>
          </div>
          <p className="text-2xl font-bold">{pendingApproval}</p>
        </GlowCard>
        <GlowCard>
          <div className="mb-1 flex items-center gap-2">
            <DollarSign className="text-primary h-4 w-4" />
            <p className="text-muted-foreground text-xs">Total Revenue</p>
          </div>
          <p className="text-xl font-bold">
            {(totalRevenue / 1000000).toFixed(1)}M VNĐ
          </p>
        </GlowCard>
      </div>

      <GlowCard className="mb-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search className="text-muted-foreground pointer-events-none absolute top-2.5 left-3 h-5 w-5" />
              <GlowInput
                placeholder="Search by name, brand, or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <GlowButton
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
              <ChevronDown
                className={`ml-2 h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
              />
            </GlowButton>
          </div>

          {showFilters && (
            <div className="border-border grid grid-cols-1 gap-3 border-t pt-3 md:grid-cols-3">
              {[
                {
                  label: "Category",
                  value: categoryFilter,
                  onChange: setCategoryFilter,
                  opts: [
                    { v: "all", l: "All Categories" },
                    ...categories.map((c) => ({ v: c, l: c })),
                  ],
                },
                {
                  label: "Status",
                  value: statusFilter,
                  onChange: setStatusFilter,
                  opts: [
                    { v: "all", l: "All Statuses" },
                    { v: "active", l: "Active" },
                    { v: "pending", l: "Pending Approval" },
                    { v: "draft", l: "Draft" },
                    { v: "archived", l: "Archived" },
                  ],
                },
                {
                  label: "Stock Level",
                  value: stockFilter,
                  onChange: setStockFilter,
                  opts: [
                    { v: "all", l: "All Stock Levels" },
                    { v: "in-stock", l: "In Stock" },
                    { v: "low-stock", l: "Low Stock" },
                    { v: "out-of-stock", l: "Out of Stock" },
                  ],
                },
              ].map((s) => (
                <div key={s.label}>
                  <label className="text-muted-foreground mb-1 block text-xs">
                    {s.label}
                  </label>
                  <select
                    value={s.value}
                    onChange={(e) => s.onChange(e.target.value)}
                    className="border-border bg-background w-full rounded border px-3 py-2 text-sm"
                  >
                    {s.opts.map((o) => (
                      <option key={o.v} value={o.v}>
                        {o.l}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>
      </GlowCard>

      <GlowCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-border border-b">
              <tr>
                {[
                  "Product",
                  "SKU",
                  "Category",
                  "Price",
                  "Stock",
                  "Status",
                  "Rating",
                  "AI Score",
                  "Updated",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className={`p-3 font-semibold ${h === "Price" || h === "Actions" ? "text-right" : h === "Category" || h === "Updated" ? "text-left" : "text-center"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const isLowStock = product.stock > 0 && product.stock <= 5;
                const isOutOfStock = product.stock === 0;
                return (
                  <tr
                    key={product.id}
                    className="border-border hover:bg-muted/50 cursor-pointer border-b transition-colors"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-muted-foreground text-xs">
                            {product.brand}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <p className="text-muted-foreground font-mono text-xs">
                        {product.sku}
                      </p>
                    </td>
                    <td className="p-3">
                      <GlowBadge variant="info" className="text-xs">
                        {product.category}
                      </GlowBadge>
                    </td>
                    <td className="p-3 text-right font-semibold">
                      {product.price.toLocaleString()} VNĐ
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`font-semibold ${isOutOfStock ? "text-red-600" : isLowStock ? "text-yellow-600" : "text-green-600"}`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <GlowBadge
                        variant={getStatusVariant(product.status)}
                        className="text-xs capitalize"
                      >
                        {product.status}
                      </GlowBadge>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-600 text-yellow-600" />
                        <span className="text-sm font-semibold">
                          {product.rating.toFixed(1)}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <BarChart3 className="h-3 w-3 text-purple-600" />
                        <span className="text-sm font-semibold">
                          {product.aiScore}%
                        </span>
                      </div>
                    </td>
                    <td className="text-muted-foreground p-3 text-xs">
                      {product.lastUpdated}
                    </td>
                    <td className="p-3">
                      <div
                        className="flex justify-end gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => handleAction("Edit", product)}
                          className="hover:bg-accent rounded p-1.5 transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleAction("Duplicate", product)}
                          className="hover:bg-accent rounded p-1.5 transition-colors"
                          title="Duplicate"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleAction("Archive", product)}
                          className="hover:bg-accent rounded p-1.5 transition-colors"
                          title="Archive"
                        >
                          <Archive className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="py-12 text-center">
              <Package className="text-muted-foreground mx-auto mb-4 h-16 w-16 opacity-30" />
              <p className="text-muted-foreground mb-2">No products found</p>
              <p className="text-muted-foreground text-sm">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </GlowCard>

      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/50"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="h-full w-full overflow-y-auto bg-white shadow-2xl md:w-2/3 lg:w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-border sticky top-0 flex items-center justify-between border-b bg-white p-6">
              <div>
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <p className="text-muted-foreground">{selectedProduct.brand}</p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="hover:bg-accent rounded p-2 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 p-6">
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <GlowCard variant="lavender">
                <h3 className="mb-4 font-semibold">Performance Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Sales Count", value: selectedProduct.salesCount },
                    {
                      label: "Revenue",
                      value: `${(selectedProduct.revenue / 1000000).toFixed(2)}M VNĐ`,
                    },
                    {
                      label: "Satisfaction",
                      value: `${selectedProduct.satisfaction.toFixed(1)}/5`,
                      star: true,
                    },
                    {
                      label: "AI Recommendations",
                      value: selectedProduct.aiRecommendations,
                    },
                  ].map((m) => (
                    <div key={m.label} className="rounded bg-white p-3">
                      <p className="text-muted-foreground mb-1 text-xs">
                        {m.label}
                      </p>
                      <div className="flex items-center gap-1">
                        {m.star && (
                          <Star className="h-4 w-4 fill-yellow-600 text-yellow-600" />
                        )}
                        <p className="text-xl font-bold">{m.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlowCard>

              <GlowCard variant="sky">
                <h3 className="mb-3 font-semibold">Key Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.ingredients.map((ing) => (
                    <GlowBadge key={ing} variant="info">
                      {ing}
                    </GlowBadge>
                  ))}
                </div>
              </GlowCard>

              <div className="grid grid-cols-2 gap-3">
                <GlowButton
                  variant="outline"
                  onClick={() => handleAction("Mark Featured", selectedProduct)}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Mark Featured
                </GlowButton>
                <GlowButton
                  variant="outline"
                  onClick={() => handleAction("Restock", selectedProduct)}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Restock
                </GlowButton>
                <GlowButton
                  variant="outline"
                  onClick={() => handleAction("Add Tags", selectedProduct)}
                >
                  <Tag className="mr-2 h-4 w-4" />
                  Add Tags
                </GlowButton>
                <GlowButton
                  variant="outline"
                  onClick={() =>
                    handleAction("Toggle Visibility", selectedProduct)
                  }
                >
                  {selectedProduct.status === "active" ? (
                    <EyeOff className="mr-2 h-4 w-4" />
                  ) : (
                    <Eye className="mr-2 h-4 w-4" />
                  )}
                  {selectedProduct.status === "active" ? "Hide" : "Show"}
                </GlowButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
