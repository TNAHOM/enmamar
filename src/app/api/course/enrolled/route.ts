import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const BASEURL = process.env.BASEURL;
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  try {
    const response = await fetch(`${BASEURL}/courses/enrolled`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return NextResponse.error();
    }
    const data = await response.json();
    return NextResponse.json(data.data);
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
