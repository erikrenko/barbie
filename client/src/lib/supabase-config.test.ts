import { describe, expect, it } from "vitest";

const rawProjectUrl = (import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL)?.replace(/\/$/, "");
const projectUrl = rawProjectUrl?.startsWith("http") ? rawProjectUrl : rawProjectUrl ? `https://${rawProjectUrl}.supabase.co` : undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

describe("Supabase frontend configuration", () => {
  it("can reach the Storage API with the browser-safe key", async () => {
    expect(projectUrl).toMatch(/^https:\/\/[^/]+\.supabase\.co$/);
    expect(anonKey).toBeTruthy();
    expect(anonKey).not.toMatch(/service_role/i);

    const response = await fetch(`${projectUrl}/storage/v1/bucket`, {
      headers: {
        apikey: anonKey as string,
        Authorization: `Bearer ${anonKey}`,
      },
    });

    expect(response.ok).toBe(true);
  });
});
