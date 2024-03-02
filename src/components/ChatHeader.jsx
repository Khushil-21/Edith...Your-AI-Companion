import React from "react";
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
import { Button } from "@/components/ui/button";
import { LucideSettings, LucideTrash2 } from "lucide-react";
import { deleteGlobalConversation } from "@/lib/GlobalConversation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export default function ChatHeader() {
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: () => {
			deleteGlobalConversation();
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["Conversation"]);
		},
	});
	return (
		<div className="mb-2 px-4 h-[9%] flex justify-between items-center">
			<div className="text-xl font-bold flex gap-2 items-end justify-center">
				<h1 className="text-5xl animate-gradient font-extrabold bg-gradient-to-r  from-blue-500 via-purple-500 to-red-500 text-transparent bg-clip-text bg-cover ">
					E.D.I.T.H
				</h1>
				<span>Your AI Companion</span>
			</div>
			<div className="flex gap-5">
				<Button
					onClick={() => {
						mutate();
					}}
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
	);
}
