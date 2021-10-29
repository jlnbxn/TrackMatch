import { Helmet } from "react-helmet-async";

function Head({ themeColor, name }) {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <meta name="theme-color" content={themeColor || "#fff"} />
            <title>TrackMatch for {" " + name}</title>
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
    )
}

export default Head
