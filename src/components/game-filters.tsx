import { useLocalStorageCtx } from "@/lib/LocalStorageProvider"
import { cn } from "@/lib/utils";
import { useRef } from "react";

export enum SortOptions {
    LAST_ADDED = "Last added",
    NEWEST = "Newest",
    OLDEST = "Oldest"
}

export default function GameFilters() {
    const { sortGames } = useLocalStorageCtx();

    const activeFilter = useRef(SortOptions.LAST_ADDED);

    return (
        <div className="flex flex-wrap text-violet-900 rounded-full w-fit my-5">
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
        </div>
    )
}