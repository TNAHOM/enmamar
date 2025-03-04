import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log(request, "request from course creation route");
  const BASEURL = process.env.BASEURL;
  const { title, description, price } = await request.json();
  const instructor_id = "e1bf65cc-eb8c-4526-a559-c21cc5e38944";

  console.log(title, description, price, instructor_id)
  try {
    const response = await fetch(`${BASEURL}/course/add`, {
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({title, description, price ,instructor_id}),
    });

    const responseData = await response.json();
    // console.log(responseData,"data from course creation route");
    if (!response.ok) {
      throw new Error(responseData.detail || "Course creation failed");
    }

    return NextResponse.json({
      detail: responseData.detail,
      course: responseData.course,
    });
  } catch (error) {
    console.log(error, "error from course creation route");
    const errorMessage =
      error instanceof Error ? error.message : "Course creation failed";
    return NextResponse.json({ detail: errorMessage }, { status: 401 });
  }
}
