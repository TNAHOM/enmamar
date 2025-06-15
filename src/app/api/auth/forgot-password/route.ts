import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const BASEURL = process.env.BASEURL;
  const { phone_number } = await request.json();

  try {
    const response = await fetch(`${BASEURL}/auth/forget-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone_number }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage =
        response instanceof Error ? response.message : "Failed to verify OTP";
      return NextResponse.json({
        detail: responseData.detail.data.response.errors[0] || errorMessage,
        status: response.status,
      });
    }

    return NextResponse.json({
      detail: "Password reset OTP sent successfully",
      data: { phone_number: phone_number }, status: 200
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to send password reset OTP";
    return NextResponse.json({ detail: errorMessage }, { status: 500 });
  }
}
