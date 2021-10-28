import styled from "@emotion/styled/macro";
import Button from "./Button";
import Toggle from "./Toggle";
import ProgressCircle from "./ProgressCircle";

const Textarea = styled.textarea`
  border-radius: 4px;
  width: 100%;
  letter-spacing: 0;
  resize: vertical;
  margin-top: 0;
  margin-bottom: 18px;
  background-color: var(--inputBackgroundColor);
  color: var(--inputColor);
  font-size: var(--inputFontSize);
  border: var(--inputBorder);
  padding: var(--inputPadding);
`;

// const Ruler = styled.hr`
//   background-color: var(--labelDivider);
//   border: none;
//   height: 1px;
//   min-height: 1px;
//   width: 100%;
// `;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Search = ({ onSubmit, loading, count, total, halt }) => {


  return (
    <form onSubmit={onSubmit}>
      <Textarea
        name="textbox"
        placeholder="Search"
        defaultValue="test"
        required
        rows={4}
      />
      <Row>
        <Toggle label="Find Albums" id="type" name="type" value="albums" />
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

export default Search;
