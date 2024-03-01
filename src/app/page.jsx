import ChatSection from "@/components/ChatSection";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function Home() {
	return (
		<div className="flex h-full">
			<Sidebar />
			<ChatSection/>
		</div>
	);
}
