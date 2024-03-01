"use client";
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function ChatSection() {
	const [userInput, setUserInput] = useState("");
	const [userMessage, setUserMessage] = useState([]);
	function handleSubmit(e) {
		setUserMessage([...userMessage, userInput]);
		setUserInput("");
	}
	return (
		<div className="flex flex-col border-2 border-green-600 h-full flex-1">
			<div className="border-4 h-[10%]">1</div>
			<div className="border-4 flex-1 overflow-auto">
				<ScrollArea className="h-full w-full rounded-md border p-4">
					{userMessage.map((userMessage) => {
						return (
							<div
								key={""}
								className="w-full justify-center items-end flex flex-col gap-2"
							>
								<div className="text-lg font-semibold">User</div>
								<div className="text-left">{userMessage}</div>
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
								e.target.blur();
								handleSubmit();
							}
						}}
					/>
					<Button type="submit" onClick={handleSubmit}>
						Send
					</Button>
				</div>
			</div>
		</div>
	);
}
