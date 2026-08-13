import { NextResponse } from "next/server";
import { getContactMessages, deleteContactMessage, toggleMessageRead } from "@/lib/storage";

export async function GET() {
  const messages = await getContactMessages();
  return NextResponse.json({ success: true, messages });
}

export async function PATCH(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    
    await toggleMessageRead(id);
    return NextResponse.json({ success: true, message: "Status toggled" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });

    await deleteContactMessage(id);
    return NextResponse.json({ success: true, message: "Message deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
