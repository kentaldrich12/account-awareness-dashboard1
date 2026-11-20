import { getStore } from "@netlify/blobs";
import { timingSafeEqual } from "node:crypto";

const STORE = "awareness-exercise";
const KEY = "submission-events";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
  });
}

function passcodeMatches(candidate, expected) {
  if (typeof candidate !== "string" || !expected) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export default async (request) => {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let body;
  try { body = await request.json(); }
  catch { return json({ error: "Invalid request" }, 400); }

  const store = getStore(STORE);

  if (body.action === "record") {
    // Intentionally accept no user-supplied form fields or credentials.
    const events = (await store.get(KEY, { type: "json" })) || [];
    events.push({ type: "demo_submission", at: new Date().toISOString() });
    await store.set(KEY, JSON.stringify(events.slice(-1000)), {
      contentType: "application/json"
    });
    return json({ ok: true });
  }

  if (body.action === "list") {
    const expected = process.env.DASHBOARD_PASSCODE;
    if (!passcodeMatches(body.passcode, expected)) return json({ error: "Unauthorized" }, 401);
    const events = (await store.get(KEY, { type: "json" })) || [];
    return json({ events });
  }

  return json({ error: "Unknown action" }, 400);
};