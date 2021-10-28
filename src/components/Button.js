import styled from "@emotion/styled/macro";

const Root = styled.button`
  display: block;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  text-align: center;
  transition: all 33ms cubic-bezier(0.3, 0, 0, 1);
  white-space: nowrap;
  will-change: transform;
  text-transform: var(--buttonTextTransform);
  font-size: var(--buttonFontSize);
  font-weight: var(--buttonFontWeight);
  letter-spacing: var(--buttonLetterSpacing);
  line-height: var(--buttonLineHeight);
  color: var(--buttonColor);
  &:hover {
    transform: var(--buttonTransform);
    text-decoration: var(--buttonTextDecoration);
  }
`;

const Button = ({ children, ...props }) => {
    return (
        <Root {...props}>
            <span>{children}</span>
        </Root>
    );
};

export default Button;
