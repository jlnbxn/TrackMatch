import { useEffect, useState } from "react";
import styled from "@emotion/styled/macro";

const Root = styled.div`
  height: 20px;
  width: 20px;
  &:hover {
    svg > g > rect {
      stroke: var(--systemAccentBG);
      fill: var(--systemAccentBG);
    }
  }
`;

const ActiveCircle = styled.circle`
  transform-origin: 50% 50%;
  transform: rotate(-90deg); // Start at the top of the circle
  stroke-dasharray: 100 100;
  stroke: var(--systemAccentBG);
`;

const ProgressCircle = ({ total, count }) => {
    const [percentage, setPercentage] = useState(100);

    useEffect(() => {
        if (!count || !total) return;
        setPercentage(100 - (count / total) * 100);
    }, [count, total]);

    return (
        <Root>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
                <g id="circles" strokeWidth="4">
                    <circle r="16" cx="18" cy="18" fill="none" stroke="lightgray" />
                    <rect
                        x="14"
                        y="14"
                        width="8"
                        height="8"
                        fill="lightgray"
                        stroke="lightgray"
                    />
                    <ActiveCircle
                        r="16"
                        cx="18"
                        cy="18"
                        fill="none"
                        style={{
                            transition: "all 0.3s",
                            strokeDashoffset: percentage,
                        }}
                        strokeDasharray="100 100"
                        id="circle-meter"
                    />
                </g>
            </svg>
        </Root>
    );
};

export default ProgressCircle;
