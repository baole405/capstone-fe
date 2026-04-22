import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { AdminSectionViewModel } from "../types/admin-content";

type AdminSectionPageProps = {
  data: AdminSectionViewModel;
};

export function AdminSectionPage({ data }: AdminSectionPageProps) {
  const { section } = data;

  return (
    <div className="space-y-6">
      <section className="space-y-4 rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-sm backdrop-blur">
        <Badge variant="outline" className="w-fit">
          {section.priority} module
        </Badge>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold">{section.title}</h1>
          <p className="text-muted-foreground max-w-3xl text-base">
            {section.summary}
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="surface-glass">
          <CardHeader>
            <CardTitle>First implementation outcomes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-muted-foreground space-y-3 text-sm">
              {section.outcomes.map((outcome) => (
                <li key={outcome} className="bg-muted/55 rounded-2xl p-3">
                  {outcome}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="surface-glass">
          <CardHeader>
            <CardTitle>Backend questions to clear before wiring data</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-muted-foreground space-y-3 text-sm">
              {section.blockers.map((blocker) => (
                <li
                  key={blocker}
                  className="border-border rounded-2xl border border-dashed p-3"
                >
                  {blocker}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
