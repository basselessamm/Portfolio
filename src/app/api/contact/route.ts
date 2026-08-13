import { NextResponse } from "next/server";
import { addContactMessage } from "@/lib/storage";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const savedMessage = await addContactMessage({ name, email, subject, message });
    return NextResponse.json({ success: true, message: "Message sent successfully!", data: savedMessage });
  } catch (error) {
    console.error("Error processing contact message:", error);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}
