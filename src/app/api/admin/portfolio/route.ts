import { NextResponse } from "next/server";
import { getPortfolioData, savePortfolioData, PortfolioData } from "@/lib/storage";

export async function GET() {
  const data = await getPortfolioData();
  return NextResponse.json({ success: true, data });
}

export async function POST(request: Request) {
  try {
    const body: PortfolioData = await request.json();
    const success = await savePortfolioData(body);

    if (success) {
      return NextResponse.json({ success: true, message: "Portfolio content updated successfully" });
    } else {
      return NextResponse.json({ success: false, error: "Failed to save data" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid payload or server error" }, { status: 500 });
  }
}
