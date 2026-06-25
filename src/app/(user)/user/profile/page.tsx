"use client";

import { useState } from "react";
import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";
import { GlowButton } from "@/components/glow/button";
import { GlowInput } from "@/components/glow/input";
import { mockUser } from "@/lib/mock-data";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Edit,
  Save,
  AlertCircle,
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    location: mockUser.location,
    allergies: mockUser.allergies.join(", "),
  });

  const handleSave = () => setIsEditing(false);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <GlowButton
            variant={isEditing ? "primary" : "outline"}
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </>
            )}
          </GlowButton>
        </div>
        <p className="text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <GlowCard>
            <h3 className="mb-4 text-xl font-semibold">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Full Name
                </label>
                {isEditing ? (
                  <GlowInput
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                ) : (
                  <div className="bg-muted flex items-center gap-2 rounded-lg p-3">
                    <User className="text-muted-foreground h-4 w-4" />
                    <span>{formData.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                {isEditing ? (
                  <GlowInput
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                ) : (
                  <div className="bg-muted flex items-center gap-2 rounded-lg p-3">
                    <Mail className="text-muted-foreground h-4 w-4" />
                    <span>{formData.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Location
                </label>
                {isEditing ? (
                  <GlowInput
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                ) : (
                  <div className="bg-muted flex items-center gap-2 rounded-lg p-3">
                    <MapPin className="text-muted-foreground h-4 w-4" />
                    <span>{formData.location}</span>
                  </div>
                )}
              </div>
            </div>
          </GlowCard>

          <GlowCard variant="lavender">
            <h3 className="mb-4 text-xl font-semibold">Skin Profile</h3>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-white p-4">
                <p className="text-muted-foreground mb-1 text-sm">Skin Type</p>
                <p className="font-semibold capitalize">{mockUser.skinType}</p>
              </div>
              <div className="rounded-lg bg-white p-4">
                <p className="text-muted-foreground mb-1 text-sm">
                  Last Assessment
                </p>
                <p className="font-semibold">May 16, 2026</p>
              </div>
            </div>
            <div className="mb-4 rounded-lg bg-white p-4">
              <p className="mb-2 text-sm font-medium">Main Concerns</p>
              <div className="flex flex-wrap gap-2">
                {mockUser.concerns.map((concern) => (
                  <GlowBadge key={concern} variant="warning">
                    {concern}
                  </GlowBadge>
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-white p-4">
              <p className="mb-2 text-sm font-medium">Skin Goals</p>
              <div className="flex flex-wrap gap-2">
                {mockUser.skinGoals.map((goal, index) => (
                  <GlowBadge key={index} variant="success">
                    {goal}
                  </GlowBadge>
                ))}
              </div>
            </div>
          </GlowCard>

          <GlowCard variant="peach">
            <div className="mb-4 flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600" />
              <div className="flex-1">
                <h3 className="mb-1 text-xl font-semibold">
                  Allergy Information
                </h3>
                <p className="text-muted-foreground text-sm">
                  Keep this updated to avoid products with conflicting
                  ingredients
                </p>
              </div>
            </div>
            {isEditing ? (
              <GlowInput
                value={formData.allergies}
                onChange={(e) =>
                  setFormData({ ...formData, allergies: e.target.value })
                }
                placeholder="e.g., Fragrance, Alcohol, Parabens"
              />
            ) : (
              <div className="rounded-lg bg-white p-4">
                <div className="flex flex-wrap gap-2">
                  {mockUser.allergies.map((allergy) => (
                    <GlowBadge key={allergy} variant="danger">
                      {allergy}
                    </GlowBadge>
                  ))}
                </div>
              </div>
            )}
          </GlowCard>
        </div>

        <div className="space-y-6">
          <GlowCard variant="sky">
            <h3 className="mb-4 font-semibold">Account Stats</h3>
            <div className="space-y-3">
              {[
                { label: "Member Since", value: "April 2026" },
                { label: "Total Orders", value: "3" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-lg bg-white p-3"
                >
                  <span className="text-muted-foreground text-sm">
                    {item.label}
                  </span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between rounded-lg bg-white p-3">
                <span className="text-muted-foreground text-sm">
                  Active Routine
                </span>
                <GlowBadge variant="success">Yes</GlowBadge>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white p-3">
                <span className="text-muted-foreground text-sm">
                  Consultations
                </span>
                <span className="font-semibold">1</span>
              </div>
            </div>
          </GlowCard>

          <GlowCard variant="mint">
            <h3 className="mb-4 font-semibold">Quick Actions</h3>
            <div className="space-y-2">
              <GlowButton variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Update Assessment
              </GlowButton>
              <GlowButton variant="outline" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Change Password
              </GlowButton>
              <GlowButton variant="outline" className="w-full justify-start">
                <Mail className="mr-2 h-4 w-4" />
                Notification Settings
              </GlowButton>
            </div>
          </GlowCard>

          <GlowCard>
            <h3 className="mb-4 font-semibold">Privacy & Data</h3>
            <div className="space-y-3 text-sm">
              {["Email Notifications", "Progress Tracking"].map((label) => (
                <div key={label} className="flex items-center justify-between">
                  <span>{label}</span>
                  <label className="relative inline-block h-6 w-10">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      defaultChecked
                    />
                    <div className="peer peer-checked:bg-primary h-6 w-10 rounded-full bg-gray-200 peer-focus:outline-none after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}
