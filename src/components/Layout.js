import { useEffect } from "react";
import styled from "@emotion/styled/macro";

const Grid = styled.div`
  display: grid;
  background-color: var(--main-background-color);
  grid-template-columns: 1fr;
  height: -webkit-fill-available;
  
  @media (min-width: 767px) {
    grid-template-columns: 300px minmax(0, 1fr);
    height: 100vh;
  }
`;

const Layout = ({ children, vendor }) => {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", vendor); // Change the theme
  }, [vendor]);

  return <Grid>{children}</Grid>;
};

export default Layout;
