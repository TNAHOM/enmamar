import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const BASEURL = process.env.BASEURL;

    try {
        const response = await fetch(`${BASEURL}/course/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });
        // console.log(response, "response from course/id")
        const responseData = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch course" },
                { status: response.status }
            );
        }
        return NextResponse.json(responseData.data);
    } catch (error) {
        console.error("Error fetching course:", error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Internal server error",
            },
            { status: 500 }
        );
    }
}