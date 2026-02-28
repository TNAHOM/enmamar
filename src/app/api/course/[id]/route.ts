import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getMockCourseDetail } from "@/data/mockCourses";

const USE_MOCK =
  process.env.NEXT_PUBLIC_USE_MOCK_COURSES === "true" || !process.env.BASEURL;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (USE_MOCK) {
    const mock = getMockCourseDetail(id);
    if (mock) return NextResponse.json(mock);
    return NextResponse.json(
      { error: "Course not found" },
      { status: 404 }
    );
  }

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
      const mock = getMockCourseDetail(id);
      if (mock) return NextResponse.json(mock);
      return NextResponse.json(
        { error: "Failed to fetch course" },
        { status: response.status }
      );
    }
    return NextResponse.json(responseData.data);
  } catch (error) {
    console.warn("Error fetching course:", error);
    const mock = getMockCourseDetail(id);
    if (mock) return NextResponse.json(mock);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  const BASEURL = process.env.BASEURL;

  try {
    const response = await fetch(`${BASEURL}/admin/courses/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseData = await response.json();
    console.log("Response data:", responseData);

    if (!response.ok) {
      return NextResponse.json({
        error: "Failed to delete course",
        status: response.status,
      });
    }

    return NextResponse.json({
      message: "Course deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.log("Error deleting course:", error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Failed to delete course",
      status: 500,
    });
  }
}
