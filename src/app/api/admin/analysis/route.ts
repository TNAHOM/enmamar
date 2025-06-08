// app/api/instructors/[id]/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Extract time filter parameters
  const day = searchParams.get("day");
  const week = searchParams.get("week");
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  // Build query string for backend
  const timeFilterParams = new URLSearchParams();
  if (day) timeFilterParams.append("day", day);
  if (week) timeFilterParams.append("week", week);
  if (month) timeFilterParams.append("month", month);
  if (year) timeFilterParams.append("year", year);

  console.log("Time Filter Params:", timeFilterParams.toString());

  const BASEURL = process.env.BASEURL;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }

  try {
    const backendUrl = `${BASEURL}/analysis/courses${
      timeFilterParams.toString() ? `?${timeFilterParams.toString()}` : ""
    }`;

    const response = await fetch(backendUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        error: responseData.error || "Failed to fetch data",
        status: response.status,
      });
    }

    return NextResponse.json(responseData.data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Course analytics fetch failed";
    return NextResponse.json({ detail: errorMessage, status: 500 });
  }
}
