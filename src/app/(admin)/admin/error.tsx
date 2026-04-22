"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AdminErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AdminError({ error, reset }: AdminErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="page-shell">
      <Card className="surface-glass max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">
            The admin shell hit an unexpected error.
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4 text-sm">
          <p>
            This is a scaffold-level boundary. If the problem persists, inspect
            the failing route module or backend proxy response.
          </p>
          <Button onClick={reset}>Retry</Button>
        </CardContent>
      </Card>
    </div>
  );
}
