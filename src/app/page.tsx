import Image from "next/image";
import emptyCollection from "../../public/empty-collection.png";

export default async function Home() {
	const response = await fetch("https://api.igdb.com/v4/games", {
		method: "POST",
		headers: {
			"Client-ID": "",
			"Authorization": ""
		},
		body: "fields *; limit 10;"
	}).then(data => data.json()).then(data => (console.log(data)))
	
	return (
		<main>
			<input type="text" />

			<section>
				<h1 className="bg-gradient-to-r from-violet-900 to-violet-600 font-bold text-lg bg-clip-text text-transparent leading-normal">
					Saved games
				</h1>

				<div>
					<Image src={emptyCollection} alt="Your game collection is empty" />
					<h2 className="mt-6 font-bold text-center">Nothing collected yet</h2>
					<p className="text-center">Here you will see your collected games.</p>
				</div>
			</section>
		</main>
	)
}