"use client";
import React, { useEffect, useRef } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getGlobalConversation } from "@/lib/GlobalConversation";

export default function ChatArea() {
	const { data: conversation } = useQuery({
		queryKey: ["Conversation"],
		queryFn: getGlobalConversation,
	});

	const myDivRef = useRef(null);
	useEffect(() => {
		if (myDivRef.current) {
			myDivRef.current.scrollTop = myDivRef.current.scrollHeight;
		}
	}, [conversation]); // Add relevant dependencies

	return (
		<div
			ref={myDivRef}
			className="flex-1 overflow-auto flex justify-center items-center"
		>
			<ScrollArea
				ref={myDivRef}
				className="w-[90%] py-5 px-4 border-2 h-full  rounded-md "
			>
				{conversation?.length!=0 ?
					conversation?.map((value) => {
						return (
							<div key={""} className="flex flex-col gap-2">
								{/* <div
									className={`max-w-[60%] flex items-center ${
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
											className={`gap-2 my-3 chat-bubble max-w-[75%] px-7 py-2 rounded-md flex flex-col justify-center items-start ${
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
					}) : <div className="w-full h-[500px] text-2xl flex justify-center items-center">
						No Messages Yet
						<br></br>
						Start Your Conversation
					</div>
				
				}
			</ScrollArea>
		</div>
	);
}
