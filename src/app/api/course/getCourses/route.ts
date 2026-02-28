import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { mockCoursesList } from "@/data/mockCourses";

// Use mock when enabled or when no backend URL (portfolio/demo mode)
const USE_MOCK =
  process.env.NEXT_PUBLIC_USE_MOCK_COURSES === "true" || !process.env.BASEURL;

export async function GET() {
  if (USE_MOCK) {
    return NextResponse.json(mockCoursesList);
  }

  const BASEURL = process.env.BASEURL;
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  try {
    const response = await fetch(`${BASEURL}/courses?page=1&page_size=99`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json(mockCoursesList);
    }

    return NextResponse.json(responseData.data);
  } catch (error) {
    console.warn("Error fetching course:", error);
    return NextResponse.json(mockCoursesList);
  }
}
