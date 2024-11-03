"use client"

import { useLocalStorageCtx } from "@/lib/LocalStorageProvider";
import { cn } from "@/lib/utils";
import { CircleMinus, CirclePlus, Trash2 } from "lucide-react";

type ButtonType = "regular" | "quick_add"

export default function CollectGameButton({ gameData, buttonType = "regular" }: { gameData: GameDetails | Partial<GameDetails>, buttonType?: ButtonType }) {
    const { addGame, removeGame, gameCollection } = useLocalStorageCtx();

    const isGameInCollection = gameCollection.some(game => game.id === gameData.id)

    function handleClick() {
        if (isGameInCollection) {
            removeGame({
                id: gameData.id,
                name: gameData.name
            })
        } else {
            addGame({
                id: gameData.id,
                name: gameData.name,
                cover: gameData.cover?.url,
                slug: gameData.slug,
                release_date: gameData.first_release_date,
                similar_games: gameData.similar_games,
                isQuickAdd: buttonType === "quick_add"
            })
        }
    }

    const toggledClassNames = isGameInCollection ? "text-gray-0 bg-violet-900" : "text-violet-900"

    switch(buttonType) {
        case "regular":
            return (
                <button
                    className={cn("flex items-center justify-center gap-2 w-full text-lg text-center font-bold py-2 rounded-full my-8 border-2 border-violet-900 hover:bg-violet-900 hover:text-gray-0 duration-200", toggledClassNames)}
                    onClick={handleClick}
                >
                    {
                        !isGameInCollection ? (
                            <>
                                <CirclePlus />
                                Collect game
                            </>
                        ) : (
                            <>
                                <Trash2 />
                                Remove game
                            </>
                        )
                    }
                </button>
            )
        case "quick_add":
            return (
                <button onClick={handleClick}>
                    {isGameInCollection ? <CircleMinus className="stroke-violet-900" size={20} /> : <CirclePlus className="stroke-violet-900" size={20} />}
                </button>
            )
    }
}