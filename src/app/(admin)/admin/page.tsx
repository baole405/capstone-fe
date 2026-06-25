import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";
import { Package, ShoppingCart, Users, AlertTriangle } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Platform overview and management
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <GlowCard variant="sky">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-muted-foreground text-sm">Total Orders</p>
              <p className="text-2xl font-bold">248</p>
            </div>
          </div>
        </GlowCard>

        <GlowCard variant="peach">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-orange-600" />
            <div>
              <p className="text-muted-foreground text-sm">Pending Orders</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </GlowCard>

        <GlowCard variant="yellow">
          <div className="flex items-center gap-3">
            <Package className="h-8 w-8 text-yellow-600" />
            <div>
              <p className="text-muted-foreground text-sm">Low Stock Items</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </GlowCard>

        <GlowCard variant="mint">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-muted-foreground text-sm">Active Users</p>
              <p className="text-2xl font-bold">1,847</p>
            </div>
          </div>
        </GlowCard>
      </div>

      <GlowCard variant="yellow" className="mb-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
          <div className="flex-1">
            <p className="mb-1 font-semibold">Low Stock Alert</p>
            <p className="text-muted-foreground mb-3 text-sm">
              Beauty of Joseon Relief Sun is low stock (2 units). This may
              affect routine re-purchase recommendations.
            </p>
            <GlowBadge variant="warning">Action Required</GlowBadge>
          </div>
        </div>
      </GlowCard>

      <GlowCard>
        <h3 className="mb-4 font-semibold">Recent Activity</h3>
        <div className="space-y-3">
          {[
            {
              color: "bg-primary",
              text: "New order #1284 - Linh Nguyen",
              time: "2 min ago",
            },
            {
              color: "bg-yellow-600",
              text: "Low stock alert: Beauty of Joseon Relief Sun",
              time: "15 min ago",
            },
            {
              color: "bg-green-600",
              text: "Expert consultation completed - Dr. Minh Anh",
              time: "1 hour ago",
            },
          ].map((item) => (
            <div
              key={item.text}
              className="bg-muted flex items-center justify-between rounded-lg p-3"
            >
              <div className="flex items-center gap-3">
                <div className={`h-2 w-2 ${item.color} rounded-full`} />
                <span className="text-sm">{item.text}</span>
              </div>
              <span className="text-muted-foreground text-xs">{item.time}</span>
            </div>
          ))}
        </div>
      </GlowCard>
    </div>
  );
}
