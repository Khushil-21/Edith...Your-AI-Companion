import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatSection() {
	return (
		<div className="flex flex-col border-2 border-green-600 h-full flex-1">
			<div className="border-4 h-[10%]">1</div>
			<div className="border-4 flex-1 overflow-auto">
				<ScrollArea className="h-full w-full rounded-md border p-4">
					
				</ScrollArea>
			</div>
			<div className="border-4 h-[13%]">3</div>
		</div>
	);
}
