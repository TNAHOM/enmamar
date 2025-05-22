import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const BASEURL = process.env.BASEURL;
  const body = await request.json();
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ detail: "Unauthorized", status: 401 });
  }

  try {
    const response = await fetch(`${BASEURL}/comments/course/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    const responseData = await response.json();
    if (!response.ok) {
      console.log("Failed to create comment:", responseData);
      return NextResponse.json({
        detail: responseData.detail || "Comment creation failed",
        status: response.status,
      });
    }

    return NextResponse.json({
      detail: responseData.detail,
      data: responseData.data,
    });
  } catch (error) {
    console.log(error, "error from comment creation route");
    const errorMessage =
      error instanceof Error ? error.message : "Comment creation failed";
    return NextResponse.json({ detail: errorMessage, status: 500 });
  }
}

// GET request
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const BASEURL = process.env.BASEURL;

  try {
    const response = await fetch(`${BASEURL}/comments/course/${id}`, {
      method: "GET",
      headers: {},
    });

    const responseData = await response.json();
    if (!response.ok) {
      console.log("Failed to create comment:", responseData);
      return NextResponse.json({
        detail: responseData.detail || "Comment creation failed",
        status: response.status,
      });
    }

    return NextResponse.json({
      detail: responseData.detail,
      data: responseData.data,
    });
  } catch (error) {
    console.log(error, "error from comment creation route");
    const errorMessage =
      error instanceof Error ? error.message : "Comment creation failed";
    return NextResponse.json({ detail: errorMessage, status: 401 });
  }
}
