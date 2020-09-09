import styled from "styled-components";

type ColumnStyleProps = {
  isDraggingOver: boolean;
};

export const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
export const Title = styled.h3`
  padding: 8px;
  font-weight: bold;
  font-size: 1.17em;
`;
export const TaskList = styled.div<ColumnStyleProps>`
  padding: 8px;
  transition: backrgound-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")};
`;
