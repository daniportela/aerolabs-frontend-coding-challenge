"use client"

import { useEffect, useState } from "react"
import { getGames } from "@/app/actions"
import Image from "next/image"
import { Swords } from "lucide-react"

function SearchResults({ results }: { results: GameSearchResult[] }) {
    function truncateText(text: string, maxLength: number) {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    }

    return (
        <div className="absolute top-20 flex flex-col gap-2 w-full min-h-[100px] max-h-[300px] overflow-scroll p-2 rounded-xl bg-gray-0 border-[1px] border-pink-200">
            {results.map(result => (
                <div key={result.id} className="grid grid-cols-[30px_1fr] items-center gap-4">
                    {
                        result.cover ? (
                            <Image
                                width={30}
                                height={30}
                                src={`https:${result.cover.url}`} alt={result.name}
                                style={{ borderRadius: '4px' }}
                            />
                        ) : (
                            <div className="w-[30px] h-[30px] grid place-content-center border-[1px] border-pink-50 rounded-md">
                                <Swords size={18} />
                            </div>
                        )
                    }
                    <span>
                        {truncateText(result.name, 32)}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default function Search({ accessTokenData }: { accessTokenData: AccessTokenData }) {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [gameSearchResult, setGameSearchResult] = useState<GameSearchResult[]>([]);

    useEffect(() => {
        const debounce = setTimeout(async () => {
            const games = await getGames(searchTerm, accessTokenData.access_token);

            setGameSearchResult(games)
            console.log(games)
        }, 2000)

        return () => clearTimeout(debounce);
    }, [searchTerm])
    
    return (
        <div className="relative">
            <input
                className="w-full rounded-full h-10 px-4 mt-6 border-[1px] border-pink-200"
                type="text"
                placeholder="Search games..."
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
            />

            {/* {gameSearchResult && <SearchResults results={gameSearchResult} />} */}
            <SearchResults results={gameSearchResult} />
        </div>
    )
}