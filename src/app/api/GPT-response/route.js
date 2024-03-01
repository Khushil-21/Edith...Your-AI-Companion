import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY});

export async function POST(request) {
	const { userInput } = await request.json();
	console.log("userInput: ", userInput);

	try {
		const completion = await openai.chat.completions.create({
			messages: [
			  {
				role: "system",
				content: "You are helpful AI ChatBot and your name is EDITH.answers all questions asked by user and give response like you are chatting with user",
			  },
			  { role: "user", content: `${userInput}` },
			],
			model: "gpt-3.5-turbo",
		  });
		const generatedText = completion.choices[0].message.content;
		console.log("generatedText: ", generatedText);
		return NextResponse.json({ response: generatedText }, { status: 200 });
	} catch (error) {
		console.error("OpenAI Error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch response from OpenAI" },
			{ status: 500 }
		);
	}
}
