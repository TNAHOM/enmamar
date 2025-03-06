import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function POST(request: Request) {
  const BASEURL = process.env.BASEURL;
  const data = await request.json();
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get('accessToken')?.value;

  if (!accessToken) {
    return NextResponse.json(
      { detail: 'Not authenticated' },
      { status: 401 }
    );
  }
  // console.log(data, "data from course creation route");
  try {
    const response = await fetch(`${BASEURL}/course/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json" ,
        'Authorization': `Bearer ${accessToken}`,

      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

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
