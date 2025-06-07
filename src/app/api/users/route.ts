import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const BASEURL = process.env.BASEURL;
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get('accessToken');

    try {
        const response = await fetch(`${BASEURL}/admin/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken?.value}`
            },
        });
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.detail || 'Failed to fetch users');
        }

        return NextResponse.json(responseData.data, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch users';

        return NextResponse.json(
            { detail: errorMessage },
            { status: 401 }
        );
    }
}