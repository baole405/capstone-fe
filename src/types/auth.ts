export type SessionUser = {
  id: string;
  keycloakSub: string;
  email: string | null;
  name: string | null;
  provider: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AuthStatus = {
  authenticated: boolean;
};
