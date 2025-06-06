import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const BASEURL = process.env.BASEURL;

  try {
    const response = await fetch(`${BASEURL}/courses/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch course" },
        { status: response.status }
      );
    }
    return NextResponse.json(responseData.data);
  } catch (error) {
    console.warn("Error fetching course:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
