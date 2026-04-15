import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// NSL5IY2e → Welcome to WaveNxt
// u8aBZKdH → WaveNxt Product Overview
// pZSSLOtI → WaveNxt Webinar - RF Signal Control
// 1Vy93j29 → WaveNxt - Butler Matrix Arrays
// U8xF9lmH → WaveNxt - Digital Attenuator
// pR23T6F0 → WaveNxt - 16x8 Matrix System
// KN3XzHQy → WaveNxt - Programmable Mesh Attenuator
const newsletters: Record<string, string> = {
  "NSL5IY2e": "NSL5IY2e.html",
  "u8aBZKdH": "u8aBZKdH.html",
  "pZSSLOtI": "pZSSLOtI.html",
  "1Vy93j29": "1Vy93j29.html",
  "U8xF9lmH": "U8xF9lmH.html",
  "pR23T6F0": "pR23T6F0.html",
  "KN3XzHQy": "KN3XzHQy.html",
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const file = newsletters[slug];

  if (!file) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const filePath = path.join(process.cwd(), "public", "newsletter", file);
  const html = fs.readFileSync(filePath, "utf-8");

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
