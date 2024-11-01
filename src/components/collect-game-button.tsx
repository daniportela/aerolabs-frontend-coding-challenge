"use client"

import { useLocalStorageCtx } from "@/lib/LocalStorageProvider";
import { cn } from "@/lib/utils";
import { CirclePlusIcon, Trash2 } from "lucide-react";

export default function CollectGameButton({ gameData }: { gameData: { id: number, name: string, cover: string } }) {
    const { addGame, removeGame, isGameInCollection } = useLocalStorageCtx();

    function handleClick() {
        if (isGameInCollection) {
            removeGame(gameData.id, gameData.name)
        } else {
            addGame(gameData.id, gameData.cover, gameData.name)
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