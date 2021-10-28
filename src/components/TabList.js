import { useState } from "react";
import styled from "@emotion/styled/macro";

const StyledTab = styled.div``;

export const Tab = ({ children, label }) => {
    return <StyledTab label={label || ""}>{children}</StyledTab>;
};

const FormHeader = styled.h3`
  letter-spacing: normal;
  text-transform: none;
  cursor: pointer;
  font-size: var(--sidebarHeaderFontSize);
  font-weight: var(--sidebarHeaderFontWeight);
  line-height: var(--sidebarHeaderLineHeight);
  font-weight: ${(props) =>
        props.selected
            ? "var(--sidebarHeaderFontWeight)"
            : "var(--sidebarHeaderFontWeightLight)"};
  margin-right: 1rem;
`;

const TabHeader = styled.header`
  display: flex;
`;

const TabList = ({ children }) => {
    const [selected, setSelected] = useState(0);

    return (
        <>
            <TabHeader>
                {children &&
                    children
                        .filter((child) => child !== null)
                        .map((element, index) => (
                            <FormHeader
                                key={index}
                                selected={selected === index}
                                onClick={() => setSelected(index)}
                            >
                                {element.props?.label}
                            </FormHeader>
                        ))}
            </TabHeader>
            {children[selected]}
        </>
    );
};

export default TabList;
