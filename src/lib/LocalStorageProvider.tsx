"use client"

import { useToast } from "@/hooks/use-toast";
import { createContext, useContext, useEffect, useState } from "react";

const initialCtxValue = {
    isGameInCollection: false,
    addGame: () => {},
    removeGame: () => {},
    gameCollection: []
}

const LocalStorageCtx = createContext<LocalStorageCtxValue>(initialCtxValue);

export default function LocalStorageProvider({ children }: { children: React.ReactNode }) {
    const { toast } = useToast();

    const [gameCollection, setGameCollection] = useState<{ id: number, cover: string }[]>([]);

    useEffect(() => {
        const localStorageCollection = JSON.parse(localStorage.getItem("gameCollection") || "") ?? []
        setGameCollection(localStorageCollection);
    }, [])

    useEffect(() => {
        localStorage.setItem("gameCollection", JSON.stringify(gameCollection));
    }, [gameCollection]);

    const isGameInCollection = gameCollection.some(item => item.id === 76);

    function addGame(id: number, cover: string, gameName: string) {
        setGameCollection((currentCollection) => [...currentCollection, { id, cover }]);

        toast({
            title: "Game collected",
            description: `${gameName} has been added to your collection`
        })
    }

    function removeGame(id: number, gameName: string) {
        setGameCollection((currentCollection) => currentCollection.filter((game) => game.id !== id));

        toast({
            variant: "destructive",
            title: "Game removed",
            description: `${gameName} has been removed from your collection`
        })
    }

    const localStorageCtxValue: LocalStorageCtxValue = {
        addGame,
        removeGame,
        isGameInCollection,
        gameCollection
    }

    return (
        <LocalStorageCtx.Provider value={localStorageCtxValue}>
            {children}
        </LocalStorageCtx.Provider>
    )
}

export function useLocalStorageCtx() {
    return useContext(LocalStorageCtx)
}