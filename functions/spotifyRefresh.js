const fetch = require("node-fetch");

exports.handler = async (event, context) => {
    const { REACT_APP_SPOTIFY_CLIENT_ID, REACT_APP_SPOTIFY_CLIENT_SECRET, REACT_APP_SPOTIFY_REDIRECT_URI } = process.env

    const refresh_token = event.body;
    try {
        const { access_token, expires_in } = await fetch(
            "https://accounts.spotify.com/api/token",
            {
                method: "POST",
                body: `grant_type=refresh_token&refresh_token=${refresh_token}&redirect_uri=${REACT_APP_SPOTIFY_REDIRECT_URI}`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization:
                        "Basic " +
                        Buffer.from(REACT_APP_SPOTIFY_CLIENT_ID + ":" + REACT_APP_SPOTIFY_CLIENT_SECRET).toString("base64"),
                },
            }
        ).then((res) => res.json());

        return {
            statusCode: 200,
            body: JSON.stringify({
                access_token,
                expires_in,
            }),
        };
    } catch (error) {
        console.log(error);

        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    }
};
