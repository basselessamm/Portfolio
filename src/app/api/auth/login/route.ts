import { NextResponse } from "next/server";
import { verifyAdminPassword, createAdminSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ success: false, error: "Password is required" }, { status: 400 });
    }

    if (verifyAdminPassword(password)) {
      await createAdminSession();
      return NextResponse.json({ success: true, message: "Authenticated successfully" });
    } else {
      return NextResponse.json({ success: false, error: "Invalid admin password" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
