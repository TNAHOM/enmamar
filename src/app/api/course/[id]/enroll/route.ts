import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    const BASEURL = process.env.BASEURL;
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get('accessToken')?.value;

    if (!accessToken) {
        return NextResponse.json(
            { detail: 'Not authenticated' },
            { status: 401 }
        );
    }

    try {
        const response = await fetch(`${BASEURL}/course/${id}/enroll`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`,

            },
        });

        const responseData = await response.json();
        // console.log(responseData, "response from course creation route");
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