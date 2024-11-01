"use server"

export async function getGamesBySearchTerm(searchTerm: string, accessToken: string): Promise<GameSearchResult[]> {
    const options = {
        "method": "POST",
        "headers": {
            "Client-ID": process.env.TWITCH_CLIENT_ID as string,
            "Authorization": `Bearer ${accessToken}`
        },
        "body": `fields name, slug, cover.url; limit 50; search "${searchTerm}";`
    }

    const response = await fetch("https://api.igdb.com/v4/games/", options)
        .then((data) => data.json())
        .catch((err) => console.error(err));
    
    return response;
}

export async function getGameBySlug(slug: string, accessToken: string): Promise<GameDetails> {
    const options = {
        "method": "POST",
        "headers": {
            "Client-ID": process.env.TWITCH_CLIENT_ID as string,
            "Authorization": `Bearer ${accessToken}`
        },
        "body": `fields name, cover.url, involved_companies.company.name, rating, summary, genres.name, screenshots.url, first_release_date, release_dates.human, similar_games.cover.url, similar_games.slug, similar_games.name, platforms.name; where slug = "${slug}";`
    }

    const response = await fetch("https://api.igdb.com/v4/games/", options)
        .then((data) => data.json())
        .catch((err) => console.error(err));
    
    return response;
}