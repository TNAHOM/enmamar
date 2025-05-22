import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const tryh = await params;
  console.log(tryh, 'courseId');
  const { courseId } = await params;
  console.log("Received courseId:", courseId);
  const BASEURL = process.env.BASEURL;
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ detail: "Not authenticated", status: 401 });
  }

  // Parse the incoming request as form data
  const formData = await request.formData();
  console.log("Form data received:", formData);
  const image = formData.get("thumbnail");

  if (!image) {
    return NextResponse.json({ detail: "No image provided", status: 400 });
  }

  try {
    const updateUrl = `${BASEURL}/admin/courses/thumbnail/${courseId}`;

    // Prepare form data to be forwarded
    const backendFormData = new FormData();
    backendFormData.append("thumbnail", image as Blob);

    const response = await fetch(updateUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: backendFormData,
    });
    const responseData = await response.json();
    console.log("Response from backend:", responseData);

    if (!response.ok) {
      console.log("Response not ok:", response.status, response.statusText);
      return NextResponse.json({
        detail: "Failed to update thumbnail",
        status: response.status,
      });
    }

    return NextResponse.json(responseData.data.thumbnail_url);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update thumbnail";
    console.log("Error occurred:", errorMessage, error);
    return NextResponse.json({ detail: errorMessage, status: 500 });
  }
}
