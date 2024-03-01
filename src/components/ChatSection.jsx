"use client";
import React, { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function ChatSection() {
	let [userInput, setUserInput] = useState("");
	const [conversation, setConversation] = useState([]);

	const inputRef = useRef(null);
	async function handleSubmit(e) {
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
				const data = await response.json();
				setConversation([
					...conversation,
					{ Role: "Edith", Message: data.response },
				]);
			} else {
				// Handle error (e.g., display error message)
				console.error("Error fetching response:", response.status);
			}
		} catch (error) {
			// Handle network error
			console.error("Network error:", error);
		}
	}
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.ctrlKey && e.key === "/") {
				inputRef.current.focus(); // Focus on the input
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		// Cleanup function for the event listener
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);
	return (
		<div className="flex flex-col border-2 border-green-600 h-full flex-1">
			<div className="border-4 h-[10%]">1</div>
			<div className="border-4 flex-1 overflow-auto">
				<ScrollArea className="h-full w-full rounded-md border p-4 px-10">
					{conversation.map((value) => {
						return (
							<div key={""} className="flex flex-col gap-2">
								{/* <div
									className={`w-full flex items-center ${
										value.Role === "User" ? " justify-end " : " justify-start "
									}`}
								>
									<div
										className={`px-7 py-2 rounded-md ${
											value.Role === "User"
												? " bg-black text-white "
												: " bg-gray-400 text-white "
										}`}
									>
										{value.Message}
									</div>
								</div> */}

								<div
									className={`chat rounded-md  ${
										value.Role === "User" ? " chat-end " : " chat-start "
									}`}
								>
									<div
										className={`chat-bubble px-7 py-2 rounded-md ${
											value.Role === "User"
												? " bg-black text-white rounded-tr-none "
												: " bg-gray-400 text-white rounded-tl-none"
										}`}
									>
										{value.Message}
									</div>
								</div>
							</div>
						);
					})}
				</ScrollArea>
			</div>
			<div className="flex justify-center items-center border-4 h-[13%]">
				<div className="w-1/2 flex gap-4">
					<Input
						type="email"
						placeholder="Ask Your Doubt "
						onChange={(e) => {
							setUserInput(e.target.value);
						}}
						value={userInput || ""}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								// inputRef.current.blur();
								handleSubmit();
							}
						}}
						ref={inputRef}
					/>
					<Button type="submit" onClick={handleSubmit}>
						Send
					</Button>
				</div>
			</div>
		</div>
	);
}
