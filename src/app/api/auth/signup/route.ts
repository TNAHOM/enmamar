import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const BASEURL = process.env.BASEURL;
  try {
    const userData = await request.json();

    const response = await fetch(`${BASEURL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log(data, "data signup");
    if (!response.ok) {
      const errorMessage = data.detail || "Registration failed";
      return NextResponse.json(
        { detail: errorMessage },
        { status: data.status }
      );
    }

    return NextResponse.json({
      detail: data.detail,
      user: data.user,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Registration failed";
    console.log(errorMessage, "errorMessage form signup");
    console.log(error, "error from signup");
    return NextResponse.json({ detail: errorMessage }, { status: 400 });
  }
}
