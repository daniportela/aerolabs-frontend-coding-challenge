"use server"

export async function getGamesBySlugOrSearchTerm(searchOptions: { query: string, type: "slug" | "searchTerm" }, accessToken: string): Promise<Array<GameDetails>> {
    const { query, type } = searchOptions;

    const fields = [
        "name",
        "cover.url",
        "involved_companies.company.name",
        "rating",
        "summary",
        "genres.name",
        "screenshots.url",
        "first_release_date",
        "release_dates.human",
        "similar_games.cover.url",
        "similar_games.slug",
        "similar_games.name",
        "platforms.name",
        "slug"
    ].join(", ")

    const conditionAndLimit = `limit ${type === "slug" ? "1" : "50"}; ${type === "slug" ? `where slug = "${query}"` : `search "${query}"`}`

    const options = {
        "method": "POST",
        "headers": {
            "Client-ID": process.env.TWITCH_CLIENT_ID as string,
            "Authorization": `Bearer ${accessToken}`
        },
        "body": `fields ${fields}; ${conditionAndLimit};`
    }

    const response = await fetch("https://api.igdb.com/v4/games/", options)
        .then((data) => data.json())
        .catch((err) => console.error(err));
    
    return response;
}