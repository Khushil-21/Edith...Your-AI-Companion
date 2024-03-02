"use client";
import React, { useState } from "react";

import ChatHeader from "./ChatHeader";
import PromptBox from "./PromptBox";
import ChatArea from "./ChatArea";
import { useQuery } from "@tanstack/react-query";
export default function ChatSection() {
	let [userInput, setUserInput] = useState("");
	const [conversation, setConversation] = useState([]);
	async function handleSubmit(e) {
		if (!userInput) return;
		conversation.push({ Role: "User", Message: userInput });
		setUserInput("");
		// API call to get response
		try {
			const response = await fetch("/api/GPT-response", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userInput }),
			});

			if (response.ok) {
				const data = response.body;

				if (!data) return;
				const reader = data.getReader();
				const decoder = new TextDecoder();

				let done = false;
				conversation.push({ Role: "Edith", Message: " " });

				while (!done) {
					const { value, done: doneReading } = await reader.read();
					done = doneReading;
					const chunkValue = decoder.decode(value);
					conversation[conversation.length - 1].Message += chunkValue;

					setConversation([...conversation]);
				}
			} else {
				// Handle error (e.g., display error message)
				console.error("Error fetching response:", response.status);
			}
		} catch (error) {
			// Handle network error
			console.error("Network error:", error);
		}
	}
	
	return (
		<div className="p-4 flex flex-col  border-green-600 h-full flex-1">
			<ChatHeader setConversation={setConversation} />
			<ChatArea conversation={conversation} />
			<PromptBox
				handleSubmit={handleSubmit}
				setUserInput={setUserInput}
				userInput={userInput}
			/>
		</div>
	);
}
