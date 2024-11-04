// Components
import { ScanSearch, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Hooks
import { useLocalStorageCtx } from "@/lib/LocalStorageProvider";

export default function GameCard({ game }: { game: { added_at: string } & ReducedGameDetails }) {
    const { removeGame } = useLocalStorageCtx();

    return (
        <article key={game.id} className="min-h-40 w-full relative rounded-lg shadow-lg border border-gray-200">
            <Image
                fill
                src={`https:${game.cover.url}`}
                alt="Game cover"
                className="rounded-md"
            />

            <div className="w-full h-full grid place-content-center absolute top-0 left-0 bg-violet-600 rounded-lg opacity-90">
                <Link href={game.slug} className="bg-white p-2 rounded-full">
                    <ScanSearch size={22} />
                </Link>

                <button
                    onClick={() => removeGame({ id: game.id, name: game.name })}
                    className="absolute top-2 right-2 bg-gray-0 p-1 rounded-full">
                    <Trash2 size={14} />
                </button>
            </div>
        </article>
    )
}