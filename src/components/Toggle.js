import styled from "@emotion/styled/macro";

const Root = styled.label`
  display: flex;
  align-items: center;
  pointer-events: none;
  position: relative;

  > span {
    pointer-events: auto;
    background-color: none;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.25px;
    padding-left: 12px;
    padding-right: 24px;
  }

  input {
    position: absolute;
    inset: 0px;
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    border: 0px;
    outline: 0px;
    clip: rect(0px, 0px, 0px, 0px);
    opacity: 0;
    overflow: hidden;
    appearance: none;
    &:checked {
      background: var(--systemAccentBG);
    }
  }

  > div {
    pointer-events: auto;
    transition: background-color 300ms ease 0s;
    position: relative;
    display: inline-block;
    width: var(--toggleWidth);
    height: var(--toggleHeight);
    contain: strict;
    overflow: hidden;
    border-radius: var(--toggleBorderRadius);
    cursor: pointer;
    background-color: var(--toggleBG);
    span {
      display: flex;
      position: relative;
      align-items: center;
      width: 100%;
      height: 100%;
      transition: transform 300ms, width 120ms ease-in-out 80ms,
        left 110ms ease-in-out 80ms, right 110ms ease-in-out 80ms;
      &::before {
        top: 2px;
        left: 2px;
        border-radius: var(--toggleBorderRadius);
        position: absolute;
        width: var(--toggleIndicatorWidth);
        height: var(--toggleIndicatorHeight);
        background: #fff;
        box-shadow: 0 3px 12px rgba(0, 0, 0, 0.16), 0 3px 1px rgba(0, 0, 0, 0.1);
        contain: strict;
        transition: transform 300ms, width 120ms ease-in-out 80ms,
          left 110ms ease-in-out 80ms, right 110ms ease-in-out 80ms;
        content: "";
      }
    }
  }

  input:checked + div {
    background: var(--systemAccentBG);
  }
  input:checked + div > span {
    transform: translate3d(
      calc(100% - calc(var(--toggleHeight) - (2px * 2))),
      0,
      0
    );
    &::before {
      transform: translate3d(calc(2px * -2), 0, 0);
    }
  }
`;

const Toggle = ({ label, ...props }) => {
  return (
    <Root>
      <input type="checkbox" {...props} />
      <div>
        <span></span>
      </div>
      <span>{label}</span>
    </Root>
  );
};

export default Toggle;
