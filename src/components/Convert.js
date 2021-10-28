import styled from "@emotion/styled/macro";
import Button from "./Button";
import ProgressCircle from "./ProgressCircle";
import Toggle from "./Toggle";

const Select = styled.select`
  line-height: 1.23536;
  font-weight: 400;
  letter-spacing: -0.022em;
  width: 100%;
  color: inherit;
  margin-bottom: 0.82353rem;
  appearance: none;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: var(--selectBorderRadius);
  border: var(--selectBorder);
  background-color: var(--selectBackgroundColor);
  padding: var(--selectPadding);
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Convert = ({ onSubmit, playlists, loading, count, total, halt }) => {
    return (
        <form onSubmit={onSubmit}>
            <Select name="playlists">
                {playlists.length ? (
                    playlists.map((playlist) => (
                        <option key={playlist.id} value={playlist.id}>
                            {playlist.name}
                        </option>
                    ))
                ) : (
                    <option>Loading...</option>
                )}
            </Select>
            <Row>
                <Toggle
                    label="Autoselect"
                    id="autoselect"
                    name="autoselect"
                    value="autoselect"
                />
                {loading ? (
                    <Button onClick={halt} type="button">
                        <ProgressCircle total={total} count={count} />{" "}
                    </Button>
                ) : (
                    <Button type="submit" style={{ marginLeft: "auto" }}>
                        Search
                    </Button>
                )}
            </Row>
        </form>
    );
};

export default Convert;
