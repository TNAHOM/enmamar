import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
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
        const response = await fetch(`${BASEURL}/me`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        // console.log(data, 'data received');
        if (!response.ok) {
            throw new Error(data.detail || 'Failed to fetch user');
        }

        return NextResponse.json({
            detail: 'User retrieved successfully',
            user: data.data
        });

    } catch (error) {
        console.log(error, "error form route/me")
        const cookiesStore = await cookies();
        cookiesStore.delete('accessToken');
        cookiesStore.delete('refreshToken');

        const errorMessage = error instanceof Error ? error.message : 'Session expired';

        return NextResponse.json(
            { detail: errorMessage },
            { status: 401 }
        );
    }
}


export async function PUT(request: Request) {
    const BASEURL = process.env.BASEURL;
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get('accessToken')?.value;
    const data = await request.json();

    try {
        const response = await fetch(`${BASEURL}/me`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            return NextResponse.json(
                { detail: 'Failed to update user' }
            )
        }
        const responseData = await response.json();
        return NextResponse.json({
            responseData
        })
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to update user';
        return NextResponse.json(
            { detail: errorMessage },
            { status: 500 }
        );
    }
}