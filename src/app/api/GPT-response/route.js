import { OpenAIStream } from "@/utils/OpenAIStream";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request) {
	const { userInput } = await request.json();
	console.log("userInput: ", userInput);

	try {
		// const completion = await openai.chat.completions.create({
		// 	messages: [
		// 	  {
		// 		role: "system",
		// 		content: "You are helpful AI ChatBot and your name is EDITH.answers all questions asked by user and give response like you are chatting with user",
		// 	  },
		// 	  { role: "user", content: `${userInput}` },
		// 	],
		// 	model: "gpt-3.5-turbo",
		//   });
		// const generatedText = completion.choices[0].message.content;
		// console.log("generatedText: ", generatedText);

		const payload = {
			model: "gpt-3.5-turbo",
			messages: [{ role: "user", content: userInput }],
			temperature: 0.1,
			top_p: 1,
			frequency_penalty: 0.5,
			presence_penalty: 0.5,
			max_tokens: 500,
			stream: true,
			n: 1,
		};

		const stream = await OpenAIStream(payload);
		console.log("stream: ", stream);
		return new NextResponse(stream);
	} catch (error) {
		console.error("OpenAI Error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch response from OpenAI" },
			{ status: 500 }
		);
	}
}
