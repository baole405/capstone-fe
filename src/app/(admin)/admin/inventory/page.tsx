"use client";

import { useState } from "react";
import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";
import { GlowButton } from "@/components/glow/button";
import { GlowInput } from "@/components/glow/input";
import { mockProducts } from "@/lib/mock-data";
import { AlertTriangle, Package, Search, Plus, Edit } from "lucide-react";

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const lowStockCount = mockProducts.filter((p) => p.stock <= 5).length;
  const totalValue = mockProducts.reduce(
    (sum, p) => sum + p.price * p.stock,
    0,
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Inventory Management</h1>
        <p className="text-muted-foreground">
          Self-managed warehouse stock control
        </p>
      </div>

      <div className="mb-8 grid grid-cols-3 gap-4">
        <GlowCard variant="sky">
          <div className="flex items-center gap-3">
            <Package className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-muted-foreground text-sm">Total Products</p>
              <p className="text-2xl font-bold">{mockProducts.length}</p>
            </div>
          </div>
        </GlowCard>
        <GlowCard variant="yellow">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
            <div>
              <p className="text-muted-foreground text-sm">Low Stock Items</p>
              <p className="text-2xl font-bold">{lowStockCount}</p>
            </div>
          </div>
        </GlowCard>
        <GlowCard variant="mint">
          <div className="flex items-center gap-3">
            <Package className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-muted-foreground text-sm">Total Stock Value</p>
              <p className="text-2xl font-bold">
                {(totalValue / 1000000).toFixed(1)}M VNĐ
              </p>
            </div>
          </div>
        </GlowCard>
      </div>

      {lowStockCount > 0 && (
        <GlowCard variant="yellow" className="mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
            <div className="flex-1">
              <p className="mb-1 font-semibold">Low Stock Alert</p>
              <p className="text-muted-foreground mb-3 text-sm">
                {lowStockCount} products are running low. This may affect
                routine re-purchase recommendations.
              </p>
              <div className="flex flex-wrap gap-2">
                {mockProducts
                  .filter((p) => p.stock <= 5)
                  .map((p) => (
                    <GlowBadge key={p.id} variant="warning">
                      {p.name} ({p.stock} left)
                    </GlowBadge>
                  ))}
              </div>
            </div>
          </div>
        </GlowCard>
      )}

      <GlowCard className="mb-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="text-muted-foreground pointer-events-none absolute top-2.5 left-3 h-5 w-5" />
            <GlowInput
              placeholder="Tìm sản phẩm theo tên hoặc thương hiệu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <GlowButton>
            <Plus className="mr-2 h-4 w-4" />
            Thêm sản phẩm
          </GlowButton>
        </div>
      </GlowCard>

      <GlowCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-border border-b">
                <th className="p-3 text-left font-semibold">Sản phẩm</th>
                <th className="p-3 text-left font-semibold">Thương hiệu</th>
                <th className="p-3 text-right font-semibold">Giá</th>
                <th className="p-3 text-center font-semibold">Tồn kho</th>
                <th className="p-3 text-center font-semibold">Đã đặt trước</th>
                <th className="p-3 text-center font-semibold">Trạng thái</th>
                <th className="p-3 text-right font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const isLowStock = product.stock <= 5;
                const isOutOfStock = product.stock === 0;
                const reserved = Math.floor(product.stock * 0.2);
                return (
                  <tr
                    key={product.id}
                    className="border-border hover:bg-muted/50 border-b"
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
                          <p className="text-muted-foreground text-sm">
                            ID: {product.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">{product.brand}</td>
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
                    <td className="text-muted-foreground p-3 text-center">
                      {reserved}
                    </td>
                    <td className="p-3 text-center">
                      {isOutOfStock ? (
                        <GlowBadge variant="danger">Hết hàng</GlowBadge>
                      ) : isLowStock ? (
                        <GlowBadge variant="warning">Sắp hết</GlowBadge>
                      ) : (
                        <GlowBadge variant="success">Còn hàng</GlowBadge>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-2">
                        <GlowButton size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </GlowButton>
                        <GlowButton size="sm" variant="outline">
                          Nhập hàng
                        </GlowButton>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlowCard>

      <GlowCard variant="sky" className="mt-6">
        <div className="flex items-start gap-3">
          <Package className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
          <div>
            <p className="mb-1 font-semibold">Kho tự quản lý</p>
            <p className="text-muted-foreground text-sm">
              GlowScan tự thu mua và tự quản lý kho hàng. Không có cổng nhà cung
              cấp hay luồng nghiệp vụ phía nhà cung cấp.
            </p>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
