import styled from "@emotion/styled/macro";
import Logo from "./Logo";
import MenuIcon from "./MenuIcon";

const Root = styled.nav`
  top: 0;
  position: fixed;
  z-index: 9901;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: -webkit-fill-available;
  touch-action: none;
  pointer-events: none;
  transition: all 0.56s cubic-bezier(0.52, 0.16, 0.24, 1);
  justify-content: flex-start;
  color: var(--systemSecondary);
  width: 100%;
  /*     height: -webkit-fill-available; */
  height: 100%;

  @media (min-width: 767px) {
    height: 100%;
    position: static;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    border-right: solid 1px rgba(0, 0, 0, 0.1);
  }
`;

const Header = styled.div`
  height: 44px;

  display: flex;
  align-items: center;
  background-color: var(--sidebar-background-color);
  pointer-events: initial;
  transition: all 0.3s ease-out;
  justify-content: center;
  @media (min-width: 767px) {
    height: auto;
    justify-content: initial;
    button {
      display: none;
    }
  }
`;

const Scrollable = styled.div`
  overflow: auto;
  transition: all 0.3s ease-out;
  height: 100%;
  z-index: 9902;
  background-color: var(--sidebar-background-color);
  transform: ${({ open }) => (open ? " translateX(0)" : " translateX(-767px)")};
  pointer-events: initial;
  display: flex;
  flex-direction: column;
  height: -webkit-fill-available;
  height: 100vh;
  @media (min-width: 767px) {
    transform: translateX(0);
  }
`;

const Sidebar = ({ children, vendor, open, setOpen, footer }) => {
  return (
    <Root open={open}>
      <Header>
        <MenuIcon onClick={() => setOpen(!open)} open={open} />
        <Logo vendor={vendor} />
      </Header>
      <Scrollable open={open}>
        {children}
        {/* {footer} */}
      </Scrollable>
    </Root>
  );
};

export default Sidebar;
