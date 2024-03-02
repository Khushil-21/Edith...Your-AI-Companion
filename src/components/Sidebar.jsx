"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export default function Sidebar() {
	return (
		<div className="bg-gray-200 w-[16%] flex flex-col">
			{/* <div className="h-[30%] w-full flex justify-center items-center">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="default">Select Model</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56">
						<DropdownMenuLabel>AI Model Selection</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuCheckboxItem checked={true}>
							ChatGPT
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem disabled>Gemini</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div> */}
			<div>
				<Dialog>
					<DialogTrigger>View Keyboard Shortcuts</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Are you absolutely sure?</DialogTitle>
							<DialogDescription>
								This action cannot be undone. This will permanently delete your
								account and remove your data from our servers.
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
