"use client"

import { SortOptions } from "@/components/game-filters";
import { useToast } from "@/hooks/use-toast";
import { createContext, useContext, useEffect, useState } from "react";

const initialCtxValue = {
    addGame: () => [],
    removeGame: () => {},
    sortGames: () => [],
    getGameSuggestions: () => [],
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

    function addGame({ id, cover, slug, name, first_release_date, similar_games }: Pick<GameDetails, "id" | "name" | "cover" | "slug" | "first_release_date" | "similar_games">) {
        setGameCollection((currentCollection) => [
            ...currentCollection,
            {
                id,
                cover,
                slug,
                name,
                first_release_date,
                similar_games,
                added_at: new Date().toISOString()
            }
        ]);

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

    function sortGames(sortOption: SortOptions) {
        const sortedCollection = [...gameCollection].sort((a, b) => {
            switch (sortOption) {
                case SortOptions.LAST_ADDED:
                    return new Date(a.added_at).getTime() - new Date(b.added_at).getTime();
                case SortOptions.NEWEST:
                    return b.first_release_date - a.first_release_date;
                case SortOptions.OLDEST:
                    return a.first_release_date - b.first_release_date;
                default:
                    return 0;
            }
        })

        setGameCollection(sortedCollection);
    }

    function getGameSuggestions() {
        const randomSuggestions = gameCollection.reduce((acc, curr) => {
            if (acc.length >= 10) return acc

            const randomSuggestionIdx = Math.floor(Math.random() * curr.similar_games.length);

            acc.push(curr.similar_games[randomSuggestionIdx])

            return acc
        }, [] as Array<ReducedGameDetails>)

        return randomSuggestions
    }

    const localStorageCtxValue: LocalStorageCtxValue = {
        addGame,
        removeGame,
        sortGames,
        getGameSuggestions,
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
        throw new Error("useLocalStorageCtx must be used within a LocalStorageProvider");
    }

    return context;
}