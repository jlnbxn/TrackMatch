/** @jsxImportSource @emotion/react */
import Button from "./Button";
import SidebarItem from "./SidebarItem";
import styled from "@emotion/styled/macro";
import { css, keyframes } from "@emotion/react/macro";

const loading = keyframes`
    0% {
        opacity: .16863
    }

    to {
        opacity: 1
    }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(min-content, 22px);
  margin-bottom: 1rem;
  grid-row-gap: 0.25rem;
  div:nth-of-type(even) {
    font-weight: bold;
    color: var(--systemAccentBG);
  }
`;

const ListInfo = ({ reset, download, total, list }) => {
    return (
        <div
            css={css`
        animation-name: ${loading};
        animation-duration: 100ms;
      `}
        >
            <SidebarItem header="List">
                <Table>
                    <div>Total</div>
                    <div>{total || list.length}</div>
                    <div>Found</div>
                    <div>{list.filter((el) => el.results.length).length}</div>
                    <div>Missing</div>
                    <div>{list.filter((el) => !Object.keys(el.match).length).length}</div>
                    <div>Selected</div>
                    <div>
                        {list.length &&
                            list.filter((el) => Object.keys(el.match).length !== 0).length}
                    </div>
                </Table>

                <Row>
                    <Button onClick={reset}>Delete List</Button>
                    <Button onClick={download}>Export List</Button>
                </Row>
            </SidebarItem>
        </div>
    );
};

export default ListInfo;
