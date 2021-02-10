import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Group = styled.div`
  flex: ${({ width }) => (width ? `0 0 ${width}` : "1")};
  margin: 20px 0;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e6e6e6;
  font-family: inherit;
  font-size: 16px;
`;

export const Textarea = styled.textarea`
  display: block;
  width: 100%;
  min-height: 200px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e6e6e6;
  font-family: inherit;
  font-size: 16px;
`;
