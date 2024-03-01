import Image from "next/image";

export default function Home() {
	return (
		<div className="w-full h-full flex justify-center items-center">
			<h1 className="flex flex-col gap-4 justify-center">
				<span className="mb-3 text-9xl font-extrabold bg-gradient-to-tr from-purple-600  via-blue-600 to-red-500 text-transparent bg-clip-text">
					E.D.I.T.H
        </span>
  
				<span className="text-center text-7xl font-bold">Initialized</span>
			</h1>
		</div>
	);
}
