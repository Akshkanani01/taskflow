import { getCurrentUser } from "@/lib/session";

export async function requireUser() {
  return await getCurrentUser();
}