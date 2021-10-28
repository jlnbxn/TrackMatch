/** @jsxImportSource @emotion/react */

import { Link } from 'react-router-dom'
import { css, keyframes } from "@emotion/react/macro";
import styled from "@emotion/styled/macro";
import { GlobalStyles } from "../styles/GlobalStyles";
import { Helmet } from 'react-helmet-async';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: -webkit-fill-available;
  height: 100vh;

  /* background-color: var(--main-background-color); */
  /* @media (max-width: 767px) {
    grid-template-columns: 1fr;
  } */
`;

const Left = styled.div`
background-color: white;
color: #d60017;
display: flex;
`
const Right = styled.div`
background-color: black;
color: #37b954;
display: flex;

`

const LinkWrapper = styled.span`
color: currentColor;
margin: auto;
display: block;
span {
  display: block;
  text-align: center;
}
transition: cubic-bezier(0.075, 0.82, 0.165, 1);

&:hover {
  transform: scale(1.1);
  transition: all 100ms cubic-bezier(0.075, 0.82, 0.165, 1);
}
`

const StyledLink = styled(Link)`
color: currentColor;
text-decoration: none;
font-weight: bold;
font-size: 2rem;
`


function Home() {
  return (
    <>
      <GlobalStyles />
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="theme-color" content={"#fff"} />
        <title>TrackMatch</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>


      <Grid>
        <Left>

          <LinkWrapper><StyledLink to="apple-music">

            <span css={css`color: black;  font-size: 1.5rem;`}>TrackMatch</span><span >Apple Music®</span></StyledLink>

          </LinkWrapper>
        </Left>
        <Right>


          <LinkWrapper>
            <StyledLink to="spotify">

              <span css={css`color: white;  font-size: 1.5rem;`}>TrackMatch</span><span >Spotify®</span></StyledLink>
          </LinkWrapper>
        </Right>


      </Grid>
    </>
  )
}

export default Home
