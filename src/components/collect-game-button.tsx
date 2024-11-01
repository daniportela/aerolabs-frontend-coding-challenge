"use client"

import { useLocalStorageCtx } from "@/lib/LocalStorageProvider";
import { cn } from "@/lib/utils";
import { CirclePlusIcon, Trash2 } from "lucide-react";

type GameData = {
    id: number
    name: string
    cover: string
    slug: string
}

export default function CollectGameButton({ gameData }: { gameData: GameData }) {
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
                cover: gameData.cover,
                slug: gameData.slug
            })
        }
    }

    const toggledClassNames = isGameInCollection ? "text-gray-0 bg-violet-900" : "text-violet-900"

    return (
        <button
            className={cn("flex items-center justify-center gap-2 w-full text-lg text-center font-bold py-2 rounded-full my-8 border-2 border-violet-900 hover:bg-violet-900 hover:text-gray-0 duration-200", toggledClassNames)}
            onClick={handleClick}
        >
            {
                !isGameInCollection ? (
                    <>
                        <CirclePlusIcon />
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