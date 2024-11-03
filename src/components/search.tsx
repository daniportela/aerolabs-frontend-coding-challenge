"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { getGamesBySearchTerm } from "@/app/actions"
import Image from "next/image"
import { SearchIcon, Swords } from "lucide-react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Spinner } from "./Spinner"
import { useLocalStorageCtx } from "@/lib/LocalStorageProvider"
import { cn } from "@/lib/utils"
import CollectGameButton from "./collect-game-button"

type SearchResultEntry = GameDetails | Partial<GameDetails>

function SearchResultEntry({ entry }: { entry: SearchResultEntry }) {
    function truncateText(text: string, maxLength: number) {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    }

    return (
        <div className="grid grid-cols-[1fr_20px]">
            <Link href={entry.slug!} key={entry.id} className="grid grid-cols-[30px_1fr_20px] p-1 rounded-sm items-center gap-3 hover:bg-pink-50">
                {
                    entry.cover ? (
                        <Image
                            width={30}
                            height={30}
                            src={`https:${entry.cover.url}`} alt={entry.name!}
                            style={{ borderRadius: '4px' }}
                        />
                    ) : (
                        <div className="w-[30px] h-[30px] grid place-content-center border-[1px] border-pink-50 rounded-md">
                            <Swords size={18} />
                        </div>
                    )
                }

                <span>
                    {truncateText(entry.name!, 28)}
                </span>
            </Link>
            
            <CollectGameButton gameData={entry} buttonType="quick_add" />
        </div>
    )
}

function SearchResults({ results, isPending }: { results: GameSearchResult[], isPending: boolean }) {
    const { getGameSuggestions, gameCollection } = useLocalStorageCtx();

    const gameSuggestions = getGameSuggestions();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn("absolute top-14 z-10 flex flex-col gap-1 w-full min-h-[150px] max-h-[300px] overflow-scroll p-2 rounded-xl bg-gray-0 border border-pink-200", isPending || !results.length && "items-center justify-center")}
        >
            {
                isPending ? (
                    <Spinner size="medium" className="stroke-violet-900" />
                ) : (
                    !!results.length ? (
                        results.map(result => (
                            <SearchResultEntry entry={result} />
                        ))
                    ) : (
                        !!gameCollection.length ? (
                            gameSuggestions.map(suggestion => (
                                <SearchResultEntry entry={suggestion} />
                            ))
                        ) : (
                            <div className="text-center">
                                <span className="font-bold">No suggestions to show</span>
                                <p className="text-sm text-gray-500 w-[25ch] mx-auto">Add more games to your collection to see suggestions.</p>
                            </div>
                        )
                    )
                )
            }
        </motion.div>
    )
}

export default function Search({ accessTokenData }: { accessTokenData: AccessTokenData }) {
    const [displayResults, setDisplayResults] = useState<boolean>(false);
    const [gameSearchResult, setGameSearchResult] = useState<GameSearchResult[]>([]);
    const [isPending, startTransition] = useTransition()

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        startTransition(async () => {
            const gamesBySearchTerm = await getGamesBySearchTerm(e.target.value, accessTokenData.access_token);
            setGameSearchResult(gamesBySearchTerm);
        })
      }, 500);
    };

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);
    
    return (
        <div className="relative max-w-[360px] lg:mx-auto">
            <div className="w-full flex items-center gap-2 rounded-full px-4 bg-gray-0 h-10 mt-6 border border-pink-200">
                <SearchIcon className="stroke-gray-500" size={20} />

                <input
                    className="w-full h-full text-gray-500 placeholder:text-gray-500"
                    type="text"
                    placeholder="Search games..."
                    onChange={handleInputChange}
                    onFocus={() => setDisplayResults(true)}
                    onBlur={() => setDisplayResults(false)}
                />
            </div>

            <AnimatePresence>
                {displayResults && <SearchResults results={gameSearchResult} isPending={isPending} />}
            </AnimatePresence>
        </div>
    )
}