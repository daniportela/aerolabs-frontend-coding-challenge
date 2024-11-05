"use client"

// Components
import Image from "next/image"
import Link from "next/link"
import { SearchIcon, Swords } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Spinner } from "./Spinner"

// Hooks
import { useEffect, useRef, useState, useTransition } from "react"
import { useLocalStorageCtx } from "@/lib/LocalStorageProvider"
import { useAccessToken } from "@/lib/AccessTokenProvider"

// Actions
import { getGamesBySlugOrSearchTerm } from "@/app/actions"

// Utils
import { cn } from "@/lib/utils"

function SearchResultEntry({ entry, handleClick }: { entry: SimilarGame, handleClick: () => void }) {
    function truncateText(text: string, maxLength: number) {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    }

    return (
        <Link
            href={entry.slug!}
            className="grid grid-cols-[30px_1fr] p-1 rounded-sm items-center gap-3 hover:bg-pink-50"
            onClick={handleClick}
        >
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
                {truncateText(entry.name!, 30)}
            </span>
        </Link>
    )
}

function SearchResults({ results, isPending, onResultClick }: { results: Array<SimilarGame>, isPending: boolean, onResultClick: () => void }) {
    const { getGameSuggestions, gameCollection } = useLocalStorageCtx();

    const gameSuggestions = getGameSuggestions();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
                "absolute top-14 z-20 flex flex-col gap-1 w-full min-h-[150px] max-h-[300px] overflow-y-scroll p-2 rounded-xl bg-gray-0 border border-pink-200",
                isPending && "items-center justify-center",
                "styled-scrollbar"
            )}
        >
            {
                isPending ? (
                    <Spinner size="medium" className="stroke-violet-900" />
                ) : (
                    !!results.length ? (
                        results.map(result => (
                            <SearchResultEntry key={result.id} entry={result} handleClick={onResultClick} />
                        ))
                    ) : (
                        !!gameCollection.length ? (
                            <>
                                <span className="font-bold border-b pb-2 mb-2">Suggestions</span>
                                {gameSuggestions.map(suggestion => (
                                    <SearchResultEntry key={suggestion.id} entry={suggestion} handleClick={onResultClick} />
                                ))}
                            </>
                        ) : (
                            <div className="text-center my-auto">
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

export default function Search() {
    const [displayResults, setDisplayResults] = useState<boolean>(false);
    const [gameSearchResult, setGameSearchResult] = useState<Array<ReducedGameDetails>>([]);
    const [isPending, startTransition] = useTransition()

    const accessTokenData = useAccessToken();

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        startTransition(async () => {
            const gamesBySearchTerm = await getGamesBySlugOrSearchTerm({ type: "searchTerm", query: e.target.value }, accessTokenData.access_token);
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

    function closeResults() {
        setDisplayResults(false)
    }

    // Manage Focus and Blur states
    function handleFocus() {
        setDisplayResults(true);
    };
    function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
        if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) return;
        setDisplayResults(false);
    };
    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === 'Escape') {
            setDisplayResults(false);
        }
    };
    
    return (
        <div
            className="relative max-w-[360px] md:mx-auto"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
        >
            <div className="w-full flex items-center gap-2 rounded-full px-4 bg-gray-0 h-10 mt-6 border border-pink-200">
                <SearchIcon className="stroke-gray-500" size={20} />

                <input
                    className="w-full h-full text-gray-500 placeholder:text-gray-500"
                    type="text"
                    placeholder="Search games..."
                    onChange={handleInputChange}
                />
            </div>

            <AnimatePresence>
                {displayResults && (
                    <SearchResults 
                        results={gameSearchResult}
                        isPending={isPending}
                        onResultClick={closeResults}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}