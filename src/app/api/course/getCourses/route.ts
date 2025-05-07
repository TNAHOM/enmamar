import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const BASEURL = process.env.BASEURL;
  console.log(BASEURL, "BASEURL from getCourse");
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  try {
    const response = await fetch(`${BASEURL}/course?page=1&page_size=25`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseData = await response.json();
    // console.log(responseData, "responseData from getCourse");

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch course" },
        { status: response.status }
      );
    }

    return NextResponse.json(responseData.data);
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
