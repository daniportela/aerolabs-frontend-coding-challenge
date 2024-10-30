import Image from "next/image";
import emptyCollection from "../../public/empty-collection.png";
import Search from "@/components/search";
import getAccessToken from "@/lib/getAccessToken";

export default async function Home() {
	const tokenData = await getAccessToken()
	
	return (
		<main>
			<Search accessTokenData={tokenData} />

			<section>
				<h1 className="bg-gradient-to-r from-violet-900 to-violet-600 font-bold text-lg bg-clip-text text-transparent leading-normal">
					Saved games
				</h1>

				<div>
					<Image src={emptyCollection} alt="Your game collection is empty" />
					<h2 className="mt-6 font-bold text-center">Nothing collected yet</h2>
					<p className="text-center">Here you will see your collected games.</p>
				</div>

				<div>
					
				</div>
			</section>
		</main>
	)
}