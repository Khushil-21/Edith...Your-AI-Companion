"use client"

import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function PromptBox({ handleSubmit, setUserInput, userInput }) {
    const inputRef = useRef(null);
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
		<div className="flex justify-center items-center h-[12%]">
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
	);
}
