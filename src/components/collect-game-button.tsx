"use client"

// Components
import { CirclePlus, Trash2 } from "lucide-react";

// Utils
import { cn } from "@/lib/utils";

// Context
import { useLocalStorageCtx } from "@/lib/LocalStorageProvider";

export default function CollectGameButton({ gameData }: { gameData: ReducedGameDetails }) {
    const { addGame, removeGame, gameCollection } = useLocalStorageCtx();

    const isGameInCollection = gameCollection.some(game => game.id === gameData.id)

    function handleClick() {
        if (isGameInCollection) {
            removeGame({
                id: gameData?.id,
                name: gameData?.name
            })
        } else {
            addGame({
                id: gameData?.id,
                name: gameData?.name,
                cover: gameData?.cover,
                slug: gameData?.slug,
                first_release_date: gameData?.first_release_date,
                similar_games: gameData?.similar_games
            })
        }
    }

    const toggledClassNames = isGameInCollection ? "text-gray-0 bg-violet-900" : "text-violet-900"

    return (
        <button
            className={cn("flex items-center justify-center gap-2 w-full md:w-fit px-8 text-lg text-center font-bold py-2 rounded-full my-8 border-2 border-violet-900 hover:bg-violet-900 hover:text-gray-0 duration-200", toggledClassNames)}
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
}