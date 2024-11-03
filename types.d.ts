type AccessTokenData = {
    access_token: string
    expires_in: number
}

type GameSearchResult = {
    id: number
    name: string
    cover: {
        url: string
    }
    similar_games: { id: number, name: string, slug: string, cover: { url: string } }[]
    slug: string
}

type GameDetails = {
    id: number
    name: string
    cover: { url: string }
    involved_companies: { company: { name: string } }[]
    rating: number
    first_release_date: number
    genres: { name: string }[]
    summary: string[]
    platforms: { name: string }[]
    screenshots: { id: number, url: string }[]
    similar_games: { id: number, name: string, slug: string, cover: { url: string } }[]
    tags: string[]
    slug: string
}

type GameDetailsBadge = {
    title: string
    value: number | string | string[]
    icon: JSX.Element
}

type LocalStorageCtxValue = {
    addGame: ({ id: number, cover: string, slug: string, name: string, release_date: number, similar_games, isQuickAdd: boolean }) => void
    removeGame: ({ id: number, name: string }) => void
    sortGames: (sortOption: SortOptions) => void
    getGameSuggestions: () => { id: number, name: string, cover: { id: number, url: string }, slug: string }[]
    gameCollection: { id: number, cover: string, slug: string, name: string, added_at: string, release_date: number, similar_games: { id: number, name: string, cover: { id: number, url: string }, slug: string }[] }[]
}