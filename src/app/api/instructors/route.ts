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
    const response = await fetch(`${BASEURL}/protected/users/instructors`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    // console.log(response, 'response from instructors');

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch instructors' },
        { status: response.status }
      );
    }

    const instructors = await response.json();
    return NextResponse.json(instructors.data);

  } catch (error) {
    console.error('Error fetching instructors:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
