import styled from "@emotion/styled/macro";
import { startCase } from "../utils/formatting";

const LogoContainer = styled.div`
  padding: 0 25px;
  margin: 1rem 0;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  align-items: center;
  pointer-events: none;

  @media (min-width: 767px) {
    flex-direction: column;
    position: static;
    align-items: flex-start;
    overflow-y: auto;
  }
`;

const Heading = styled.h1`
  margin-bottom: 2px;
  font-size: 1rem;
  margin: 0;
  color: var(--systemPrimary);
  @media (min-width: 767px) {
    font-size: 1.5rem;
  }
`;

const Sub = styled.div`
  span:nth-of-type(1) {
    font-weight: 700;
    color: var(--systemPrimary);
  }
  span:nth-of-type(2) {
    font-weight: 700;
    color: var(--systemAccentBG);
  }
`;

const Logo = ({ vendor }) => {
  return (
    <LogoContainer>
      <Heading>TrackMatch&nbsp;</Heading>
      <Sub>
        <span>for&nbsp;</span>
        <span>{startCase(vendor)}®</span>
      </Sub>
    </LogoContainer>
  );
};

export default Logo;
