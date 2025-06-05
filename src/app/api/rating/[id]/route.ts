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

  try {
    const response = await fetch(`${BASEURL}/reviews/course/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    const responseData = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { detail: responseData.detail || "Comment creation failed" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      detail: responseData.detail,
      data: responseData.data,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Comment creation failed";
    return NextResponse.json({ detail: errorMessage }, { status: 500 });
  }
}
