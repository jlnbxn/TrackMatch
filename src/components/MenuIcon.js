/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled/macro";

const Root = styled.button`
  background: 0 0;
  color: inherit;
  cursor: pointer;
  font: inherit;
  line-height: inherit;
  border: none;
  display: block;
  position: fixed;
  top: 0;
  left: 12px;
  width: 44px;
  height: 44px;
  cursor: pointer;
  transition: opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-tap-highlight-color: transparent;
  z-index: 9903;
  opacity: 0.65;
`;

const BunTop = styled.span`
  left: 13px;
  position: absolute;
  top: 12px;
  width: 20px;
  height: 20px;
  transition: transform 0.1806s cubic-bezier(0.04, 0.04, 0.12, 0.96);
  transform: none;
  ${(props) =>
        props.open &&
        `transition: transform .3192s cubic-bezier(.04,.04,.12,.96) .1008s;
    transform: rotate(
45deg);`}
`;

const CrustTop = styled.span`
  left: 0;
  display: block;
  width: 20px;
  height: 2px;
  border-radius: 1px;
  background: var(--buttonColor);
  position: absolute;
  top: 9px;
  transform: translateY(-4px);
  transition: transform 0.1596s cubic-bezier(0.52, 0.16, 0.52, 0.84) 0.1008s;
  ${(props) =>
        props.open &&
        `transition: transform .1806s cubic-bezier(.04,.04,.12,.96);
    transform: none;`}
`;

const BunBottom = styled.span`
  left: 13px;
  position: absolute;
  top: 12px;
  width: 20px;
  height: 20px;
  transition: opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  padding-inline-start: 12px;
  transition: transform 0.1806s cubic-bezier(0.04, 0.04, 0.12, 0.96);
  transform: none;
  ${(props) =>
        props.open &&
        `transition: transform .3192s cubic-bezier(.04,.04,.12,.96) .1008s;
transform: rotate(
-45deg);`}
`;

const CrustBottom = styled.span`
  left: 0;
  display: block;
  width: 20px;
  height: 2px;
  border-radius: 1px;
  background: var(--buttonColor);
  position: absolute;
  bottom: 9px;
  transform: translateY(4px);
  transition: transform 0.1596s cubic-bezier(0.52, 0.16, 0.52, 0.84) 0.1008s;
  ${(props) =>
        props.open &&
        `    transition: transform .1806s cubic-bezier(.04,.04,.12,.96);
    transform: none;`}
`;

const MenuIcon = ({ onClick, open }) => {
    return (
        <Root onClick={onClick}>
            <BunTop open={open}>
                <CrustTop open={open} />
            </BunTop>
            <BunBottom open={open}>
                <CrustBottom open={open} />
            </BunBottom>
        </Root>
    );
};

export default MenuIcon;
