/** @jsxImportSource @emotion/react */
import { memo, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { keyframes } from "@emotion/react/macro";
import styled from "@emotion/styled/macro";
import smoothscroll from "smoothscroll-polyfill";

import { ReactComponent as Prev } from "../icons/prev.svg";
import { ReactComponent as Next } from "../icons/next.svg";
import Item from "./Item";

smoothscroll.polyfill();

const fadeIn = keyframes`
   0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ResultsNavigationButton = styled.button`
  display: none;
  @media (min-width: 767px) {
    display: initial;
    visibility: ${(props) => (props.disabled ? "hidden" : "visible")};
    left: ${(props) => (props.direction === "next" ? "0" : "initial")};
    right: ${(props) => (props.direction === "prev" ? "0" : "initial")};
    opacity: 0;
    transition: ease-in 200ms;
  }
`;

const ShelfWrapper = styled.div`
  animation: ${fadeIn} 300ms;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;

  position: relative;
  &:hover {
    ${ResultsNavigationButton} {
      opacity: 1;
    }
  }
  padding: 0 25px;
  @media (min-width: 767px) {
    padding: 0 40px;
  } ;
`;

const ShelfHeader = styled.form`
  display: flex;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  font-size: 1.2rem;
  padding: 13px 0;
  border-top: 0.5px solid rgba(0, 0, 0, 0.15);
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  span {
    font-weight: bold;
    line-height: normal;
  }
`;

const Input = styled.input`
  border: none;
  display: inline;
  font-family: inherit;
  font-size: inherit;
  background: none;
  color: inherit;
  width: auto;
  padding: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  &:focus {
    outline: none;
  }
`;

const ResultsFor = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: var(--resultsForLineHeight);
  letter-spacing: var(--resultsForLetterSpacing);
  font-weight: var(--resultsForFontWeight);
  font-size: var(--resultsForFontSize);
  label {
    font-weight: 700;
  }
`;

const Results = styled.ul`
  padding: 0;
  display: grid;
  position: relative;
  overflow-x: visible;
  grid-auto-flow: column;
  overflow-x: auto;
  width: 100%;
  grid-template-rows: repeat(1, max-content);
  scroll-behavior: smooth;
  scrollbar-width: none;
  overscroll-behavior-x: none;
  scroll-snap-type: x mandatory;
  width: 100%;
  margin: -15px;
  padding: 15px;
  grid-column-gap: var(--grid-column-gap);
  grid-auto-columns: var(--grid-auto-columns);
  mask: linear-gradient(
    90deg,
    transparent 0,
    #000 15px,
    #000 calc(100% - 15px),
    transparent 100%
  );

  &::-webkit-scrollbar {
    display: none;
  }
  grid-auto-columns: 140px;

  @media (min-width: 999px) {
    grid-auto-columns: var(--grid-auto-columns);
  }
  @media (min-width: 1500px) {
    grid-auto-columns: var(--grid-auto-columns-large);
  }
`;

const ResultsOptions = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  font-size: var(--resultsOptionsFontSize);
  color: var(--resultsOptionsColor);
  line-height: var(--resultsOptionsLineHeight);
  font-weight: var(--resultsOptionsFontWeight);
  letter-spacing: var(--resultsOptionsLetterSpacing);
  text-transform: var(--resultsOptionsTextTransform);
  button {
    margin-left: 0.25rem;
  }
`;

const TextButton = styled.button`
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
`;

const Select = styled.select`
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  background: none;
  appearance: none;
  cursor: pointer;
  border: none;
  color: inherit;
  &:focus {
    outline: none;
  }
`;

const ResultsNav = styled.nav`
  button {
    position: absolute;
    top: 0;
    height: 100%;
    border: none;
    background: transparent;
    width: 40px;
    cursor: pointer;
    transition: 250ms background-color linear, 250ms color linear,
      250ms opacity linear;
    svg {
      margin: 0 auto;
      position: relative;
      top: 0;
      display: block;
      content: "";
      width: 13px;
      height: 29px;
      opacity: 0.85;
      path {
        fill: var(--navArrowFill);
      }
    }
  }
`;

const NoResults = styled.div`
  font-size: 26px;
  line-height: 1.23077;
  font-weight: 700;
  letter-spacing: 0;
  grid-column-start: span 2;
  /* white-space: nowrap; */
  p {
    font-size: 16px;
    font-weight: 400;
  }
`;

const ShelfBody = styled.div`
  width: calc(100% + 30px);
  /* overflow: hidden; */
`;


const Shelf = ({
  match,
  term,
  results,
  market,
  loved,
  type,
  reload,
  select,
  index,
  previewAudio,
  audio,
  error,
  allMarkets
}) => {
  const scroller = useRef(null);

  const [startRef, inViewStart] = useInView({
    root: scroller.current,
    threshold: 0.1,
  });
  const [endRef, inViewEnd] = useInView({
    root: scroller.current,
    threshold: 0.1,
  });

  const scrollToItem = async (scroller, direction) => {
    switch (direction) {
      case "left":
        scroller.current.scrollTo({
          top: 0,
          left: scroller.current.scrollLeft + scroller.current.clientWidth - 15,
          behavior: "smooth",
        });
        break;
      case "right":
        scroller.current.scrollTo({
          top: 0,
          left: scroller.current.scrollLeft - scroller.current.clientWidth - 15,
          behavior: "smooth",
        });
        break;
      default:
        scroller.current.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
    }
  };

  return (
    <ShelfWrapper>
      <ShelfHeader onSubmit={(event) => {
        reload(event, type, index)
        scrollToItem(scroller)
      }}>
        <ResultsFor>
          <label htmlFor="term">Results for&nbsp;</label>
          <Input size={term.length} defaultValue={term} name="term" />
        </ResultsFor>
        <ResultsOptions>
          <Select name="market" defaultValue={market}>
            {allMarkets.map((el, i) => <option key={i} value={el}>{el.toUpperCase()}</option>)}
          </Select>
          <TextButton type="submit">Reload</TextButton>
        </ResultsOptions>
      </ShelfHeader>

      <ShelfBody>
        <Results ref={scroller}>
          {results && results.length ? (
            results.map((result, i) => (
              <Item
                key={result.id}
                inViewRef={
                  i === 0 ? startRef : i === results.length - 1 ? endRef : null
                }
                isSelected={match.id === result.id}
                select={() => select(result.id, index)}
                loved={loved[i]}
                index={i}
                resultObj={result}
                currentTrack={audio.currentTrack}
                previewAudio={previewAudio}
                isPlaying={audio.isPlaying && audio.id === result.id}
              />
            ))
          ) : (
            <NoResults>
              {error.type} <p>{error.message}</p>
            </NoResults>
          )}
        </Results>

        <ResultsNav>
          <ResultsNavigationButton
            disabled={inViewStart || !results.length}
            direction="next"
            onClick={() => scrollToItem(scroller, "right")}
          >
            <Prev />
          </ResultsNavigationButton>
          <ResultsNavigationButton
            disabled={inViewEnd || !results.length}
            direction="prev"
            onClick={() => scrollToItem(scroller, "left")}
          >
            <Next />
          </ResultsNavigationButton>
        </ResultsNav>
      </ShelfBody>
    </ShelfWrapper>
  );
};
function areEqual(prevProps, nextProps) {
  if (
    prevProps.results === nextProps.results &&
    prevProps.match === nextProps.match &&
    // If the currently playing audio doesn't change on the shelf, or will change when clicking an item on another shelf, don't rerender
    prevProps.results.find((element) => element.id === prevProps.audio.id) ===
    undefined &&
    prevProps.results.find((element) => element.id === nextProps.audio.id) ===
    undefined
  ) {
    return true;
  } else {
    return false;
  }
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}

export default memo(Shelf, areEqual);

