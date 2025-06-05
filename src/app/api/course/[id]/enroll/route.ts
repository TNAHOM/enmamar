import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const BASEURL = process.env.BASEURL;
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ detail: "Not authenticated", status: 401 });
  }

  try {
    const response = await fetch(`${BASEURL}/courses/enroll/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.detail || "Course creation failed");
    }
    return NextResponse.json({
      detail: responseData.detail,
      data: responseData.data,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Course creation failed";
    return NextResponse.json({ detail: errorMessage }, { status: 401 });
  }
}

// check if a user is enrolled or not using accessToken
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const BASEURL = process.env.BASEURL;
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ detail: "Not authenticated", status: 401 });
  }

  try {
    const response = await fetch(`${BASEURL}/courses/${id}/is_enrolled`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { detail: responseData.detail || "Failed to fetch enroll status", status: response.status }
      );
    }

    return NextResponse.json({
      detail: responseData.detail,
      data: responseData.data.is_enrolled,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Course creation failed";
    return NextResponse.json({ detail: errorMessage, status: 401 });
  }
}
