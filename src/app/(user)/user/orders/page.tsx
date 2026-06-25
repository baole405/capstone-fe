"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";
import { GlowButton } from "@/components/glow/button";
import { GlowInput } from "@/components/glow/input";
import { mockProducts } from "@/lib/mock-data";
import { Package, Truck, MapPin, CheckCircle, Clock, Home } from "lucide-react";

const order = {
  id: "GS-1284",
  date: "May 16, 2026",
  total: 1485000,
  estimatedDelivery: "May 19, 2026",
  deliveryProvider: "GHN",
  trackingCode: "GHN123456789",
  items: [
    { product: mockProducts[0], quantity: 1 },
    { product: mockProducts[1], quantity: 1 },
    { product: mockProducts[4], quantity: 1 },
  ],
  shippingAddress: {
    name: "Linh Nguyen",
    phone: "0900 123 456",
    address: "123 Nguyen Hue, District 1, Ho Chi Minh City",
  },
  status: "Shipping",
};

const timeline = [
  {
    status: "Order Created",
    date: "May 16, 2026 10:30 AM",
    description: "Your order has been placed",
    icon: Package,
    completed: true,
  },
  {
    status: "Order Confirmed",
    date: "May 16, 2026 11:15 AM",
    description: "Payment confirmed, preparing for shipment",
    icon: CheckCircle,
    completed: true,
  },
  {
    status: "Packed",
    date: "May 16, 2026 2:45 PM",
    description: "Items packed and ready for pickup",
    icon: Package,
    completed: true,
  },
  {
    status: "Picked Up",
    date: "May 17, 2026 9:20 AM",
    description: "Package picked up by GHN courier",
    icon: Truck,
    completed: true,
  },
  {
    status: "In Transit",
    date: "May 17, 2026 3:00 PM",
    description: "Package is on the way to your location",
    icon: MapPin,
    completed: true,
    current: true,
  },
  {
    status: "Out for Delivery",
    date: "Expected: May 19, 2026",
    description: "Package will be delivered today",
    icon: Truck,
    completed: false,
  },
  {
    status: "Delivered",
    date: "Expected: May 19, 2026",
    description: "Package delivered successfully",
    icon: Home,
    completed: false,
  },
];

export default function OrderTrackingPage() {
  const [trackingCode, setTrackingCode] = useState("GHN123456789");
  const [showResults, setShowResults] = useState(true);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Order Tracking</h1>
        <p className="text-muted-foreground">
          Track your order status and delivery progress
        </p>
      </div>

      <GlowCard className="mb-8">
        <h3 className="mb-4 font-semibold">Enter Tracking Code</h3>
        <div className="flex gap-3">
          <GlowInput
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            placeholder="Enter GHN or GHTK tracking code..."
            className="flex-1"
          />
          <GlowButton onClick={() => setShowResults(true)}>
            Track Order
          </GlowButton>
        </div>
        <div className="mt-3 flex gap-2">
          <GlowBadge variant="info">GHN Mock</GlowBadge>
          <GlowBadge variant="info">GHTK Mock</GlowBadge>
        </div>
      </GlowCard>

      {showResults && (
        <>
          <GlowCard variant="lavender" className="mb-8">
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="mb-2 text-2xl font-bold">Order {order.id}</h2>
                <p className="text-muted-foreground">Placed on {order.date}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <GlowBadge variant="purple" className="px-4 py-2 text-lg">
                  <Truck className="mr-2 inline h-5 w-5" />
                  {order.status}
                </GlowBadge>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { label: "Tracking Code", value: order.trackingCode },
                { label: "Delivery Provider", value: order.deliveryProvider },
                { label: "Estimated Delivery", value: order.estimatedDelivery },
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-white p-4">
                  <p className="text-muted-foreground mb-1 text-sm">
                    {item.label}
                  </p>
                  <p className="font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </GlowCard>

          <GlowCard className="mb-8">
            <h3 className="mb-6 text-xl font-semibold">Delivery Timeline</h3>
            <div className="space-y-6">
              {timeline.map((step, index) => {
                const Icon = step.icon;
                const isCurrent = "current" in step && step.current;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${step.completed ? "bg-primary text-white" : "bg-secondary text-muted-foreground"} ${isCurrent ? "ring-primary/30 ring-4" : ""}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      {index < timeline.length - 1 && (
                        <div
                          className={`h-12 w-1 ${step.completed ? "bg-primary" : "bg-secondary"}`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="mb-1 flex items-center gap-2">
                        <h4 className="font-semibold">{step.status}</h4>
                        {isCurrent && (
                          <GlowBadge variant="info" className="text-xs">
                            Current
                          </GlowBadge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-1 text-sm">
                        {step.description}
                      </p>
                      <div className="text-muted-foreground flex items-center gap-1 text-xs">
                        <Clock className="h-3 w-3" />
                        {step.date}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlowCard>

          <GlowCard variant="sky" className="mb-8">
            <h3 className="mb-4 text-xl font-semibold">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-4 rounded-lg bg-white p-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground text-sm">
                      {item.product.brand}
                    </p>
                    <p className="font-semibold">{item.product.name}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-muted-foreground text-sm">
                        Qty: {item.quantity}
                      </p>
                      <p className="font-semibold">
                        {item.product.price.toLocaleString()} VNĐ
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-border mt-4 flex items-center justify-between border-t pt-4">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold">
                {order.total.toLocaleString()} VNĐ
              </span>
            </div>
          </GlowCard>

          <GlowCard variant="mint">
            <h3 className="mb-4 text-xl font-semibold">Shipping Address</h3>
            <div className="rounded-lg bg-white p-4">
              <p className="mb-1 font-semibold">{order.shippingAddress.name}</p>
              <p className="text-muted-foreground mb-1 text-sm">
                {order.shippingAddress.phone}
              </p>
              <p className="text-muted-foreground text-sm">
                {order.shippingAddress.address}
              </p>
            </div>
          </GlowCard>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={"/user/shop" as Route} className="flex-1">
              <GlowButton variant="outline" className="w-full">
                Continue Shopping
              </GlowButton>
            </Link>
            <Link href={"/user/routine" as Route} className="flex-1">
              <GlowButton className="w-full">View Routine</GlowButton>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
