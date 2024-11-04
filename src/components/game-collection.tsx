"use client"

// Components
import Image from "next/image";
import emptyCollection from "../../public/empty-collection.png"
import GameFilters from "./game-filters";
import GameCard from "./game-card";

import { motion } from "framer-motion";

// Hooks
import { useLocalStorageCtx } from "@/lib/LocalStorageProvider";

export default function GameCollection() {
    const { gameCollection } = useLocalStorageCtx();

    return (
        !!gameCollection.length ? (
            <section>
                <GameFilters />

                <motion.div layout className="grid grid-cols-3 md:grid-cols-4 md:max-w-[768px] md:mx-auto gap-4">
                    {
                        gameCollection.map(game => (
                            <GameCard key={game.id} game={game} />
                        ))
                    }
                </motion.div>
            </section>
        ) : (
            <section className="h-[600px] grid place-content-center">
				<Image
                    src={emptyCollection}
                    alt="Your game collection is empty"
                    className="w-[100%] md:w-[75%] mx-auto"
                    priority={true}
                />
				<h2 className="mt-6 font-bold text-center">Nothing collected yet</h2>
				<p className="text-center">Here you will see your collected games.</p>
			</section>
        )
    )
}