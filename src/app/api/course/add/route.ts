import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const BASEURL = process.env.BASEURL;
  const data = await request.json();
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }
  // console.log(data, "data from course creation route");
  try {
    const response = await fetch(`${BASEURL}/admin/courses/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.detail || "Course creation failed");
    }

    return NextResponse.json({
      detail: responseData.detail,
      data: responseData.data,
    });
  } catch (error) {
    console.log(error, "error from course creation route");
    const errorMessage =
      error instanceof Error ? error.message : "Course creation failed";
    return NextResponse.json({ detail: errorMessage }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  const BASEURL = process.env.BASEURL;
  const data = await request.json();
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  if (!accessToken) {
    console.log("Not authenticated");
    return NextResponse.json({ detail: "Not authenticated", status: 401 });
  }

  // Extract course ID from the data
  const { courseId, ...updateData } = data;

  if (!courseId) {
    return NextResponse.json(
      { detail: "Course ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${BASEURL}/admin/courses/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updateData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.detail || "Course update failed");
    }

    return NextResponse.json({
      detail: responseData.detail,
      data: responseData.data,
    });
  } catch (error) {
    console.log(error, "error from course update route");
    const errorMessage =
      error instanceof Error ? error.message : "Course update failed";
    return NextResponse.json({ detail: errorMessage }, { status: 401 });
  }
}
