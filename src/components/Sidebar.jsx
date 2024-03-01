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
export default function Sidebar() {
	return (
		<div className="bg-gray-200 w-[16%] flex ">
			<div className="h-[30%] w-full flex justify-center items-center">
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
			</div>
		</div>
	);
}
