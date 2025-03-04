import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log(request, "request from course creation route");
  const BASEURL = process.env.BASEURL;
  const { title, description, price } = await request.json();

  try {
    const response = await fetch(`${BASEURL}/course/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, price }),
    });

    const data = await response.json();
    console.log(data, "data from course creation route");
    if (!response.ok) {
      throw new Error(data.detail || "Course creation failed");
    }

    return NextResponse.json({
      detail: data.detail,
      course: data.course,
    });
  } catch (error) {
    console.log(error, "error from course creation route");
    const errorMessage =
      error instanceof Error ? error.message : "Course creation failed";
    return NextResponse.json({ detail: errorMessage }, { status: 401 });
  }
}
