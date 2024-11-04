// Utils
import { cn } from "@/lib/utils";

// Hooks
import { useRef } from "react";
import { useLocalStorageCtx } from "@/lib/LocalStorageProvider"
import { motion, useScroll, useTransform } from "framer-motion";

export enum SortOptions {
    LAST_ADDED = "Last added",
    NEWEST = "Newest",
    OLDEST = "Oldest"
}

export default function GameFilters() {
    const { sortGames } = useLocalStorageCtx();

    const activeFilter = useRef(SortOptions.LAST_ADDED);
    
    const { scrollYProgress } = useScroll()

    const background = useTransform(scrollYProgress, [0, .5], ["transparent", "hsla(0, 0%, 100%, 0.85)"]);

    return (
        <motion.div
            style={{ background, transitionDuration: "200ms" }}
            className="sticky top-6 z-10 flex flex-wrap text-violet-900 rounded-full w-fit p-1 my-5 md:mx-auto"
        >
            {
                Object.entries(SortOptions).map(([key, value]) => {
                    const isActiveClassName = activeFilter.current === value ? "bg-violet-900 text-gray-0" : "text-violet-900";

                    return (
                        <button
                            key={key}
                            className={cn("rounded-full py-2 px-4", isActiveClassName)}
                            onClick={() => {
                                activeFilter.current = value
                                sortGames(value)
                            }}
                        >
                            {value}
                        </button>
                    )
                })
            }
        </motion.div>
    )
}