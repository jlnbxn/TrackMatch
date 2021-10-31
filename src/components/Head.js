import { Helmet } from "react-helmet-async";

function Head({ vendor }) {
    const { themeColor, formattedName, name } = vendor
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <meta name="theme-color" content={themeColor || "#fff"} />
            <title>TrackMatch for {" " + formattedName}</title>
            <link rel="icon" href={`vendor/favicon-${name}.ico`} />

            <link rel="canonical" href="http://mysite.com/example" />
            <link rel="manifest" href={`vendor/${name}/site.webmanifest`} />
            {/* 
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> */}
            {/* <link rel="manifest" href="/site.webmanifest" /> */}
            <meta name="msapplication-TileColor" content="#da532c" />

            <link rel="apple-touch-icon" sizes="180x180" href={`vendor/${name}/apple-touch-icon.png`} />
            <link rel="icon" type="image/png" sizes="32x32" href={`vendor/${name}/favicon-32x32.png`} />
            <link rel="icon" type="image/png" sizes="16x16" href={`vendor/${name}/favicon-16x16.png`} />
            {/* <link rel="manifest" href="/site.webmanifest" /> */}
            <meta name="msapplication-TileColor" content={`${themeColor} || "#fff"`} />

        </Helmet>
    )
}

export default Head
