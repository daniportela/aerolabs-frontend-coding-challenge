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
}

type GameDetails = {
    id: number
    name: string
    cover: string
    publisher: string
    rating: number
    release_dates: Date[]
    genre: string
    storyline: string
    // OR
    summary: string
    platforms: string[]
    screenshots: string[]
    similarGames: string[]
    tags: string[]
}

