import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";
import { GlowButton } from "@/components/glow/button";
import { mockClinics } from "@/lib/mock-data";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";

export default function ClinicsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Partner Clinics</h1>
        <p className="text-muted-foreground">
          Find trusted dermatology and skincare clinics near you
        </p>
      </div>

      <GlowCard
        variant="sky"
        className="mb-8 flex h-64 items-center justify-center"
      >
        <div className="text-center">
          <MapPin className="mx-auto mb-2 h-12 w-12 text-blue-600" />
          <p className="text-muted-foreground">
            Map view with clinic locations
          </p>
        </div>
      </GlowCard>

      <div className="mb-6 flex gap-3 overflow-x-auto">
        {["District 1", "District 3", "Binh Thanh", "Tan Binh"].map((d) => (
          <GlowButton key={d} variant="outline" size="sm">
            {d}
          </GlowButton>
        ))}
      </div>

      <div className="space-y-6">
        {mockClinics.map((clinic) => (
          <GlowCard key={clinic.id}>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-1">
                <div className="aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-green-100 to-blue-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={clinic.image}
                    alt={clinic.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="mb-1 text-xl font-semibold">
                      {clinic.name}
                    </h3>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>{clinic.district}</span>
                    </div>
                  </div>
                  <GlowBadge variant="success">Partner</GlowBadge>
                </div>

                <div className="mb-4 space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>{clinic.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="text-muted-foreground h-4 w-4" />
                    <span>{clinic.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="text-muted-foreground h-4 w-4" />
                    <span>{clinic.openingHours}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="mb-2 text-sm font-medium">Services:</p>
                  <div className="flex flex-wrap gap-2">
                    {clinic.services.map((service) => (
                      <GlowBadge key={service} variant="info">
                        {service}
                      </GlowBadge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <GlowButton>Book Consultation</GlowButton>
                  <GlowButton variant="outline">
                    <Navigation className="mr-2 h-4 w-4" />
                    Get Directions
                  </GlowButton>
                </div>
              </div>
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  );
}
