import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function GET(req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    // console.log(id, "courseId from course lessons")
    const BAESURL = process.env.BASEURL
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken');

    try {
        const response = await fetch(`${BAESURL}/course/${id}/lessons`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}}`,
            }
        })

        const responseData = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch course" },
                { status: response.status }
            );
        }
        // console.log(responseData, "responseData from course lessons")
        return NextResponse.json(responseData.data);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Course creation failed";
        return NextResponse.json({ detail: errorMessage }, { status: 500 });
    }
}