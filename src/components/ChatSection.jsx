"use client";
import React, { useState } from "react";

import ChatHeader from "./ChatHeader";
import PromptBox from "./PromptBox";
import ChatArea from "./ChatArea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	getGlobalConversation,
	setGlobalConversation,
} from "@/lib/GlobalConversation";

export default function ChatSection() {
	let [userInput, setUserInput] = useState("");
	const [conversation, setConversation] = useState([]);
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: () => {
			setGlobalConversation("User", userInput);
			setUserInput("");
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["Conversation"]);
		},
	});
	const { mutate: chunk } = useMutation({
		mutationFn: (chunkValue) => {
			setGlobalConversation("Edith", chunkValue);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["Conversation"]);
		},
	});
	async function handleSubmit(e) {
		if (!userInput) return;
		console.log("userInput: ", userInput);
		mutate();
		try {
			const response = await fetch("/api/GPT-response", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userInput }),
			});
			console.log(response);
			if (response.ok) {
				const data = response.body;

				if (!data) return;
				const reader = data.getReader();
				const decoder = new TextDecoder();

				let done = false;
				setGlobalConversation("Edith", " ");
				while (!done) {
					const { value, done: doneReading } = await reader.read();
					done = doneReading;
					const chunkValue = decoder.decode(value);
					console.log("chunkValue: ", chunkValue);
					chunk(chunkValue);
				}
			} else {
				console.log("here");
				setGlobalConversation("Edith", " ");
				chunk(
					"Error In Generating Response !! \nTry Again Later !! Sorry for the inconvenience"
				);
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
			<ChatHeader />
			<ChatArea />
			<PromptBox
				handleSubmit={handleSubmit}
				setUserInput={setUserInput}
				userInput={userInput}
			/>
		</div>
	);
}
