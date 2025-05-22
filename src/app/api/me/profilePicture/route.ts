import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const BASEURL = process.env.BASEURL;
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ detail: "Not authenticated", status: 401 });
  }

  // Parse the incoming request as form data
  const formData = await request.formData();
  const image = formData.get("image");

  if (!image) {
    return NextResponse.json({ detail: "No image provided", status: 400 });
  }

  try {
    const updateUrl = `${BASEURL}/users/me/profile-picture`;

    // Prepare form data to be forwarded
    const backendFormData = new FormData();
    backendFormData.append("profile_picture", image as Blob);

    const response = await fetch(updateUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: backendFormData,
    });

    if (!response.ok) {
      return NextResponse.json({
        detail: "Failed to update profile picture",
        status: response.status,
      });
    }

    const responseData = await response.json();

    return NextResponse.json(responseData.data.profile_picture_url);
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to update profile picture";
    return NextResponse.json({ detail: errorMessage, status: 500 });
  }
}
