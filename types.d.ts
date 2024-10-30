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
    screenshots: { url: string }[]
    similarGames: { cover: { url: string } }[]
    tags: string[]
}>

type GameDetailsBadge = {
    title: string
    value: number | string | string[]
    icon: JSX.Element
}