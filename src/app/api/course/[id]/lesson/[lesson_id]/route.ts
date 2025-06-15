import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; lesson_id: string }> }
) {
  const { id, lesson_id } = await params;
  const BASEURL = process.env.BASEURL;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({
      error: "Unauthorized to access Please signUp",
      status: 401,
    });
  }

  try {
    const response = await fetch(`${BASEURL}/lesson/${id}/${lesson_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        error: responseData.detail,
        status: response.status,
      });
    }
    const data = await responseData.data;
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch lesson";
    return NextResponse.json({ detail: errorMessage, status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; lesson_id: string }> }
) {
  const { id, lesson_id } = await params;
  const BASEURL = process.env.BASEURL;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const data = await req.json();

  if (!accessToken) {
    return NextResponse.json({
      error: "Unauthorized to access Please signUp",
      status: 401,
    });
  }

  try {
    const response = await fetch(
      `${BASEURL}/protected/lesson/${id}/${lesson_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        error: responseData.detail,
        status: response.status,
      });
    }

    return NextResponse.json({
      detail: responseData.detail,
      data: responseData.data,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update lesson";
    return NextResponse.json({ detail: errorMessage, status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; lesson_id: string }> }
) {
  const { id, lesson_id } = await params;
  const BASEURL = process.env.BASEURL;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({
      error: "Unauthorized to access Please signUp",
      status: 401,
    });
  }

  try {
    const response = await fetch(
      `${BASEURL}/protected/lesson/${id}/${lesson_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        error: responseData.detail,
        status: response.status,
      });
    }

    return NextResponse.json({
      detail: responseData.detail,
      data: responseData.data,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete lesson";
    return NextResponse.json({ detail: errorMessage, status: 500 });
  }
}