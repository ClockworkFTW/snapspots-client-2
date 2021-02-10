import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { updateViewport } from "pages/Explore/Map/viewportSlice";
import { autocomplete, geocode } from "services/google";

import { EXPLORE } from "navigation/CONSTANTS";

export function Search({ width }) {
  const dispatch = useDispatch();

  const history = useHistory();

  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
    autocomplete(value, setResults);
  };

  const onClick = async (result) => {
    setInput(result.description);
    setResults([]);
    const { lat, lng } = await geocode(result.place_id);
    let viewport = { latitude: lat, longitude: lng, zoom: 10 };
    dispatch(updateViewport(viewport));
    viewport = new URLSearchParams(viewport);
    history.push(`${EXPLORE}?${viewport}`);
  };

  return (
    <Container width={width}>
      <Input
        type="text"
        placeholder="Search..."
        value={input}
        onChange={onChange}
      />
      {results.length > 0 && (
        <Results>
          {results.map((r) => (
            <Result key={r.place_id} onClick={() => onClick(r)}>
              {r.description}
            </Result>
          ))}
        </Results>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: ${({ width }) => width};
  border-radius: 20px;
  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 20px;
  outline: none;
  border: none;
  font-family: inherit;
  font-size: 16px;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 20px;
`;

const Results = styled.ul`
  z-index: 20;
  position: absolute;
  top: 64px;
  left: 0px;
  right: 0px;
  border: 1px solid #dddddd;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
  overflow: hidden;
`;

const Result = styled.li`
  padding: 10px 20px;
  &:hover {
    background: #f59e0b;
    color: #ffffff;
    cursor: pointer;
  }
`;
