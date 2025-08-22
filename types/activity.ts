import type { ID, WithTimestamps } from "./common";

export type Activity = WithTimestamps & {
  id: ID;
  type: "call" | "email" | "meeting" | "viewing" | "follow_up";
  title: string;
  description?: string | null;
  status: "pending" | "completed" | "cancelled";
  dueDate?: string | null;
  completedAt?: string | null;
  propertyId?: ID | null;
  clientId?: ID | null;
  leadId?: ID | null;
};
