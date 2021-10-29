/** @jsxImportSource @emotion/react */
import { memo } from "react";
import { millisToMinutesAndSeconds } from "../utils/formatting";
import { ReactComponent as PlayIcon } from "../icons/play.svg";
import { ReactComponent as PauseIcon } from "../icons/pause.svg";
import { ReactComponent as Heart } from "../icons/heart.svg";
import styled from "@emotion/styled/macro";
import { css } from "@emotion/react/macro";

const Controls = styled.div`
  opacity: 1;
  width: 100%;
  height: 100%;
  top: 0;
  position: absolute;
  border-radius: var(--artworkBorderRadius);
  z-index: 1;
  transition: opacity 0.1s ease-in;
`;
const Artwork = styled.div`
  position: relative;
  margin-bottom: var(--artworkMarginBottom);
  aspect-ratio: 1;
  background-color: ${(props) => (props.bg ? props.bg : "grey")};
  border-radius: 6px;
`;

const Media = styled.img`
  width: 100%;
  height: auto;
  vertical-align: bottom;
  border-radius: var(--artworkBorderRadius);
  box-shadow: var(--artworkBoxShadow);
  position: relative;
`;

const Metadata = styled("div")`
  padding-top: 6px;
  font-size: var(--metadataFontSize);
  line-height: var(--metadataLineHeight);
  font-weight: var(--metadataFontWeight);
  color: var(--systemSecondary);
  p {
    margin: 0;
    margin-bottom: var(--metadataMarginBottom);
    :last-child {
      margin-bottom: 0;
    }

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
      /* text-decoration: underline; */
    }
  }
  div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Title = styled.div`
  font-size: var(--metadataTitleFontSize);
  color: var(--systemPrimary);
  line-height: var(--metadataTitleLineHeight);
  font-weight: var(--metadataTitleFontWeight);
  margin-bottom: var(--metadataTitleMarginBottom);
`;

const Button = styled("button")`
  visibility: hidden;
  height: 28px;
  width: 28px;
  display: inline-block;
  padding: 0;
  border: none;
  margin: 0;
  text-decoration: none;
  font-family: sans-serif;
  cursor: pointer;
  background-color: transparent;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  border-radius: 100%;
  z-index: 3;

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    position: absolute;
    background-color: #fff;
    opacity: 0.2;
    z-index: 1;
  }
  &:hover {
    &::before {
      background-color: var(--systemAccentBG);
      opacity: 1;
    }
  }
  svg {
    position: relative;
    z-index: 2;
  }
`;

const Root = styled.div`
  scroll-margin: var(--scroll-margin);
  cursor: pointer;
  list-style: none;
  min-width: calc(20% - 1.5em);
  scroll-snap-align: start;
  min-width: 0;
  margin: var(--shelfItemMargin);
  padding: var(--shelfItemPadding);
  border-radius: var(--shelfItemBorderRadius);
  transition: var(--shelfItemTransition);

  /* background-color: ${(props) =>
    props.isSelected
      ? "var(--shelfItemIsSelectedBackgroundColor)"
      : "var(--shelfItemBackgroundColor)"} */
  ${Artwork} {
    ${(props) =>
    props.isSelected
      ? "outline: var(--outline); outline-offset: var(--outlineOffset)"
      : {}}
  }

  &:hover {
    background-color: ${(props) =>
    props.isSelected
      ? "var(--shelfItemIsSelectedBackgroundColor)"
      : "var(--shelfItemBackgroundColorHover)"};
    ${Controls} {
      background: var(--controlsBackgroundColorHover);
      transition: var(--shelfItemTransition);
    }
    ${Button} {
      visibility: visible;
    }
  }
`;

const Item = ({
  resultObj,
  inViewRef,
  select,
  isSelected,
  loved,
  previewAudio,

  isPlaying,
}) => {
  const {
    title,
    artistName,
    albumName,
    artworkUrl,
    artworkBg,
    releaseDate,
    durationMs,
    previewUrl,
    isrc,
    explicit,
    id,
  } = resultObj || {};



  return (
    <Root
      ref={inViewRef}
      onClick={select}
      isSelected={isSelected}
      style={{
        backgroundColor: isSelected
          ? "var(--shelfItemIsSelectedBackgroundColor)"
          : "var(--shelfItemBackgroundColor)",
      }}
    >
      <Artwork bg={artworkBg}>
        <picture>
          <Media src={artworkUrl && artworkUrl} alt={albumName} loading="lazy" />
        </picture>
        <Controls>
          <Button
            css={css`
              position: absolute;
              bottom: 10px;
              left: 10px;
            `}
          >
            <Heart style={{ fill: loved && "#fff" }} />
          </Button>

          {previewUrl !== null && (
            <Button
              css={css`
                position: absolute;
                bottom: 10px;
                right: 10px;
              `}
              aria-label="play/pause"
              onClick={(e) => previewAudio(e, previewUrl, id)}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </Button>
          )}
        </Controls>
      </Artwork>

      <Metadata>
        <Title>{title}</Title>
        <p>{artistName}</p>
        <p>{albumName && albumName}</p>
        <p>{durationMs && millisToMinutesAndSeconds(durationMs)}</p>
        <p>{releaseDate && releaseDate}</p>
        <p>{isrc && isrc}{explicit && ' 🅴'}</p>
      </Metadata>
    </Root>
  );
};

function areEqual(prevProps, nextProps) {
  if (
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.isPlaying === nextProps.isPlaying
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

export default memo(Item, areEqual);
