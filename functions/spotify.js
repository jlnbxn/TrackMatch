const fetch = require("node-fetch");

exports.handler = async (event) => {
    let code = event.body;

    const { REACT_APP_SPOTIFY_CLIENT_ID, REACT_APP_SPOTIFY_CLIENT_SECRET, REACT_APP_SPOTIFY_REDIRECT_URI } = process.env


    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            body: `grant_type=authorization_code&code=${code}&redirect_uri=${REACT_APP_SPOTIFY_REDIRECT_URI}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization:
                    "Basic " +
                    Buffer.from(REACT_APP_SPOTIFY_CLIENT_ID + ":" + REACT_APP_SPOTIFY_CLIENT_SECRET).toString("base64"),
            },
        }).then((res) => res.json());

        // 
        return {
            statusCode: 200,
            body: JSON.stringify({
                ...response
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
