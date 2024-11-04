"use client"

// Components
import Image from "next/image";
import CollectGameButton from "@/components/collect-game-button";
import { Toaster } from "@/components/ui/toaster";
import GameDetailsBadges from "@/components/game-details-badges";
import { Calendar, Puzzle, SearchX, Star } from "lucide-react";
import GameMediaCarousel from "@/components/game-media";
import Link from "next/link";
import { Spinner } from "@/components/Spinner";

// Hooks
import { useQuery } from "@tanstack/react-query";
import { useAccessToken } from "@/lib/AccessTokenProvider";

// Actions
import { getGamesBySlugOrSearchTerm } from "../actions"

function GameDetail({ gameDetails }: { gameDetails?: GameDetails }) {
    if (gameDetails === undefined) {
        return (
            <div className="mt-40">
                <SearchX size={58} className="mx-auto stroke-red-600" />
                <h2 className="font-bold text-gray-1000 text-center text-2xl mt-4">404 Not found</h2>
                <span className="text-gray-500 block text-center text-lg">We couldn&apos;t find what you&apos;re looking for. <br/> Please try again.</span>
            </div>
        )
    }

    const date = new Date(gameDetails?.first_release_date * 1000);

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    const formattedReleaseDate = (month && day && year) ? `${month}/${day}/${year}` : "N/A";

    const detailBadges: GameDetailsBadge[] = [
        {
            title: "Rating",
            value: Math.floor(gameDetails?.rating) || "N/A",
            icon: <Star size={20} className="stroke-violet-600" />
        },
        {
            title: "Release",
            value: formattedReleaseDate,
            icon: <Calendar size={20} className="stroke-violet-600" />
        },
        {
            title: "Genre(s)",
            value: gameDetails?.genres.map(g => g.name).join(", "),
            icon: <Puzzle size={20} className="stroke-violet-600" />
        },
    ]

    return (
        <div className="max-w-[780px] mx-auto">
            <main className="grid grid-cols-[.4fr_.6fr] md:grid-cols-[.3fr_.7fr] md:max-w-[600px] gap-4 mt-12">
                <div className="relative min-h-56">
                    {
                        gameDetails?.cover?.url && (
                            <Image
                                fill
                                sizes="(max-width: 768px) 150px, (max-width: 1024px) 300px"
                                quality={100}
                                src={`https:${gameDetails?.cover?.url}`} alt={gameDetails?.name}
                                className="rounded-xl"
                                style={{ objectFit: "cover" }}
                            />
                        )
                    }
                </div>

                <div>
                    <h1 className="bg-gradient-to-r from-violet-900 to-violet-600 font-bold text-xl bg-clip-text text-transparent leading-normal">
                        {gameDetails?.name}
                    </h1>
                    <span className="text-gray-500">
                        {gameDetails?.involved_companies.map(c => c.company.name).join(", ")}
                    </span>
                </div>
            </main>

            <CollectGameButton gameData={gameDetails} />

            <GameDetailsBadges details={detailBadges} />

            <section>
                <h2 className="text-gray-1000 font-bold text-lg mt-6">
                    Summary
                </h2>

                <p className="mt-2">{gameDetails?.summary}</p>
            </section>

            <section>
                <h2 className="text-gray-1000 font-bold text-lg mt-6">
                    Platforms
                </h2>

                <p className="mt-2">{gameDetails?.platforms.map(p => p.name).join(", ")}</p>
            </section>

            <section>
                <h2 className="text-gray-1000 font-bold text-lg mt-6">
                    Media
                </h2>

                <GameMediaCarousel media={gameDetails?.screenshots} />
            </section>

            <section className="mt-4">
                <h2 className="bg-gradient-to-r from-violet-900 to-violet-600 font-bold text-lg bg-clip-text text-transparent leading-normal">
                    Similar games
                </h2>

                <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-3">
                    {gameDetails?.similar_games.map(game => (
                        <article key={game.id} className="h-52">
                            <Link className="relative block w-full h-full" href={`/${game.slug}`}>
                                <Image
                                    className="rounded-md"
                                    src={`https:${game?.cover?.url}`}
                                    fill
                                    sizes="(max-width: 768px) 150px, (max-width: 1024px) 300px"
                                    alt={game.name}
                                />
                            </Link>
                        </article>
                    ))}
                </div>
            </section>

            <Toaster />
        </div>
    )
}

export default function GameDetailWrapper({ params }: { params: { slug: string } }) {
    const accessTokenData = useAccessToken();

    const { data: gameDetails, isPending } = useQuery({
        queryKey: ["gameDetails", { type: "slug", query: params.slug }, accessTokenData.access_token],
        queryFn: () => getGamesBySlugOrSearchTerm({ type: "slug", query: params.slug }, accessTokenData.access_token)
    })

    if (isPending) return <Spinner size="large" className="stroke-violet-900 mt-40" />
    
    return <GameDetail gameDetails={gameDetails?.[0]} />
}