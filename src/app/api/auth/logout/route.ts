import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    try {
        // Clear authentication cookies
        const cookieStore = await cookies();
        cookieStore.delete('accessToken');
        cookieStore.delete('refreshToken');

        return NextResponse.json({
            detail: 'Logout successful'
        });

    } catch (error) {
        console.log(error, 'error from logout route');
        return NextResponse.json(
            { detail: 'Logout failed' },
            { status: 500 }
        );
    }
}