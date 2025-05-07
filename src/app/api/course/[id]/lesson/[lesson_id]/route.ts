import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; lesson_id: string } }
) {
  const { id, lesson_id } = await params;
  const BASEURL = process.env.BASEURL;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  // console.log(id, "course_id", lesson_id, "lesson id  from route course/lesson");

  try {
    const response = await fetch(
      `${BASEURL}/course/${id}/lesson/${lesson_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: responseData.detail },
        { status: response.status }
      );
    }
    return NextResponse.json(responseData.data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch lesson";
    return NextResponse.json({ detail: errorMessage }, { status: 500 });
  }
}
