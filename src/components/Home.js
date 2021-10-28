import { Link } from 'react-router-dom'
import styled from "@emotion/styled/macro";
import { GlobalStyles } from "../styles/GlobalStyles";

const Grid = styled.div`
  /* display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  height: -webkit-fill-available;
  background-color: var(--main-background-color);
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  } */
`;

function Home() {
  return (
    <>
      <GlobalStyles />

      <Grid>
        <Link to="apple-music">TrackMatch Apple Music</Link>
        <Link to="spotify">TrackMatch Spotify</Link>
      </Grid>
    </>
  )
}

export default Home
