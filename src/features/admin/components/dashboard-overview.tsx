import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  adminSections,
  backendQuestions,
  dashboardHighlights,
} from "../config/admin-sections";

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <Card className="surface-glass overflow-hidden border-none">
          <div className="h-full bg-[linear-gradient(145deg,rgba(255,255,255,0.88),rgba(216,239,236,0.92))] p-6">
            <Badge variant="outline" className="mb-4">
              Admin v1 scaffold
            </Badge>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl leading-tight font-semibold">
                The frontend is now organized around Next.js App Router, a BFF
                auth proxy, and module-first admin routing.
              </h1>
              <p className="text-muted-foreground max-w-3xl text-base">
                This is intentionally not a marketing shell. It is a strict
                admin foundation: authenticated entry, sidebar navigation,
                placeholder modules, shared loading/error states, and a clean
                boundary for future OpenAPI-generated clients.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button render={<Link href="/admin/products" />}>
                Open a module shell
              </Button>
              <Button variant="outline" render={<Link href="/login" />}>
                Review auth entry
              </Button>
            </div>
          </div>
        </Card>

        <Card className="surface-glass">
          <CardHeader>
            <CardTitle>Highlights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardHighlights.map((item) => (
              <div
                key={item.label}
                className="border-border/70 rounded-2xl border p-4"
              >
                <p className="text-muted-foreground text-xs font-medium tracking-[0.22em] uppercase">
                  {item.label}
                </p>
                <p className="mt-2 text-xl font-semibold">{item.value}</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  {item.detail}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {adminSections.map((section) => (
          <Card key={section.slug} className="surface-glass">
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="bg-primary/10 text-primary rounded-2xl p-3">
                  <section.icon className="size-5" />
                </div>
                <Badge variant="outline">{section.priority}</Badge>
              </div>
              <div className="space-y-2">
                <CardTitle>{section.title}</CardTitle>
                <p className="text-muted-foreground text-sm">
                  {section.summary}
                </p>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-4">
              <p className="text-muted-foreground text-xs tracking-[0.22em] uppercase">
                {section.outcomes.length} initial outcomes
              </p>
              <Button
                variant="outline"
                size="sm"
                render={<Link href={`/admin/${section.slug}`} />}
              >
                Open
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="surface-glass">
        <CardHeader>
          <CardTitle>Questions to take back to BE</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-3 md:grid-cols-2">
            {backendQuestions.map((question) => (
              <li
                key={question}
                className="border-border text-muted-foreground rounded-2xl border border-dashed p-4 text-sm"
              >
                {question}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
