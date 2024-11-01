import Image from "next/image";
import { getGameBySlug } from "../actions"
import CollectGameButton from "@/components/collect-game-button";
import { Toaster } from "@/components/ui/toaster";
import GameDetailsBadges from "@/components/game-details-badges";
import { Calendar, Puzzle, Star } from "lucide-react";
import GameMediaCarousel from "@/components/game-media";
import Link from "next/link";

export default async function GameDetail({ params }: { params: { slug: string } }) {
    const [gameDetails] = await getGameBySlug(params.slug, "qphbqm52buuxwc43qt65kh7te32di3")

    // console.log("URL", gameDetails);

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
        <>
            <main className="grid grid-cols-[.4fr_.6fr] gap-4 mt-12">
                <div className="relative min-h-44">
                    {
                        gameDetails?.cover?.url && (
                            <Image
                                fill
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

            <CollectGameButton
                gameData={{
                    id: gameDetails?.id,
                    cover: gameDetails?.cover.url,
                    name: gameDetails?.name
                }}
            />

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

                <div className="grid grid-cols-3 gap-4 mt-3">
                    {gameDetails?.similar_games.map(game => (
                        <article key={game.id} className="h-40">
                            <Link className="relative block w-full h-full" href={`/${game.slug}`}>
                                <Image
                                    className="rounded-md"
                                    src={`https:${game?.cover?.url}`}
                                    fill
                                    alt={game.name}
                                />
                            </Link>
                        </article>
                    ))}
                </div>
            </section>

            <Toaster />
        </>
    )
}