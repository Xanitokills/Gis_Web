import type { ID, WithTimestamps } from "./common";

export type Lead = WithTimestamps & {
  id: ID;
  name: string;
  email: string;
  phone?: string | null;
  source: "website" | "referral" | "facebook" | "instagram" | "other";
  status: "new" | "contacted" | "qualified" | "converted" | "lost";
  priority: "low" | "medium" | "high";
  budget?: number | null;
  notes?: string | null;
  propertyId?: ID | null;
  clientId?: ID | null;
};
