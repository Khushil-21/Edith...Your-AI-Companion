import { NextResponse } from "next/server";

export async function POST(request) {
	
	return NextResponse.json({ response: "hello" }, { status: 200 });
}
