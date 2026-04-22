"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query/keys";

import { getSession } from "../api/auth-client";

export function useSession() {
  return useQuery({
    queryKey: queryKeys.session,
    queryFn: getSession,
  });
}
