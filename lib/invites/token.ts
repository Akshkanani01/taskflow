import crypto from "node:crypto";

const TOKEN_BYTES = 64;

export function generateInviteToken(): string {
  return crypto
    .randomBytes(TOKEN_BYTES)
    .toString("base64url");
}

export function generateInviteExpiry(
  days = 7
): Date {
  const expiresAt = new Date();

  expiresAt.setDate(
    expiresAt.getDate() + days
  );

  return expiresAt;
}

export function isInviteExpired(
  expiresAt: Date
): boolean {
  return expiresAt.getTime() < Date.now();
}