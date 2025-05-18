import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const BASEURL = process.env.BASEURL;
    const {phone_number, code} = await request.json();

    try {
        const response = await fetch(`${BASEURL}/auth/otp/verify/?phone_number=${phone_number}&code=${code}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const responseData = await response.json();
        console.log(responseData, 'response otp message')
        if (!response.ok) {
            const errorMessage =
            response instanceof Error ? response.message : "Failed to send OTP";
            console.log(response, 'error otp message')
        return NextResponse.json({ detail: errorMessage }, { status: response.status });
        }

        return NextResponse.json({ message: "OTP sent successfully" });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Failed to send OTP";
        return NextResponse.json({ detail: errorMessage }, { status: 500 });
    }
}