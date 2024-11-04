type AccessTokenData = {
    access_token: string
    expires_in: number
}

type Cover = {
    url: string
}

type InvolvedCompany = {
    company: {
        id: number
        name: string
    }
}

type Genre = {
    id: number
    name: string
}

type Platform = {
    id: number
    name: string
}

type Screenshot = {
    id: number
    url: string
}

type SimilarGame = Pick<GameDetails, "id" | "name" | "slug" | "cover" | "first_release_date" | "similar_games">

type GameDetails = {
    id: number
    name: string
    cover: Cover
    involved_companies: Array<InvolvedCompany>
    rating: number
    first_release_date: number
    genres: Array<Genre>
    summary: Array<string>
    platforms: Array<Platform>
    screenshots: Array<Screenshot>
    similar_games: Array<SimilarGame>
    slug: string
}

type ReducedGameDetails = Pick<GameDetails, "id" | "name" | "slug" | "cover" | "first_release_date" | "similar_games">

type GameDetailsBadge = {
    title: string
    value: number | string | string[]
    icon: JSX.Element
}

type LocalStorageCtxValue = {
    addGame: ({ id, cover, slug, name, release_date, similar_games }: Pick<GameDetails, "id" | "name" | "cover" | "slug" | "first_release_date" | "similar_games">) => void
    removeGame: ({ id: number, name: string }) => void
    sortGames: (sortOption: SortOptions) => void
    getGameSuggestions: () => Array<ReducedGameDetails>
    gameCollection: Array<{ added_at: string } & ReducedGameDetails>
}