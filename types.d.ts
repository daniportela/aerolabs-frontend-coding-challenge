type AccessTokenData = {
    access_token: string
    expires_in: number
}

type GameSearchResult = {
    id: string
    name: string
    cover: {
        url: string
    }
    slug: string
}

type GameDetails = Array<{
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
}>

type GameDetailsBadge = {
    title: string
    value: number | string | string[]
    icon: JSX.Element
}

type LocalStorageCtxValue = {
    addGame: ({ id: number, cover: string, slug: string, name: string }) => void
    removeGame: ({ id: number, name: string }) => void
    isGameInCollection: boolean,
    gameCollection: { id: number, cover: string, slug: string, name: string }[]
}