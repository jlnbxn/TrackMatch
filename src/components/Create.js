import styled from "@emotion/styled/macro";
import Button from "./Button";
import Toggle from "./Toggle";

const Input = styled.input`
  width: 100%;
  border-radius: 4px;
  letter-spacing: 0;
  resize: vertical;
  margin-top: 0;
  margin-bottom: 18px;
  height: 40px;
  opacity: 1;
  text-overflow: ellipsis;
  transition-duration: 0.3s;
  transition-property: opacity width;
  transition-timing-function: cubic-bezier(0.3, 0, 0.4, 1);
  background-color: var(--inputBackgroundColor);
  color: var(--inputColor);
  font-size: var(--inputFontSize);
  border: var(--inputBorder);
  padding: var(--inputPadding);
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


const Create = ({ onSubmit, showMissingTracks }) => {
    return (
        <form onSubmit={onSubmit}>
            <Input
                label="Playlist Name"
                name="playlist_name"
                required
                placeholder="Name"
            />
            <Input
                label="Playlist Description"
                name="playlist_description"
                placeholder="Description"
            />

            <Row>
                {showMissingTracks && <Toggle label="Missing Tracks" id="missing_tracks" name="missing_tracks" value="missing_track" />}
                <Button type="submit" style={{ marginLeft: 'auto' }}>Create</Button>
            </Row>
        </form>

    );
};

export default Create;
