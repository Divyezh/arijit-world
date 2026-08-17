import { NextRequest, NextResponse } from "next/server";

// Base listener count starts at 1,000
const BASE_COUNT = 1000;
const SESSION_TTL_MS = 25000; // 25 seconds timeout for inactive sessions

// Store active sessions in global scope to persist across hot reloads in dev
interface GlobalPresence {
  activeSessions: Map<string, number>;
}

const globalPresence: GlobalPresence = (globalThis as any).__arijit_presence || {
  activeSessions: new Map<string, number>(),
};

(globalThis as any).__arijit_presence = globalPresence;

function cleanStaleSessions() {
  const now = Date.now();
  for (const [id, lastSeen] of globalPresence.activeSessions.entries()) {
    if (now - lastSeen > SESSION_TTL_MS) {
      globalPresence.activeSessions.delete(id);
    }
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");

  if (sessionId) {
    globalPresence.activeSessions.set(sessionId, Date.now());
  }

  cleanStaleSessions();

  const realActive = Math.max(1, globalPresence.activeSessions.size);
  const totalCount = BASE_COUNT + realActive;

  return NextResponse.json(
    {
      count: totalCount,
      activeUsers: realActive,
      base: BASE_COUNT,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    let body: any = {};
    const text = await req.text();
    if (text) {
      try {
        body = JSON.parse(text);
      } catch {
        // Fallback for form data or plain text
      }
    }

    const sessionId = body.sessionId;
    const action = body.action;

    if (sessionId) {
      if (action === "leave") {
        globalPresence.activeSessions.delete(sessionId);
      } else {
        globalPresence.activeSessions.set(sessionId, Date.now());
      }
    }

    cleanStaleSessions();

    const realActive = Math.max(1, globalPresence.activeSessions.size);
    const totalCount = BASE_COUNT + realActive;

    return NextResponse.json({
      count: totalCount,
      activeUsers: realActive,
      base: BASE_COUNT,
    });
  } catch {
    return NextResponse.json({ count: BASE_COUNT + 1, activeUsers: 1, base: BASE_COUNT });
  }
}
