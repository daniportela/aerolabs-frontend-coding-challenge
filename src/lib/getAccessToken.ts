"use server"

export default async function getAccessToken() {
    try {
        const params = new URLSearchParams({
            client_id: process.env.TWITCH_CLIENT_ID as string,
            client_secret: process.env.TWITCH_CLIENT_SECRET as string,
            grant_type: "client_credentials"
        });
    
        const response = await fetch(`https://id.twitch.tv/oauth2/token?${params}`, { method: "POST" });
        const tokenData = await response.json();

        return tokenData;
    } catch (error) {
        throw new Error("Something went wrong when retrieving the access token:" + error)
    }
}