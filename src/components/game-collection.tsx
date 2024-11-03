"use client"

import Image from "next/image";
import emptyCollection from "../../public/empty-collection.png"
import { useLocalStorageCtx } from "@/lib/LocalStorageProvider";
import { ScanSearch, Trash2 } from "lucide-react";
import Link from "next/link";
import GameFilters from "./game-filters";

export default function GameCollection() {
    const { gameCollection, removeGame } = useLocalStorageCtx();

    return (
        !!gameCollection.length ? (
            <section>
                <GameFilters />

                <div className="grid grid-cols-3 gap-4">
                    {
                        gameCollection.map(game => (
                            <article key={game.id} className="min-h-40 w-full relative rounded-lg shadow-lg border border-gray-200">
                                <Image
                                    fill
                                    src={`https:${game.cover}`}
                                    alt="Game cover"
                                    className="rounded-md"
                                />

                                <div className="w-full h-full grid place-content-center absolute top-0 left-0 bg-violet-600 rounded-lg opacity-90">
                                    <Link href={game.slug} className="bg-white p-2 rounded-full">
                                        <ScanSearch size={22} />
                                    </Link>

                                    <button
                                        onClick={() => removeGame({ id: game.id, name: game.name })}
                                        className="absolute top-2 right-2 bg-gray-0 p-1 rounded-full">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </article>
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