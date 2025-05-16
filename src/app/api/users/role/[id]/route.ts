export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const BASEURL = process.env.BASEURL;
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get('accessToken');

    try {
        const data = await request.json();

        const response = await fetch(`${BASEURL}/admin/users/role/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken?.value}`
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to update role');
        }

        return NextResponse.json(
            { detail: 'Role updated successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error:", error);
        const errorMessage = error instanceof Error
            ? error.message
            : 'Failed to update role';
        return NextResponse.json(
            { detail: errorMessage },
            { status: 401 }
        );
    }
}