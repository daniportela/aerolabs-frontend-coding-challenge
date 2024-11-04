// Components
import { ScanSearch, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Hooks
import { useLocalStorageCtx } from "@/lib/LocalStorageProvider";

export default function GameCard({ game }: { game: { added_at: string } & ReducedGameDetails }) {
    const { removeGame } = useLocalStorageCtx();

    return (
        <motion.article layout key={game.id} className="min-h-40 md:min-h-56 relative rounded-lg shadow-lg border border-gray-200 group">
            <Image
                fill
                sizes="(max-width: 768px) 150px, (max-width: 1024px) 300px"
                src={`https:${game.cover.url}`}
                alt="Game cover"
                className="rounded-md"
            />

            <div className="w-full h-full grid place-content-center absolute top-0 left-0 bg-violet-600 rounded-lg opacity-0 group-hover:opacity-90 duration-200">
                <Link href={game.slug} className="bg-white p-2 rounded-full">
                    <ScanSearch size={22} />
                </Link>

                <button
                    onClick={() => removeGame({ id: game.id, name: game.name })}
                    className="absolute top-2 right-2 p-1 md:p-2 rounded-full group bg-red-600">
                    <Trash2 size={14} className="stroke-gray-0" />
                </button>
            </div>
        </motion.article>
    )
}