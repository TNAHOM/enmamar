import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const BASEURL = process.env.BASEURL;

  try {
    const response = await fetch(`${BASEURL}/analysis/instructor/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { detail: responseData.detail },
        { status: response.status }
      );
    }

    return NextResponse.json(responseData.data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Course creation failed";

    console.warn(errorMessage, "errorMessage");

    return NextResponse.json({ detail: errorMessage, status: 500 });
  }
}
