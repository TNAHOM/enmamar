import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const BASEURL = process.env.BASEURL;
  const { new_password, reset_token } = await request.json();

  try {
    const response = await fetch(`${BASEURL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ new_password, reset_token }),
    });
    const responseData = await response.json();
    
    if (!response.ok) {
      const errorMessage = responseData.detail || "Failed to reset password";
      return NextResponse.json(
        { detail: errorMessage },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { detail: responseData.detail || "Password reset successfully" },
      { status: response.status }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to reset password";
    return NextResponse.json({ detail: errorMessage }, { status: 500 });
  }
}
