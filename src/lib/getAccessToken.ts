export default async function getAccessToken() {
    const params = new URLSearchParams({
        client_id: process.env.TWITCH_CLIENT_ID as string,
        client_secret: process.env.TWITCH_CLIENT_SECRET as string,
        grant_type: "client_credentials"
    });

    const response = await fetch(`https://id.twitch.tv/oauth2/token?${params}`, { method: "POST" });
    const tokenData = await response.json();

    return tokenData;
}