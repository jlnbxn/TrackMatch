import styled from "@emotion/styled/macro";
import { useNavigate } from "react-router";
import Button from "./Button";

const Root = styled.footer`
  margin-top: auto;
  margin-bottom: 18px;
  padding: 0 25px;
`;

const LinkButton = styled.div`
  text-decoration: none;
  color: var(--systemSecondary);
  margin-top: 1rem;
  display: block;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    color: var(--systemAccentBG);
  }
`;

const Footer = ({ vendor, secondaryVendor, loading }) => {
    const { api } = vendor;

    const navigate = useNavigate();
    return (
        <Root>
            {api ? (
                <Button onClick={() => vendor.logout()}>Logout</Button>
            ) : (
                <Button onClick={() => vendor.login()}>Login</Button>
            )}

            <LinkButton
                disabled={loading}
                onClick={() => navigate(secondaryVendor.pathName)}
            >
                Go to TrackMatch for {secondaryVendor.formattedName}
            </LinkButton>
        </Root>
    );
};

export default Footer;
