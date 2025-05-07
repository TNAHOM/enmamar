import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const BASEURL = process.env.BASEURL;
  const { course_id, lesson_id, ...data } = await request.json();
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  try {
    const response = await fetch(
      `${BASEURL}/protected/course/${course_id}/lessons/${lesson_id}/video`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { detail: responseData.detail || "Lesson creation failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      detail: responseData.detail,
      lesson: responseData.lesson,
    });
  } catch (error) {
    console.log(error, "error from lesson creation route");
    const errorMessage =
      error instanceof Error ? error.message : "Lesson creation failed";
    return NextResponse.json({ detail: errorMessage }, { status: 401 });
  }
}
