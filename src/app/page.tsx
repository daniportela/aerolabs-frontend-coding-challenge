// Components
import GameCollection from "@/components/game-collection";

export default async function Home() {	
	return (
		<main className="mt-10">
			<h1 className="bg-gradient-to-r from-violet-900 to-violet-600 font-bold text-lg bg-clip-text text-transparent leading-normal">
				Saved games
			</h1>
			
			<GameCollection />
		</main>
	)
}