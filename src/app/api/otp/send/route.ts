import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const BASEURL = process.env.BASEURL;
  const { phone_number } = await request.json();

  try {
    const response = await fetch(
      `${BASEURL}/auth/otp/send/?phone_number=${phone_number}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorMessage =
        response instanceof Error ? response.message : "Failed to send OTP";
      return NextResponse.json({
        detail: errorMessage,
        status: response.status,
      });
    }

    return NextResponse.json({
      detail: "OTP sent successfully",
      data: { phone_number: phone_number },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to send OTP";
    return NextResponse.json({ detail: errorMessage, status: 500 });
  }
}
