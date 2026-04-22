import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type AdminShellLoadingProps = {
  label: string;
};

export function AdminShellLoading({ label }: AdminShellLoadingProps) {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">{label}</p>
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="surface-glass">
            <CardHeader className="space-y-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-7 w-40" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
