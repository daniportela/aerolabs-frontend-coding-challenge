import Image from "next/image";
import { getGameBySlug } from "../actions"
import CollectGameButton from "@/components/collect-game-button";
import { Toaster } from "@/components/ui/toaster";
import GameDetailsBadges from "@/components/game-details-badges";
import { Calendar, Puzzle, Star } from "lucide-react";

export default async function GameDetail({ params }: { params: { slug: string } }) {
    const [gameDetails] = await getGameBySlug(params.slug, "xjh47g8rng7ko2y0ko3nw790ssynfu")

    console.log("URL", gameDetails);

    const detailBadges: GameDetailsBadge[] = [
        {
            title: "Rating",
            value: gameDetails?.rating,
            icon: <Star />
        },
        {
            title: "Release",
            value: gameDetails?.first_release_date,
            icon: <Calendar />
        },
        {
            title: "Genre(s)",
            value: gameDetails?.genres.map(g => g.name),
            icon: <Puzzle />
        },
    ]

    return (
        <>
            <div className="grid grid-cols-[.4fr_.6fr] h-40 gap-4 mt-12">
                <div className="relative">
                    <Image
                        fill
                        quality={100}
                        src={`https:${gameDetails?.cover?.url}`} alt={gameDetails?.name}
                        className="rounded-xl"
                        style={{ objectFit: "cover" }}
                    />
                </div>

                <div>
                    <h1 className="bg-gradient-to-r from-violet-900 to-violet-600 font-bold text-xl bg-clip-text text-transparent leading-normal">
                        {gameDetails?.name}
                    </h1>
                    <span className="text-gray-500">
                        {gameDetails?.involved_companies.map(c => c.company.name)}
                    </span>
                </div>
            </div>

            <CollectGameButton gameData={{ id: gameDetails?.id, name: gameDetails?.name }} />

            <GameDetailsBadges details={detailBadges} />

            <Toaster />
        </>
    )
}