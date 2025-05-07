import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const BASEURL = process.env.BASEURL;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const response = await fetch(`${BASEURL}/analysis/instructor/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error("Failed to fetch instructor courses");
    }

    return NextResponse.json(responseData.data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Course creation failed";

    return NextResponse.json({ detail: errorMessage }, { status: 500 });
  }
}
