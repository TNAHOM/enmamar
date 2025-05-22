import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const BASEURL = process.env.BASEURL;
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated", status: 401 });
  }

  try {
    const response = await fetch(
      `${BASEURL}/courses/enrolled?page=1&page_size=100`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json({
        error: "Failed to fetch enrolled courses",
        status: response.status,
      });
    }
    const data = await response.json();
    return NextResponse.json(data.data);
  } catch (error) {
    console.warn("Error fetching course:", error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Internal server error",
      status: 500,
    });
  }
}
