import { css, Global } from "@emotion/react/macro";
import variables from "./variables";

export const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        ${variables};
        * {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
          box-sizing: border-box;
        }

        html {
          transition: ease-in all 1s;
        }

        body {
          color: var(--systemPrimary);
          background-color: var(--bodyBackgroundColor);
        }

        li {
          list-style: none;
        }
      `}
    />
  );
};
