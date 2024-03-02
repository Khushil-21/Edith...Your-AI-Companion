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
		return new NextResponse(`1. Cows are domesticated animals that are commonly raised for their milk, meat, and leather.
		2. They are herbivores, meaning they primarily eat grass and other plant-based foods.
		3. Cows have a complex digestive system with multiple stomach compartments that help them break down tough plant material.
		4. They are known for their gentle and docile nature, making them popular farm animals.
		5. Cows are social animals that often form close bonds with other members of their herd.
		6. Different breeds of cows have unique characteristics, such as coat color, horn shape, and milk production.
		7. The average lifespan of a cow is around 20 years, although this can vary depending on factors such as breed and living conditions.
		8. Cows communicate with each other through various vocalizations and body language cues.
		9. In many cultures, cows are revered as sacred animals and play important roles in religious ceremonies and traditions.
		10. Cows play a significant role in agriculture and food production, providing valuable resources for human consumption.`);
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
