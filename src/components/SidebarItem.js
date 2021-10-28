import styled from "@emotion/styled/macro";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  padding-inline-start: 25px;
  padding-inline-end: 25px;
  margin-bottom: 17px;
`;

const FormHeader = styled.h3`
  letter-spacing: normal;
  text-transform: none;
  font-size: var(--sidebarHeaderFontSize);
  font-weight: var(--sidebarHeaderFontWeight);
  line-height: var(--sidebarHeaderLineHeight);
`;
const Lock = styled.div`
    /* pointer-events: none; */
    position: absolute;
    left: 0;
    z-index: 900000;
    display: block;
    opacity: 0.7;
    background: var(--sidebar-background-color);
    height: 100%;
    width: 100%;
`;


const SidebarItem = ({ children, header, locked }) => {
  return (
    <Root>
      {header && <FormHeader>{header}</FormHeader>}
      {children}
      {/* <Lock onClick={(e) => {
        e.preventDefault();
      }} /> */}
      {
        locked && <Lock onClick={(e) => {
          e.preventDefault();
        }} />
      }
    </Root>
  );
};

export default SidebarItem;
