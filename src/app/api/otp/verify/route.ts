import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const BASEURL = process.env.BASEURL;
  const { phone_number, code } = await request.json();

  try {
    const fetchUrl = `${BASEURL}/auth/otp/verify?phone_number=${phone_number}&code=${code}`;
    const response = await fetch(fetchUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
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
      message: "OTP verified successfully",
      status: 200,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to verify OTP";
    return NextResponse.json({ detail: errorMessage, status: 500 });
  }
}
