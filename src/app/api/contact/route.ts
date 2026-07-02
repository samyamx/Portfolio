import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Simple validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields (name, email, message)." },
        { status: 400 }
      );
    }

    // In a live environment, you would integrate Resend/Formspree/SendGrid here:
    // e.g., using Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ ... });
    
    console.log("Contact Form Submission Received:", { name, email, subject, message });

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json(
      { message: "Message received successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact Form API Error:", error);
    return NextResponse.json(
      { message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
