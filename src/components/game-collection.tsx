"use client"

// Components
import Image from "next/image";
import emptyCollection from "../../public/empty-collection.png"
import GameFilters from "./game-filters";
import GameCard from "./game-card";

// Hooks
import { useLocalStorageCtx } from "@/lib/LocalStorageProvider";

export default function GameCollection() {
    const { gameCollection } = useLocalStorageCtx();

    return (
        !!gameCollection.length ? (
            <section>
                <GameFilters />

                <div className="grid grid-cols-3 gap-4">
                    {
                        gameCollection.map(game => (
                            <GameCard game={game} />
                        ))
                    }
                </div>
            </section>
        ) : (
            <section className="h-[600px] grid place-content-center">
				<Image src={emptyCollection} alt="Your game collection is empty" />
				<h2 className="mt-6 font-bold text-center">Nothing collected yet</h2>
				<p className="text-center">Here you will see your collected games.</p>
			</section>
        )
    )
}