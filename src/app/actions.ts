"use server"

export async function getGames(searchTerm: string, accessToken: string) {
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