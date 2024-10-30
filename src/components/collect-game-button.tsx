"use client"

import useLocalStorage from "@/hooks/useLocalStorage"
import { cn } from "@/lib/utils";
import { CirclePlusIcon, Trash2 } from "lucide-react";

export default function CollectGameButton({ gameData }: { gameData: { id: number, name: string } }) {
    const { addGame, removeGame, isGameInCollection } = useLocalStorage(gameData.id, gameData.name);

    function handleClick() {
        if (isGameInCollection) {
            removeGame(gameData.id)
        } else {
            addGame(gameData.id)
        }
    }

    const toggledClassNames = isGameInCollection ? "text-gray-0 bg-violet-900" : "text-violet-900"

    return (
        <button
            className={cn("flex items-center justify-center gap-2 w-full text-lg text-center font-bold py-2 rounded-full my-8 border-[3px] border-violet-900 hover:bg-violet-900 hover:text-gray-0 duration-200", toggledClassNames)}
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