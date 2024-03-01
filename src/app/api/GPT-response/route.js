import { OpenAIStream } from "@/utils/OpenAIStream";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request) {
	const { userInput } = await request.json();
	console.log("userInput: ", userInput);

	try {
		// const stream = await openai.chat.completions.create({
		// 	model: "gpt-3.5-turbo",
		// 	messages: [{ role: "system", content: "you are an helpful ai chatbot named EDITH. your task is to give good answers to user" },{ role: "user", content: userInput }],
		// 	stream: true,
		// 	max_tokens:400,
		// });
		// // for await (const chunk of stream) {
		// // 	process.stdout.write(chunk.choices[0]?.delta?.content || "");
		// // 	console.log(chunk.choices[0]?.delta?.content || "");

		// // }
		// return new Response(
		// 	// Create a readable stream to pipe the chunks into
		// 	new ReadableStream({
		// 	  async start(controller) {
		// 		// Stream the chunks from OpenAI
		// 		for await (const chunk of stream) {
		// 		  const data = chunk.choices[0]?.delta?.content || "";
		// 		  controller.enqueue(`${data}`); // Format as SSE
		// 		}
		// 		controller.close(); // Close the stream
		// 	  }
		// 	}), 
		// 	{
		// 	  headers: { "Content-Type": "text/event-stream" } 
		// 	}
		// );
		return new NextResponse("HELLO HOW CAN I HELP YOU !!!")
		// const payload = {
		// 	model: "gpt-3.5-turbo",
		// 	messages: [{ role: "user", content: userInput }],
		// 	temperature: 0.1,
		// 	top_p: 1,
		// 	frequency_penalty: 0.5,
		// 	presence_penalty: 0.5,
		// 	max_tokens: 500,
		// 	stream: true,
		// 	n: 1,
		// };

		// const stream = await OpenAIStream(payload);
		// console.log("stream: ", stream);
		// return new NextResponse(stream);
	} catch (error) {
		console.error("OpenAI Error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch response from OpenAI" },
			{ status: 500 }
		);
	}
}
