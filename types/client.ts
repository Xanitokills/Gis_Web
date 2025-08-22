import type { ID, WithTimestamps } from "./common";

export type Client = WithTimestamps & {
  id: ID;
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  dni?: string | null;
  clientType: "buyer" | "seller" | "tenant" | "owner";
  status: "active" | "inactive";
  notes?: string | null;
};
