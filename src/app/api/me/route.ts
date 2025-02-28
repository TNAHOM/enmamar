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

        if (!response.ok) {
            throw new Error(data.detail || 'Failed to fetch user');
        }

        return NextResponse.json({
            detail: 'User retrieved successfully',
            user: data.user
        });

    } catch (error) {
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