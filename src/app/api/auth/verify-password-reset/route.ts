import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const BASEURL = process.env.BASEURL;
  const { phone_number, code } = await request.json();

  try {
    const response = await fetch(`${BASEURL}/auth/verify-otp-password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone_number, code }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage =
        response instanceof Error ? response.message : "Failed to send OTP";
      return NextResponse.json({
        detail: responseData.detail.data.response.errors[0] || errorMessage,
        status: response.status,
      });
    }

    return NextResponse.json(
      {
        detail: responseData.detail,
        reset_token: responseData.reset_token,
        status_code: responseData.status_code,
      },
      { status: response.status }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to verify password reset OTP";
    return NextResponse.json({ detail: errorMessage }, { status: 500 });
  }
}
