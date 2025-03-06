import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const BAESURL = process.env.BASEURL
    const {courseId, lessonList} = await request.json()
    const cookieStore = await cookies();

    const accessToken = cookieStore.get('accessToken');
    try{
        const response = await fetch(`${BAESURL}/course/${courseId}/lessons`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}}`,
            },
            body: JSON.stringify({lessonList})
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return NextResponse.json({ message: 'Lessons added successfully'});
    } catch (error){
        const errorMessage = error instanceof Error ? error.message : "Course creation failed";
        return NextResponse.json({ detail: errorMessage}, {status: 500 });
    }
}