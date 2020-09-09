import styled from "styled-components";

type TaskStyleProps = {
  isDragging: boolean;
};

export const Container = styled.div<TaskStyleProps>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
`;
