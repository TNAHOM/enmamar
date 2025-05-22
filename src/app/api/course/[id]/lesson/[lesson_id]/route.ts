import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; lesson_id: string }> }
) {
  const { id, lesson_id } = await params;
  const BASEURL = process.env.BASEURL;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    console.log("Unauthorized access");
    return NextResponse.json({
      error: "Unauthorized to access Please signUp",
      status: 401,
    });
  }

  try {
    const response = await fetch(`${BASEURL}/lesson/${id}/${lesson_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.log("Failed to fetch lesson:", responseData);
      return NextResponse.json({
        error: responseData.detail,
        status: response.status,
      });
    }
    const data = await responseData.data;
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch lesson";
    return NextResponse.json({ detail: errorMessage, status: 500 });
  }
}
