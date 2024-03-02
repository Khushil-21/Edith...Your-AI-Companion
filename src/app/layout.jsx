import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import TanstackReactQueryProvider from "@/Providers/TanstackReactQueryProvider";

export const metadata = {
	title: "EDITH",
	description: "Your AI Companion",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body className="w-screen h-screen bg--100">
				<TanstackReactQueryProvider>
					{children}
					<SpeedInsights />
				</TanstackReactQueryProvider>
			</body>
		</html>
	);
}
