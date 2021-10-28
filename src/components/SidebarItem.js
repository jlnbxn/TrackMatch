import styled from "@emotion/styled/macro";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  filter: grayscale(1);
  pointer-events: none;
  z-index: 900000;
  display: block;
  height: 100%;
  width: 100%;
`;

const SidebarItem = ({ children, header }) => {
    return (
        <Root>
            {header && <FormHeader>{header}</FormHeader>}
            {children}
            <Lock />
        </Root>
    );
};

export default SidebarItem;
