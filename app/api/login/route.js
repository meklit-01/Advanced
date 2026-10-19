import { cookies } from "next/headers";
import {
  getSessionCookieOptions,
  makeSession,
} from "@/lib/session";

function safeNext(value) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\")
  ) {
    return "/orders";
  }

  return value;
}

export async function POST(request) {
  try {
    const body = await request.json();

    const username =
      typeof body.username === "string"
        ? body.username.trim().toLowerCase()
        : "";

    if (!username) {
      return Response.json(
        { error: "Username is required." },
        { status: 400 }
      );
    }

    let id = "user-123";
    let role = "user";

    if (username === "abebe") {
      id = "user-alice";
    } else if (username === "melkam") {
      id = "user-bob";
    } else if (username === "staff") {
      id = "staff-123";
      role = "staff";
    }

    const session = makeSession(id, role);
    const cookieStore = await cookies();

    cookieStore.set(
      "session",
      session,
      getSessionCookieOptions()
    );

    return Response.json({
      success: true,
      redirect: safeNext(body.next),
    });
  } catch (error) {
    console.error("LOGIN API ERROR:", error);

    return Response.json(
      { error: "Login failed. Check the server logs." },
      { status: 500 }
    );
  }
}
