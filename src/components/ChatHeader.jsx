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
import {
	LucideBot,
	LucideKeyboard,
	LucideSettings,
	LucideTextSelect,
	LucideTrash2,
} from "lucide-react";
import { deleteGlobalConversation } from "@/lib/GlobalConversation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
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
								<SheetDescription className="min-h-[90vh] flex flex-col justify-between">
									<div className="h-[30%] w-full flex justify-between pt-10 items-center">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="default" className="flex gap-1">
													<LucideBot /> Select Model
												</Button>
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
										<Dialog>
											<DialogTrigger asChild>
												<Button
													variant="secondary"
													className="flex gap-1 bg-gray-300 hover:bg-gray-200"
												>
													<LucideKeyboard /> Keyboards shortcuts
												</Button>
											</DialogTrigger>
											<DialogContent>
												<DialogHeader>
													<DialogTitle className="text-center">
														Keyboard Shortcuts
													</DialogTitle>
													<DialogDescription className="">
														<div className="mt-5 p-4 flex flex-col gap-10">
															<div className="w-full flex justify-around items-center">
																<div className="pl-5 w-1/2">
																	<kbd className="bg-gray-200 p-2 rounded-md">
																		crtl
																	</kbd>{" "}
																	+{" "}
																	<kbd className=" bg-gray-200 p-2 rounded-md">
																		/
																	</kbd>
																</div>
																<div className="pl-5 w-1/2 text-lg font-medium">
																	Go To Prompt Box
																</div>
															</div>
															<div className="w-full flex justify-around items-center">
																<div className="pl-5 w-1/2">
																	<kbd className="bg-gray-200 p-2 rounded-md">
																		Enter
																	</kbd>
																</div>
																<div className="pl-5 w-1/2 text-lg font-medium">
																	Send Prompt
																</div>
															</div>
														</div>
													</DialogDescription>
												</DialogHeader>
											</DialogContent>
										</Dialog>
									</div>
									<div className="text-primary flex-1 gap-10 flex flex-col justify-center items-center">
										<div>
											<LucideTextSelect width={150} height={150}/>
										</div>
										<div className="text-xl">
											New Content Will Be Added Soon
										</div>
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
