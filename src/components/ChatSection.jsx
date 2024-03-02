"use client";
import React, { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LucideSettings, LucideTrash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function ChatSection() {
	let [userInput, setUserInput] = useState("");
	const [conversation, setConversation] = useState([]);
	console.log("conversation: ", conversation);
	const [Response, setResponse] = useState([]);
	const myDivRef = useRef(null);
	const inputRef = useRef(null);
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
	useEffect(() => {
		if (myDivRef.current) {
			myDivRef.current.scrollTop = myDivRef.current.scrollHeight;
		}
	}, [conversation]); // Add relevant dependencies
	return (
		<div className="p-4 flex flex-col  border-green-600 h-full flex-1">
			<div className="mb-2 px-4 h-[9%] flex justify-between items-center">
				<div className="text-xl font-bold flex gap-2 items-end justify-center">
					<h1 className="text-5xl animate-gradient font-extrabold bg-gradient-to-r  from-blue-500 via-purple-500 to-red-500 text-transparent bg-clip-text bg-cover ">
						E.D.I.T.H
					</h1>
					<span>Your AI Companion</span>
				</div>
				<div onClick={() => setConversation([])} className="flex gap-5">
					<Button
						variant="destructive"
						className="flex gap-2 justify-center items-center text-base"
					>
						<LucideTrash2 /> Clear
					</Button>
					<div>
						<Sheet>
							<SheetTrigger asChild>
								<Button
									variant="default"
									className="flex gap-2 justify-center items-center text-base"
								>
									<LucideSettings />
									Settings
								</Button>
							</SheetTrigger>
							<SheetContent>
								<SheetHeader>
									<SheetTitle></SheetTitle>
									<SheetDescription>
										<div className="h-[30%] w-full flex justify-center items-center">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="default">Select Model</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent className="w-56">
													<DropdownMenuLabel>
														AI Model Selection
													</DropdownMenuLabel>
													<DropdownMenuSeparator />
													<DropdownMenuCheckboxItem checked={true}>
														ChatGPT
													</DropdownMenuCheckboxItem>
													<DropdownMenuCheckboxItem disabled>
														Gemini
													</DropdownMenuCheckboxItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
									</SheetDescription>
								</SheetHeader>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
			<div
				ref={myDivRef}
				className="flex-1 overflow-auto flex justify-center items-center"
			>
				<ScrollArea
					ref={myDivRef}
					className="w-[90%] py-5 px-4 border-2 h-full  rounded-md "
				>
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
										className={`w-full flex items-center gap-3 ${
											value.Role === "User"
												? " justify-end "
												: " justify-start "
										}`}
									>
										{value.Role === "Edith" && (
											<Avatar>
												<AvatarImage src="https://iconape.com/wp-content/png_logo_vector/robot.png" />
												<AvatarFallback>
													{value.Role === "User" ? "U" : "E"}
												</AvatarFallback>
											</Avatar>
										)}
										<div
											className={`my-2 chat-bubble max-w-[60%] px-7 py-2 rounded-md flex justify-center items-center ${
												value.Role === "User"
													? " bg-black text-white rounded-tr-none "
													: " bg-gray-400 text-white rounded-tl-none"
											}`}
										>
											{value.Message.split("\n").map((line, index) => {
												return <div key={index}>{line}</div>;
											})}
										</div>
										{value.Role === "User" && (
											<Avatar>
												<AvatarImage src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg" />
												<AvatarFallback>
													{value.Role === "User" ? "U" : "E"}
												</AvatarFallback>
											</Avatar>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</ScrollArea>
			</div>
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
		</div>
	);
}
