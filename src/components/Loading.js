/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled/macro";
import { keyframes } from "@emotion/react/macro";

const loading = keyframes`
    0% {
        opacity: .16863
    }

    to {
        opacity: 1
    }
`;

const LoadingAppleWrapper = styled.div`
  position: relative;
  margin: auto;

  @media (max-width: 767px) {
    margin: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, 0);
  }

  div {
    position: absolute;
    left: 50%;
    top: 0;
    margin-left: -1.5px;
    width: 3px;
    height: 9px;
    border-radius: 1.5px;
    -webkit-transform-origin: center 16px;
    transform-origin: center 16px;
    animation-name: ${loading};
    animation-direction: reverse;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.33333, 0, 0.66667, 0.33333);
    background: #000;
  }

  div:nth-of-type(1) {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  div:nth-of-type(2) {
    -webkit-animation-delay: -0.91667s;
    animation-delay: -0.91667s;
    -webkit-transform: rotate(30deg);
    transform: rotate(30deg);
  }

  div:nth-of-type(3) {
    -webkit-animation-delay: -0.83333s;
    animation-delay: -0.83333s;
    -webkit-transform: rotate(60deg);
    transform: rotate(60deg);
  }

  div:nth-of-type(4) {
    -webkit-animation-delay: -0.75s;
    animation-delay: -0.75s;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  div:nth-of-type(5) {
    -webkit-animation-delay: -0.66667s;
    animation-delay: -0.66667s;
    -webkit-transform: rotate(120deg);
    transform: rotate(120deg);
  }

  div:nth-of-type(6) {
    -webkit-animation-delay: -0.58333s;
    animation-delay: -0.58333s;
    -webkit-transform: rotate(150deg);
    transform: rotate(150deg);
  }

  div:nth-of-type(7) {
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  div:nth-of-type(8) {
    -webkit-animation-delay: -0.41667s;
    animation-delay: -0.41667s;
    -webkit-transform: rotate(210deg);
    transform: rotate(210deg);
  }

  div:nth-of-type(9) {
    -webkit-animation-delay: -0.33333s;
    animation-delay: -0.33333s;
    -webkit-transform: rotate(240deg);
    transform: rotate(240deg);
  }

  div:nth-of-type(10) {
    -webkit-animation-delay: -0.25s;
    animation-delay: -0.25s;
    -webkit-transform: rotate(270deg);
    transform: rotate(270deg);
  }

  div:nth-of-type(11) {
    -webkit-animation-delay: -0.16667s;
    animation-delay: -0.16667s;
    -webkit-transform: rotate(300deg);
    transform: rotate(300deg);
  }

  div:nth-of-type(12) {
    -webkit-animation-delay: -0.08333s;
    animation-delay: -0.08333s;
    -webkit-transform: rotate(330deg);
    transform: rotate(330deg);
  }
`;

const Container = styled.div`
  margin: auto;
  /* background-color: var(--bodyBackgroundColor); */
  /* height: -webkit-fill-available; */
  /* padding-bottom: 200px; */
  @media (max-width: 767px) {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
  }
`;

function LoadingApple() {
    return (
        <Container>
            <LoadingAppleWrapper>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </LoadingAppleWrapper>
        </Container>
    );
}

const spotifyLoading = keyframes`
 0% {
                    -webkit-animation-timing-function: cubic-bezier(1,0,0.7,1);
                    animation-timing-function: cubic-bezier(1,0,0.7,1);
                    opacity: 0.5;
                    -webkit-transform: scale(1);
                    -ms-transform: scale(1);
                    transform: scale(1);
                }

                40% {
                    -webkit-animation-timing-function: cubic-bezier(0.3,0,0,1);
                    animation-timing-function: cubic-bezier(0.3,0,0,1);
                    opacity: 0.75;
                    -webkit-transform: scale(1.3);
                    -ms-transform: scale(1.3);
                    transform: scale(1.3);
                }

                72.5% {
                    -webkit-animation-timing-function: linear;
                    animation-timing-function: linear;
                    opacity: 0.5;
                    -webkit-transform: scale(1);
                    -ms-transform: scale(1);
                    transform: scale(1);
                }

                100% {
                    opacity: 0.5;
                    -webkit-transform: scale(1);
                    -ms-transform: scale(1);
                    transform: scale(1);
                }
`;

const LoadingWrapperSpotify = styled.div`
  content: "";
  height: 12.4444px;
  width: 56px;
  /* position: relative; */
  margin: auto;

  @media (max-width: 767px) {
    margin: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, 0);
  }

  svg {
    content: "";
    height: 12.4444px;
    width: 56px;
    circle {
      fill: #fff;
      animation: 1.32s linear 0s infinite normal none running ${spotifyLoading};
      transform-origin: center center;
    }
    circle:nth-of-type(2) {
      animation-delay: 0.1s;
    }
    circle:nth-of-type(3) {
      animation-delay: 0.2s;
    }
  }
`;

function LoadingSpotify() {
    return (
        <Container>
            <LoadingWrapperSpotify>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 1 100"
                    role="progressbar"
                    aria-valuetext="Loading"
                    className="LoadingIndicatorSvg-dj4dcm-0 biwJNY"
                >
                    <circle
                        stroke="none"
                        cx="-140"
                        cy="50"
                        r="32"
                        className="LoadingIndicatorCircle-enjajd-0 wfJFA"
                    ></circle>
                    <circle
                        stroke="none"
                        cx="0"
                        cy="50"
                        r="32"
                        className="LoadingIndicatorCircle-enjajd-0 wfJFA"
                    ></circle>
                    <circle
                        stroke="none"
                        cx="140"
                        cy="50"
                        r="32"
                        className="LoadingIndicatorCircle-enjajd-0 wfJFA"
                    ></circle>
                </svg>
            </LoadingWrapperSpotify>
        </Container>
    );
}

function Loading({ vendor }) {
    if (vendor === "appleMusic") {
        return <LoadingApple />;
    }
    if (vendor === "spotify") {
        return <LoadingSpotify />;
    }
}

export default Loading;
