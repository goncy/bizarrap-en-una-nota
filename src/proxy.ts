import {NextResponse, type NextRequest} from "next/server";

import data from "./data.json";

export const config = {
  matcher: "/",
};

export default function proxy(request: NextRequest) {
  const track = data[Math.floor(Math.random() * data.length)];

  request.nextUrl.pathname = `/${String(track.value)}`;

  return NextResponse.rewrite(request.nextUrl);
}
