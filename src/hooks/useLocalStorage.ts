import { useState, useEffect } from "react";
import { useToast } from "./use-toast";
import { CircleCheckBig } from "lucide-react";

type HookReturn = {
    gameCollection: number[];
    isGameInCollection: boolean;
    addGame: (id: number) => void;
    removeGame: (id: number) => void;
};

export default function useLocalStorage(id?: number, gameName?: string): HookReturn {
    const [gameCollection, setGameCollection] = useState<number[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        const localStorageCollection = localStorage.getItem("gameCollection");
        
        if (localStorageCollection) {
            setGameCollection(JSON.parse(localStorageCollection));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("gameCollection", JSON.stringify(gameCollection));
    }, [gameCollection]);

    const isGameInCollection = gameCollection.includes(id ?? -1);

    function addGame(id: number) {
        setGameCollection((currentCollection) => [...currentCollection, id]);

        toast({
            title: "Game collected",
            description: `${gameName} has been added to your collection`
        })
    }

    function removeGame(id: number) {
        setGameCollection((currentCollection) => currentCollection.filter((gameId) => gameId !== id));

        toast({
            variant: "destructive",
            title: "Game removed",
            description: `${gameName} has been removed from your collection`
        })
    }

    return {
        gameCollection,
        isGameInCollection,
        addGame,
        removeGame,
    };
}
