"use client"

import Image from "next/image";
import emptyCollection from "../../public/empty-collection.png"
import { useLocalStorageCtx } from "@/lib/LocalStorageProvider";

export default function GameCollection() {
    const { gameCollection } = useLocalStorageCtx();

    return (
        <section className="mt-3">
            {/* Filters */}

            <div className="grid grid-cols-3 gap-4">
                {
                    !!gameCollection.length ? (
                        gameCollection.map(game => (
                            <article key={game.id} className="min-h-40 w-full relative">
                                <Image
                                    fill
                                    src={`https:${game.cover}`}
                                    alt="Game cover"
                                    className="rounded-md"
                                />
                            </article>
                        ))
                    ) : (
                        <div>
					        <Image src={emptyCollection} alt="Your game collection is empty" />
					        <h2 className="mt-6 font-bold text-center">Nothing collected yet</h2>
					        <p className="text-center">Here you will see your collected games.</p>
				        </div>
                    )
                }
            </div>
        </section>
    )
}