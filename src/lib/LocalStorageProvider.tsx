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

    const [gameCollection, setGameCollection] = useState<LocalStorageCtxValue["gameCollection"]>([]);

    useEffect(() => {
        const localStorageCollection = JSON.parse(localStorage.getItem("gameCollection") || "") ?? []
        setGameCollection(localStorageCollection);
    }, [])

    useEffect(() => {
        localStorage.setItem("gameCollection", JSON.stringify(gameCollection));
    }, [gameCollection]);

    const isGameInCollection = gameCollection.some(item => item.id === 76);

    function addGame({ id, cover, slug, name }: { id: number, cover: string, slug: string, name: string }) {
        setGameCollection((currentCollection) => [...currentCollection, { id, cover, slug, name }]);

        toast({
            title: "Game collected",
            description: `${name} has been added to your collection`
        })
    }

    function removeGame({ id, name }: { id: number, name: string }) {
        setGameCollection((currentCollection) => currentCollection.filter((game) => game.id !== id));

        toast({
            variant: "destructive",
            title: "Game removed",
            description: `${name} has been removed from your collection`
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
    const context = useContext(LocalStorageCtx)

    if (!context) {
        throw new Error("useGameContext must be used within a GameProvider");
    }

    return context;
}